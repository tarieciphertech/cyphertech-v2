import { insideCypher } from "../data/site";
import { asset } from "../utils/paths";
import SectionTitle from "./SectionTitle";

/**
 * InsideCypher — an image collage that shows what the company is really doing:
 * building, deploying, securing, connecting, scaling and supporting real
 * technology. The staggered, slightly overlapping layout avoids a sterile
 * grid while every label maps to a real discipline.
 */
export default function InsideCypher() {
  return (
    <section id="inside-cypher" className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          title="Inside Cypher"
          copy="We don't just sell technology — we design, build, deploy, secure, and keep systems running for real businesses."
          centered
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
          {insideCypher.map((item, i) => (
            <div
              key={item.label}
              className={`relative rounded-xl border border-white/10 bg-[#071022] p-2 shadow-lg transition hover:z-20 hover:scale-[1.03] hover:shadow-cyan-300/5 md:${i % 2 ? "-mt-6" : "mt-0"}`}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={asset(item.image)}
                  alt={`${item.label} — ${item.caption}`}
                  className="aspect-[4/3] w-full object-cover object-center grayscale-[0.15]"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute top-2 left-2 bg-[#05020a]/70 px-2 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-cyan-200">
                  {item.label}
                </span>
              </div>
              <p className="mt-3 text-center text-sm text-gray-400">{item.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
