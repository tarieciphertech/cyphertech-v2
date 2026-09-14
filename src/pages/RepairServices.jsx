import { FaArrowRight, FaCheckCircle, FaLaptop, FaMapMarkerAlt, FaMobileAlt, FaPhone, FaShieldAlt, FaTools, FaWhatsapp } from "react-icons/fa";

const whatsapp = "https://wa.me/26771493735?text=Hi%20CypherTech%2C%20I%20need%20a%20repair%20service.%20My%20device%20is%3A%20";

const repairTypes = [
  { title: "Computer & Laptop Repair", icon: FaLaptop, href: "/services/computer-repair", copy: "Diagnostics, software repair, operating-system issues, upgrades, setup, maintenance and troubleshooting for laptops and desktop computers." },
  { title: "Mobile Phone Repair", icon: FaMobileAlt, href: "/services/mobile-phone-repair", copy: "Phone diagnostics, software fixes, setup, data transfer and device support — with on-site phone repair service available in Gaborone and Tlokweng." },
  { title: "Business IT Support", icon: FaShieldAlt, href: "/#contact", copy: "Keep your business working with responsive technical support, networking, maintenance, security and device troubleshooting." },
];

const problems = ["Slow or freezing computer", "Windows or software problems", "Laptop or desktop diagnostics", "Phone software problems", "Phone setup and data transfer", "Device upgrades and maintenance"];

export default function RepairServices() {
  return (
    <main className="min-h-screen bg-[#05020a] text-white">
      <nav className="border-b border-white/10 bg-[#05020a]/95 px-5 py-4 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4"><a href="/" className="font-black tracking-tight text-white">Cypher<span className="text-cyan-300">Tech</span></a><a href="/#contact" className="btn btn-outline !px-4 !py-2 !text-sm">Contact us</a></div></nav>

      <section className="relative overflow-hidden border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-16 sm:py-24"><div className="max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Device Repair • Gaborone • Tlokweng</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Computer & Phone Repair in Gaborone and Tlokweng</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl">CypherTech provides practical computer, laptop and mobile phone repair support for individuals and businesses. Need a phone fixed without carrying it to a shop? Ask about our <strong className="text-white">on-site mobile phone repair service in Gaborone and Tlokweng</strong>.</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary !px-6 !py-3"><FaWhatsapp /> Request a repair on WhatsApp</a><a href="tel:+26771493735" className="btn btn-outline !px-6 !py-3"><FaPhone /> Call +267 71 493 735</a></div>
        <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-400"><span className="inline-flex items-center gap-2"><FaMapMarkerAlt className="text-cyan-300" /> Gaborone & Tlokweng</span><span className="inline-flex items-center gap-2"><FaTools className="text-cyan-300" /> On-site support available</span></div>
      </div></div></section>

      <section className="section-shell"><div className="mx-auto max-w-7xl px-5"><div className="grid gap-5 md:grid-cols-3">{repairTypes.map(({ title, icon: Icon, href, copy }) => <article key={title} className="card p-6"><Icon className="text-3xl text-cyan-300" aria-hidden="true" /><h2 className="mt-5 text-xl font-black">{title}</h2><p className="mt-3 leading-7 text-gray-400">{copy}</p><a href={href} className="mt-6 inline-flex items-center gap-2 font-bold text-cyan-200 hover:text-white">Learn more <FaArrowRight className="text-xs" /></a></article>)}</div></div></section>

      <section className="border-y border-white/10 bg-[#071022] py-16"><div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Common repair problems</p><h2 className="mt-3 text-3xl font-black">Tell us what is wrong. We'll help you find the next step.</h2><p className="mt-4 leading-7 text-gray-400">Not sure what the problem is? That's fine. Start with the symptoms and the device model, and we'll advise on the repair process.</p></div><ul className="grid gap-3 sm:grid-cols-2">{problems.map((problem) => <li key={problem} className="flex items-start gap-3 rounded-lg border border-white/10 bg-[#05020a] p-4 text-gray-300"><FaCheckCircle className="mt-1 shrink-0 text-cyan-300" />{problem}</li>)}</ul></div></section>

      <section className="section-shell"><div className="mx-auto max-w-5xl px-5 text-center"><FaTools className="mx-auto text-4xl text-cyan-300" aria-hidden="true" /><h2 className="mt-4 text-3xl font-black">Need a phone repaired at your location?</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-400">For customers in Gaborone and Tlokweng, contact us before travelling. We'll confirm the device, fault and whether the repair can be handled on-site.</p><div className="mt-7 flex justify-center gap-3 flex-wrap"><a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary !px-6 !py-3"><FaWhatsapp /> WhatsApp CypherTech</a><a href="/#contact" className="btn btn-outline !px-6 !py-3">Send a repair enquiry</a></div></div></section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-gray-500"><a href="/" className="font-bold text-gray-300">CypherTech</a> · Computer, laptop, mobile phone and IT support in Gaborone, Tlokweng and beyond.</footer>
    </main>
  );
}
