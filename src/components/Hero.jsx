import { motion } from "framer-motion";
import { FaArrowRight, FaCloud, FaLock, FaNetworkWired, FaServer } from "react-icons/fa";
import { profile, stats } from "../data/site";
import { asset } from "../utils/paths";
import AnimatedBackground from "./AnimatedBackground";

const floatingCards = [
  ["Secure", "Cybersecurity-first delivery", FaLock],
  ["Cloud", "Scalable infrastructure", FaCloud],
  ["Networks", "Reliable connectivity", FaNetworkWired],
];

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-16">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.85)]" />
            {profile.tagline}
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-white md:text-7xl lg:text-8xl">
            Building Software.
            <span className="block gradient-text">Securing Systems.</span>
            <span className="block">Creating the Future.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
            {profile.positioning}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center gap-3 rounded-xl bg-cyan-400 px-6 py-4 font-black text-[#041015] glow transition hover:-translate-y-1 hover:bg-cyan-300">
              Get a Quote <FaArrowRight />
            </a>
            <a href="#services" className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-white transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/10">
              Explore Services
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {stats.map(([value, label]) => (
              <div key={label} className="glass rounded-2xl p-4">
                <p className="text-3xl font-black text-white">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative min-h-[520px]">
          <div className="absolute inset-x-8 top-12 h-[390px] rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="relative mx-auto flex h-[520px] max-w-[560px] items-center justify-center">
            <div className="absolute h-[420px] w-[420px] rounded-full border border-cyan-300/20 bg-white/[0.03] shadow-[inset_0_0_90px_rgba(34,211,238,0.08)]" />
            <div className="absolute h-[300px] w-[300px] rounded-full border border-purple-300/25" />
            <div className="tech-orbit">
              <FaServer className="text-4xl text-cyan-200" />
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#070b18]/85 shadow-[0_0_90px_rgba(14,165,233,0.32)] backdrop-blur-2xl">
              <img
                src={asset("brand/cypher-security-hero.png")}
                alt="Cypher Technologies cybersecurity brand artwork"
                className="h-[360px] w-[540px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05020a]/45 via-transparent to-transparent" />
            </div>
          </div>

          {floatingCards.map(([title, copy, Icon], index) => (
            <motion.div
              key={title}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute glass rounded-2xl p-4 shadow-2xl ${index === 0 ? "left-0 top-20" : index === 1 ? "right-0 top-48" : "left-10 bottom-10"}`}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">
                  <Icon />
                </span>
                <div>
                  <p className="font-black text-white">{title}</p>
                  <p className="text-sm text-gray-400">{copy}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
