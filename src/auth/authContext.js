import { createContext } from "react";

// Shared context object for authentication state.
// Kept in its own file so AuthProvider.jsx and useAuth.js avoid
// mixed component/non-component exports (react-refresh compliance).
export const AuthContext = createContext(null);