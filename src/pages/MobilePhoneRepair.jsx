import { FaArrowLeft, FaCheckCircle, FaMapMarkerAlt, FaMobileAlt, FaPhone, FaWhatsapp, FaArrowRight } from "react-icons/fa";

const whatsapp = "https://wa.me/26771493735?text=Hi%20CypherTech%2C%20I%20need%20phone%20repair.%20My%20phone%20model%20is%20%5Bmodel%5D%2C%20the%20problem%20is%20%5Bproblem%5D%2C%20and%20my%20area%20is%20%5BGaborone%20or%20Tlokweng%5D.";
const services = [
  { title: "Samsung & Android repair", detail: "Samsung Galaxy and Android phone faults, software issues and device troubleshooting.", href: "/services/android-samsung-repair/" },
  { title: "iPhone repair", detail: "Share your iPhone model and symptoms so we can assess suitable repair options.", href: "/services/iphone-repair/" },
  { title: "Screen replacement", detail: "Cracked glass, display lines, black screens and touch-response problems.", href: "/services/phone-screen-replacement/" },
  { title: "Battery replacement", detail: "Rapid battery drain, unexpected shutdowns and charging-related faults.", href: "/services/phone-battery-replacement/" },
  { title: "Software & setup", detail: "Supported software troubleshooting, phone setup, data transfer and common device issues.", href: "/services/mobile-phone-repair/" },
  { title: "On-site phone support", detail: "Ask whether an on-site arrangement is practical for your device fault and location.", href: "/services/on-site-phone-repair-gaborone-tlokweng/" },
];

export default function MobilePhoneRepair() {
  return (
    <main className="min-h-screen bg-[#05020a] text-white">
      <nav className="border-b border-white/10 px-5 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/services/repair/" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200"><FaArrowLeft /> All repair services</a>
          <a href="/" className="font-black">Cypher<span className="text-cyan-300">Tech</span></a>
        </div>
      </nav>
      <section className="section-shell">
        <div className="mx-auto max-w-5xl px-5 py-10">
          <FaMobileAlt className="text-4xl text-cyan-300" />
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Phone repair · Gaborone & Tlokweng</p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">Phone repair in Gaborone & Tlokweng</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">Contact CypherTech for a practical assessment of phone faults, including Samsung and Android issues, iPhone enquiries, cracked screens, battery and charging problems, and supported software faults. We confirm the repair route and parts availability for your exact model before promising a repair.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary !px-6 !py-3"><FaWhatsapp /> Ask about phone repair</a>
            <a href="tel:+26771493735" className="btn btn-outline !px-6 !py-3"><FaPhone /> Call +267 71 493 735</a>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-400">
            <a className="inline-flex items-center gap-2 text-cyan-200 hover:underline" href="/locations/gaborone/phone-repair/"><FaMapMarkerAlt /> Phone repair in Gaborone</a>
            <a className="inline-flex items-center gap-2 text-cyan-200 hover:underline" href="/locations/tlokweng/phone-repair/"><FaMapMarkerAlt /> Phone repair serving Tlokweng</a>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <a key={service.title} href={service.href} className="card group block p-5 transition hover:border-cyan-300/40">
                <div className="flex items-start gap-3"><FaCheckCircle className="mt-1 shrink-0 text-cyan-300" /><div><h2 className="text-lg font-black">{service.title}</h2><p className="mt-2 text-sm leading-6 text-gray-400">{service.detail}</p><span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-cyan-200">Explore service <FaArrowRight /></span></div></div>
              </a>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-cyan-300/20 bg-[#071022] p-6">
            <h2 className="text-2xl font-black">Before you travel, message us</h2>
            <p className="mt-2 text-gray-400">Tell us your phone model, the fault and your area. We’ll confirm suitable options, parts availability and whether on-site support is practical before you make arrangements.</p>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 font-bold text-cyan-200 hover:underline"><FaWhatsapp /> Start a WhatsApp repair request <FaArrowRight /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
