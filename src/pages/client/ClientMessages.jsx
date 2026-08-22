import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeadset, FaPaperPlane, FaPlus } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../auth/useAuth";
import {
  TICKET_PRIORITY_LABELS,
  TICKET_PRIORITY_STYLES,
  TICKET_STATUS_LABELS,
  TICKET_STATUS_STYLES,
  formatDateTime,
} from "./ticketBadges";

const PREVIEW_LENGTH = 140;

function truncatePreview(text) {
  if (text.length <= PREVIEW_LENGTH) return text;
  return `${text.slice(0, PREVIEW_LENGTH).trimEnd()}…`;
}

/**
 * ClientMessages — a client-facing view of support-ticket conversations.
 *
 * This is NOT an independent messaging system: conversations ARE tickets,
 * and each card links to the existing /client/tickets/:ticketId detail page
 * (ClientTicketDetail.jsx) which already renders the full thread + reply.
 *
 * SECURITY:
 *  - Step 1 fetches tickets through RLS (tickets_select_participant) — the
 *    database decides which tickets the caller can see. No manual
 *    .eq("client_id", user.id) ownership filter is added.
 *  - Step 2 fetches ticket_messages ONLY for ticket IDs already returned by
 *    the RLS-protected tickets query (ticket_messages_select_authorized
 *    re-checks access per row). We never query messages first and infer
 *    ownership client-side.
 *  - Message bodies are plain text, rendered as React text — never HTML.
 */
export default function ClientMessages() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadConversations() {
      if (!supabase || !user) {
        setLoading(false);
        return;
      }

      // Step 1: accessible tickets via RLS.
      const { data: tickets, error: ticketsError } = await supabase
        .from("tickets")
        .select("id, subject, status, priority, created_at, updated_at")
        .order("updated_at", { ascending: false });

      if (!active) return;

      if (ticketsError) {
        console.error("Failed to load conversations:", ticketsError.message);
        setError("We could not load your messages right now.");
        setLoading(false);
        return;
      }

      const accessibleTickets = tickets || [];
      if (accessibleTickets.length === 0) {
        setConversations([]);
        setLoading(false);
        return;
      }

      // Step 2: messages for accessible ticket IDs only (RLS re-checks each row).
      const ticketIds = accessibleTickets.map((ticket) => ticket.id);
      const { data: messages, error: messagesError } = await supabase
        .from("ticket_messages")
        .select("id, ticket_id, body, created_at")
        .in("ticket_id", ticketIds)
        .order("created_at", { ascending: true });

      if (!active) return;

      if (messagesError) {
        console.error("Failed to load messages:", messagesError.message);
        setError("We could not load your messages right now.");
        setLoading(false);
        return;
      }

      // Group messages by ticket and derive latest message + count.
      const messagesByTicket = new Map();
      for (const message of messages || []) {
        const list = messagesByTicket.get(message.ticket_id);
        if (list) {
          list.push(message);
        } else {
          messagesByTicket.set(message.ticket_id, [message]);
        }
      }

      const conversations = accessibleTickets.map((ticket) => {
        const ticketMessages = messagesByTicket.get(ticket.id) || [];
        const latest = ticketMessages.length > 0 ? ticketMessages[ticketMessages.length - 1] : null;
        return {
          ...ticket,
          messageCount: ticketMessages.length,
          latestPreview: latest ? truncatePreview(latest.body) : null,
          latestAt: latest ? latest.created_at : null,
        };
      });

      setConversations(conversations);
      setLoading(false);
    }

    loadConversations();

    return () => {
      active = false;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="grid place-items-center py-24 text-white">
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300" />
          <span className="text-sm text-gray-400">Loading messages...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card rounded-3xl p-8 text-center">
        <p role="alert" className="text-sm font-semibold text-rose-200">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Messages</h1>
          <p className="mt-1 text-sm text-gray-400">Your conversations with the Cypher Technologies team.</p>
        </div>
        <Link to="/client/tickets/new" className="btn btn-primary shrink-0">
          <FaPlus className="mr-2" />
          New Ticket
        </Link>
      </div>

      {conversations.length === 0 ? (
        <div className="card rounded-3xl p-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
            <FaPaperPlane className="text-2xl" />
          </span>
          <h2 className="mt-4 text-xl font-black text-white">No conversations yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
            Messages from your support tickets will appear here.
          </p>
          <Link to="/client/tickets/new" className="btn btn-primary mt-6">
            <FaPlus className="mr-2" />
            Create a support ticket to start a conversation
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              to={`/client/tickets/${conversation.id}`}
              className="card block rounded-3xl p-5 transition hover:-translate-y-0.5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-black text-white">{conversation.subject}</h2>
                  <p className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                    <FaPaperPlane className="shrink-0 text-gray-600" />
                    <span className="truncate">
                      {conversation.latestPreview || "No messages yet."}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {conversation.latestAt
                      ? `Last message ${formatDateTime(conversation.latestAt)}`
                      : `Ticket created ${formatDateTime(conversation.created_at)}`}
                    {" · "}
                    {conversation.messageCount} {conversation.messageCount === 1 ? "message" : "messages"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${
                      TICKET_STATUS_STYLES[conversation.status] || TICKET_STATUS_STYLES.open
                    }`}
                  >
                    {TICKET_STATUS_LABELS[conversation.status] || conversation.status}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${
                      TICKET_PRIORITY_STYLES[conversation.priority] || TICKET_PRIORITY_STYLES.normal
                    }`}
                  >
                    {TICKET_PRIORITY_LABELS[conversation.priority] || conversation.priority}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">
          <FaHeadset />
        </span>
        <p className="text-sm text-gray-300">
          Conversations live inside your support tickets. Open one to read the full thread and reply.
        </p>
      </div>
    </div>
  );
}