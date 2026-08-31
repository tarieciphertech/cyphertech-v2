import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";
import ProjectFrame from "./ProjectFrame";
import ImageLightbox from "./ImageLightbox";

/**
 * ProjectSlideshow
 *
 * Reusable, accessible slideshow for a project's screen shots.
 * - Automatic rotation (~5s) that pauses on hover/focus.
 * - Manual Prev / Next + dot indicators + keyboard support.
 * - Click the frame to open a full-screen lightbox.
 * - Honours `prefers-reduced-motion` (no autoplay, no transitions).
 *
 * Layout note: all controls sit INSIDE the frame so it composes cleanly inside
 * the Project case-study grid without pushing sibling content.
 */
export default function ProjectSlideshow({ slides, autoplay = true }) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const reduced = useReducedMotion();

  const multiple = slides && slides.length > 1;

  // Autoplay — disabled for reduced motion and when hovering/focused.
  useEffect(() => {
    if (!autoplay || !multiple || reduced) return;
    if (hovering) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [autoplay, multiple, reduced, hovering, slides]);

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  if (!slides || slides.length === 0) return null;
  const slide = slides[index];

  const frameNode = (
    <ProjectFrame src={slide.src} alt={slide.alt} label={slide.label} />
  );

  return (
    <div className="group relative w-full">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Project screenshots"
        aria-live={reduced ? "off" : "polite"}
        className="relative inline-block w-full cursor-zoom-in outline-none"
        onClick={() => setLightboxOpen(true)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        tabIndex={0}
      >
        {reduced ? (
          <div key={index}>{frameNode}</div>
        ) : (
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {frameNode}
            </motion.div>
          </AnimatePresence>
        )}

        <button
          type="button"
          aria-label="Open fullscreen"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(true);
          }}
          className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-md border border-white/15 bg-black/40 text-gray-300 opacity-0 transition group-hover:opacity-100 hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-200"
        >
          <FaExpand className="text-xs" />
        </button>

        {multiple && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute top-1/2 left-2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/40 text-gray-300 opacity-0 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-200 group-hover:opacity-100"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute top-1/2 right-2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/40 text-gray-300 opacity-0 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-200 group-hover:opacity-100"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </>
        )}
      </div>

      {multiple && (
        <div className="mt-2 flex justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition ${i === index ? "w-6 bg-cyan-300" : "w-2 bg-white/25"}`}
            />
          ))}
        </div>
      )}

      <ImageLightbox
        open={lightboxOpen}
        slides={slides}
        startIndex={index}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
