import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaChevronDown, FaWhatsapp } from "react-icons/fa";
import { profile, services } from "../data/site";
import SectionTitle from "./SectionTitle";

const categories = ["All", "Build", "Secure", "Infrastructure", "Support"];

const whatsappUrl = `${profile.whatsapp}?text=${encodeURIComponent(
  "Hello Cypher Technologies, I'd like to discuss a service.",
)}`;

export default function Services() {
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const visible = active === "All" ? services : services.filter((service) => service[3] === active);

  function toggle(id) {
    setExpanded((current) => (current === id ? null : id));
  }

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
              onClick={() => {
                setActive(category);
                setExpanded(null);
              }}
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
          {visible.map(([title, desc, Icon, category, problem, deliverables, audience]) => {
            const isOpen = expanded === title;
            return (
              <motion.article
                key={title}
                layout
                whileHover={{ y: -8 }}
                className="card group flex flex-col p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/10 text-2xl text-cyan-200 group-hover:bg-cyan-300 group-hover:text-[#041015]">
                    <Icon />
                  </div>
                  <span className="chip uppercase tracking-wide text-gray-400">{category}</span>
                </div>

                <h3 className="text-xl font-black text-white">{title}</h3>
                <p className="mt-3 leading-7 text-gray-400">{desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {deliverables.slice(0, 3).map((item) => (
                    <span key={item} className="chip text-gray-300">{item}</span>
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`service-detail-${title}`}
                    onClick={() => toggle(title)}
                    className="btn btn-ghost !p-0 !text-sm"
                  >
                    {isOpen ? "Show Less" : "Learn More"}
                    <FaChevronDown className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`service-detail-${title}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 grid gap-4 border-t border-white/10 pt-4">
                          <div>
                            <p className="text-xs font-black uppercase tracking-wide text-cyan-300">What it solves</p>
                            <p className="mt-1 text-sm leading-6 text-gray-300">{problem}</p>
                          </div>
                          <div>
                            <p className="text-xs font-black uppercase tracking-wide text-cyan-300">Typical deliverables</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {deliverables.map((item) => (
                                <span key={item} className="chip text-gray-300">{item}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-black uppercase tracking-wide text-cyan-300">Who it's for</p>
                            <p className="mt-1 text-sm leading-6 text-gray-300">{audience}</p>
                          </div>
                          <div className="flex flex-col gap-2 sm:flex-row">
                            <a href="#contact" className="btn btn-primary !px-4 !py-2.5 !text-sm">
                              Get a Quote <FaArrowRight className="text-xs" />
                            </a>
                            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-success !px-4 !py-2.5 !text-sm">
                              <FaWhatsapp className="text-sm" /> WhatsApp
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}