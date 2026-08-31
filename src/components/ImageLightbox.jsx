import { useState, useEffect } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProjectFrame from "./ProjectFrame";

/**
 * ImageLightbox
 *
 * Full-screen modal slideshow. Re-uses ProjectFrame so placeholders behave
 * consistently between the inline slideshow and the enlarged view. Supports
 * keyboard navigation (← / → / Esc), click-away close, and touch swipe.
 */
export default function ImageLightbox({ open, slides, startIndex, onClose }) {
  const hasSlides = slides && slides.length > 0;
  const initial = Math.min(startIndex ?? 0, hasSlides ? slides.length - 1 : 0);
  const [index, setIndex] = useState(initial);

  useEffect(() => {
    if (open) {
      setIndex(initial);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, initial]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // touch swipe
  const [startX, setStartX] = useState(0);
  const onTouchStart = (e) => setStartX(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 60) (dx > 0 ? goPrev : goNext)();
  };

  function goPrev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }
  function goNext() {
    setIndex((i) => (i + 1) % slides.length);
  }
  if (!hasSlides || !open) return null;

  const slide = slides[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Project screenshot preview"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Panel (stop propagation so clicks inside don't close) */}
      <div
        className="relative mx-4 max-w-5xl"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <ProjectFrame
          src={slide.src}
          alt={slide.alt}
          label={slide.label}
          className="shadow-[0_0_60px_rgba(34,211,238,0.25)]"
        />

        {/* Close */}
        <button
          type="button"
          aria-label="Close preview"
          onClick={onClose}
          className="absolute -top-2 -right-2 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-[#1e293b] text-gray-300 hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-200"
        >
          <FaTimes />
        </button>

        {/* Prev / Next */}
        <button
          type="button"
          aria-label="Previous screenshot"
          onClick={goPrev}
          className="absolute top-1/2 -left-2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-[#1e293b] text-gray-300 hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-200"
        >
          <FaChevronLeft />
        </button>
        <button
          type="button"
          aria-label="Next screenshot"
          onClick={goNext}
          className="absolute top-1/2 -right-2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-[#1e293b] text-gray-300 hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-200"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
            }}
            className={`h-2 rounded-full transition ${i === index ? "w-6 bg-cyan-300" : "w-2 bg-white/25"}`}
          />
        ))}
      </div>
    </div>
  );
}
