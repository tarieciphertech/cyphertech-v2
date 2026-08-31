import { asset } from "../utils/paths";

/**
 * ProjectFrame
 *
 * A consistent "browser window" frame for the project portfolio. When a real
 * screenshot `src` is supplied it renders the image; otherwise it renders a
 * clearly-labelled placeholder so the layout stays visual without fabricating
 * screenshots. Drop a real image path into the project's `slides` data and the
 * placeholder disappears automatically.
 */
export default function ProjectFrame({ src, alt, label, className }) {
  const isPlaceholder = !src;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#071022] ${className || ""}`}
      aria-label={label}
    >
      {/* Browser chrome */}
      <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-white/10 px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#facc15]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
        <span className="ml-2 text-[11px] text-[#64748b]">{label}</span>
      </div>

      <div className="relative aspect-[16/9] w-full bg-[#0a0f1a]">
        {isPlaceholder ? (
          <PlaceholderView alt={alt} label={label} />
        ) : (
          <img
            src={asset(src)}
            alt={alt}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
    </div>
  );
}

/**
 * PlaceholderView — an honest, clearly-marked placeholder. It never pretends to
 * be a product screenshot.
 */
function PlaceholderView({ alt, label }) {
  return (
    <svg
      viewBox="0 0 320 180"
      className="h-full w-full"
      role="img"
      aria-label={alt}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern id="ph-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M-2 0 L2 -2 M0 16 L16 0" stroke="#1e293b" stroke-width="1" opacity="0.6"/>
        </pattern>
      </defs>
      <rect width="320" height="180" fill="url(#ph-grid)" />

      <g transform="translate(160,92)" text-anchor="middle">
        <svg
          x="-52"
          y="-52"
          width="104"
          height="104"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#475569"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="4"/>
          <polyline points="2 10 10 2 22 14 18 22"/>
        </svg>
        <text x="0" y="56" fill="#94a3b8" font-size="12" font-family="ui-monospace,monospace">
          Screenshot placeholder
        </text>
        <text x="0" y="74" fill="#64748b" font-size="11" font-family="ui-monospace,monospace">
          {label}
        </text>
      </g>
    </svg>
  );
}
