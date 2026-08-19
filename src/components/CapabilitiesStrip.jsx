import { capabilities } from "../data/site";

export default function CapabilitiesStrip() {
  return (
    <section aria-label="Core capabilities" className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {capabilities.map(([name, Icon]) => (
            <div key={name} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cyan-300/10 text-cyan-200">
                <Icon />
              </span>
              <span className="text-sm font-bold text-gray-100">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}