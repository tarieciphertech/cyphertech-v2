import { process } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function Process() {
  return (
    <section id="process" className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="How We Work"
          title="A clear, six-step path from idea to launch."
          copy="No black boxes. You always know what we are building, why, and what happens next."
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {process.map(([step, copy], index) => (
            <div key={step} className="card p-6">
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-300/10 font-black text-cyan-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-black text-white">{step}</h3>
              </div>
              <p className="mt-4 leading-7 text-gray-400">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}