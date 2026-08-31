import { motion } from "framer-motion";
import { techGroups, techStack } from "../data/site";
import { asset } from "../utils/paths";
import SectionTitle from "./SectionTitle";

const iconLookup = Object.fromEntries(techStack.map(([name, Icon]) => [name, Icon]));

/**
 * Technologies — a visual ecosystem of the tools Cypher builds with.
 * Icons are official brand marks (react-icons), grouped by layer. No "we use
 * everything" bloat — only tools referenced by the projects live here.
 */
export default function Technologies() {
  return (
    <section id="technology" className="section-shell">
      <div className="relative px-5 py-16 sm:py-20">
        <img
          src={asset("images/services/network.svg")}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.035]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#071022]/60 via-[#071022]/90 to-[#071022]" />

        <div className="relative mx-auto max-w-7xl">
          <SectionTitle
            title="Built with proven technology."
            copy="We use reliable tools and technologies to build products and infrastructure that stand up to real use."
            centered
          />

          <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2 xl:max-w-4xl xl:grid-cols-3">
            {techGroups.map(([group, names]) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="card p-6"
              >
                <h3 className="text-center text-lg font-black text-white">{group}</h3>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {names.map((name) => {
                    const Icon = iconLookup[name];
                    return (
                      <div key={name} className="flex flex-col items-center gap-2">
                        <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-300/10 text-2xl text-cyan-200 ring-1 ring-white/5">
                          {Icon ? <Icon /> : null}
                        </span>
                        <span className="text-center text-xs font-medium text-gray-300">{name}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
