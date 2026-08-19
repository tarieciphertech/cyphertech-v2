import { techGroups, techStack } from "../data/site";
import SectionTitle from "./SectionTitle";

// Build a name -> Icon lookup from the centralized techStack data.
const iconLookup = Object.fromEntries(techStack.map(([name, Icon]) => [name, Icon]));

export default function Technologies() {
  return (
    <section className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Technology Stack"
          title="Modern tools for robust digital products."
          copy="We choose proven technologies that support maintainability, deployment speed, security, and scale — grouped by the discipline they serve."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {techGroups.map(([group, names]) => (
            <div key={group} className="card p-6">
              <h3 className="text-lg font-black text-white">{group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {names.map((name) => {
                  const Icon = iconLookup[name];
                  return (
                    <span key={name} className="chip !py-2 text-gray-200">
                      {Icon && <Icon className="text-cyan-300" />} {name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}