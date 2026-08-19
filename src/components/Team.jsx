import { FaEnvelope, FaLinkedin, FaUserTie } from "react-icons/fa";
import { profile, team } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function Team() {
  return (
    <section className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Team"
          title="Founder-led, growing with intention."
          copy="Cypher Technologies is led hands-on by its founder and covers the disciplines modern clients need most — bringing in trusted specialists as projects demand."
        />

        {/* Founder — text-first presentation (no portrait asset exists) */}
        <div className="card mb-10 grid gap-6 p-6 md:grid-cols-[auto_1fr] md:items-center md:p-8">
          <div className="grid h-24 w-24 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300/20 to-purple-400/20 text-4xl text-cyan-200">
            <FaUserTie />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-cyan-200">Founder & CEO</p>
            <h3 className="mt-1 text-2xl font-black text-white md:text-3xl">{profile.owner}</h3>
            <p className="mt-3 max-w-2xl leading-7 text-gray-400">
              Tarie Cipher leads Cypher Technologies with a hands-on background in full-stack development, cybersecurity fundamentals, Linux administration, networking, and technical support. His focus is building useful systems that help clients operate with more confidence.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-outline !px-4 !py-2.5 !text-sm">
                <FaEnvelope className="text-sm" /> Email
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary !px-4 !py-2.5 !text-sm">
                <FaLinkedin className="text-sm" /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Disciplines covered */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {team.map(([title, copy]) => (
            <div key={title} className="card p-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">
                <FaUserTie />
              </span>
              <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
              <p className="mt-3 leading-7 text-gray-400">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}