import { FaEnvelope, FaExternalLinkAlt, FaLinkedin } from "react-icons/fa";
import { profile, team } from "../data/site";
import { asset } from "../utils/paths";
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

        {/* Founder — real portfolio preview + text presentation */}
        <div className="card mb-10 grid gap-6 p-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-start md:p-8">
          <a
            href={profile.portfolio}
            target="_blank"
            rel="noreferrer"
            className="group block overflow-hidden rounded-xl border border-white/10 bg-[#071022]"
            aria-label={`Open ${profile.owner}'s founder portfolio`}
          >
            <img
              src={asset("images/brand/founder-portfolio.webp")}
              alt={`Preview of ${profile.owner}'s founder portfolio website`}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          </a>
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
              <a href={profile.portfolio} target="_blank" rel="noreferrer" className="btn btn-secondary !px-4 !py-2.5 !text-sm">
                Founder Portfolio <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>
          </div>
        </div>

        {/* Disciplines covered */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {team.map(([title, copy]) => (
            <div key={title} className="border-t border-white/10 pt-5">
              <p className="text-sm font-black uppercase tracking-wide text-cyan-200">{title}</p>
              <p className="mt-3 leading-7 text-gray-400">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}