import { motion } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
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

export default function Projects() {
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
            <p className="mb-4 inline-flex rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-200">
              Flagship build — you are viewing it
            </p>
            <h3 className="text-3xl font-black text-white md:text-4xl">A company platform built for trust, conversion, and scale.</h3>
            <p className="mt-5 leading-8 text-gray-400">
              The Cypher Technologies platform packages software, cybersecurity, cloud, networking, AI, and support services into a polished business website that can grow into portals, case studies, and client workflows.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "TailwindCSS", "Framer Motion", "SEO", "GitHub Pages"].map((tag) => (
                <span key={tag} className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="btn btn-primary">
                Start Your Project <FaArrowRight className="text-sm" />
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
              src={asset("brand/cypher-brand-system.png")}
              alt="Cypher Technologies brand system and product mockups"
              className="h-[360px] w-full rounded-2xl object-cover object-left"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mb-16 grid gap-5 md:grid-cols-3">
          {[
            ["Identity", "brand/cypher-logo-dark.png", "Cypher Technologies logo on dark circuit background"],
            ["Services", "brand/cypher-services-showcase.png", "Cypher Technologies services and office brand showcase"],
            ["Light Mark", "brand/cypher-logo-light.png", "Cypher Technologies blue mark on light background"],
          ].map(([title, path, alt]) => (
            <div key={title} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
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
          copy="Statuses are shown honestly — some items are live systems, others are prototypes or concepts under active development."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map(([title, desc, stack, liveUrl, githubUrl, status]) => (
            <motion.article whileHover={{ y: -8 }} key={title} className="card group flex flex-col p-5">
              <div className="relative mb-5 grid h-40 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-cyan-300/10">
                <span className="text-4xl font-black gradient-text">{title.split(" ").map((word) => word[0]).join("").slice(0, 3)}</span>
                <span className={`chip absolute right-3 top-3 !font-bold ${statusStyles[status] || statusStyles.Concept}`}>
                  {status}
                </span>
              </div>
              <h3 className="text-xl font-black text-white">{title}</h3>
              <p className="mt-3 min-h-[98px] leading-7 text-gray-400">{desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {stack.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs font-semibold text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              {(liveUrl || githubUrl) && (
                <div className="mt-6 flex gap-3">
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-bold text-cyan-100 hover:bg-cyan-300/10"
                    >
                      Live Demo <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-bold text-gray-200 hover:bg-white/10"
                    >
                      GitHub <FaGithub className="text-xs" />
                    </a>
                  )}
                </div>
              )}
            </motion.article>
          ))}
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
