import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { useAuth } from "../../auth/useAuth";

// Planned admin modules. Each becomes a real route + page in its own stage —
// they are listed here as an honest roadmap only, never as fake links.
const plannedModules = [
  { label: "Users", copy: "Manage client and staff accounts." },
  { label: "Projects", copy: "Oversee client projects and timelines." },
  { label: "Services", copy: "Manage the public service catalogue." },
  { label: "Tickets", copy: "Assign and resolve support tickets." },
  { label: "Inquiries", copy: "Review website contact inquiries." },
  { label: "Blog", copy: "Publish and manage blog posts." },
  { label: "Analytics", copy: "Track portal and site activity." },
  { label: "Settings", copy: "Configure portal preferences." },
];

/**
 * AdminDashboard — the /admin index.
 * Shows only real, verified information about the signed-in administrator
 * plus an honest roadmap of modules that do not exist yet. No fabricated
 * data, no fake routes.
 */
export default function AdminDashboard() {
  const { user, profile } = useAuth();

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Admin";
  const initial = (profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "A").toUpperCase();
  const roleLabel = profile?.role === "admin" ? "Administrator" : "Staff";

  return (
    <div className="grid gap-6">
      {/* Welcome */}
      <div className="card rounded-3xl p-6 md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-2xl font-black text-amber-200">
            {initial}
          </span>
          <div className="flex-1">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-gray-500">
              Admin Portal
              <span className="rounded-full bg-amber-300/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-200">
                {roleLabel}
              </span>
            </p>
            <h1 className="mt-1 text-2xl font-black text-white">Welcome, {displayName}</h1>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              This is the administration foundation. Modules are being built in stages — the roadmap below
              shows what is planned.
            </p>
          </div>
        </div>
      </div>

      {/* Account details */}
      <div className="card rounded-3xl p-6">
        <h2 className="text-lg font-black text-white">Account</h2>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
            <dt className="text-xs font-black uppercase tracking-wide text-gray-500">Email</dt>
            <dd className="truncate text-sm font-bold text-gray-100">{user?.email || "—"}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
            <dt className="text-xs font-black uppercase tracking-wide text-gray-500">Role</dt>
            <dd className="truncate text-sm font-bold text-gray-100">{profile?.role || "—"}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-gray-600">
          Your role is verified server-side on every request. Role changes are blocked by the database.
        </p>
      </div>

      {/* Roadmap */}
      <div className="card rounded-3xl p-6">
        <h2 className="text-lg font-black text-white">Planned modules</h2>
        <p className="mt-1 text-sm text-gray-400">
          These administration modules are being prepared and will appear in the sidebar as they ship.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {plannedModules.map(({ label, copy }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 opacity-70"
              title="Available in an upcoming release"
            >
              <p className="flex items-center gap-2 text-sm font-black text-white">
                {label}
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Soon
                </span>
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">{copy}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">
          <FaEnvelope />
        </span>
        <p className="text-sm text-gray-300">
          Need to reach a client right now? Their conversations are available in your{" "}
          <Link to="/client/tickets" className="font-bold text-cyan-300 hover:text-cyan-200">
            staff ticket view
          </Link>
          .
        </p>
      </div>
    </div>
  );
}