import { motion } from "framer-motion";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { profile } from "../data/site";
import HeroSlideshow from "./HeroSlideshow";

const heroSlides = [
  { src: "brand/cypher-security-hero.webp", alt: "Cypher Technologies cybersecurity brand visual", position: "center" },
  { src: "brand/cypher-services-showcase.webp", alt: "Cypher Technologies services showcase", position: "center" },
  { src: "images/brand/africa.webp", alt: "Cypher Technologies connected Africa brand visual", position: "center" },
];

export default function Hero() {
  return (
    <section id="home" className="hero-stage group relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-16">
      <HeroSlideshow slides={heroSlides} />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_72%_45%,rgba(34,211,238,0.12),transparent_28%),linear-gradient(90deg,rgba(5,2,10,0.97)_0%,rgba(5,2,10,0.82)_38%,rgba(5,2,10,0.3)_72%,rgba(5,2,10,0.62)_100%)]" />
      <div className="hero-grid pointer-events-none absolute inset-0 z-[3] opacity-30" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[4] h-32 bg-gradient-to-t from-[#05020a] to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="flex max-w-4xl flex-col">
          <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12, duration: 0.55 }} className="flex items-center gap-3">
            <span className="h-px w-10 bg-cyan-300" />
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-200">{profile.brand}</p>
          </motion.div>

          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:text-[5.4rem]">
            Technology that <span className="gradient-text">solves real problems.</span>
          </h1>

          <p className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-semibold uppercase tracking-[0.12em] text-cyan-100/90 sm:text-lg">
            {profile.tagline.split(" • ").map((item, i) => (
              <span key={item} className="inline-flex items-center">
                {i > 0 && <span className="mx-2 text-cyan-300/60">•</span>}
                {item}
              </span>
            ))}
          </p>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-200 sm:text-xl">{profile.positioning}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#contact" className="btn btn-primary hero-cta !px-7 !py-4 text-base">Start a Project <FaArrowRight className="text-xs" /></a>
            <a href="#projects" className="btn btn-secondary hero-cta !px-7 !py-4 text-base">Explore Our Work</a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-gray-400">
            <span>Software & business systems</span>
            <span>Cybersecurity & cloud</span>
            <span>IT & device repairs</span>
          </div>
        </motion.div>
      </div>

      <a href="#services" aria-label="Scroll to services" className="hero-scroll-indicator absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gray-400 sm:flex">
        <span>Explore</span>
        <FaChevronDown className="animate-bounce text-cyan-300" />
      </a>
    </section>
  );
}
