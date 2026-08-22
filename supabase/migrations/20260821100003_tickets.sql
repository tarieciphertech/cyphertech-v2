-- ============================================================================
-- Stage 7B — Database Foundation
-- Migration 4: tickets + ticket_messages tables + RLS
-- ============================================================================
-- tickets: future client support tickets.
-- ticket_messages: the conversation thread on a ticket.
--
-- SECURITY NOTES
-- --------------
-- * A client can only access tickets where client_id = auth.uid().
-- * A staff member can access tickets they are assigned to (assignee_id).
-- * Staff/admin can access all tickets.
-- * Clients can never see another client's tickets.
-- * Ticket messages are readable only by users authorized for the ticket.
-- * A message author_id is always forced to auth.uid() — no impersonation.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- tickets
-- ----------------------------------------------------------------------------
create table public.tickets (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid not null references public.profiles (id) on delete cascade,
  assignee_id uuid references public.profiles (id) on delete set null,
  subject     text not null,
  status      text not null default 'open',
  priority    text not null default 'normal',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint tickets_status_check check (status in ('open', 'in_progress', 'waiting', 'resolved', 'closed')),
  constraint tickets_priority_check check (priority in ('low', 'normal', 'high', 'urgent'))
);

create trigger tickets_set_updated_at
  before update on public.tickets
  for each row
  execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- can_access_ticket(ticket_id) — shared RLS helper
-- ----------------------------------------------------------------------------
-- Returns true if the current user may access the given ticket:
--   * the ticket's client (client_id = auth.uid()), or
--   * the assigned staff member (assignee_id = auth.uid()), or
--   * any staff/admin.
-- This is a plain (non-SECURITY DEFINER) function so it runs with the caller's
-- RLS context and cannot be used to bypass policies.
-- It is created here, after the tickets table exists, because LANGUAGE sql
-- functions are validated at creation time.
create or replace function public.can_access_ticket(p_ticket_id uuid)
returns boolean
language sql
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.tickets t
    where t.id = p_ticket_id
      and (
        t.client_id = auth.uid()
        or t.assignee_id = auth.uid()
        or public.is_staff_or_admin()
      )
  );
$$;

alter table public.tickets enable row level security;

-- Clients can read their own tickets; assigned staff and staff/admin too.
create policy "tickets_select_participant"
  on public.tickets
  for select
  to authenticated
  using (
    client_id = auth.uid()
    or assignee_id = auth.uid()
    or public.is_staff_or_admin()
  );

-- Clients can open a ticket for themselves.
create policy "tickets_insert_own"
  on public.tickets
  for insert
  to authenticated
  with check (client_id = auth.uid());

-- Participants can update tickets they are part of. Ownership (client_id) and
-- assignment (assignee_id) are protected by the tickets_prevent_ownership_change
-- trigger below (NOT by a self-referencing WITH CHECK, which would cause RLS
-- recursion).
create policy "tickets_update_participant"
  on public.tickets
  for update
  to authenticated
  using (
    client_id = auth.uid()
    or assignee_id = auth.uid()
    or public.is_staff_or_admin()
  )
  with check (
    client_id = auth.uid()
    or assignee_id = auth.uid()
    or public.is_staff_or_admin()
  );

-- No DELETE policy for clients. Staff/admin can delete via a dedicated policy.
create policy "tickets_delete_staff_admin"
  on public.tickets
  for delete
  to authenticated
  using (public.is_staff_or_admin());

-- ----------------------------------------------------------------------------
-- Ownership/assignment protection trigger
-- ----------------------------------------------------------------------------
-- Prevents ordinary clients from changing client_id (ownership) or
-- assignee_id (assignment). Only staff/admin may change these. Runs as the
-- invoking user (NOT SECURITY DEFINER) so it cannot be abused for privilege
-- escalation; it only blocks ownership/assignment changes for non-privileged
-- callers.
create or replace function public.prevent_ticket_ownership_change()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if (new.client_id is distinct from old.client_id
      or new.assignee_id is distinct from old.assignee_id)
     and not public.is_staff_or_admin() then
    raise exception 'ticket ownership or assignment changes are not permitted';
  end if;
  return new;
end;
$$;

create trigger tickets_prevent_ownership_change
  before update on public.tickets
  for each row
  execute function public.prevent_ticket_ownership_change();

-- Trigger functions are invoked by the trigger system, not by clients.
revoke execute on function public.prevent_ticket_ownership_change() from anon, authenticated;

-- ----------------------------------------------------------------------------
-- ticket_messages
-- ----------------------------------------------------------------------------
create table public.ticket_messages (
  id         uuid primary key default gen_random_uuid(),
  ticket_id  uuid not null references public.tickets (id) on delete cascade,
  author_id  uuid not null references public.profiles (id) on delete cascade,
  body       text not null,
  created_at timestamptz not null default now()
);

alter table public.ticket_messages enable row level security;

-- Users can read messages on tickets they are authorized to access.
create policy "ticket_messages_select_authorized"
  on public.ticket_messages
  for select
  to authenticated
  using (public.can_access_ticket(ticket_id));

-- Users can post a message only as themselves on an accessible ticket.
create policy "ticket_messages_insert_own"
  on public.ticket_messages
  for insert
  to authenticated
  with check (
    author_id = auth.uid()
    and public.can_access_ticket(ticket_id)
  );

-- No UPDATE/DELETE policies: messages are immutable once posted.

-- ----------------------------------------------------------------------------
-- Grants
-- ----------------------------------------------------------------------------
grant select, insert, update, delete on public.tickets to authenticated;
grant select, insert on public.ticket_messages to authenticated;

-- can_access_ticket() is used by RLS policies on ticket_messages. It is a
-- plain (non-SECURITY DEFINER) function that runs with the caller's RLS
-- context. Revoke from anon; grant only to authenticated.
revoke execute on function public.can_access_ticket(uuid) from anon;
grant execute on function public.can_access_ticket(uuid) to authenticated;
