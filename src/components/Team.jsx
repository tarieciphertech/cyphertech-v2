import { FaUserTie } from "react-icons/fa";
import { team } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function Team() {
  return (
    <section className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Team"
          title="Built by specialists, growing with intention."
          copy="Cypher Technologies is structured around the disciplines modern clients need most: software, security, networking, infrastructure, and support."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {team.map(([title, copy]) => (
            <div key={title} className="glass rounded-2xl p-6">
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
