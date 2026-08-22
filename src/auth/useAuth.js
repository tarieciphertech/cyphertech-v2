import { useContext } from "react";
import { AuthContext } from "./authContext";

/**
 * useAuth — access the authentication state and actions from AuthProvider.
 * Must be used inside <AuthProvider>. Throws if used outside so wiring
 * errors surface during development rather than failing silently.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}