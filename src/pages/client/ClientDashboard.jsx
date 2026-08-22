import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaBriefcase, FaEnvelope, FaFolder, FaHeadset, FaPaperPlane } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../auth/useAuth";

/**
 * ClientDashboard — minimal authenticated landing page.
 * No fake data. Future modules are clearly marked as "Soon".
 */
export default function ClientDashboard() {
  const { user, profile } = useAuth();
  const [projectCount, setProjectCount] = useState(null);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState(null);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(null);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [fileCount, setFileCount] = useState(null);
  const [filesLoading, setFilesLoading] = useState(true);
  const [conversationCount, setConversationCount] = useState(null);
  const [messagesLoading, setMessagesLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProjectCount() {
      if (!supabase || !user) {
        setProjectsLoading(false);
        return;
      }

      const { count, error } = await supabase
        .from("projects")
        .select("id", { count: "exact", head: true });

      if (!active) return;

      if (!error) {
        setProjectCount(count ?? 0);
      }
      setProjectsLoading(false);
    }

    loadProjectCount();

    async function loadTicketCount() {
      if (!supabase || !user) {
        setTicketsLoading(false);
        return;
      }

      const { count, error } = await supabase
        .from("tickets")
        .select("id", { count: "exact", head: true });

      if (!active) return;

      if (!error) {
        setTicketCount(count ?? 0);
      }
      setTicketsLoading(false);
    }

    loadTicketCount();

    async function loadUnreadCount() {
      if (!supabase || !user) {
        setNotificationsLoading(false);
        return;
      }

      const { count, error } = await supabase
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .is("read_at", null);

      if (!active) return;

      if (!error) {
        setUnreadCount(count ?? 0);
      }
      setNotificationsLoading(false);
    }

    loadUnreadCount();

    async function loadFileCount() {
      if (!supabase || !user) {
        setFilesLoading(false);
        return;
      }

      const { count, error } = await supabase
        .from("files")
        .select("id", { count: "exact", head: true });

      if (!active) return;

      if (!error) {
        setFileCount(count ?? 0);
      }
      setFilesLoading(false);
    }

    loadFileCount();

    async function loadConversationCount() {
      if (!supabase || !user) {
        setMessagesLoading(false);
        return;
      }

      // Conversations are tickets (RLS-scoped) that contain at least one
      // message. Two-step: accessible ticket IDs, then their message rows.
      const { data: tickets, error: ticketsError } = await supabase
        .from("tickets")
        .select("id");

      if (!active) return;

      if (ticketsError || !tickets || tickets.length === 0) {
        if (!ticketsError) setConversationCount(0);
        setMessagesLoading(false);
        return;
      }

      const ticketIds = tickets.map((ticket) => ticket.id);
      const { data: messages, error: messagesError } = await supabase
        .from("ticket_messages")
        .select("ticket_id")
        .in("ticket_id", ticketIds);

      if (!active) return;

      if (!messagesError && messages) {
        setConversationCount(new Set(messages.map((message) => message.ticket_id)).size);
      }
      setMessagesLoading(false);
    }

    loadConversationCount();

    return () => {
      active = false;
    };
  }, [user]);

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "there";
  const initial = (profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "C").toUpperCase();
  const isStaffOrAdmin = profile?.role === "staff" || profile?.role === "admin";

  const summaryItems = [
    { label: "Account status", value: "Active" },
    { label: "Email", value: user?.email || "—" },
    { label: "Company", value: profile?.company || "—" },
    { label: "Phone", value: profile?.phone || "—" },
    { label: "Role", value: profile?.role || "client" },
  ];

  const futureCards = [];

  const messageSummary =
    messagesLoading
      ? "Loading..."
      : conversationCount === null
        ? "Message summary unavailable right now."
        : conversationCount === 0
          ? "You don't have any conversations yet."
          : conversationCount === 1
            ? "You have 1 conversation."
            : `You have ${conversationCount} conversations.`;

  const fileSummary =
    filesLoading
      ? "Loading..."
      : fileCount === null
        ? "File summary unavailable right now."
        : fileCount === 0
          ? "You don't have any files yet."
          : fileCount === 1
            ? "You have 1 file."
            : `You have ${fileCount} files.`;

  const ticketSummary =
    ticketsLoading
      ? "Loading..."
      : ticketCount === null
        ? "Ticket summary unavailable right now."
        : ticketCount === 0
          ? "You don't have any support tickets yet."
          : ticketCount === 1
            ? "You have 1 support ticket."
            : `You have ${ticketCount} support tickets.`;

  const notificationSummary =
    notificationsLoading
      ? "Loading..."
      : unreadCount === null
        ? "Notification summary unavailable right now."
        : unreadCount === 0
          ? "You don't have any unread notifications."
          : unreadCount === 1
            ? "You have 1 unread notification."
            : `You have ${unreadCount} unread notifications.`;

  return (
    <div className="grid gap-6">
      {/* Welcome */}
      <div className="card rounded-3xl p-6 md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 text-2xl font-black text-cyan-200">
            {initial}
          </span>
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-wide text-gray-500">Client Portal</p>
            <h1 className="mt-1 text-2xl font-black text-white">Welcome, {displayName}</h1>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Your account is active. The full portal is rolling out in stages — here is a snapshot of your
              profile and what is coming next.
            </p>
          </div>
          {isStaffOrAdmin && (
            <span className="shrink-0 rounded-full bg-amber-300/10 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-amber-200">
              Staff access
            </span>
          )}
        </div>
      </div>

      {/* Projects summary */}
      <div className="card rounded-3xl p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
              <FaBriefcase className="text-xl" />
            </span>
            <div>
              <h2 className="text-lg font-black text-white">Projects</h2>
              <p className="mt-0.5 text-sm text-gray-400">
                {projectsLoading
                  ? "Loading..."
                  : projectCount === null
                    ? "Project summary unavailable right now."
                    : projectCount === 0
                      ? "You don't have any projects yet."
                      : `You have ${projectCount} ${projectCount === 1 ? "project" : "projects"}.`}
              </p>
            </div>
          </div>
          <Link to="/client/projects" className="btn btn-primary shrink-0">
            View Projects
          </Link>
        </div>
      </div>

      {/* Tickets summary */}
      <div className="card rounded-3xl p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
              <FaHeadset className="text-xl" />
            </span>
            <div>
              <h2 className="text-lg font-black text-white">Support tickets</h2>
              <p className="mt-0.5 text-sm text-gray-400">{ticketSummary}</p>
            </div>
          </div>
          <Link to="/client/tickets" className="btn btn-primary shrink-0">
            View Tickets
          </Link>
        </div>
      </div>

      {/* Notifications summary */}
      <div className="card rounded-3xl p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
              <FaBell className="text-xl" />
            </span>
            <div>
              <h2 className="text-lg font-black text-white">Notifications</h2>
              <p className="mt-0.5 text-sm text-gray-400">{notificationSummary}</p>
            </div>
          </div>
          <Link to="/client/notifications" className="btn btn-primary shrink-0">
            View Notifications
          </Link>
        </div>
      </div>

      {/* Files summary */}
      <div className="card rounded-3xl p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
              <FaFolder className="text-xl" />
            </span>
            <div>
              <h2 className="text-lg font-black text-white">Files</h2>
              <p className="mt-0.5 text-sm text-gray-400">{fileSummary}</p>
            </div>
          </div>
          <Link to="/client/files" className="btn btn-primary shrink-0">
            View Files
          </Link>
        </div>
      </div>

      {/* Messages summary */}
      <div className="card rounded-3xl p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
              <FaPaperPlane className="text-xl" />
            </span>
            <div>
              <h2 className="text-lg font-black text-white">Messages</h2>
              <p className="mt-0.5 text-sm text-gray-400">{messageSummary}</p>
            </div>
          </div>
          <Link to="/client/messages" className="btn btn-primary shrink-0">
            View Messages
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* Profile summary */}
        <div className="card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-white">Profile summary</h2>
            <Link to="/client/profile" className="text-sm font-bold text-cyan-300 hover:text-cyan-200">
              Edit
            </Link>
          </div>
          <dl className="mt-5 grid gap-3">
            {summaryItems.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3"
              >
                <dt className="text-xs font-black uppercase tracking-wide text-gray-500">{label}</dt>
                <dd className="truncate text-sm font-bold text-gray-100">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Coming modules */}
        <div className="grid gap-4">
          {futureCards.length > 0 && (
            <div className="card rounded-3xl p-6">
              <h2 className="text-lg font-black text-white">What's next</h2>
              <p className="mt-1 text-sm text-gray-400">
                These modules are being prepared and will appear here soon.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {futureCards.map(({ label, icon: Icon, copy }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 opacity-70"
                    title="Available in an upcoming release"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">
                      <Icon className="text-base" />
                    </span>
                    <p className="mt-3 flex items-center gap-2 text-sm font-black text-white">
                      {label}
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                        Soon
                      </span>
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">
              <FaEnvelope />
            </span>
            <p className="text-sm text-gray-300">
              Need something now?{" "}
              <a href="mailto:support@cyphertech.co.zw" className="font-bold text-cyan-300 hover:text-cyan-200">
                Email our team
              </a>{" "}
              or use the public contact form on our{" "}
              <Link to="/" className="font-bold text-cyan-300 hover:text-cyan-200">
                homepage
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}