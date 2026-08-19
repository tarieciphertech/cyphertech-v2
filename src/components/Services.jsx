import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { services } from "../data/site";
import SectionTitle from "./SectionTitle";

const categories = ["All", "Build", "Secure", "Infrastructure", "Support"];

export default function Services() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? services : services.filter((service) => service[3] === active);

  return (
    <section id="services" className="section-shell bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Services"
          title="Enterprise-grade technology services for real business outcomes."
          copy="From customer-facing products to infrastructure and technical support, Cypher Technologies builds practical systems that are secure, scalable, and easy to operate."
        />

        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter services by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={active === category}
              onClick={() => setActive(category)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                active === category
                  ? "border-cyan-300/60 bg-cyan-300/15 text-cyan-100"
                  : "border-white/10 bg-white/[0.04] text-gray-300 hover:border-cyan-300/40 hover:text-cyan-100"
              }`}
            >
              {category}
              <span className="ml-2 text-xs font-semibold text-gray-500">
                {category === "All" ? services.length : services.filter((service) => service[3] === category).length}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map(([title, desc, Icon, category]) => (
            <motion.article
              key={title}
              layout
              whileHover={{ y: -8 }}
              className="glass group rounded-2xl p-6 transition hover:border-cyan-300/35 hover:bg-white/[0.085]"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/10 text-2xl text-cyan-200 group-hover:bg-cyan-300 group-hover:text-[#041015]">
                  <Icon />
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-400">
                  {category}
                </span>
              </div>
              <h3 className="text-xl font-black text-white">{title}</h3>
              <p className="mt-3 min-h-[84px] leading-7 text-gray-400">{desc}</p>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-cyan-200 hover:text-cyan-100">
                Request This Service <FaArrowRight className="text-xs" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
