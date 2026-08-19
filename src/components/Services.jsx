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
              className={`chip cursor-pointer ${
                active === category ? "chip-cyan !font-extrabold" : "hover:border-cyan-300/40 hover:text-cyan-100"
              }`}
            >
              {category}
              <span className="text-xs font-semibold text-gray-500">
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
              className="card group p-6"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/10 text-2xl text-cyan-200 group-hover:bg-cyan-300 group-hover:text-[#041015]">
                  <Icon />
                </div>
                <span className="chip uppercase tracking-wide text-gray-400">{category}</span>
              </div>
              <h3 className="text-xl font-black text-white">{title}</h3>
              <p className="mt-3 min-h-[84px] leading-7 text-gray-400">{desc}</p>
              <a href="#contact" className="btn btn-ghost mt-4 !p-0 !text-sm">
                Request This Service <FaArrowRight className="text-xs" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
