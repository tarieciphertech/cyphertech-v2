import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserLock, FaUserCog } from "react-icons/fa";
import { navLinks, profile } from "../data/site";
import { asset } from "../utils/paths";
import { useAuth } from "../auth/useAuth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#05020a]/75 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-6">
        <a href="#home" aria-label="Cypher Technologies — back to top" className="flex items-center gap-3">
          <span className="h-10 w-10 overflow-hidden rounded-xl border border-cyan-300/30 shadow-[0_0_35px_rgba(34,211,238,0.2)]">
            <img
              src={asset("brand/cypher-logo-dark.webp")}
              alt=""
              className="h-full w-full object-cover"
              loading="eager"
            />
          </span>
          <span className="text-lg font-black tracking-wide text-white">{profile.brand}</span>
        </a>

        <div className="hidden items-center gap-6 text-sm font-medium text-gray-300 lg:flex">
          {navLinks.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="nav-link">
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <Link to="/client" className="btn btn-secondary !px-5 !py-3 text-sm">
              <FaUserCog className="text-sm" /> Client Portal
            </Link>
          ) : (
            <Link to="/login" className="btn btn-secondary !px-5 !py-3 text-sm">
              <FaUserLock className="text-sm" /> Login
            </Link>
          )}
          <a href="#contact" className="btn btn-primary !px-5 !py-3 text-sm">
            Get a Quote
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-white lg:hidden"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-[#05020a]/95 px-5 py-5 lg:hidden">
          <div className="grid gap-2">
            {navLinks.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-white/10 hover:text-cyan-200"
              >
                {label}
              </a>
            ))}
            {user ? (
              <Link
                to="/client"
                onClick={() => setOpen(false)}
                className="btn btn-secondary mt-2 w-full"
              >
                <FaUserCog className="text-sm" /> Client Portal
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="btn btn-secondary mt-2 w-full"
              >
                <FaUserLock className="text-sm" /> Login
              </Link>
            )}
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-2 w-full">
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
