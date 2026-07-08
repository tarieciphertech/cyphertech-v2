import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { navLinks, profile } from "../data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#05020a]/75 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-6">
        <a href="#home" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 font-black text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.2)]">
            CT
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

        <a href="#contact" className="hidden rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-[#041015] shadow-[0_0_35px_rgba(34,211,238,0.25)] transition hover:bg-cyan-300 lg:inline-flex">
          Get a Quote
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-white lg:hidden"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#05020a]/95 px-5 py-5 lg:hidden">
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
          </div>
        </div>
      )}
    </nav>
  );
}
