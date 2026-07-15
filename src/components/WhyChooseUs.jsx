import { FaCheckCircle } from "react-icons/fa";
import { benefits } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  return (
    <section className="section-shell bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <SectionTitle
            label="Why Choose Us"
            title="You get the technical work without the technical fog."
            copy="A good build should leave you feeling more in control, not more dependent. We explain the tradeoffs, keep the scope honest, and build with the people who will use the system in mind."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <FaCheckCircle className="shrink-0 text-cyan-300" />
                <span className="font-bold text-gray-100">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
