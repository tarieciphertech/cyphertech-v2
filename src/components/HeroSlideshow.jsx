import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { asset } from "../utils/paths";

/**
 * HeroSlideshow
 *
 * Lightweight, reusable full-bleed background slideshow for the homepage hero.
 * Uses the project's own Cypher brand imagery — no carousel library.
 *
 * - ~5.5s crossfade with a very subtle slow zoom (Ken Burns).
 * - Pauses on hover/focus.
 * - Respects `prefers-reduced-motion`: no autoplay, no zoom, instant swaps.
 * - First slide is eager + high priority; later slides lazy-load.
 * - Keyboard accessible (prev / next + dot indicators), no layout shift
 *   (absolute layers), subtle indicators so the imagery stays the focus.
 */
export default function HeroSlideshow({ slides, interval = 5500, paused: externalPaused = false }) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const reduced = useReducedMotion();

  const count = slides?.length ?? 0;
  // Pause when the parent hero is hovered/focused AND when the region itself is.
  const paused = externalPaused || hovering;

  useEffect(() => {
    if (reduced || paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [reduced, paused, count, interval]);

  if (count === 0) return null;

  const goTo = (i) => setIndex(((i % count) + count) % count);
  const fadeDuration = reduced ? 0 : 1400;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Cypher Technologies brand imagery"
      aria-live={reduced ? "off" : "polite"}
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      {/* Full-bleed slides */}
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.src}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity ease-in-out ${
              active ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: `${fadeDuration}ms` }}
          >
            <img
              src={asset(slide.src)}
              alt={active ? slide.alt : ""}
              className={`h-full w-full object-cover ${
                active && !reduced ? "animate-hero-zoom" : ""
              }`}
              style={{ objectPosition: slide.position || "center" }}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          </div>
        );
      })}

      {/* Readability overlays — stronger now for a dark, premium, cinematic
          hero while keeping the brand imagery recognizable. pointer-events-none
          so they never block. The directional layer is dark on the text side
          (L) and fades to transparent on the imagery side (R); a bottom scrim
          anchors the lower third. The source brand images are already very
          dark navy on their right halves, so the desktop gradient is tuned
          lighter on the imagery side than the baseline spec — otherwise the
          artwork collapses to black. Text side stays at full strength. Mobile
          keeps its existing (already proven) strength. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,2,10,0.86)_0%,rgba(5,2,10,0.7)_38%,rgba(5,2,10,0.45)_68%,rgba(5,2,10,0.22)_100%)] sm:bg-[linear-gradient(90deg,rgba(5,2,10,0.92)_0%,rgba(5,2,10,0.82)_30%,rgba(5,2,10,0.55)_50%,rgba(5,2,10,0.28)_70%,rgba(5,2,10,0.08)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,2,10,0.5)_0%,rgba(5,2,10,0.18)_38%,transparent_62%)]"
      />

      {/* Mobile — the text can sit over more of the image, so deepen the
          whole-hero darkness a touch while keeping the imagery visible. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,2,10,0.82)_0%,rgba(5,2,10,0.6)_55%,rgba(5,2,10,0.35)_100%)] sm:hidden"
      />

      {/* Controls — subtle, keyboard accessible. Chevrons are desktop-only;
          the dot indicators are the mobile + keyboard path. */}
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => goTo(index - 1)}
            className="absolute top-1/2 left-3 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/25 text-white/50 opacity-0 transition sm:grid hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => goTo(index + 1)}
            className="absolute top-1/2 right-3 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/25 text-white/50 opacity-0 transition sm:grid hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            <FaChevronRight className="text-sm" />
          </button>

          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-cyan-300/90" : "w-1.5 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
