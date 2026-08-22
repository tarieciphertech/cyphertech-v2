import { useEffect, useState } from "react";
import { FaBriefcase, FaCalendarAlt, FaFolderOpen } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../auth/useAuth";

const STATUS_STYLES = {
  planned: "border-cyan-300/30 bg-cyan-300/10 text-cyan-200",
  active: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  on_hold: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  completed: "border-indigo-300/30 bg-indigo-300/10 text-indigo-200",
  cancelled: "border-rose-300/30 bg-rose-300/10 text-rose-200",
};

const STATUS_LABELS = {
  planned: "Planned",
  active: "Active",
  on_hold: "On hold",
  completed: "Completed",
  cancelled: "Cancelled",
};

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString();
}

/**
 * ClientProjects — lists the authenticated client's projects.
 * Queries the existing `projects` table via the shared supabase singleton.
 * Ownership is enforced entirely by RLS (owner_id = auth.uid()); we never
 * filter by another user's id and never use service_role.
 */
export default function ClientProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      if (!supabase || !user) {
        setLoading(false);
        return;
      }

      const { data, error: queryError } = await supabase
        .from("projects")
        .select("id, title, description, status, start_date, end_date, created_at")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (queryError) {
        setError("We could not load your projects right now. Please try again.");
        setProjects([]);
        setLoading(false);
        return;
      }

      setProjects(data || []);
      setLoading(false);
    }

    loadProjects();

    return () => {
      active = false;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="grid place-items-center py-24 text-white">
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300" />
          <span className="text-sm text-gray-400">Loading your projects...</span>
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

  if (projects.length === 0) {
    return (
      <div className="card rounded-3xl p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
          <FaFolderOpen className="text-2xl" />
        </span>
        <h2 className="mt-4 text-xl font-black text-white">No projects yet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
          You don't have any projects with Cypher Technologies yet. When a project is created for you, it will
          appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Your projects</h1>
          <p className="mt-1 text-sm text-gray-400">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="card flex flex-col rounded-3xl p-6">
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">
                <FaBriefcase className="text-base" />
              </span>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${
                  STATUS_STYLES[project.status] || STATUS_STYLES.planned
                }`}
              >
                {STATUS_LABELS[project.status] || project.status}
              </span>
            </div>

            <h2 className="mt-4 text-lg font-black text-white">{project.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-gray-400">
              {project.description || "No description provided."}
            </p>

            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
              <div>
                <dt className="font-black uppercase tracking-wide text-gray-500">Start</dt>
                <dd className="mt-1 flex items-center gap-1.5 font-bold text-gray-200">
                  <FaCalendarAlt className="text-gray-500" />
                  {formatDate(project.start_date)}
                </dd>
              </div>
              <div>
                <dt className="font-black uppercase tracking-wide text-gray-500">End</dt>
                <dd className="mt-1 flex items-center gap-1.5 font-bold text-gray-200">
                  <FaCalendarAlt className="text-gray-500" />
                  {formatDate(project.end_date)}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="font-black uppercase tracking-wide text-gray-500">Created</dt>
                <dd className="mt-1 font-bold text-gray-200">{formatDate(project.created_at)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}