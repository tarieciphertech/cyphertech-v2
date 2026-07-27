import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { solutions } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function Solutions() {
  return (
    <section id="solutions" className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Solutions"
          title="Industry-focused systems for teams that need technology to fit the work."
          copy="Every organization has its own workflows. We design around the people, data, security, and operating realities behind each industry."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map(([title, overview, examples, Icon]) => (
            <motion.article key={title} whileHover={{ y: -7 }} className="glass rounded-2xl p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-purple-400/10 text-xl text-purple-200">
                  <Icon />
                </span>
                <a href="#contact" aria-label={`Discuss ${title} solutions`} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10">
                  <FaArrowRight />
                </a>
              </div>
              <h3 className="text-xl font-black text-white">{title}</h3>
              <p className="mt-3 leading-7 text-gray-400">{overview}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {examples.map((example) => (
                  <span key={example} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-gray-300">
                    {example}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
