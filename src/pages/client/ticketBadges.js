/**
 * Shared badge styling for ticket status and priority values.
 * Values are taken verbatim from the database CHECK constraints:
 *   tickets_status_check   → open | in_progress | waiting | resolved | closed
 *   tickets_priority_check → low | normal | high | urgent
 */

export const TICKET_STATUS_STYLES = {
  open: "border-cyan-300/30 bg-cyan-300/10 text-cyan-200",
  in_progress: "border-indigo-300/30 bg-indigo-300/10 text-indigo-200",
  waiting: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  resolved: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  closed: "border-gray-400/30 bg-gray-400/10 text-gray-300",
};

export const TICKET_STATUS_LABELS = {
  open: "Open",
  in_progress: "In progress",
  waiting: "Waiting",
  resolved: "Resolved",
  closed: "Closed",
};

export const TICKET_PRIORITY_STYLES = {
  low: "border-gray-400/30 bg-gray-400/10 text-gray-300",
  normal: "border-cyan-300/30 bg-cyan-300/10 text-cyan-200",
  high: "border-orange-300/30 bg-orange-300/10 text-orange-200",
  urgent: "border-rose-300/30 bg-rose-300/10 text-rose-200",
};

export const TICKET_PRIORITY_LABELS = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
};

export function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}