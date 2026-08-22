import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../auth/useAuth";

/**
 * ClientProfile — allows the authenticated user to view/edit ONLY their own:
 *   full_name, phone, company, avatar_url
 * The role, id, created_at, and ownership fields are never editable here.
 * Supabase RLS (profiles_update_own) enforces row ownership, and the
 * prevent_profile_role_change trigger blocks any role change.
 */
export default function ClientProfile() {
  const { user, profile, refreshProfile } = useAuth();

  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [company, setCompany] = useState(profile?.company || "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "");
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    if (!supabase || !user) {
      setStatus({ type: "error", message: "Authentication is not available right now." });
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim() || null,
        phone: phone.trim() || null,
        company: company.trim() || null,
        avatar_url: avatarUrl.trim() || null,
      })
      .eq("id", user.id);

    setSaving(false);

    if (error) {
      setStatus({ type: "error", message: "Could not save your profile. Please try again." });
      return;
    }

    await refreshProfile(user.id);
    setStatus({ type: "success", message: "Profile updated." });
  }

  return (
    <div className="grid gap-6">
      <div className="card rounded-3xl p-6 md:p-8">
        <h1 className="text-2xl font-black text-white">Your profile</h1>
        <p className="mt-2 text-sm text-gray-400">
          Keep your details up to date. Only you can edit this information.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
          <label className="field-label">
            Full name
            <input
              type="text"
              name="fullName"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="field-input"
              placeholder="Your full name"
            />
          </label>

          <label className="field-label">
            Phone
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="field-input"
              placeholder="+267 ..."
            />
          </label>

          <label className="field-label">
            Company
            <input
              type="text"
              name="company"
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="field-input"
              placeholder="Optional"
            />
          </label>

          <label className="field-label">
            Avatar URL
            <input
              type="url"
              name="avatarUrl"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="field-input"
              placeholder="https://..."
            />
          </label>

          <div className="flex items-center gap-3 sm:col-span-2">
            <button type="submit" disabled={saving} className="btn btn-primary">
              <FaSave className="mr-2" />
              {saving ? "Saving..." : "Save changes"}
            </button>

            {status && (
              <p
                role={status.type === "error" ? "alert" : "status"}
                className={
                  status.type === "error"
                    ? "rounded-xl border border-rose-300/30 bg-rose-300/10 px-4 py-2 text-sm font-semibold text-rose-200"
                    : "rounded-xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200"
                }
              >
                {status.message}
              </p>
            )}
          </div>
        </form>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <h2 className="text-sm font-black uppercase tracking-wide text-gray-400">Account details</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-black uppercase tracking-wide text-gray-500">Email</dt>
              <dd className="mt-1 text-sm font-bold text-gray-100">{user?.email || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs font-black uppercase tracking-wide text-gray-500">Role</dt>
              <dd className="mt-1 text-sm font-bold text-gray-100">{profile?.role || "client"}</dd>
            </div>
            <div>
              <dt className="text-xs font-black uppercase tracking-wide text-gray-500">Member since</dt>
              <dd className="mt-1 text-sm font-bold text-gray-100">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "—"}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-gray-600">
            Email and role are managed by your account and cannot be changed here.
          </p>
        </div>
      </div>
    </div>
  );
}
