import { FaExternalLinkAlt, FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";
import { profile } from "../data/site";
import SectionTitle from "./SectionTitle";

const values = [
  ["Security", "We design with safer access, cleaner data flows, and long-term trust in mind.", FaShieldAlt],
  ["Execution", "We ship practical solutions that solve real workflow and infrastructure problems.", FaRocket],
  ["Partnership", "We communicate clearly and build around the people who will use the system.", FaUsers],
];

export default function About() {
  return (
    <section id="about" className="section-shell bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="About Us"
          title="A modern African technology company built for practical innovation."
          copy="Cypher Technologies exists to help businesses and organizations use technology securely, efficiently, and creatively."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card rounded-2xl p-6 lg:col-span-2">
            <h3 className="text-2xl font-black text-white">Who We Are</h3>
            <p className="mt-4 leading-8 text-gray-300">{profile.positioning}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-black uppercase tracking-wide text-cyan-200">Mission</p>
                <p className="mt-3 leading-7 text-gray-300">{profile.mission}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-black uppercase tracking-wide text-purple-200">Vision</p>
                <p className="mt-3 leading-7 text-gray-300">{profile.vision}</p>
              </div>
            </div>
          </div>

          <div className="card rounded-2xl p-6">
            <p className="text-sm font-black uppercase tracking-wide text-cyan-200">Founder</p>
            <h3 className="mt-3 text-2xl font-black text-white">{profile.owner}</h3>
            <p className="mt-1 font-semibold text-gray-300">{profile.role}</p>
            <p className="mt-5 leading-7 text-gray-400">
              Tarie Cipher leads Cypher Technologies with a hands-on background in full-stack development, cybersecurity fundamentals, Linux administration, networking, and technical support. His focus is building useful systems that help clients operate with more confidence.
            </p>
            <a
              href={profile.portfolio}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline mt-6 !px-5 !py-3 !text-sm"
            >
              View Founder Portfolio <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {values.map(([title, copy, Icon]) => (
            <div key={title} className="card p-6">
              <Icon className="text-3xl text-cyan-200" />
              <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
              <p className="mt-3 leading-7 text-gray-400">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}