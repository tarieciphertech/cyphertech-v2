import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBriefcase, FaCalendarAlt, FaCheckCircle, FaClock, FaFolderOpen } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../auth/useAuth";

const STATUS_STYLES = {
  planned: "border-cyan-300/30 bg-cyan-300/10 text-cyan-200",
  active: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  on_hold: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  completed: "border-indigo-300/30 bg-indigo-300/10 text-indigo-200",
  cancelled: "border-rose-300/30 bg-rose-300/10 text-rose-200",
};
const STATUS_LABELS = { planned: "Planned", active: "Active", on_hold: "On hold", completed: "Completed", cancelled: "Cancelled" };
const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

function ProjectCard({ project }) {
  return (
    <Link to={`/client/projects/${project.id}`} className="card group block rounded-3xl p-6 transition hover:-translate-y-0.5 hover:border-cyan-300/20">
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200"><FaBriefcase /></span>
        <span className={`rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-wide ${STATUS_STYLES[project.status] || STATUS_STYLES.planned}`}>
          {STATUS_LABELS[project.status] || project.status}
        </span>
      </div>
      <h2 className="mt-5 text-lg font-black text-white group-hover:text-cyan-200">{project.title}</h2>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-400">{project.description || "No description provided."}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
        <div><span className="text-[10px] font-black uppercase tracking-wide text-gray-500">Start</span><p className="mt-1 flex items-center gap-2 text-xs font-bold text-gray-200"><FaCalendarAlt className="text-cyan-300" />{formatDate(project.start_date)}</p></div>
        <div><span className="text-[10px] font-black uppercase tracking-wide text-gray-500">Target end</span><p className="mt-1 flex items-center gap-2 text-xs font-bold text-gray-200"><FaCalendarAlt className="text-cyan-300" />{formatDate(project.end_date)}</p></div>
      </div>
      <div className="mt-5 flex items-center justify-between text-xs font-black text-cyan-300"><span>Open project</span><FaArrowRight className="transition group-hover:translate-x-1" /></div>
    </Link>
  );
}

export default function ClientProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      if (!supabase || !user) { setLoading(false); return; }
      setError("");
      const { data, error: queryError } = await supabase
        .from("projects")
        .select("id,title,description,status,start_date,end_date,created_at,updated_at")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });
      if (!active) return;
      if (queryError) { setError("We could not load your projects right now. Please try again."); setProjects([]); }
      else setProjects(data || []);
      setLoading(false);
    }
    load();
    return () => { active = false; };
  }, [user]);

  const summary = useMemo(() => ({
    total: projects.length,
    active: projects.filter((project) => project.status === "active").length,
    planned: projects.filter((project) => project.status === "planned").length,
    completed: projects.filter((project) => project.status === "completed").length,
  }), [projects]);

  if (loading) return <div className="grid place-items-center py-24 text-white"><span className="text-sm text-gray-400">Loading your projects...</span></div>;
  if (error) return <div className="card rounded-3xl p-8 text-center"><p role="alert" className="text-sm font-semibold text-rose-200">{error}</p><Link to="/client" className="btn btn-primary mt-5">Back to dashboard</Link></div>;

  return (
    <div className="grid gap-6">
      <header className="card rounded-3xl p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Client workspace</p>
            <h1 className="mt-2 text-3xl font-black text-white">Your projects</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">Track projects created for your account, see their current status, review activity, and access files shared by our team.</p>
          </div>
          <Link to="/client/tickets/new" className="btn btn-primary shrink-0">Need project support</Link>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[['Total', summary.total, FaBriefcase], ['Active', summary.active, FaClock], ['Planned', summary.planned, FaCalendarAlt], ['Completed', summary.completed, FaCheckCircle]].map(([label, value, Icon]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"><Icon className="text-cyan-300" /><p className="mt-3 text-2xl font-black text-white">{value}</p><p className="mt-1 text-[10px] font-black uppercase tracking-wide text-gray-500">{label}</p></div>
          ))}
        </div>
      </header>

      {projects.length === 0 ? (
        <div className="card rounded-3xl p-10 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200"><FaFolderOpen className="text-2xl" /></span>
          <h2 className="mt-5 text-xl font-black text-white">No projects yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">When our team creates a project for your account, it will appear here automatically.</p>
          <Link to="/client/tickets/new" className="btn btn-primary mt-6">Contact the team</Link>
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </section>
      )}
    </div>
  );
}
