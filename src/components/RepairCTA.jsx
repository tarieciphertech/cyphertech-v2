import { FaArrowRight, FaLaptop, FaMapMarkerAlt, FaMobileAlt, FaWhatsapp } from "react-icons/fa";

const whatsapp = "https://wa.me/26771493735?text=Hi%20CypherTech%2C%20I%20need%20a%20repair.%20My%20device%20is%3A%20";

export default function RepairCTA() {
  return (
    <section className="border-y border-cyan-300/10 bg-[#071022] py-12">
      <div className="mx-auto max-w-7xl px-5">
        <div className="rounded-2xl border border-cyan-300/15 bg-[#05020a] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Repairs & technical support</p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">Need a computer or phone repaired?</h2>
              <p className="mt-3 max-w-3xl leading-7 text-gray-400">CypherTech provides computer, laptop and mobile phone repair support in Gaborone and Tlokweng. <strong className="text-gray-200">On-site phone repair is available in Gaborone and Tlokweng</strong> for suitable repairs.</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400"><span className="inline-flex items-center gap-2"><FaLaptop className="text-cyan-300"/> Computer & laptop repair</span><span className="inline-flex items-center gap-2"><FaMobileAlt className="text-cyan-300"/> Mobile phone repair</span><span className="inline-flex items-center gap-2"><FaMapMarkerAlt className="text-cyan-300"/> Gaborone & Tlokweng</span></div>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end"><a href="/services/repair" className="btn btn-outline !px-5 !py-3">View repair services <FaArrowRight/></a><a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary !px-5 !py-3"><FaWhatsapp/> Request a repair</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
