import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import ClientLayout from "./pages/client/ClientLayout";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientProfile from "./pages/client/ClientProfile";
import ClientProjects from "./pages/client/ClientProjects";
import ClientTickets from "./pages/client/ClientTickets";
import ClientTicketNew from "./pages/client/ClientTicketNew";
import ClientTicketDetail from "./pages/client/ClientTicketDetail";
import ClientNotifications from "./pages/client/ClientNotifications";
import ClientFiles from "./pages/client/ClientFiles";
import ClientMessages from "./pages/client/ClientMessages";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminTicketDetail from "./pages/admin/AdminTicketDetail";

/**
 * App — route table for the Cypher Technologies site.
 *
 * Public marketing site stays at "/" (anchor navigation preserved).
 * Authentication lives at /login and /register (guest-only routes that
 * redirect authenticated users to /client).
 * The client area (/client, /client/projects, /client/tickets,
 * /client/tickets/:ticketId, /client/messages, /client/notifications,
 * /client/files, /client/profile) is protected: unauthenticated users are
 * redirected to /login.
 *
 * The admin area (/admin, /admin/tickets, /admin/tickets/:ticketId) is
 * role-gated: only DB-verified admin/staff users may enter; everyone else is
 * redirected. Additional /admin/* module routes are added in their own stages
 * as real functionality is built.
 */
export default function App() {
  return (
    <Routes>
      {/* Public marketing homepage — unchanged */}
      <Route path="/" element={<HomePage />} />

      {/* Auth pages — only visible when logged out */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      {/* Protected client area */}
      <Route
        path="/client"
        element={
          <ProtectedRoute>
            <ClientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ClientDashboard />} />
        <Route path="projects" element={<ClientProjects />} />
        <Route path="tickets" element={<ClientTickets />} />
        <Route path="tickets/new" element={<ClientTicketNew />} />
        <Route path="tickets/:ticketId" element={<ClientTicketDetail />} />
        <Route path="messages" element={<ClientMessages />} />
        <Route path="notifications" element={<ClientNotifications />} />
        <Route path="files" element={<ClientFiles />} />
        <Route path="profile" element={<ClientProfile />} />
      </Route>

      {/* Protected admin area — role-gated (admin/staff only, DB-verified).
          Only implemented modules get routes; /admin/users etc. are added
          in their own stages when real functionality exists. */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="tickets" element={<AdminTickets />} />
        <Route path="tickets/:ticketId" element={<AdminTicketDetail />} />
      </Route>

      {/* Unknown paths fall back to the homepage (SPA 404 via copy-404.mjs) */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}