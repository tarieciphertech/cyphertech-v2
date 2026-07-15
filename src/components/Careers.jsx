import { FaBriefcase } from "react-icons/fa";

export default function Careers() {
  return (
    <section id="careers" className="px-5 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="glass flex flex-col gap-5 rounded-3xl p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-purple-400/10 text-purple-200">
              <FaBriefcase />
            </span>
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-purple-200">Careers</p>
              <h2 className="mt-2 text-2xl font-black text-white">Growing the team slowly and seriously.</h2>
              <p className="mt-2 max-w-2xl leading-7 text-gray-400">
                Cypher Technologies is not hiring loudly for the sake of looking big. We are building relationships with engineers, security-minded people, network technicians, and support professionals who care about useful work.
              </p>
            </div>
          </div>
          <a href="#contact" className="rounded-xl border border-white/15 px-5 py-3 text-center font-bold text-white transition hover:border-cyan-300/50 hover:bg-white/10">
            Introduce Yourself
          </a>
        </div>
      </div>
    </section>
  );
}
