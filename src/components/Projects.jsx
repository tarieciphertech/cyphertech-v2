import { motion } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { projects } from "../data/site";
import SectionTitle from "./SectionTitle";

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export default function Projects() {
  return (
    <section id="projects" className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Featured Project"
          title="Cypher Technologies Platform"
          copy="This website is also part of the work: a clear home for the company, the founder, the services, and future client tools."
        />

        <div className="glass mb-16 grid gap-8 rounded-3xl p-6 md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-200">
              Built in public
            </p>
            <h3 className="text-3xl font-black text-white md:text-4xl">A company site that says what we do without hiding behind buzzwords.</h3>
            <p className="mt-5 leading-8 text-gray-400">
              The Cypher Technologies platform brings software, cybersecurity, cloud, networking, AI, repairs, and support into one place. It is designed to grow into case studies, client portals, and practical tools as the company grows.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "TailwindCSS", "Framer Motion", "SEO", "GitHub Pages"].map((tag) => (
                <span key={tag} className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#home" className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-black text-[#041015] transition hover:bg-cyan-300">
                View This Site <FaExternalLinkAlt className="text-sm" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:border-cyan-300/50">
                Ask About a Similar Build <FaArrowRight className="text-sm" />
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

        <SectionTitle label="Projects" title="Things we build, repair, and keep improving." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map(([title, desc, stack, liveUrl, githubUrl]) => (
            <motion.article whileHover={{ y: -8 }} key={title} className="glass group rounded-2xl p-5">
              <div className="mb-5 grid h-40 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-cyan-300/10">
                <span className="text-4xl font-black gradient-text">{title.split(" ").map((word) => word[0]).join("").slice(0, 3)}</span>
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
              <div className="mt-6 flex gap-3">
                <a
                  href={liveUrl || "#contact"}
                  target={liveUrl ? "_blank" : undefined}
                  rel={liveUrl ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-bold text-cyan-100 hover:bg-cyan-300/10"
                >
                  Live Demo <FaExternalLinkAlt className="text-xs" />
                </a>
                <a
                  href={githubUrl || "https://github.com/tarieciphertech"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-bold text-gray-200 hover:bg-white/10"
                >
                  GitHub <FaGithub className="text-xs" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
