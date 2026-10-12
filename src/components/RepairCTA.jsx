import { FaArrowRight, FaLaptop, FaMapMarkerAlt, FaMobileAlt, FaWhatsapp } from "react-icons/fa";

const whatsapp = "https://wa.me/26771493735?text=Hi%20CypherTech%2C%20I%20need%20phone%20repair.%20My%20phone%20model%20and%20problem%20are%3A%20";

export default function RepairCTA() {
  return (
    <section className="border-y border-cyan-300/10 bg-[#071022] py-12">
      <div className="mx-auto max-w-7xl px-5">
        <div className="rounded-2xl border border-cyan-300/15 bg-[#05020a] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Phone repair • Gaborone & Tlokweng</p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">Phone giving you trouble? Let's assess it.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-gray-400">Mobile phone repair is a key CypherTech service. Tell us your phone model and fault for guidance on diagnostics, screen and battery replacement, charging problems, software issues and available repair options. On-site phone support can be requested for suitable repairs in Gaborone and Tlokweng.</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
                <a className="inline-flex items-center gap-2 hover:text-cyan-200" href="/locations/gaborone/phone-repair/"><FaMobileAlt className="text-cyan-300"/> Phone repair in Gaborone</a>
                <a className="inline-flex items-center gap-2 hover:text-cyan-200" href="/locations/tlokweng/phone-repair/"><FaMapMarkerAlt className="text-cyan-300"/> Phone repair in Tlokweng</a>
                <a className="inline-flex items-center gap-2 hover:text-cyan-200" href="/services/android-samsung-repair/">Samsung & Android</a>
                <a className="inline-flex items-center gap-2 hover:text-cyan-200" href="/services/iphone-repair/">iPhone repair</a>
                <a className="inline-flex items-center gap-2 hover:text-cyan-200" href="/services/phone-screen-replacement/">Screen replacement</a>
                <a className="inline-flex items-center gap-2 hover:text-cyan-200" href="/services/phone-battery-replacement/">Battery replacement</a>
              </div>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500"><FaLaptop className="text-cyan-300"/> Computer and laptop repair also available.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href="/services/mobile-phone-repair/" className="btn btn-outline !px-5 !py-3">Phone repair services <FaArrowRight/></a>
              <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary !px-5 !py-3"><FaWhatsapp/> Ask about my phone</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
