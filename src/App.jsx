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
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminTicketDetail from "./pages/admin/AdminTicketDetail";

const ADMIN_HOST = "admin.cyphertech.co.zw";
function isAdminHost(){return window.location.hostname===ADMIN_HOST}
function PublicAdminRedirect(){window.location.replace(`https://${ADMIN_HOST}/`);return null}
export default function App(){const adminHost=isAdminHost();if(adminHost)return <Routes><Route path="/" element={<Navigate to="/admin" replace/>}/><Route path="/login" element={<GuestRoute><Login/></GuestRoute>}/><Route path="/admin" element={<AdminRoute><AdminLayout/></AdminRoute>}><Route index element={<AdminDashboard/>}/><Route path="tickets" element={<AdminTickets/>}/><Route path="tickets/:ticketId" element={<AdminTicketDetail/>}/></Route><Route path="*" element={<Navigate to="/login" replace/>}/></Routes>;return <Routes><Route path="/" element={<HomePage/>}/><Route path="/login" element={<GuestRoute><Login/></GuestRoute>}/><Route path="/register" element={<GuestRoute><Register/></GuestRoute>}/><Route path="/client" element={<ProtectedRoute><ClientLayout/></ProtectedRoute>}><Route index element={<ClientDashboard/>}/><Route path="projects" element={<ClientProjects/>}/><Route path="projects/:projectId" element={<ClientProjectDetail/>}/><Route path="tickets" element={<ClientTickets/>}/><Route path="tickets/new" element={<ClientTicketNew/>}/><Route path="tickets/:ticketId" element={<ClientTicketDetail/>}/><Route path="messages" element={<ClientMessages/>}/><Route path="notifications" element={<ClientNotifications/>}/><Route path="files" element={<ClientFiles/>}/><Route path="profile" element={<ClientProfile/>}/></Route><Route path="/admin/*" element={<PublicAdminRedirect/>}/><Route path="*" element={<HomePage/>}/></Routes>}
