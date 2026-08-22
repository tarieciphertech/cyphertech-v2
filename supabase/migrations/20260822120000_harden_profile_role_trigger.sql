-- ============================================================================
-- Stage 7K — Security & Production Hardening
-- Migration 7: Block ALL self-service role changes
-- ============================================================================
-- FINDING (Stage 7K security audit):
--   prevent_profile_role_change() blocked role changes only for callers who
--   were NOT staff/admin. A user holding the 'staff' role could therefore
--   promote themselves to 'admin' through a direct API request (e.g. crafted
--   PATCH on profiles with role='admin'). The ClientProfile form never sends
--   role, but the API path existed and violated the requirement that role
--   escalation must be impossible through the normal client API.
--
-- FIX:
--   Nobody may change their OWN role through the normal API — including
--   staff and admins. Role changes for OTHER users remain governed by the
--   existing RLS policies (staff/admin retain the ability to manage other
--   users' roles, which the future admin panel will require).
--
-- APPLICATION:
--   Uses CREATE OR REPLACE so it can be applied to the live project with
--   `supabase db push` without touching existing rows. NOT applied yet —
--   pending explicit approval.
-- ============================================================================

create or replace function public.prevent_profile_role_change()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  -- Self-service role changes are blocked for EVERY role (client, staff,
  -- admin). Cross-user role changes remain governed by RLS policies.
  if new.id = auth.uid() and new.role is distinct from old.role then
    raise exception 'role changes are not permitted';
  end if;
  return new;
end;
$$;

-- Trigger functions are invoked by the trigger system, not by clients.
revoke execute on function public.prevent_profile_role_change() from anon, authenticated;