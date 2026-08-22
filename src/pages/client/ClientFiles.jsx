import { useEffect, useState } from "react";
import { FaFileAlt, FaFolder } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../auth/useAuth";

/**
 * Human-readable byte size. Returns "—" when size is null/unavailable,
 * matching the portal's nullable-field fallback convention.
 */
function formatFileSize(size) {
  if (size === null || size === undefined) return "—";
  if (typeof size !== "number" || Number.isNaN(size) || size < 0) return "—";
  if (size === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const exponent = Math.min(Math.floor(Math.log10(size) / 3), units.length - 1);
  const value = size / 1024 ** exponent;
  const rounded = exponent === 0 ? value : Math.round(value * 10) / 10;
  return `${rounded} ${units[exponent]}`;
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString();
}

/**
 * ClientFiles — lists the authenticated client's file metadata.
 *
 * SECURITY / SCOPE:
 *  - Queries the existing `files` table via the shared supabase singleton.
 *    Visibility is enforced entirely by RLS (files_select_own:
 *    owner_id = auth.uid()); we deliberately do NOT add
 *    .eq("owner_id", user.id) as a security replacement.
 *  - This stage is METADATA ONLY: no Supabase Storage buckets exist yet, so
 *    there are no upload or download actions and no storage URLs are exposed
 *    or invented. storage_path is displayed as text only.
 */
export default function ClientFiles() {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadFiles() {
      if (!supabase || !user) {
        setLoading(false);
        return;
      }

      const { data, queryError } = await supabase
        .from("files")
        .select("id, bucket, storage_path, mime_type, size, visibility, created_at")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (queryError) {
        console.error("Failed to load files:", queryError.message);
        setError("We could not load your files right now.");
        setFiles([]);
        setLoading(false);
        return;
      }

      setFiles(data || []);
      setLoading(false);
    }

    loadFiles();

    return () => {
      active = false;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="grid place-items-center py-24 text-white">
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300" />
          <span className="text-sm text-gray-400">Loading files...</span>
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
          <h1 className="text-2xl font-black text-white">Your files</h1>
          <p className="mt-1 text-sm text-gray-400">
            {files.length === 0
              ? "Shared project and ticket files will appear here."
              : `${files.length} ${files.length === 1 ? "file" : "files"}`}
          </p>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="card rounded-3xl p-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
            <FaFolder className="text-2xl" />
          </span>
          <h2 className="mt-4 text-xl font-black text-white">No files yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
            Files shared with you on projects and support tickets will appear here once they are available.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {files.map((file) => (
            <article key={file.id} className="card flex flex-col gap-3 rounded-3xl p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">
                  <FaFileAlt className="text-base" />
                </span>
                <div className="min-w-0">
                  {/* storage_path shown as plain text only — no download links exist yet */}
                  <p className="truncate text-sm font-black text-white">{file.storage_path || "—"}</p>
                  <p className="mt-1 truncate text-xs text-gray-500">
                    {file.bucket || "—"} · {file.mime_type || "—"} · {formatFileSize(file.size)}
                  </p>
                  <p className="mt-1 text-xs text-gray-600">Added {formatDate(file.created_at)}</p>
                </div>
              </div>
              <span className="shrink-0 self-start rounded-full border border-gray-400/30 bg-gray-400/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-gray-300 sm:self-auto">
                {file.visibility || "private"}
              </span>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}