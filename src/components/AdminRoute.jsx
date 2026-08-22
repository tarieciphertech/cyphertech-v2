import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

/**
 * AdminRoute — guards the admin area.
 *
 * Security model:
 *  - The role is read from the caller's own `profiles` row via RLS
 *    (AuthProvider.refreshProfile). It is NEVER taken from client input,
 *    signup metadata, or local storage — the database remains authoritative.
 *  - Deny by default: access is granted ONLY when the DB-confirmed role is
 *    'admin' or 'staff'. Unauthenticated users go to /login; authenticated
 *    non-admins are redirected to their client portal.
 *  - Handles the post-login race where the session exists but the debounced
 *    profile fetch has not landed yet: performs one safe refreshProfile
 *    retry instead of flashing a denial or spinning forever.
 */
export default function AdminRoute({ children }) {
  const { user, profile, loading, refreshProfile } = useAuth();
  const location = useLocation();
  const [retrying, setRetrying] = useState(false);

  const needsProfileRetry = !loading && Boolean(user) && !profile;

  useEffect(() => {
    let active = true;

    async function ensureProfile() {
      if (!needsProfileRetry || !user) return;
      setRetrying(true);
      await refreshProfile(user.id);
      if (active) setRetrying(false);
    }

    ensureProfile();

    return () => {
      active = false;
    };
  }, [needsProfileRetry, user, refreshProfile]);

  if (loading || retrying || needsProfileRetry) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#05020a] text-white">
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300" />
          <span className="text-sm text-gray-400">Verifying access...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  const role = profile?.role;
  if (role !== "admin" && role !== "staff") {
    // Authenticated but not privileged — send them to their own portal.
    return <Navigate to="/client" replace />;
  }

  return children;
}