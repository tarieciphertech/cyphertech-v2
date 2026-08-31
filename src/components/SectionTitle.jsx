/**
 * SectionTitle — minimal, typography-only section heading.
 *
 * Deliberately does NOT render the old `label` "pill" above headings
 * (that was removed as part of the anti-AI-template redesign). Only
 * `title` and an optional `copy` subtitle are rendered as strong typography.
 */
export default function SectionTitle({ title, copy, centered = false }) {
  const container = centered
    ? "mx-auto max-w-3xl text-center"
    : "max-w-4xl";
  return (
    <div className={`mb-12 ${container}`}>
      <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">
        {title}
      </h2>
      {copy && (
        <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-400">
          {copy}
        </p>
      )}
    </div>
  );
}

