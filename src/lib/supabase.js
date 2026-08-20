import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client (Stage 7A Foundation).
 *
 * SECURITY
 * --------
 * - Only the publishable anon key (VITE_SUPABASE_ANON_KEY) is used here.
 * - The service_role key must NEVER be placed in the frontend, .env, CI, or
 *   this file. It belongs exclusively to server-side tooling.
 * - This module is the ONLY place Supabase is initialized. Import `supabase`
 *   from here everywhere else.
 *
 * SAFE DEGRADATION
 * ----------------
 * If VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY are missing (e.g. local dev
 * without a .env file, or a CI build without the secrets), `supabase` is
 * `null` and the app continues to build and run normally — mirroring the
 * existing EmailJS graceful-fallback pattern in src/components/Contact.jsx.
 * Features that need Supabase must check for `supabase` before use.
 *
 * See .env.example for the required variables. Do NOT commit a real .env.
 */

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasConfig = Boolean(url && anonKey);

/**
 * The Supabase client, or `null` when the environment variables are absent.
 * @type {import("@supabase/supabase-js").SupabaseClient | null}
 */
export const supabase = hasConfig ? createClient(url, anonKey) : null;