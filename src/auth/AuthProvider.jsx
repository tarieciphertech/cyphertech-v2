import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { AuthContext } from "./authContext";

/**
 * AuthProvider — Supabase authentication state manager.
 *
 * Architecture (race-free by design):
 *  - A SINGLE onAuthStateChange listener is the only source of auth state.
 *    supabase-js v2 emits INITIAL_SESSION on subscribe, so session
 *    restoration needs no parallel getSession() call — the dual-path
 *    getSession/listener race that previously caused "Verifying access..."
 *    to hang is eliminated.
 *  - Profile loading is deduplicated: concurrent requests for the same user
 *    share one in-flight promise, and repeat events for an already-resolved
 *    user reuse the cached result instead of re-querying.
 *  - `profileReady` is an explicit signal distinguishing "profile not yet
 *    resolved" (false) from "resolved — found, missing, or handled-error"
 *    (true). Guards wait on this signal instead of inferring state from
 *    `profile === null`, so they can never hang or flash a denial.
 *
 * Security:
 *  - The anon key is the only credential used (src/lib/supabase.js).
 *  - signUp() NEVER accepts a role; the DB signup trigger defaults role='client'.
 *  - The profile is fetched under RLS — never service_role, never bypassed.
 *  - If Supabase is not configured (supabase === null) the public site still
 *    works and auth features degrade gracefully.
 */

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  // Session restoration is in progress until the first auth event arrives.
  const [loading, setLoading] = useState(() => Boolean(supabase));
  // Profile resolution for the CURRENT user: false = pending, true = done
  // (whether the row was found, missing, or the fetch failed safely).
  const [profileReady, setProfileReady] = useState(() => !supabase);

  // Tracks which user the resolved/in-flight profile belongs to, plus the
  // in-flight promise used to deduplicate concurrent fetches.
  const profileUserIdRef = useRef(null);
  const profilePromiseRef = useRef(null);

  const refreshProfile = useCallback(async (userId, { force = false } = {}) => {
    if (!supabase || !userId) {
      profileUserIdRef.current = null;
      profilePromiseRef.current = null;
      setProfile(null);
      setProfileReady(true);
      return null;
    }

    // Share an already in-flight request for the same user.
    if (profilePromiseRef.current && profileUserIdRef.current === userId) {
      return profilePromiseRef.current;
    }

    // Already resolved for this user → reuse the cached result instead of
    // issuing a redundant query (auth events can arrive in bursts). Callers
    // that need fresh data after a mutation pass { force: true }.
    if (!force && profileUserIdRef.current === userId) {
      setProfileReady(true);
      return null;
    }

    // New user (or forced refresh) — wait for a fresh resolution.
    profileUserIdRef.current = userId;
    setProfileReady(false);

    const promise = (async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, role, phone, company, created_at")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        // Handled failure: profileReady still flips true so guards resolve
        // deterministically (they will deny-by-default on missing role).
        console.error("Failed to load profile:", error.message);
        setProfile(null);
      } else {
        setProfile(data);
      }
      setProfileReady(true);
      return data ?? null;
    })();

    profilePromiseRef.current = promise;
    try {
      return await promise;
    } finally {
      if (profilePromiseRef.current === promise) {
        profilePromiseRef.current = null;
      }
    }
  }, []);

  useEffect(() => {
    if (!supabase) return undefined;

    let active = true;

    // supabase-js v2 guarantees an INITIAL_SESSION emission on subscribe.
    // The callback stays synchronous (state updates only); the profile fetch
    // is deferred with a 0ms timeout so it never runs inside the auth
    // emitter's lock (a documented supabase-js deadlock footgun).
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;

      const nextUser = nextSession?.user ?? null;
      setSession(nextSession);
      setUser(nextUser);
      setLoading(false);

      if (nextUser) {
        window.setTimeout(() => refreshProfile(nextUser.id), 0);
      } else {
        profileUserIdRef.current = null;
        profilePromiseRef.current = null;
        setProfile(null);
        setProfileReady(true);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [refreshProfile]);

  const signIn = useCallback(
    async ({ email, password }) => {
      if (!supabase) {
        return { error: { friendly: "Authentication is not configured." } };
      }
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        const rawMessage = typeof error.message === "string" ? error.message : "";
        const message = rawMessage.toLowerCase();

        if (
          error.code === "email_not_confirmed" ||
          message.includes("email not confirmed") ||
          message.includes("email address not confirmed") ||
          message.includes("confirm your email")
        ) {
          return {
            error: {
              friendly:
                "Please confirm your email before signing in. Check your inbox for the confirmation link.",
            },
          };
        }

        if (
          error.status === 429 ||
          message.includes("rate limit") ||
          message.includes("too many requests") ||
          message.includes("too many signin") ||
          message.includes("too many sign-in")
        ) {
          return {
            error: { friendly: "Too many sign-in attempts. Please wait a few minutes and try again." },
          };
        }

        if (rawMessage === "Invalid login credentials") {
          return { error: { friendly: "Incorrect email or password." } };
        }

        const safeMessage =
          typeof error.message === "string" && error.message.trim()
            ? error.message.trim()
            : "Unable to sign in right now. Please try again.";
        return { error: { friendly: safeMessage } };
      }

      setUser(data.user ?? null);
      setSession(data.session ?? null);
      if (data.user) await refreshProfile(data.user.id);
      return { data };
    },
    [refreshProfile],
  );

  const signUp = useCallback(
    async ({ fullName, email, password }) => {
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
        const status = error.status;
        const message = (error.message || "").toLowerCase();

        if (
          status === 429 ||
          message.includes("rate limit") ||
          message.includes("too many requests") ||
          message.includes("too many signup")
        ) {
          return {
            error: {
              message: "Too many signup attempts from this connection. Please wait a few minutes and try again.",
            },
          };
        }

        if (message.includes("already registered") || message.includes("already been registered")) {
          return { error: { message: "This email is already registered. Try signing in instead." } };
        }

        return {
          error: { message: error.message || "We could not create your account right now. Please try again." },
        };
      }

      setUser(data.user ?? null);
      setSession(data.session ?? null);
      if (data.user) await refreshProfile(data.user.id);
      return { data };
    },
    [refreshProfile],
  );

  const signOut = useCallback(async () => {
    setProfile(null);
    setUser(null);
    setSession(null);
    profileUserIdRef.current = null;
    profilePromiseRef.current = null;
    setProfileReady(true);
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
    profileReady,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}