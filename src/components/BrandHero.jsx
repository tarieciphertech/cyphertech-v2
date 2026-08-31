import { FaArrowRight } from "react-icons/fa";
import { profile } from "../data/site";
import { asset } from "../utils/paths";

/**
 * BrandHero — a short, high-contrast closing statement for the home page.
 * Replaces the previous FinalCTA. A faint code-scene backdrop keeps the brand
 * visual present while the foreground stays crisp and readable.
 */
export default function BrandHero() {
  return (
    <section className="section-shell">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#071022]">
        <img
          src={asset("images/hero/code-scene.svg")}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-8"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[#05020a]/80" />

        <div className="relative px-5 py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
              Cypher Technologies
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              We build technology that works in the real world.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-gray-300">
              Software. Infrastructure. Security. Innovation.
            </p>

            <div className="mt-10 flex justify-center">
              <a href="#contact" className="btn btn-primary">
                Start a project <FaArrowRight />
              </a>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              {profile.email} · {profile.phone} · open {profile.hours}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
