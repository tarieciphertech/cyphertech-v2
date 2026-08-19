import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { profile } from "../data/site";

const whatsappUrl = `${profile.whatsapp}?text=${encodeURIComponent(
  "Hello Cypher Technologies, I would like to discuss a project.",
)}`;

export default function FinalCTA() {
  return (
    <section id="cta" className="px-5 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-cyan-300/25 bg-[#071022] px-6 py-14 text-center md:px-12">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="relative">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">Let's build something</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight text-white md:text-5xl">
              Have a technology project in mind?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
              Tell us what you're building, what you're trying to solve, or what needs fixing.
              We'll respond within one business day.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="#contact" className="btn btn-primary">
                Get a Quote <FaArrowRight />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-success">
                <FaWhatsapp className="text-lg" /> WhatsApp Us
              </a>
            </div>
            <p className="mt-6 text-sm font-semibold text-gray-500">
              {profile.email} · {profile.phone} · {profile.hours}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}