import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHeadset, FaPaperPlane } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../auth/useAuth";
import {
  TICKET_PRIORITY_LABELS,
  TICKET_PRIORITY_STYLES,
  TICKET_STATUS_LABELS,
  TICKET_STATUS_STYLES,
  formatDateTime,
} from "./ticketBadges";

/**
 * ClientTicketDetail — view a single ticket and its message thread.
 *
 * Security:
 *  - The ticket is fetched by id ONLY; visibility is decided entirely by RLS
 *    (tickets_select_participant). We deliberately do NOT add
 *    .eq("client_id", user.id) as a security mechanism.
 *  - If RLS hides the ticket, the query returns no row and we show a friendly
 *    "not found / no access" message.
 *  - Messages are fetched via ticket_messages_select_authorized (RLS).
 *  - The reply insert includes ticket_id (from the protected route param) and
 *    author_id = user.id because ticket_messages_insert_own uses WITH CHECK
 *    (author_id = auth.uid() AND can_access_ticket(ticket_id)) and no default
 *    sets those columns. RLS rejects any other author or inaccessible ticket.
 */
export default function ClientTicketDetail() {
  const { ticketId } = useParams();
  const { user } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState("");

  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [replyError, setReplyError] = useState("");

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
        .select("id, subject, status, priority, created_at, updated_at")
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
        // RLS hid the row (not yours) or it does not exist.
        setNotFound(true);
        setLoading(false);
        return;
      }

      setTicket(data);
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
      ticket_id: ticketId, // from the protected route param — never user input beyond the URL
      author_id: user.id, // required by RLS WITH CHECK; must equal auth.uid()
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

  if (loading) {
    return (
      <div className="grid place-items-center py-24 text-white">
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300" />
          <span className="text-sm text-gray-400">Loading ticket...</span>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="card rounded-3xl p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
          <FaHeadset className="text-2xl" />
        </span>
        <h2 className="mt-4 text-xl font-black text-white">Ticket not found or you don't have access to it.</h2>
        <Link to="/client/tickets" className="btn btn-primary mt-6">
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
        <Link to="/client/tickets" className="btn btn-secondary mt-6">
          Back to tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div>
        <Link to="/client/tickets" className="text-sm font-bold text-cyan-300 hover:text-cyan-200">
          ← Back to tickets
        </Link>
      </div>

      {/* Ticket header */}
      <div className="card rounded-3xl p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-black text-white">{ticket.subject}</h1>
            <p className="mt-2 text-xs text-gray-500">
              Created {formatDateTime(ticket.created_at)} · Updated {formatDateTime(ticket.updated_at)}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${
                TICKET_STATUS_STYLES[ticket.status] || TICKET_STATUS_STYLES.open
              }`}
            >
              {TICKET_STATUS_LABELS[ticket.status] || ticket.status}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${
                TICKET_PRIORITY_STYLES[ticket.priority] || TICKET_PRIORITY_STYLES.normal
              }`}
            >
              {TICKET_PRIORITY_LABELS[ticket.priority] || ticket.priority}
            </span>
          </div>
        </div>
      </div>

      {/* Conversation */}
      <div className="card rounded-3xl p-6 md:p-8">
        <h2 className="text-lg font-black text-white">Conversation</h2>

        {messages.length === 0 ? (
          <p className="mt-4 text-sm text-gray-400">
            No messages yet. Add details about your request below and our team will respond.
          </p>
        ) : (
          <div className="mt-5 grid gap-4">
            {messages.map((message) => {
              const isOwn = message.author_id === user?.id;
              return (
                <div
                  key={message.id}
                  className={`rounded-2xl border p-4 ${
                    isOwn ? "border-cyan-300/20 bg-cyan-300/5" : "border-white/10 bg-white/[0.045]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-black uppercase tracking-wide text-gray-400">
                      {isOwn ? "You" : "Support team"}
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
              placeholder="Add more detail or answer a question from our team..."
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