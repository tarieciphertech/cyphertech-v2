import { FaArrowRight, FaCheckCircle, FaLaptop, FaMapMarkerAlt, FaMobileAlt, FaPhone, FaShieldAlt, FaTools, FaWhatsapp, FaHome, FaTruck, FaBriefcase } from "react-icons/fa";

const whatsapp = "https://wa.me/26771493735?text=Hi%20CypherTech%2C%20I%20need%20a%20repair%20service.%20My%20device%20is%3A%20";
const logo = "https://cyphertech.co.zw/brand/cypher-logo-dark.webp";

const repairTypes = [
  {
    title: "Computer & Laptop Repair",
    icon: FaLaptop,
    href: "/services/computer-repair",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=82",
    alt: "Laptop computer on a repair workspace",
    copy: "Slow machines, Windows problems, hardware faults, diagnostics, upgrades and everyday computer issues.",
  },
  {
    title: "Mobile Phone Repair",
    icon: FaMobileAlt,
    href: "/services/mobile-phone-repair",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=1200&q=82",
    alt: "Smartphone being handled for repair",
    copy: "Screen, battery, charging, software and other smartphone problems. Ask us about on-site repair in Gaborone and Tlokweng.",
  },
  {
    title: "Business IT Support",
    icon: FaShieldAlt,
    href: "/services/business-computer-repair",
    image: "https://cyphertech.co.zw/images/services/it-support.webp",
    alt: "CypherTech IT support service",
    copy: "Keep your business moving with technical support, computer maintenance, networking, security and troubleshooting.",
  },
];

const repairServices = [
  ["Laptop repair", "/services/laptop-repair/"],
  ["Laptop screen replacement", "/services/laptop-screen-replacement/"],
  ["Computer diagnostics", "/services/computer-diagnostics/"],
  ["Windows & software repair", "/services/windows-software-repair/"],
  ["Virus & malware removal", "/services/virus-malware-removal/"],
  ["Data recovery", "/services/data-recovery/"],
  ["Phone screen replacement", "/services/phone-screen-replacement/"],
  ["Phone battery replacement", "/services/phone-battery-replacement/"],
  ["Android & Samsung repair", "/services/android-samsung-repair/"],
  ["iPhone repair", "/services/iphone-repair/"],
];

const problems = [
  "My phone won't charge",
  "My screen is cracked or not responding",
  "My laptop won't start",
  "My computer is slow or freezing",
  "Windows keeps showing errors",
  "I need files recovered",
  "My device has a virus or malware",
  "I need a repair at my location",
];

export default function RepairServices() {
  return (
    <main className="min-h-screen bg-[#05020a] text-white">
      <nav className="border-b border-white/10 bg-[#05020a]/95 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/#home" aria-label="Cypher Technologies — back to homepage" className="flex items-center gap-3">
            <span className="h-10 w-10 overflow-hidden rounded-xl border border-cyan-300/30 shadow-[0_0_35px_rgba(34,211,238,0.2)]">
              <img src={logo} alt="Cypher Technologies" className="h-full w-full object-cover" loading="eager" />
            </span>
            <span className="text-lg font-black tracking-wide text-white">Cypher Technologies</span>
          </a>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-gray-400 sm:inline">Gaborone & Tlokweng</span>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-outline !px-4 !py-2 !text-sm"><FaWhatsapp /> WhatsApp</a>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(34,211,238,.16),transparent_30rem)]" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Repair services • Gaborone • Tlokweng</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl sm:leading-[1.05]">Something broken? <span className="gradient-text">Let's fix it.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">Computer, laptop and mobile phone repairs from Cypher Technologies. Tell us what is happening, and we'll help you figure out the next step.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary !px-6 !py-3"><FaWhatsapp /> Talk to us on WhatsApp</a>
              <a href="tel:+26771493735" className="btn btn-outline !px-6 !py-3"><FaPhone /> Call for a quote</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-400">
              <span className="inline-flex items-center gap-2"><FaMapMarkerAlt className="text-cyan-300" /> Gaborone & Tlokweng</span>
              <span className="inline-flex items-center gap-2"><FaHome className="text-cyan-300" /> House calls available</span>
              <span className="inline-flex items-center gap-2"><FaTruck className="text-cyan-300" /> Door-to-door service</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/30">
            <img src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=1400&q=85" alt="Technician handling a smartphone during repair" className="h-[320px] w-full object-cover sm:h-[430px]" fetchPriority="high" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#05020a] via-[#05020a]/70 to-transparent p-6 pt-20">
              <p className="text-sm font-bold uppercase tracking-wider text-cyan-200">Real problems. Practical repairs.</p>
              <p className="mt-2 text-lg font-bold">Bring us the problem — we'll start with the diagnosis.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-cyan-300/20 bg-[#071022] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-cyan-200">
                <FaHome /> We come to you
              </div>
              <h2 className="mt-5 text-3xl font-black sm:text-5xl">We Come to You. We Can Also Bring It Back.</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-gray-300">Don't want to carry your computer or phone across town? You don't always have to. We provide <strong className="text-white">house calls and on-site technical support in Gaborone and Tlokweng</strong>, plus <strong className="text-white">door-to-door device collection and delivery</strong> for suitable repairs.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary !px-6 !py-3"><FaWhatsapp /> Arrange a visit or collection</a>
                <a href="tel:+26771493735" className="btn btn-outline !px-6 !py-3"><FaPhone /> +267 71 493 735</a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-[#05020a] p-6 shadow-lg">
                <FaHome className="text-3xl text-cyan-300" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-black">House Calls</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">We come to your home for suitable repairs, diagnostics and technical support.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-[#05020a] p-6 shadow-lg">
                <FaBriefcase className="text-3xl text-cyan-300" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-black">On-Site Support</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">Need help at your office or workplace? We support suitable business IT jobs on-site.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-[#05020a] p-6 shadow-lg">
                <FaTruck className="text-3xl text-cyan-300" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-black">Door-to-Door</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">Arrange collection and, for suitable repairs, we'll return your device to your door.</p>
              </article>
            </div>
          </div>
          <p className="mt-7 text-center text-sm text-gray-500">Available in Gaborone and Tlokweng. Contact us first so we can confirm the device, fault and service arrangement.</p>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">What we work on</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Phones, computers and the problems between them.</h2>
            <p className="mt-4 leading-7 text-gray-400">Whether the device won't turn on, won't charge, runs slowly or simply isn't behaving, start with the symptoms. We'll help identify the right repair.</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {repairTypes.map(({ title, icon: Icon, href, image, alt, copy }) => (
              <article key={title} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.07]">
                <div className="relative overflow-hidden">
                  <img src={image} alt={alt} loading="lazy" className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05020a]/80 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <Icon className="text-2xl text-cyan-300" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-black">{title}</h3>
                  <p className="mt-3 leading-7 text-gray-400">{copy}</p>
                  <a href={href} className="mt-6 inline-flex items-center gap-2 font-bold text-cyan-200 hover:text-white">Explore repairs <FaArrowRight className="text-xs" /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#071022] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Repair menu</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Looking for a specific repair?</h2>
              <p className="mt-4 leading-7 text-gray-400">Choose the service that sounds closest to your problem. If you're unsure, message us with the device model and symptoms.</p>
            </div>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary shrink-0"><FaWhatsapp /> Ask about my device</a>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {repairServices.map(([name, href]) => (
              <a key={name} href={href} className="group flex items-center justify-between rounded-xl border border-white/10 bg-[#05020a] px-5 py-4 text-gray-200 transition hover:border-cyan-300/30 hover:bg-white/5">
                <span>{name}</span><FaArrowRight className="text-sm text-cyan-300 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Start here</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">What is your device doing?</h2>
            <p className="mt-4 leading-7 text-gray-400">You don't need to know the technical name for the fault. Describe what you see, hear or feel and we'll take it from there.</p>
            <div className="mt-7 rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-5">
              <p className="font-bold text-cyan-100">Best first message</p>
              <p className="mt-2 text-sm leading-6 text-gray-400">“Hi CypherTech, I have a Samsung A54. The phone is charging but the screen stays black. I'm in Tlokweng.”</p>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {problems.map((problem) => (
              <li key={problem} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-5 text-gray-300"><FaCheckCircle className="mt-1 shrink-0 text-cyan-300" />{problem}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#071022] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Gaborone & Tlokweng</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Tell us what stopped working.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-gray-400">Whether you visit us, need a house call, or want to arrange door-to-door collection and delivery, start by telling us about the device and the problem.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary !px-6 !py-3"><FaWhatsapp /> WhatsApp CypherTech</a>
            <a href="tel:+26771493735" className="btn btn-outline !px-6 !py-3"><FaPhone /> +267 71 493 735</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-10 text-center text-sm text-gray-500">
        <a href="/#home" className="inline-flex items-center gap-2 font-bold text-gray-300">
          <img src={logo} alt="" className="h-7 w-7 rounded-lg" />
          Cypher Technologies
        </a>
        <p className="mt-3">Computer, laptop and mobile phone repair in Gaborone and Tlokweng.</p>
      </footer>
    </main>
  );
}
