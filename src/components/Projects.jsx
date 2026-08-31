import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaExternalLinkAlt, FaGithub, FaWhatsapp } from "react-icons/fa";
import { profile, projects } from "../data/site";
import SectionTitle from "./SectionTitle";
import ProjectSlideshow from "./ProjectSlideshow";

const whatsappUrl = `${profile.whatsapp}?text=${encodeURIComponent(
  "Hello Cypher Technologies, I would like to discuss a project.",
)}`;

const statusStyles = {
  Completed: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  Ongoing: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
  "In Development": "border-amber-300/30 bg-amber-300/10 text-amber-200",
  Prototype: "border-purple-300/30 bg-purple-300/10 text-purple-200",
  Concept: "border-white/15 bg-white/5 text-gray-300",
};

const statusCopy = {
  Completed: "Fully built and live.",
  Ongoing: "Actively maintained and updated.",
  "In Development": "Being actively built.",
  Prototype: "Working prototype — not yet a live product.",
  Concept: "Planned concept — not yet built.",
};

const categories = ["All", "Web", "Software", "Network"];

function countFor(category) {
  if (category === "All") return projects.length;
  return projects.filter((p) => p[6] === category).length;
}

/**
 * Projects — a visual, data-driven portfolio.
 *
 * Each project is presented as a case study with its own screenshot slideshow
 * (real images where they exist, clearly-marked placeholders otherwise).
 * Image and text sides alternate so the grid never feels repetitive.
 */
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const visible =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project[6] === activeCategory);

  return (
    <section id="projects" className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          title="Our Work"
          copy="Real systems. Real software. Real solutions. Every item is labeled honestly — live systems, active work, prototypes, and concepts."
        />

        {/* Category filter (functional, minimal typography toggles — not decorative pills) */}
        <div
          className="mb-10 flex flex-wrap gap-4 text-sm font-medium"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setActiveCategory(category);
                  setExpanded(null);
                }}
                className={`relative pb-1 transition ${
                  active ? "text-cyan-200" : "text-gray-400 hover:text-cyan-200"
                }`}
              >
                {category}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded bg-cyan-300 opacity-0 transition-opacity"
                  style={active ? { opacity: "0.45" } : {}}
                />
                {active && <span className="absolute -bottom-1 left-0 h-0.5 w-6 rounded bg-cyan-300" />}
                <span className="ml-1 text-xs text-gray-600">({countFor(category)})</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:gap-8">
          {visible.map((project, i) => (
            <ProjectCase
              key={project[0]}
              project={project}
              alternate={i % 2 === 1}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ))}
        </div>

        <p className="mt-10 text-center text-sm leading-7 text-gray-500">
          Some engagements are internal or client-confidential.{" "}
          <a href="#contact" className="font-bold text-cyan-200 hover:text-cyan-100">
            Ask us for a walkthrough
          </a>{" "}
          or browse more on{" "}
                    <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-cyan-200 hover:text-cyan-100"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/**
 * ProjectCase — a single case-study row: screenshot slideshow + project details.
 * Image and text sides alternate to keep the portfolio from looking repetitive.
 */
function ProjectCase({ project, alternate, expanded, setExpanded }) {
  const [
    title,
    desc,
    stack,
    liveUrl,
    githubUrl,
    status,
    category,
    problem,
    slides,
  ] = project;
  const isOpen = expanded === title;
  const hasLinks = Boolean(liveUrl || githubUrl);
  const hasSlides = slides && slides.length > 0;
  const toggle = () => setExpanded(isOpen ? null : title);

  return (
    <motion.article
      layout
      className={`card p-5 sm:p-6 lg:flex lg:items-start lg:gap-8 ${
        alternate ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image / slideshow side — real product screenshots where they exist,
          otherwise an intentional typographic design panel (never a skeleton) */}
      <div className="lg:shrink-0 lg:w-1/2">
        {hasSlides ? (
          <ProjectSlideshow slides={slides} />
        ) : (
          <DesignPanel title={title} stack={stack} status={status} category={category} />
        )}
      </div>

      {/* Details side */}
      <div className="mt-5 lg:mt-0 lg:w-1/2">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className={`chip !font-black ${statusStyles[status] || statusStyles.Concept}`}>
            {status}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {category}
          </span>
        </div>

        <h3 className="text-2xl font-black text-white">{title}</h3>
        <p className="mt-3 leading-7 text-gray-300">{desc}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {stack.map((tag) => (
            <span key={tag} className="chip text-gray-300">
              {tag}
            </span>
          ))}
        </div>

        {hasLinks && (
          <div className="mt-5 flex flex-wrap gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline !px-4 !py-2.5 !text-sm"
              >
                <FaExternalLinkAlt className="text-xs" /> Visit live site
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary !px-4 !py-2.5 !text-sm"
              >
                <FaGithub className="text-xs" /> Source
              </a>
            )}
          </div>
        )}

        <div className="mt-6">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={`project-detail-${title}`}
            onClick={toggle}
            className="btn btn-ghost !p-0 !text-sm"
          >
            {isOpen ? "Show Less" : "Details"}
            <FaChevronDown
              className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id={`project-detail-${title}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid gap-4 border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-cyan-300">
                      Problem it addresses
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-300">{problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-cyan-300">
                      Current status
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-300">
                      {statusCopy[status] || ""}
                    </p>
                  </div>
                  {!hasLinks && (
                    <p className="text-sm text-gray-400">
                      Ask us for a private walkthrough.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary !px-4 !py-2.5 !text-sm"
            >
              View project
            </a>
          ) : (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline !px-4 !py-2.5 !text-sm"
            >
              Discuss this project <FaWhatsapp className="text-sm" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/**
 * DesignPanel — an intentional typographic treatment for projects that don't
 * yet have public product screenshots. Clearly a design panel, NOT a fake
 * dashboard or screenshot: a monogram, status/category readout and the stack
 * as a working spec line. Replaces the old gray "screenshot placeholder".
 */
function DesignPanel({ title, stack, status, category }) {
  const initials = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#071022]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle,rgba(148,163,184,0.09)_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div className="relative flex aspect-[16/10] flex-col justify-between p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center border border-cyan-300/25 bg-cyan-300/5 text-xl font-black text-cyan-200">
            {initials}
          </span>
          <span className="text-right font-mono text-[11px] uppercase leading-5 tracking-widest text-gray-500">
            {status}
            <br />
            {category}
          </span>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
            Design treatment
          </p>
          <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
            This project's public interface isn't available to capture yet. Built
            with {stack.join(" · ")}.
          </p>
        </div>
      </div>
    </div>
  );
}