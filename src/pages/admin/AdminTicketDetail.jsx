import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHeadset, FaPaperPlane, FaSave } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../auth/useAuth";
import { formatDateTime } from "../client/ticketBadges";

// Values match the database CHECK constraints exactly.
const STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "waiting", label: "Waiting" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

/**
 * AdminTicketDetail — staff/admin view of one ticket with management controls.
 *
 * SECURITY / AUTHORIZATION (all verified against migration SQL):
 *  - Ticket fetched by id ONLY; visibility via tickets_select_participant
 *    (includes is_staff_or_admin()). Hidden ticket → friendly not-found.
 *  - Messages via ticket_messages_select_authorized (can_access_ticket).
 *  - Reply insert includes author_id = user.id + ticket_id — required by
 *    ticket_messages_insert_own WITH CHECK; impersonation rejected by RLS.
 *  - Status/priority updates are permitted to participants by
 *    tickets_update_participant; no trigger restricts these columns.
 *  - Assignee changes are permitted for staff/admin by
 *    prevent_ticket_ownership_change (the trigger blocks them only for
 *    non-staff). Eligible assignees come from a profiles query authorized by
 *    profiles_select_staff_admin, filtered to role staff/admin client-side
 *    (narrowing an already-authorized read — not authorization itself).
 */
export default function AdminTicketDetail() {
  const { ticketId } = useParams();
  const { user } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [clientName, setClientName] = useState("Unknown");
  const [staffOptions, setStaffOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState("");

  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [replyError, setReplyError] = useState("");

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState(null);

  const loadMessages = useCallback(
    async (active) => {
      if (!supabase || !ticketId) return;
      const { data, error: messagesError } = await supabase
        .from("ticket_messages")
        .select("id, author_id, body, created_at")
        .eq("ticket_id", ticketId)
        .order("created_at", { ascending: true });

      if (!active) return;
      if (messagesError) {
        console.error("Failed to load messages:", messagesError.message);
        return;
      }
      setMessages(data || []);
    },
    [ticketId],
  );

  useEffect(() => {
    let active = true;

    async function loadTicket() {
      if (!supabase || !ticketId || !user) {
        setLoading(false);
        return;
      }

      const { data, error: ticketError } = await supabase
        .from("tickets")
        .select("id, subject, status, priority, client_id, assignee_id, created_at, updated_at")
        .eq("id", ticketId)
        .maybeSingle();

      if (!active) return;

      if (ticketError) {
        console.error("Failed to load ticket:", ticketError.message);
        setLoadError("We could not load this ticket right now.");
        setLoading(false);
        return;
      }

      if (!data) {
        // RLS hid the row or it does not exist.
        setNotFound(true);
        setLoading(false);
        return;
      }

      setTicket(data);
      setStatus(data.status);
      setPriority(data.priority);
      setAssigneeId(data.assignee_id || "");

      // One profiles query for the client name + eligible assignees.
      const { data: profiles } = await supabase.from("profiles").select("id, full_name, role");
      if (!active) return;

      const profileMap = new Map();
      const staff = [];
      for (const profile of profiles || []) {
        profileMap.set(profile.id, profile.full_name || "Unnamed user");
        if (profile.role === "admin" || profile.role === "staff") {
          staff.push(profile);
        }
      }
      setClientName(profileMap.get(data.client_id) || "Unknown");
      setStaffOptions(staff);

      await loadMessages(active);
      setLoading(false);
    }

    loadTicket();

    return () => {
      active = false;
    };
  }, [ticketId, user, loadMessages]);

  async function handleReply(event) {
    event.preventDefault();
    setReplyError("");

    const trimmedBody = reply.trim();
    if (!supabase || !user || !ticketId) {
      setReplyError("Replies are unavailable right now.");
      return;
    }
    if (!trimmedBody) {
      setReplyError("Please enter a message before sending.");
      return;
    }

    setSending(true);
    const { insertError } = await supabase.from("ticket_messages").insert({
      ticket_id: ticketId,
      author_id: user.id,
      body: trimmedBody,
    });
    setSending(false);

    if (insertError) {
      console.error("Failed to send reply:", insertError.message);
      setReplyError("We could not send your message right now. Please try again.");
      return;
    }

    setReply("");
    let active = true;
    await loadMessages(active);
  }

  async function handleSaveSettings(event) {
    event.preventDefault();
    setSettingsStatus(null);

    if (!supabase || !ticket) return;

    setSavingSettings(true);
    const { error: updateError } = await supabase
      .from("tickets")
      .update({
        status,
        priority,
        assignee_id: assigneeId || null,
      })
      .eq("id", ticket.id);
    setSavingSettings(false);

    if (updateError) {
      console.error("Failed to update ticket:", updateError.message);
      setSettingsStatus({ type: "error", message: "Could not save ticket settings. Please try again." });
      return;
    }

    setTicket((current) => ({ ...current, status, priority, assignee_id: assigneeId || null }));
    setSettingsStatus({ type: "success", message: "Ticket updated." });
  }

  if (loading) {
    return (
      <div className="grid place-items-center py-24 text-white">
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-amber-300/30 border-t-amber-300" />
          <span className="text-sm text-gray-400">Loading ticket...</span>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="card rounded-3xl p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-amber-300/10 text-amber-200">
          <FaHeadset className="text-2xl" />
        </span>
        <h2 className="mt-4 text-xl font-black text-white">Ticket not found or you don't have access to it.</h2>
        <Link to="/admin/tickets" className="btn btn-primary mt-6">
          Back to tickets
        </Link>
      </div>
    );
  }

  if (loadError || !ticket) {
    return (
      <div className="card rounded-3xl p-8 text-center">
        <p role="alert" className="text-sm font-semibold text-rose-200">
          {loadError || "We could not load this ticket right now."}
        </p>
        <Link to="/admin/tickets" className="btn btn-secondary mt-6">
          Back to tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div>
        <Link to="/admin/tickets" className="text-sm font-bold text-amber-300 hover:text-amber-200">
          ← Back to tickets
        </Link>
      </div>

      {/* Ticket header */}
      <div className="card rounded-3xl p-6 md:p-8">
        <h1 className="text-2xl font-black text-white">{ticket.subject}</h1>
        <p className="mt-2 text-xs text-gray-500">
          Client: {clientName} · Created {formatDateTime(ticket.created_at)} · Updated{" "}
          {formatDateTime(ticket.updated_at)}
        </p>
      </div>

      {/* Management controls */}
      <form onSubmit={handleSaveSettings} className="card rounded-3xl p-6">
        <h2 className="text-lg font-black text-white">Manage ticket</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <label className="field-label">
            Status
            <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} className="field-input">
              {STATUS_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="field-label">
            Priority
            <select name="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="field-input">
              {PRIORITY_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="field-label">
            Assigned to
            <select name="assignee" value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)} className="field-input">
              <option value="">Unassigned</option>
              {staffOptions.map(({ id, full_name, role }) => (
                <option key={id} value={id}>
                  {full_name} ({role})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button type="submit" disabled={savingSettings} className="btn btn-primary">
            <FaSave className="mr-2" />
            {savingSettings ? "Saving..." : "Save Changes"}
          </button>
          {settingsStatus && (
            <p
              role={settingsStatus.type === "error" ? "alert" : "status"}
              className={
                settingsStatus.type === "error"
                  ? "rounded-xl border border-rose-300/30 bg-rose-300/10 px-4 py-2 text-sm font-semibold text-rose-200"
                  : "rounded-xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200"
              }
            >
              {settingsStatus.message}
            </p>
          )}
        </div>
      </form>

      {/* Conversation */}
      <div className="card rounded-3xl p-6 md:p-8">
        <h2 className="text-lg font-black text-white">Conversation</h2>

        {messages.length === 0 ? (
          <p className="mt-4 text-sm text-gray-400">No messages yet.</p>
        ) : (
          <div className="mt-5 grid gap-4">
            {messages.map((message) => {
              const isOwn = message.author_id === user?.id;
              return (
                <div
                  key={message.id}
                  className={`rounded-2xl border p-4 ${
                    isOwn ? "border-amber-300/20 bg-amber-300/5" : "border-white/10 bg-white/[0.045]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-black uppercase tracking-wide text-gray-400">
                      {isOwn ? "You" : "Client"}
                    </span>
                    <span className="text-xs text-gray-500">{formatDateTime(message.created_at)}</span>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-200">{message.body}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Reply form */}
        <form onSubmit={handleReply} className="mt-6 grid gap-3 border-t border-white/10 pt-6">
          <label className="field-label">
            Add a reply
            <textarea
              name="reply"
              rows={4}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="field-input resize-none"
              placeholder="Respond to the client..."
              required
            />
          </label>

          {replyError && (
            <p role="alert" className="rounded-xl border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm font-semibold text-rose-200">
              {replyError}
            </p>
          )}

          <div>
            <button type="submit" disabled={sending} className="btn btn-primary">
              <FaPaperPlane className="mr-2" />
              {sending ? "Sending..." : "Send Reply"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}