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
        <div className="mt-8 grid gap-5 lg:grid-cols-3" aria-label="Explore CypherTech repair services">
          <div className="rounded-2xl border border-white/10 bg-[#05020a] p-5">
            <h3 className="text-lg font-black text-white">Phone repair</h3>
            <p className="mt-1 text-sm text-gray-400">Model-specific support and common phone faults.</p>
            <div className="mt-4 grid gap-2 text-sm font-semibold text-cyan-200">
              <a href="/services/mobile-phone-repair/">Mobile phone repair</a>
              <a href="/services/android-samsung-repair/">Samsung & Android repair</a>
              <a href="/services/iphone-repair/">iPhone repair</a>
              <a href="/services/phone-screen-replacement/">Phone screen replacement</a>
              <a href="/services/phone-battery-replacement/">Phone battery replacement</a>
              <a href="/services/on-site-phone-repair-gaborone-tlokweng/">On-site phone repair</a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05020a] p-5">
            <h3 className="text-lg font-black text-white">Computer & laptop repair</h3>
            <p className="mt-1 text-sm text-gray-400">Diagnostics, software faults and hardware enquiries.</p>
            <div className="mt-4 grid gap-2 text-sm font-semibold text-cyan-200">
              <a href="/services/computer-repair/">Computer repair</a>
              <a href="/services/laptop-repair/">Laptop repair</a>
              <a href="/services/laptop-screen-replacement/">Laptop screen replacement</a>
              <a href="/services/computer-diagnostics/">Computer diagnostics</a>
              <a href="/services/windows-software-repair/">Windows & software repair</a>
              <a href="/services/virus-malware-removal/">Virus & malware removal</a>
              <a href="/services/data-recovery/">Data recovery</a>
              <a href="/services/business-computer-repair/">Business computer repair</a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05020a] p-5">
            <h3 className="text-lg font-black text-white">Repair in your area</h3>
            <p className="mt-1 text-sm text-gray-400">Local service information for Gaborone and Tlokweng.</p>
            <div className="mt-4 grid gap-2 text-sm font-semibold text-cyan-200">
              <a href="/locations/gaborone/phone-repair/">Phone repair in Gaborone</a>
              <a href="/locations/tlokweng/phone-repair/">Phone repair in Tlokweng</a>
              <a href="/locations/gaborone/computer-repair/">Computer repair in Gaborone</a>
              <a href="/locations/tlokweng/computer-repair/">Computer repair in Tlokweng</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
