export default function SectionTitle({ label, title, copy, centered = false }) {
  return (
    <div className={`mb-12 ${centered ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}`}>
      <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-cyan-300">{label}</p>
      <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">{title}</h2>
      {copy && <p className="mt-5 text-lg leading-8 text-gray-400">{copy}</p>}
    </div>
  );
}
