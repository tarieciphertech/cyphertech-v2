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
 *
 * Race-free waiting:
 *  - `loading` covers initial session restoration.
 *  - `profileReady` is an explicit AuthProvider signal that flips true once
 *    the current user's profile has RESOLVED — whether found, missing, or a
 *    handled fetch failure. Waiting on this signal (instead of inferring
 *    state from `profile === null`) makes an indefinite "Verifying access..."
 *    impossible: every path terminates in either children or a redirect.
 */
export default function AdminRoute({ children }) {
  const { user, profile, loading, profileReady } = useAuth();
  const location = useLocation();

  const waiting = loading || (Boolean(user) && !profileReady);

  if (waiting) {
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