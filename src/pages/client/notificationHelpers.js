/**
 * Shared helpers for rendering client notifications.
 *
 * `payload` is arbitrary JSONB — it may be a string, an object, null, or an
 * unexpected value. These helpers never assume a specific shape and always
 * provide safe fallbacks. Content is rendered as plain React text only.
 */

// Common snake_case notification types → human-readable labels.
const TYPE_LABEL_OVERRIDES = {
  ticket_created: "Ticket Created",
  ticket_reply: "Ticket Reply",
  ticket_updated: "Ticket Updated",
  project_update: "Project Update",
  project_created: "Project Created",
};

/**
 * Convert any notification type value into a readable label.
 * Generic formatter: splits on underscores/dashes/hyphens and title-cases
 * each word, with friendly overrides for known types.
 */
export function formatNotificationType(type) {
  if (typeof type !== "string" || !type.trim()) {
    return "Notification";
  }

  const normalized = type.trim().toLowerCase();
  if (TYPE_LABEL_OVERRIDES[normalized]) {
    return TYPE_LABEL_OVERRIDES[normalized];
  }

  const words = normalized.split(/[_\-\s]+/).filter(Boolean);
  if (words.length === 0) {
    return "Notification";
  }
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

/**
 * Safely extract useful display text from an arbitrary JSONB payload.
 * Supports: string payloads, objects with common text fields
 * (title / message / body / description / text), and anything else falls
 * back to a neutral default. Never returns raw objects for JSX rendering.
 */
export function extractNotificationText(payload) {
  const FALLBACK = "You have a new notification.";

  if (payload === null || payload === undefined) {
    return FALLBACK;
  }

  // Plain string payload.
  if (typeof payload === "string") {
    const trimmed = payload.trim();
    return trimmed || FALLBACK;
  }

  // Numeric or boolean payload — render as text.
  if (typeof payload === "number" || typeof payload === "boolean") {
    return String(payload);
  }

  // Object payload — look for common text fields, first non-empty wins.
  if (typeof payload === "object" && !Array.isArray(payload)) {
    const candidateFields = ["title", "message", "body", "description", "text"];
    for (const field of candidateFields) {
      const value = payload[field];
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }
    return FALLBACK;
  }

  // Arrays or any other unexpected value — do not render raw structures.
  return FALLBACK;
}

/**
 * Format a timestamp for display; returns an em dash for null/invalid values.
 */
export function formatNotificationDate(value) {
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