-- ============================================================================
-- Stage 7B — Database Foundation
-- Migration 2: profiles table + RLS + auth trigger
-- ============================================================================
-- profiles is the application-level 1:1 extension of auth.users.
--
-- SECURITY NOTES
-- --------------
-- * auth.users is NEVER exposed to the public. Only profiles is queryable.
-- * A trigger creates a profile row automatically when a new auth user signs
--   up. The default role is always 'client'.
-- * Signup metadata may only supply full_name — it can NEVER set the role.
--   This prevents privilege escalation at signup.
-- * RLS: users can SELECT/UPDATE only their own profile. anon has no access.
-- * The role column is protected by the profiles_prevent_role_change trigger
--   so a user can never change their own role to staff/admin.
-- ============================================================================

create table public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  full_name  text,
  avatar_url text,
  role       text not null default 'client',
  phone      text,
  company    text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_role_check check (role in ('client', 'staff', 'admin'))
);

-- Keep updated_at current on every row change.
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- is_staff_or_admin() — secure role check for RLS policies
-- ----------------------------------------------------------------------------
-- SECURITY DEFINER but read-only and safe:
--   * Sets an explicit search_path to prevent search-path hijacking.
--   * Only SELECTs the caller's own profile row (auth.uid()).
--   * Never accepts SQL or user input.
--   * Cannot be abused to change roles: it only reads the role column.
-- The role column itself is protected by the profiles_prevent_role_change
-- trigger below, so a user can never update their own role to staff/admin.
create or replace function public.is_staff_or_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('staff', 'admin')
  );
$$;

-- Revoke direct execution from anon; only authenticated users may call it.
revoke execute on function public.is_staff_or_admin() from anon;
grant execute on function public.is_staff_or_admin() to authenticated;

-- ----------------------------------------------------------------------------
-- RLS
-- ----------------------------------------------------------------------------
alter table public.profiles enable row level security;

-- Users can read their own profile.
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

-- Users can update their own profile. The role column is protected by the
-- profiles_prevent_role_change trigger below (NOT by a self-referencing
-- WITH CHECK, which would cause RLS recursion).
create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- Staff/admin can read all profiles (for future admin panel).
create policy "profiles_select_staff_admin"
  on public.profiles
  for select
  to authenticated
  using (public.is_staff_or_admin());

-- No INSERT policy: profile creation happens only via the auth trigger.
-- No DELETE policy: profiles are removed by the auth.users ON DELETE CASCADE.

-- ----------------------------------------------------------------------------
-- Role-change protection trigger
-- ----------------------------------------------------------------------------
-- Prevents ordinary authenticated users from changing the role column.
-- Only staff/admin may change a role. This runs as the invoking user (NOT
-- SECURITY DEFINER) so it cannot be abused for privilege escalation; it only
-- blocks role changes for non-privileged callers.
create or replace function public.prevent_profile_role_change()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.role is distinct from old.role
     and not public.is_staff_or_admin() then
    raise exception 'role changes are not permitted';
  end if;
  return new;
end;
$$;

create trigger profiles_prevent_role_change
  before update on public.profiles
  for each row
  execute function public.prevent_profile_role_change();

-- Trigger functions are invoked by the trigger system, not by clients.
revoke execute on function public.prevent_profile_role_change() from anon, authenticated;

-- ----------------------------------------------------------------------------
-- Auth trigger: create a profile on signup
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Trigger functions are invoked by the trigger system, not by clients.
-- Revoke direct execution so clients cannot insert arbitrary profiles.
revoke execute on function public.handle_new_user() from anon, authenticated;

-- ----------------------------------------------------------------------------
-- Grants
-- ----------------------------------------------------------------------------
-- anon gets nothing on profiles (no SELECT/INSERT/UPDATE/DELETE).
-- authenticated gets table-level privileges; RLS enforces row-level access.
grant select, update on public.profiles to authenticated;