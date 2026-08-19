import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { profile, projects } from "../data/site";
import { asset } from "../utils/paths";
import SectionTitle from "./SectionTitle";

const statusStyles = {
  Completed: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  Ongoing: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
  "In Development": "border-amber-300/30 bg-amber-300/10 text-amber-200",
  Prototype: "border-purple-300/30 bg-purple-300/10 text-purple-200",
  Concept: "border-white/15 bg-white/5 text-gray-300",
};

const categories = ["All", "Web", "Software", "Network"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const visible = activeCategory === "All" ? projects : projects.filter((project) => project[6] === activeCategory);

  function toggle(id) {
    setExpanded((current) => (current === id ? null : id));
  }

  function countFor(category) {
    if (category === "All") return projects.length;
    return projects.filter((project) => project[6] === category).length;
  }

  return (
    <section id="projects" className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Featured Project"
          title="Cypher Technologies Platform"
          copy="A premium digital foundation for presenting services, solutions, company credibility, and future customer-facing tools."
        />

        <div className="card mb-16 grid gap-8 rounded-3xl p-6 md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="chip border-emerald-300/30 bg-emerald-300/10 font-black uppercase tracking-wide text-emerald-200">
                Flagship build — you are viewing it
              </span>
            </div>
            <h3 className="text-3xl font-black text-white md:text-4xl">A company platform built for trust, conversion, and scale.</h3>
            <p className="mt-5 leading-8 text-gray-400">
              The Cypher Technologies platform packages software, cybersecurity, cloud, networking, AI, and support services into a professional business website that serves as the company's primary digital presence.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "TailwindCSS", "Framer Motion", "SEO", "GitHub Pages"].map((tag) => (
                <span key={tag} className="chip chip-cyan">{tag}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://cyphertech.co.zw"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Visit Live Site <FaExternalLinkAlt className="text-sm" />
              </a>
              <a
                href="https://github.com/tarieciphertech/cyphertech-v2"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                View Source <FaGithub className="text-sm" />
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#071022] p-3">
            <div className="mb-4 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-300" />
              <span className="h-3 w-3 rounded-full bg-emerald-300" />
            </div>
            <img
              src={asset("brand/cypher-brand-system.webp")}
              alt="Cypher Technologies brand system and product mockups"
              className="h-[360px] w-full rounded-2xl object-cover object-left"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mb-16 grid gap-5 md:grid-cols-3">
          {[
            ["Identity", "brand/cypher-logo-dark.webp", "Cypher Technologies logo on dark circuit background"],
            ["Services", "brand/cypher-services-showcase.webp", "Cypher Technologies services and office brand showcase"],
            ["Light Mark", "brand/cypher-logo-light.webp", "Cypher Technologies blue mark on light background"],
          ].map(([title, path, alt]) => (
            <div key={title} className="card overflow-hidden !p-0">
              <img src={asset(path)} alt={alt} className="h-52 w-full object-cover" loading="lazy" />
              <div className="p-4">
                <p className="text-sm font-black uppercase tracking-wide text-cyan-200">{title}</p>
              </div>
            </div>
          ))}
        </div>

        <SectionTitle
          label="Projects"
          title="Selected work and product concepts."
          copy="Every item is labeled honestly — live systems, active work, prototypes, and concepts. Links appear only where something is genuinely publicly accessible."
        />

        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => {
                setActiveCategory(category);
                setExpanded(null);
              }}
              className={`chip cursor-pointer ${
                activeCategory === category ? "chip-cyan !font-extrabold" : "hover:border-cyan-300/40 hover:text-cyan-100"
              }`}
            >
              {category}
              <span className="text-xs font-semibold text-gray-500">{countFor(category)}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map(([title, desc, stack, liveUrl, githubUrl, status, category, problem]) => {
            const isOpen = expanded === title;
            const hasLinks = Boolean(liveUrl || githubUrl);
            return (
              <motion.article
                key={title}
                layout
                whileHover={{ y: -8 }}
                className="card group flex flex-col p-5"
              >
                <div className="relative mb-5 grid h-40 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-cyan-300/10">
                  <span className="text-4xl font-black gradient-text">{title.split(" ").map((word) => word[0]).join("").slice(0, 3)}</span>
                  <span className={`chip absolute right-3 top-3 !font-bold ${statusStyles[status] || statusStyles.Concept}`}>
                    {status}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-black text-white">{title}</h3>
                  <span className="chip uppercase tracking-wide text-gray-400">{category}</span>
                </div>
                <p className="mt-3 leading-7 text-gray-400">{desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {stack.map((tag) => (
                    <span key={tag} className="chip text-gray-300">{tag}</span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-5">
                  <div className="flex gap-2">
                    {hasLinks ? (
                      <>
                        {liveUrl && (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-outline !px-3 !py-2 !text-sm"
                          >
                            <FaExternalLinkAlt className="text-xs" /> Live
                          </a>
                        )}
                        {githubUrl && (
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-secondary !px-3 !py-2 !text-sm"
                          >
                            <FaGithub className="text-xs" /> GitHub
                          </a>
                        )}
                      </>
                    ) : (
                      <span className="text-xs font-semibold text-gray-500">
                        {status === "Concept" ? "Concept — not publicly accessible yet" : "Not publicly accessible"}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`project-detail-${title}`}
                    onClick={() => toggle(title)}
                    className="btn btn-ghost !p-0 !text-sm"
                  >
                    {isOpen ? "Show Less" : "Details"}
                    <FaChevronDown className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>

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
                          <p className="text-xs font-black uppercase tracking-wide text-cyan-300">Problem it addresses</p>
                          <p className="mt-1 text-sm leading-6 text-gray-300">{problem}</p>
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-wide text-cyan-300">Current status</p>
                          <p className="mt-1 text-sm leading-6 text-gray-300">
                            {status === "Completed" && "Fully built and live."}
                            {status === "Ongoing" && "Actively maintained and updated."}
                            {status === "In Development" && "Being actively built."}
                            {status === "Prototype" && "Working prototype — not yet a live product."}
                            {status === "Concept" && "Planned concept — not yet built."}
                          </p>
                        </div>
                        {!hasLinks && (
                          <p className="text-sm text-gray-500">
                            Ask us for a private walkthrough.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm leading-7 text-gray-500">
          Some engagements are internal or client-confidential.{" "}
          <a href="#contact" className="font-bold text-cyan-200 hover:text-cyan-100">
            Ask us for a walkthrough
          </a>{" "}
          or browse more on{" "}
          <a href={profile.github} target="_blank" rel="noreferrer" className="font-bold text-cyan-200 hover:text-cyan-100">
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}