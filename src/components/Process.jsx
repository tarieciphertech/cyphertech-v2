import { process } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function Process() {
  return (
    <section id="process" className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          title="A clear, six-step path from idea to launch."
          copy="No black boxes. You always know what we are building, why, and what happens next."
        />

        <div className="grid gap-x-8 gap-y-12 border-t border-white/10 sm:grid-cols-2 xl:grid-cols-3">
          {process.map(([step, copy], index) => (
            <div key={step} className="pt-6">
              <p className="font-mono text-sm tracking-widest text-cyan-300/80">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-2xl font-black text-white">{step}</h3>
              <p className="mt-3 max-w-md leading-7 text-gray-400">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}