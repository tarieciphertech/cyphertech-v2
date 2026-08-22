import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeadset } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../auth/useAuth";

// Priority options match the tickets_priority_check constraint exactly:
// low | normal | high | urgent (verified from migration 20260821100003).
const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

/**
 * ClientTicketNew — create a support ticket.
 *
 * The client provides ONLY subject and priority. The insert payload also
 * includes client_id = user.id because the RLS policy tickets_insert_own
 * uses WITH CHECK (client_id = auth.uid()) and no database default/trigger
 * sets that column — Supabase requires it in the payload. This is safe:
 * RLS rejects any client_id other than the caller's own id, so ownership
 * cannot be forged or pointed at another user.
 */
export default function ClientTicketNew() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("normal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const trimmedSubject = subject.trim();
    if (!supabase || !user) {
      setError("Support requests are unavailable right now.");
      return;
    }
    if (trimmedSubject.length < 5) {
      setError("Please enter a subject of at least 5 characters.");
      return;
    }

    setLoading(true);
    const { data, insertError } = await supabase
      .from("tickets")
      .insert({
        subject: trimmedSubject,
        priority,
        // Required by RLS WITH CHECK; must equal auth.uid(). The database
        // rejects any other value, so this cannot assign another owner.
        client_id: user.id,
      })
      .select("id")
      .single();
    setLoading(false);

    if (insertError) {
      console.error("Failed to create ticket:", insertError.message);
      setError("We could not create your ticket right now. Please try again.");
      return;
    }

    navigate(`/client/tickets/${data.id}`, { replace: true });
  }

  return (
    <div className="grid gap-6">
      <div>
        <Link to="/client/tickets" className="text-sm font-bold text-cyan-300 hover:text-cyan-200">
          ← Back to tickets
        </Link>
        <h1 className="mt-3 text-2xl font-black text-white">New support ticket</h1>
        <p className="mt-2 text-sm text-gray-400">
          Describe what you need help with. Our team will respond as soon as possible.
        </p>
      </div>

      <div className="card rounded-3xl p-6 md:p-8">
        <form onSubmit={handleSubmit} className="grid gap-5">
          <label className="field-label">
            Subject
            <span className="relative block">
              <FaHeadset className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="field-input !pl-11"
                placeholder="Briefly describe your issue"
                required
                minLength={5}
                maxLength={200}
              />
            </span>
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

          {error && (
            <p role="alert" className="rounded-xl border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm font-semibold text-rose-200">
              {error}
            </p>
          )}

          <div className="flex items-center gap-3">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? "Creating..." : "Create Ticket"}
            </button>
            <Link to="/client/tickets" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>

        <p className="mt-6 text-xs leading-5 text-gray-600">
          Your ticket starts in “Open” status. You can add more detail in the conversation once it is created.
        </p>
      </div>
    </div>
  );
}