import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { profile } from "../data/site";
import HeroSlideshow from "./HeroSlideshow";

// Real Cypher brand imagery used as the full-bleed hero background slideshow.
// - cypher-security-hero.webp      -> dark scene, glowing central focal ✅
// - cypher-services-showcase.webp  -> dark scene, service panels, dark center ✅
// - africa.webp                    -> dark Africa network map, on-brand ("across
//   Africa"), from the brand-images repo ✅
const heroSlides = [
  {
    src: "brand/cypher-security-hero.webp",
    alt: "Cypher Technologies cybersecurity brand visual — glowing shield motif over the brand navy",
    position: "center",
  },
  {
    src: "brand/cypher-services-showcase.webp",
    alt: "Cypher Technologies services showcase brand visual over the brand navy",
    position: "center",
  },
  {
    src: "images/brand/africa.webp",
    alt: "Cypher Technologies brand visual — dark map of Africa with connected glowing points",
    position: "center",
  },
];

export default function Hero() {
  const [hovering, setHovering] = useState(false);

  return (
    <section
      id="home"
      className="group relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-16"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      <HeroSlideshow slides={heroSlides} paused={hovering} />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex max-w-3xl flex-col"
        >
          {/* Brand — plain typography, deliberately not a pill/badge */}
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-200">
            {profile.brand}
          </p>

          <h1 className="mt-4 text-4xl font-black leading-[1.04] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Technology that{" "}
            <span className="gradient-text">solves real problems.</span>
          </h1>

          {/* Discipline line — plain typography, not a badge */}
          <p className="mt-6 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xl text-cyan-100">
            {profile.tagline.split(" • ").map((item, i) => (
              <span key={item} className="inline-flex items-center">
                {i > 0 && <span className="mx-1 text-cyan-300">•</span>}
                {item}
              </span>
            ))}
          </p>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            {profile.positioning}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#contact" className="btn btn-primary !px-7 !py-4 text-base">
              Start a Project <FaArrowRight className="text-xs" />
            </a>
            <a href="#projects" className="btn btn-secondary !px-7 !py-4 text-base">
              Explore Our Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

