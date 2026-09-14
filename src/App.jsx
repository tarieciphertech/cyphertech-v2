import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import ClientLayout from "./pages/client/ClientLayout";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientProfile from "./pages/client/ClientProfile";
import ClientProjects from "./pages/client/ClientProjects";
import ClientProjectDetail from "./pages/client/ClientProjectDetail";
import ClientTickets from "./pages/client/ClientTickets";
import ClientTicketNew from "./pages/client/ClientTicketNew";
import ClientTicketDetail from "./pages/client/ClientTicketDetail";
import ClientNotifications from "./pages/client/ClientNotifications";
import ClientFiles from "./pages/client/ClientFiles";
import ClientMessages from "./pages/client/ClientMessages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
      <Route path="/client" element={<ProtectedRoute><ClientLayout /></ProtectedRoute>}>
        <Route index element={<ClientDashboard />} />
        <Route path="projects" element={<ClientProjects />} />
        <Route path="projects/:projectId" element={<ClientProjectDetail />} />
        <Route path="tickets" element={<ClientTickets />} />
        <Route path="tickets/new" element={<ClientTicketNew />} />
        <Route path="tickets/:ticketId" element={<ClientTicketDetail />} />
        <Route path="messages" element={<ClientMessages />} />
        <Route path="notifications" element={<ClientNotifications />} />
        <Route path="files" element={<ClientFiles />} />
        <Route path="profile" element={<ClientProfile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
