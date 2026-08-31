/**
 * AnimatedBackground
 *
 * Subtle, restrained motion for the hero (and reusable dark sections):
 *   - two very faint colour orbs (no heavy glow/blur)
 *   - a fine dot-grid that slowly "breathes"
 *
 * All CSS animations here are disabled automatically for users who
 * `prefers-reduced-motion`, via the global rule in src/index.css.
 */
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Faint ambient orbs — low opacity, no blur bloom */}
      <div className="absolute inset-0 opacity-[0.035]">
        <div className="absolute top-[-12rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-cyan-400" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[24rem] w-[24rem] rounded-full bg-emerald-400" />
      </div>
      {/* Fine dot-grid that breathes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(15,23,43,0.9)_1px,transparent_1px)] [background-size:34px_34px] opacity-[0.07] animate-breathe" />
    </div>
  );
}
