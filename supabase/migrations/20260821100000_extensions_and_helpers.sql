-- ============================================================================
-- Stage 7B — Database Foundation
-- Migration 1: Extensions and updated_at trigger
-- ============================================================================
-- This migration establishes the shared building blocks used by all tables:
--   * pgcrypto extension (provides gen_random_uuid())
--   * A safe set_updated_at() trigger function
--
-- NOTE: The secure role helper is_staff_or_admin() lives in migration 2
-- (20260821100001_profiles.sql) because it queries public.profiles, which is
-- created there. SQL-language functions are validated at creation time, so the
-- helper must be created after its dependency.
-- ============================================================================

-- gen_random_uuid() is used as the default for all primary keys.
create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- updated_at trigger
-- ----------------------------------------------------------------------------
-- search_path is locked to public to prevent search-path hijacking.
-- This is a trigger function (not SECURITY DEFINER) so it runs with the
-- caller's privileges; it only sets updated_at and never touches other data.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger functions are invoked by the trigger system, not by clients.
-- Revoke direct execution from anon and authenticated to prevent abuse.
revoke execute on function public.set_updated_at() from anon, authenticated;
