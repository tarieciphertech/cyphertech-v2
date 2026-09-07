import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const ADMIN_HOST = "admin.cyphertech.co.zw";

/**
 * GuestRoute — wraps public-only routes (/login, /register).
 * On the dedicated admin hostname, an authenticated admin/staff user is sent
 * to /admin. A regular client is denied here rather than being redirected
 * back into a login loop.
 */
export default function GuestRoute({ children }) {
  const { user, profile, loading, profileReady, signOut } = useAuth();
  const adminHost = window.location.hostname === ADMIN_HOST;

  if (loading || (adminHost && user && !profileReady)) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#05020a] text-white">
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300" />
          <span className="text-sm text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  if (user) {
    if (adminHost) {
      if (profile?.role === "admin" || profile?.role === "staff") {
        return <Navigate to="/admin" replace />;
      }

      return (
        <div className="grid min-h-screen place-items-center bg-[#05020a] px-5 text-white">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-2xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-200">Admin Portal</p>
            <h1 className="mt-3 text-2xl font-black">Admin access required</h1>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Your account is authenticated, but it does not have administrator or staff access.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a href="https://cyphertech.co.zw/" className="btn btn-secondary">
                Back to website
              </a>
              <button type="button" onClick={signOut} className="btn btn-primary">
                Sign out
              </button>
            </div>
          </div>
        </div>
      );
    }

    return <Navigate to="/client" replace />;
  }

  return children;
}
