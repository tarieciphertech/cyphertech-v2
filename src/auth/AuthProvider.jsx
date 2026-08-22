import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { AuthContext } from "./authContext";

/**
 * AuthProvider — Supabase authentication state manager.
 *
 * Responsibilities:
 *  - Retrieves the initial session on mount.
 *  - Subscribes to supabase.auth.onAuthStateChange for sign-in/sign-out/token refresh.
 *  - Loads the current user's public profiles row via RLS (id = auth.uid()).
 *  - Exposes user, session, profile, loading, signIn, signUp, signOut, refreshProfile.
 *
 * Security:
 *  - The anon key is the only credential used (from src/lib/supabase.js).
 *  - signUp() NEVER accepts a role from UI; the DB signup trigger defaults role = 'client'.
 *  - The profile is fetched under RLS — never with service_role and never bypassing policies.
 *  - If Supabase is not configured (supabase === null), the app degrades gracefully:
 *    the public marketing site keeps working and auth features are unavailable.
 */

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  // supabase is a module-level constant from src/lib/supabase.js — it never
  // changes. When it is null (no env config), there is nothing to restore, so
  // we start unloaded. When it exists, start loading until restoreSession ends.
  const [loading, setLoading] = useState(() => Boolean(supabase));

  const refreshProfile = useCallback(async (userId) => {
    if (!supabase || !userId) {
      setProfile(null);
      return null;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url, role, phone, company, created_at")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      // RLS or network issue — do not leak internals to the UI.
      setProfile(null);
      return null;
    }

    setProfile(data);
    return data;
  }, []);

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    let active = true;

    async function restoreSession() {
      const { data } = await supabase.auth.getSession();
      if (!active) return;

      const currentSession = data.session;
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        await refreshProfile(currentSession.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    }

    restoreSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (nextSession?.user) {
        // Debounce slightly to let the fresh session take effect before
        // fetching the profile (avoids occasional 401 on token refresh).
        window.setTimeout(() => refreshProfile(nextSession.user.id), 150);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [refreshProfile]);

  const signIn = useCallback(async ({ email, password }) => {
    if (!supabase) {
      return { error: { friendly: "Authentication is not configured." } };
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const message =
        error.message === "Invalid login credentials"
          ? "Incorrect email or password."
          : "Unable to sign in. Please try again.";
      return { error: { friendly: message } };
    }

    // onAuthStateChange will populate user + profile asynchronously.
    setUser(data.user ?? null);
    setSession(data.session ?? null);
    if (data.user) await refreshProfile(data.user.id);
    return { data };
  }, [refreshProfile]);

  const signUp = useCallback(async ({ fullName, email, password }) => {
    if (!supabase) {
      return { error: { friendly: "Registration is not available right now." } };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      if (error.message.toLowerCase().includes("already registered")) {
        return { error: { message: "This email is already registered. Try signing in instead." } };
      }
      if (error.message.toLowerCase().includes("password")) {
        return { error: { message: error.message } };
      }
      return { error: { message: "We could not create your account right now. Please try again." } };
    }

    setUser(data.user ?? null);
    setSession(data.session ?? null);
    if (data.user) await refreshProfile(data.user.id);
    return { data };
  }, [refreshProfile]);

  const signOut = useCallback(async () => {
    setProfile(null);
    setUser(null);
    setSession(null);
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) return { error };
    }
    return {};
  }, []);

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}