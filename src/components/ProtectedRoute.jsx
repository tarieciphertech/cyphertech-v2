import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

/**
 * ProtectedRoute — wraps routes that require an authenticated user.
 * - While the session is being restored, shows a loading state (no redirect).
 * - If unauthenticated, redirects to /login and remembers the attempted path
 *   so the user can be returned there after signing in.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#05020a] text-white">
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300" />
          <span className="text-sm text-gray-400">Loading your account...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}