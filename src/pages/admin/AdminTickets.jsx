import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeadset, FaPlus, FaSearch } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../auth/useAuth";
import {
  TICKET_PRIORITY_LABELS,
  TICKET_PRIORITY_STYLES,
  TICKET_STATUS_LABELS,
  TICKET_STATUS_STYLES,
  formatDateTime,
} from "../client/ticketBadges";

// Filter values use the actual database enum (tickets_status_check):
// open | in_progress | waiting | resolved | closed
const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "waiting", label: "Waiting" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

/**
 * AdminTickets — staff/admin view of ALL support tickets.
 *
 * SECURITY:
 *  - The list is returned by RLS (tickets_select_participant includes
 *    is_staff_or_admin()); no client-side ownership check is used as
 *    authorization.
 *  - Client/assignee names come from a single profiles query, which staff/
 *    admin may read via profiles_select_staff_admin. Only id/full_name/role
 *    are selected — no unnecessary profile fields.
 */
export default function AdminTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [profileNames, setProfileNames] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTickets() {
      if (!supabase || !user) {
        setLoading(false);
        return;
      }

      const { data, queryError } = await supabase
        .from("tickets")
        .select("id, subject, status, priority, client_id, assignee_id, created_at, updated_at")
        .order("updated_at", { ascending: false });

      if (!active) return;

      if (queryError) {
        console.error("Failed to load tickets:", queryError.message);
        setError("We could not load tickets right now.");
        setTickets([]);
        setLoading(false);
        return;
      }

      const loaded = data || [];
      setTickets(loaded);

      // One profiles query for all referenced client/assignee ids (no N+1).
      const profileIds = [
        ...new Set(loaded.flatMap((t) => [t.client_id, t.assignee_id].filter(Boolean))),
      ];
      if (profileIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, full_name, role")
          .in("id", profileIds);

        if (!active) return;

        const names = new Map();
        for (const profile of profiles || []) {
          names.set(profile.id, profile.full_name || "Unnamed user");
        }
        setProfileNames(names);
      }

      setLoading(false);
    }

    loadTickets();

    return () => {
      active = false;
    };
  }, [user]);

  const filtered = useMemo(() => {
    const searchLower = search.trim().toLowerCase();
    return tickets.filter((ticket) => {
      if (statusFilter === "unassigned") {
        if (ticket.assignee_id) return false;
      } else if (statusFilter === "high_priority") {
        if (ticket.priority !== "high" && ticket.priority !== "urgent") return false;
      } else if (statusFilter !== "all" && ticket.status !== statusFilter) {
        return false;
      }

      if (searchLower) {
        const clientName = (profileNames.get(ticket.client_id) || "").toLowerCase();
        const subject = (ticket.subject || "").toLowerCase();
        if (!subject.includes(searchLower) && !clientName.includes(searchLower)) {
          return false;
        }
      }
      return true;
    });
  }, [tickets, statusFilter, search, profileNames]);

  if (loading) {
    return (
      <div className="grid place-items-center py-24 text-white">
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-amber-300/30 border-t-amber-300" />
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
            {filtered.length} of {tickets.length} {tickets.length === 1 ? "ticket" : "tickets"}
          </p>
        </div>
        <Link to="/client/tickets/new" className="btn btn-primary shrink-0">
          <FaPlus className="mr-2" />
          New Ticket
        </Link>
      </div>

      {/* Filters + search */}
      <div className="card rounded-3xl p-4">
        <div className="grid gap-3">
          <label className="field-label">
            Search
            <span className="relative block">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="field-input !pl-11"
                placeholder="Search by subject or client name..."
                aria-label="Search tickets by subject or client name"
              />
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setStatusFilter(value)}
                aria-pressed={statusFilter === value}
                className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                  statusFilter === value
                    ? "bg-amber-300/15 text-amber-200"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setStatusFilter("high_priority")}
              aria-pressed={statusFilter === "high_priority"}
              className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                statusFilter === "high_priority"
                  ? "bg-amber-300/15 text-amber-200"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              High Priority
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("unassigned")}
              aria-pressed={statusFilter === "unassigned"}
              className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                statusFilter === "unassigned"
                  ? "bg-amber-300/15 text-amber-200"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              Unassigned
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card rounded-3xl p-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-amber-300/10 text-amber-200">
            <FaHeadset className="text-2xl" />
          </span>
          <h2 className="mt-4 text-xl font-black text-white">No tickets match</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
            {tickets.length === 0
              ? "No support tickets have been created yet."
              : "Try a different filter or search term."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((ticket) => (
            <Link
              key={ticket.id}
              to={`/admin/tickets/${ticket.id}`}
              className="card block rounded-3xl p-5 transition hover:-translate-y-0.5"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-black text-white">{ticket.subject}</h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Client: {profileNames.get(ticket.client_id) || "Unknown"} · Assigned to:{" "}
                    {ticket.assignee_id
                      ? profileNames.get(ticket.assignee_id) || "Unknown"
                      : "Unassigned"}
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Created {formatDateTime(ticket.created_at)} · Updated{" "}
                    {formatDateTime(ticket.updated_at)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
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