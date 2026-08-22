import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBriefcase, FaFolder, FaHeadset, FaHome, FaPaperPlane, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useAuth } from "../../auth/useAuth";
import { asset } from "../../utils/paths";

const navItems = [
  { to: "/client", label: "Dashboard", icon: FaHome, end: true },
  { to: "/client/profile", label: "Profile", icon: FaUser, end: false },
];

// Future modules — placeholders only, delivered in later stages.
const upcomingModules = [
  { label: "Projects", icon: FaBriefcase },
  { label: "Tickets", icon: FaHeadset },
  { label: "Messages", icon: FaPaperPlane },
  { label: "Files", icon: FaFolder },
];

export default function ClientLayout() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-[#05020a] text-white">
      {/* Sidebar (desktop) */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-white/[0.02] p-5 lg:flex">
        <Link to="/" className="flex items-center gap-3">
          <span className="h-10 w-10 overflow-hidden rounded-xl border border-cyan-300/30 shadow-[0_0_35px_rgba(34,211,238,0.2)]">
            <img src={asset("brand/cypher-logo-dark.webp")} alt="" className="h-full w-full object-cover" />
          </span>
          <span className="text-sm font-black tracking-wide text-white">Client Portal</span>
        </Link>

        <nav className="mt-8 grid gap-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-cyan-300/10 text-cyan-200"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="text-base" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8">
          <p className="px-4 text-xs font-black uppercase tracking-wider text-gray-600">Coming soon</p>
          <div className="mt-2 grid gap-1">
            {upcomingModules.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600"
                title="Available in an upcoming release"
              >
                <Icon className="text-base" />
                {label}
                <span className="ml-auto rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Soon
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-400 transition hover:bg-white/5 hover:text-white"
        >
          <FaSignOutAlt className="text-base" />
          Sign out
        </button>
      </aside>

      {/* Mobile header + nav */}
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05020a]/90 backdrop-blur-lg lg:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="h-8 w-8 overflow-hidden rounded-lg border border-cyan-300/30">
                <img src={asset("brand/cypher-logo-dark.webp")} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="text-sm font-black text-white">Client Portal</span>
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-300"
            >
              <FaSignOutAlt />
              Sign out
            </button>
          </div>
          <nav className="flex gap-2 overflow-x-auto px-5 pb-3">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                    isActive ? "bg-cyan-300/10 text-cyan-200" : "text-gray-400"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="flex-1 px-5 py-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-wider text-gray-500">
                Signed in as {profile?.full_name || user?.email}
              </p>
              <Link to="/" className="btn btn-secondary !px-4 !py-2 !text-sm inline-flex items-center gap-2">
                <FaArrowLeft className="text-sm" />
                Back to site
              </Link>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}