-- ============================================================================
-- Stage 7B — Database Foundation
-- Migration 3: projects + services tables + RLS
-- ============================================================================
-- projects: future client projects owned by a profile.
-- services: database representation of the company's service catalogue for a
--           future admin stage. The public marketing site continues to use
--           src/data/site.js — this table is NOT wired to the frontend yet.
--
-- SECURITY NOTES
-- --------------
-- * projects: owners can CRUD their own; staff/admin can access all.
--   Ownership (owner_id) can never be changed to another user.
-- * services: anon can SELECT active services only; writes are staff/admin.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- projects
-- ----------------------------------------------------------------------------
create table public.projects (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references public.profiles (id) on delete cascade,
  title       text not null,
  description text,
  status      text not null default 'planned',
  start_date  date,
  end_date    date,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint projects_status_check check (status in ('planned', 'active', 'on_hold', 'completed', 'cancelled'))
);

create trigger projects_set_updated_at
  before update on public.projects
  for each row
  execute function public.set_updated_at();

alter table public.projects enable row level security;

-- Owners can read their own projects.
create policy "projects_select_own"
  on public.projects
  for select
  to authenticated
  using (owner_id = auth.uid());

-- Owners can create their own projects.
create policy "projects_insert_own"
  on public.projects
  for insert
  to authenticated
  with check (owner_id = auth.uid());

-- Owners can update their own projects, but never change ownership.
create policy "projects_update_own"
  on public.projects
  for update
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- Owners can delete their own projects.
create policy "projects_delete_own"
  on public.projects
  for delete
  to authenticated
  using (owner_id = auth.uid());

-- Staff/admin can access all projects.
create policy "projects_all_staff_admin"
  on public.projects
  for all
  to authenticated
  using (public.is_staff_or_admin())
  with check (public.is_staff_or_admin());

-- ----------------------------------------------------------------------------
-- services
-- ----------------------------------------------------------------------------
create table public.services (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  description text,
  icon        text,
  sort_order  integer not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger services_set_updated_at
  before update on public.services
  for each row
  execute function public.set_updated_at();

alter table public.services enable row level security;

-- Anyone (including anon) can read active services.
create policy "services_select_active"
  on public.services
  for select
  to anon, authenticated
  using (is_active = true);

-- Staff/admin can read inactive services too (for future admin management).
create policy "services_select_all_staff_admin"
  on public.services
  for select
  to authenticated
  using (public.is_staff_or_admin());

-- Only staff/admin can insert/update/delete services.
create policy "services_write_staff_admin"
  on public.services
  for all
  to authenticated
  using (public.is_staff_or_admin())
  with check (public.is_staff_or_admin());

-- ----------------------------------------------------------------------------
-- Grants
-- ----------------------------------------------------------------------------
grant select on public.projects to authenticated;
grant insert, update, delete on public.projects to authenticated;

grant select on public.services to anon, authenticated;
grant insert, update, delete on public.services to authenticated;