import { techStack } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function Technologies() {
  return (
    <section className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Technology Stack"
          title="Modern tools for robust digital products."
          copy="We choose proven technologies that support maintainability, deployment speed, security, and scale."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {techStack.map(([name, Icon]) => (
            <div key={name} className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-center transition hover:border-cyan-300/40 hover:bg-white/[0.08]">
              <Icon className="text-3xl text-cyan-200" />
              <p className="mt-3 font-black text-gray-100">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
