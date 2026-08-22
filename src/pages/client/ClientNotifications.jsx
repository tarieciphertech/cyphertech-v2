import { useEffect, useState } from "react";
import { FaBell, FaCheck, FaEnvelopeOpenText } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../auth/useAuth";
import {
  extractNotificationText,
  formatNotificationDate,
  formatNotificationType,
} from "./notificationHelpers";

/**
 * ClientNotifications — lists the authenticated client's notifications.
 *
 * Security:
 *  - Queries the existing `notifications` table via the shared supabase
 *    singleton. Visibility is enforced entirely by RLS
 *    (notifications_select_own: user_id = auth.uid()); we deliberately do NOT
 *    add .eq("user_id", user.id) as a security replacement.
 *  - Clients can only UPDATE read_at (notifications_update_own). There is no
 *    INSERT policy — clients cannot create notifications.
 *  - Mark-as-read only fires when read_at is currently NULL.
 *  - Payload is arbitrary JSONB and is rendered as plain React text via safe
 *    helpers — never dangerouslySetInnerHTML, never raw objects.
 */
export default function ClientNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [markingId, setMarkingId] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadNotifications() {
      if (!supabase || !user) {
        setLoading(false);
        return;
      }

      const { data, queryError } = await supabase
        .from("notifications")
        .select("id, type, payload, read_at, created_at")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (queryError) {
        console.error("Failed to load notifications:", queryError.message);
        setError("We could not load your notifications right now.");
        setNotifications([]);
        setLoading(false);
        return;
      }

      setNotifications(data || []);
      setLoading(false);
    }

    loadNotifications();

    return () => {
      active = false;
    };
  }, [user]);

  async function handleMarkRead(notificationId) {
    if (!supabase) return;

    setMarkingId(notificationId);
    // Only update when read_at is currently NULL; RLS scopes the row to the owner.
    const { error: updateError } = await supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("id", notificationId)
      .is("read_at", null);

    setMarkingId(null);

    if (updateError) {
      console.error("Failed to mark notification read:", updateError.message);
      return;
    }

    // Optimistic local refresh of just this row's read state.
    setNotifications((current) =>
      current.map((item) =>
        item.id === notificationId ? { ...item, read_at: new Date().toISOString() } : item,
      ),
    );
  }

  if (loading) {
    return (
      <div className="grid place-items-center py-24 text-white">
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300" />
          <span className="text-sm text-gray-400">Loading notifications...</span>
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

  const unreadCount = notifications.filter((item) => !item.read_at).length;

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Notifications</h1>
          <p className="mt-1 text-sm text-gray-400">
            {unreadCount === 0
              ? "You're all caught up."
              : `${unreadCount} unread ${unreadCount === 1 ? "notification" : "notifications"}`}
          </p>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="card rounded-3xl p-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
            <FaBell className="text-2xl" />
          </span>
          <h2 className="mt-4 text-xl font-black text-white">No notifications yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
            Notifications will appear here when there are updates to your account, projects, tickets, and
            more.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {notifications.map((notification) => {
            const isUnread = !notification.read_at;
            return (
              <article
                key={notification.id}
                className={`card flex flex-col gap-3 rounded-3xl p-5 sm:flex-row sm:items-center sm:justify-between ${
                  isUnread ? "border-cyan-300/30 bg-cyan-300/[0.06]" : ""
                }`}
              >
                <div className="flex min-w-0 items-start gap-4">
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                      isUnread ? "bg-cyan-300/15 text-cyan-200" : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {isUnread ? <FaEnvelopeOpenText className="text-base" /> : <FaBell className="text-base" />}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`flex items-center gap-2 text-sm font-black ${
                        isUnread ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {formatNotificationType(notification.type)}
                      {isUnread && (
                        <span className="rounded-full bg-cyan-300/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan-200">
                          New
                        </span>
                      )}
                    </p>
                    <p className={`mt-1 text-sm leading-6 ${isUnread ? "text-gray-200" : "text-gray-500"}`}>
                      {extractNotificationText(notification.payload)}
                    </p>
                    <p className="mt-1 text-xs text-gray-600">
                      {formatNotificationDate(notification.created_at)}
                    </p>
                  </div>
                </div>

                {isUnread && (
                  <button
                    type="button"
                    onClick={() => handleMarkRead(notification.id)}
                    disabled={markingId === notification.id}
                    className="btn btn-secondary shrink-0 self-start !px-4 !py-2 !text-sm sm:self-auto"
                  >
                    <FaCheck className="mr-2" />
                    {markingId === notification.id ? "Marking..." : "Mark as read"}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}