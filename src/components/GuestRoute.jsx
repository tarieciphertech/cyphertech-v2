import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

/**
 * GuestRoute — wraps public-only routes (/login, /register).
 * - While the session is being restored, shows a loading state.
 * - If already authenticated, redirects to /client (avoids redirect loops).
 */
export default function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
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
    return <Navigate to="/client" replace />;
  }

  return children;
}