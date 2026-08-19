import { FaBookOpen, FaCheckCircle, FaComments, FaShieldAlt } from "react-icons/fa";
import { servicePromises } from "../data/site";
import SectionTitle from "./SectionTitle";

const promiseIcons = {
  "Clear communication": FaComments,
  "Security by design": FaShieldAlt,
  "Systems your team can run": FaBookOpen,
  "Honest scoping": FaCheckCircle,
};

export default function WhyChooseUs() {
  return (
    <section className="section-shell bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Why Cypher Technologies"
          title="A partner you can trust with the work that matters."
          copy="These are the standards behind every engagement — not marketing talk."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {servicePromises.map(([title, copy]) => {
            const Icon = promiseIcons[title] || FaCheckCircle;
            return (
              <div key={title} className="card flex gap-5 p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-xl text-cyan-200">
                  <Icon />
                </span>
                <div>
                  <h3 className="text-xl font-black text-white">{title}</h3>
                  <p className="mt-2 leading-7 text-gray-400">{copy}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}