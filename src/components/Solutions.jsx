import { motion } from "framer-motion";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { industries, profile, solutions } from "../data/site";
import SectionTitle from "./SectionTitle";

const whatsappUrl = `${profile.whatsapp}?text=${encodeURIComponent(
  "Hello Cypher Technologies, I'd like to discuss a solution.",
)}`;

export default function Solutions() {
  return (
    <section id="solutions" className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Solutions"
          title="What technology problem can we help you solve?"
          copy="Tell us what you're trying to achieve — we'll match it to the right approach."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map(([problem, overview, whatWeProvide, Icon]) => (
            <motion.article key={problem} whileHover={{ y: -7 }} className="card flex flex-col p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-purple-400/10 text-xl text-purple-200">
                  <Icon />
                </span>
                <a
                  href="#contact"
                  aria-label={`Discuss: ${problem}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
                >
                  <FaArrowRight />
                </a>
              </div>
              <h3 className="text-xl font-black text-white">{problem}</h3>
              <p className="mt-3 leading-7 text-gray-400">{overview}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {whatWeProvide.map((item) => (
                  <span key={item} className="chip text-gray-300">{item}</span>
                ))}
              </div>
              <div className="mt-auto pt-5">
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline !px-4 !py-2.5 !text-sm">
                  <FaWhatsapp className="text-sm" /> Discuss This
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14">
          <p className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-gray-500">Industries we serve</p>
          <div className="flex flex-wrap gap-2">
            {industries.map(([name, Icon]) => (
              <span key={name} className="chip !py-2 text-gray-300">
                <Icon className="text-cyan-300" /> {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}