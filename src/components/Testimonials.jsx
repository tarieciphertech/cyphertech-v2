import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % testimonials.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const [name, quote] = testimonials[active];

  return (
    <section className="section-shell bg-white/[0.025]">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <SectionTitle
          label="Testimonials"
          title="Trusted for clear thinking and dependable delivery."
          copy="Representative client feedback from the kinds of projects Cypher Technologies supports."
          centered
        />
        <div className="glass rounded-3xl p-8 md:p-12">
          <FaQuoteLeft className="mx-auto text-4xl text-cyan-200" />
          <p className="mx-auto mt-6 max-w-3xl text-2xl font-bold leading-10 text-white">"{quote}"</p>
          <p className="mt-6 font-black text-cyan-200">{name}</p>
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map(([item], index) => (
              <button
                key={item}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-2.5 rounded-full transition ${active === index ? "w-9 bg-cyan-300" : "w-2.5 bg-white/25"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
