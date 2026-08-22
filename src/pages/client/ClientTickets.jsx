import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeadset, FaPlus } from "react-icons/fa";
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
 * ClientTickets — lists the authenticated client's support tickets.
 * Queries the existing `tickets` table via the shared supabase singleton.
 * Visibility is enforced entirely by RLS (tickets_select_participant);
 * we never filter by another user's id and never use service_role.
 */
export default function ClientTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTickets() {
      if (!supabase || !user) {
        setLoading(false);
        return;
      }

      const { data, queryError } = await supabase
        .from("tickets")
        .select("id, subject, status, priority, created_at, updated_at")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (queryError) {
        // Log for development diagnostics; show a friendly message only.
        console.error("Failed to load tickets:", queryError.message);
        setError("We could not load your tickets right now.");
        setTickets([]);
        setLoading(false);
        return;
      }

      setTickets(data || []);
      setLoading(false);
    }

    loadTickets();

    return () => {
      active = false;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="grid place-items-center py-24 text-white">
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300" />
          <span className="text-sm text-gray-400">Loading tickets...</span>
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
          <h1 className="text-2xl font-black text-white">Support tickets</h1>
          <p className="mt-1 text-sm text-gray-400">
            {tickets.length === 0
              ? "Track your support requests here."
              : `${tickets.length} ${tickets.length === 1 ? "ticket" : "tickets"}`}
          </p>
        </div>
        <Link to="/client/tickets/new" className="btn btn-primary shrink-0">
          <FaPlus className="mr-2" />
          New Ticket
        </Link>
      </div>

      {tickets.length === 0 ? (
        <div className="card rounded-3xl p-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
            <FaHeadset className="text-2xl" />
          </span>
          <h2 className="mt-4 text-xl font-black text-white">No support tickets yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
            When you submit a support request, it will appear here so you can track its progress and talk to
            our team.
          </p>
          <Link to="/client/tickets/new" className="btn btn-primary mt-6">
            <FaPlus className="mr-2" />
            Submit your first ticket
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <Link
              key={ticket.id}
              to={`/client/tickets/${ticket.id}`}
              className="card block rounded-3xl p-5 transition hover:-translate-y-0.5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-black text-white">{ticket.subject}</h2>
                  <p className="mt-1 text-xs text-gray-500">
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}