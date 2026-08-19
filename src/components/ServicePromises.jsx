import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { servicePromises } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function ServicePromises() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % servicePromises.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const [title, promise] = servicePromises[active];

  return (
    <section className="section-shell bg-white/[0.025]">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <SectionTitle
          label="Our Promise"
          title="The standard we hold every project to."
          copy="Four commitments behind every engagement — from the first call to handover and beyond."
          centered
        />
        <div className="glass rounded-3xl p-8 md:p-12">
          <FaQuoteLeft className="mx-auto text-4xl text-cyan-200" />
          <p className="mx-auto mt-6 max-w-3xl text-2xl font-bold leading-10 text-white">"{promise}"</p>
          <p className="mt-6 font-black text-cyan-200">{title}</p>
          <p className="mt-1 text-sm font-semibold text-gray-500">Cypher Technologies — Delivery Standard</p>
          <div className="mt-8 flex justify-center gap-2">
            {servicePromises.map(([item], index) => (
              <button
                key={item}
                type="button"
                aria-label={`Show promise ${index + 1}`}
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
