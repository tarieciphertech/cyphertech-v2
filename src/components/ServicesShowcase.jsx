import { FaArrowRight } from "react-icons/fa";
import { servicesShowcase } from "../data/site";
import { asset } from "../utils/paths";
import SectionTitle from "./SectionTitle";

/**
 * ServicesShowcase — the visual "What We Build" section.
 *
 * Replaces the old text-card Services list with a bento grid of 7 headline
 * disciplines, each with a dedicated illustration, icon, short description and
 * a clear CTA. Cards vary: one featured card uses a media (image + text) layout,
 * the rest use an image-top card. No decorative "pill spam" above the heading.
 */
export default function ServicesShowcase() {
  return (
    <section id="services" className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          title="What we build."
          copy="Software. Web. Business systems. Cybersecurity. Cloud. AI automation. IT support. We build and run real technology end to end."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicesShowcase.map((svc, i) => {
            const isFeatured = i === 0;
            return (
              <article
                key={svc.name}
                className={`card group relative flex flex-col overflow-hidden ${
                  isFeatured ? "lg:col-span-3 lg:flex-row lg:items-center lg:gap-8" : ""
                }`}
              >
                <div
                  className={`relative shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#071022] ${
                    isFeatured ? "aspect-[16/9] w-full lg:w-5/12" : "aspect-[16/9] w-full"
                  }`}
                >
                  <img
                    src={asset(svc.image)}
                    alt={svc.alt || `Illustration for ${svc.name}`}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-3 left-3 grid h-8 w-8 place-items-center rounded-lg bg-[#060b14]/70 text-cyan-200 ring-1 ring-cyan-300/20">
                    <svc.Icon className="text-base" aria-hidden="true" />
                  </span>
                </div>

                <div className={`p-6 ${isFeatured ? "lg:w-7/12" : "w-full"}`}>
                  <h3 className="text-2xl font-black text-white">{svc.name}</h3>
                  <p className="mt-1 text-cyan-200">{svc.short}</p>
                  <p className="mt-3 leading-7 text-gray-300">{svc.desc}</p>
                  <div className="mt-5">
                    <a
                      href={svc.ctaHref}
                      className="btn btn-outline !px-5 !py-3 !text-sm"
                    >
                      {svc.cta} <FaArrowRight className="text-xs" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
