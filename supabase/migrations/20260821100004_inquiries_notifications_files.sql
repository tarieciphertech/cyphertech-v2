-- ============================================================================
-- Stage 7B — Database Foundation
-- Migration 5: inquiries + notifications + files tables + RLS
-- ============================================================================
-- inquiries:    future persistence of website contact inquiries. EmailJS
--               remains the current contact mechanism; this table is prepared
--               for a future stage and is NOT wired to Contact.jsx yet.
-- notifications: future in-app notifications for a user.
-- files:        future metadata for Supabase Storage files. No Storage buckets
--               are created in this stage.
--
-- SECURITY NOTES
-- --------------
-- * inquiries: anon may INSERT only (public form). anon can never SELECT,
--   UPDATE, or DELETE. Staff/admin can read/manage.
-- * notifications: users can read/update only their own. anon has no access.
-- * files: users can access only their own metadata; staff/admin can access
--   all. No public anonymous access. visibility is constrained to 'private'.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- inquiries
-- ----------------------------------------------------------------------------
create table public.inquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  service    text,
  budget     text,
  message    text not null,
  status     text not null default 'new',
  utm_source text,
  created_at timestamptz not null default now(),
  constraint inquiries_status_check check (status in ('new', 'contacted', 'qualified', 'converted', 'closed'))
);

alter table public.inquiries enable row level security;

-- Public visitors can submit an inquiry (INSERT only).
create policy "inquiries_insert_anon"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (true);

-- Staff/admin can read and manage inquiries.
create policy "inquiries_all_staff_admin"
  on public.inquiries
  for all
  to authenticated
  using (public.is_staff_or_admin())
  with check (public.is_staff_or_admin());

-- No SELECT/UPDATE/DELETE policy for anon or regular authenticated users.

-- ----------------------------------------------------------------------------
-- notifications
-- ----------------------------------------------------------------------------
create table public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles (id) on delete cascade,
  type       text not null,
  payload    jsonb not null default '{}'::jsonb,
  read_at    timestamptz,
  created_at timestamptz not null default now()
);

alter table public.notifications enable row level security;

-- Users can read their own notifications.
create policy "notifications_select_own"
  on public.notifications
  for select
  to authenticated
  using (user_id = auth.uid());

-- Users can update (e.g. mark read) their own notifications.
create policy "notifications_update_own"
  on public.notifications
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- No INSERT/DELETE policies: notifications are created/deleted by the system
-- (future server-side/trigger logic), not by clients.

-- ----------------------------------------------------------------------------
-- files
-- ----------------------------------------------------------------------------
create table public.files (
  id           uuid primary key default gen_random_uuid(),
  owner_id     uuid not null references public.profiles (id) on delete cascade,
  bucket       text not null,
  storage_path text not null,
  mime_type    text,
  size         bigint,
  visibility   text not null default 'private',
  created_at   timestamptz not null default now(),
  constraint files_bucket_check check (bucket in ('avatars', 'ticket-attachments', 'project-docs')),
  constraint files_visibility_check check (visibility in ('private'))
);

alter table public.files enable row level security;

-- Users can read their own file metadata.
create policy "files_select_own"
  on public.files
  for select
  to authenticated
  using (owner_id = auth.uid());

-- Users can create file metadata for themselves.
create policy "files_insert_own"
  on public.files
  for insert
  to authenticated
  with check (owner_id = auth.uid());

-- Users can update their own file metadata.
create policy "files_update_own"
  on public.files
  for update
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- Users can delete their own file metadata.
create policy "files_delete_own"
  on public.files
  for delete
  to authenticated
  using (owner_id = auth.uid());

-- Staff/admin can access all file metadata.
create policy "files_all_staff_admin"
  on public.files
  for all
  to authenticated
  using (public.is_staff_or_admin())
  with check (public.is_staff_or_admin());

-- ----------------------------------------------------------------------------
-- Grants
-- ----------------------------------------------------------------------------
grant insert on public.inquiries to anon, authenticated;
grant select, update, delete on public.inquiries to authenticated;

grant select, update on public.notifications to authenticated;

grant select, insert, update, delete on public.files to authenticated;