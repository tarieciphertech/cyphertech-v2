import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { services } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function Services() {
  return (
    <section id="services" className="section-shell bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Services"
          title="Enterprise-grade technology services for real business outcomes."
          copy="From customer-facing products to infrastructure and technical support, Cypher Technologies builds practical systems that are secure, scalable, and easy to operate."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map(([title, desc, Icon]) => (
            <motion.article
              key={title}
              whileHover={{ y: -8 }}
              className="glass group rounded-2xl p-6 transition hover:border-cyan-300/35 hover:bg-white/[0.085]"
            >
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/10 text-2xl text-cyan-200 group-hover:bg-cyan-300 group-hover:text-[#041015]">
                <Icon />
              </div>
              <h3 className="text-xl font-black text-white">{title}</h3>
              <p className="mt-3 min-h-[84px] leading-7 text-gray-400">{desc}</p>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-cyan-200 hover:text-cyan-100">
                Learn More <FaArrowRight className="text-xs" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
