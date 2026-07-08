#!/usr/bin/env bash
set -e

mkdir -p src/components src/pages src/data src/assets public/files

cat > tailwind.config.js <<'EOF'
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
EOF

cat > src/index.css <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: #05020a;
  color: white;
  font-family: Inter, system-ui, sans-serif;
}

.gradient-text {
  background: linear-gradient(90deg, #22d3ee, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  color: transparent;
}

.glass {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(16px);
}

.glow {
  box-shadow: 0 0 45px rgba(34,211,238,0.35);
}
EOF

cat > src/data/site.js <<'EOF'
export const profile = {
  brand: "Cypher Technologies",
  owner: "Tarie Cipher",
  email: "mtshietarie@gmail.com",
  github: "https://github.com/tarieciphertech",
  youtube: "https://youtube.com/@tarietech5958",
  instagram: "https://www.instagram.com/unclecipher",
  tiktok: "https://www.tiktok.com/@cipherhotspot",
  linkedin: "https://www.linkedin.com/in/tarie-cipher",
};

export const services = [
  ["Web Development", "Modern websites, landing pages, dashboards, and business platforms."],
  ["Software Systems", "Custom systems for businesses, startups, and internal operations."],
  ["Cybersecurity", "Basic security checks, hardening, and safer digital workflows."],
  ["Networking", "LAN, Wi-Fi, hotspot, and small business network support."],
  ["Linux Administration", "Linux setup, server support, troubleshooting, and deployment."],
  ["Device Repairs", "Computer, phone, software, and technical repair support."],
];

export const projects = [
  ["Cypher Technologies", "Official digital platform for Cypher Technologies services and products.", ["React", "Tailwind", "Vite"]],
  ["JobBoard", "Recruitment platform with SEO, admin tools, and email notifications.", ["Flask", "Python", "PostgreSQL"]],
  ["FootballFlix", "Streaming MVP for local and regional football content.", ["React", "Streaming", "Media"]],
  ["MiniFlix LAN", "LAN movie streaming platform for local networks.", ["Flask", "HLS", "SQLite"]],
  ["Internet Café Portal", "Captive portal for user sessions and admin control.", ["Flask", "Networking", "SQLite"]],
  ["Phone Network Checker", "Tool for checking mobile number network providers.", ["Python", "Tkinter", "PhoneNumbers"]],
];
EOF

cat > src/components/Navbar.jsx <<'EOF'
import { profile } from "../data/site";

export default function Navbar() {
  const links = ["about", "services", "projects", "contact"];
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-black gradient-text">{profile.brand}</a>
        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          {links.map((link) => (
            <a key={link} href={`#${link}`} className="hover:text-cyan-400 capitalize">
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
EOF

cat > src/components/AnimatedBackground.jsx <<'EOF'
export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-[700px] h-[700px] bg-cyan-500/20 blur-[180px] rounded-full top-[-160px] right-[-140px] animate-pulse" />
      <div className="absolute w-[650px] h-[650px] bg-purple-600/20 blur-[180px] rounded-full bottom-[-170px] left-[-130px] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px] opacity-20" />
    </div>
  );
}
EOF

cat > src/components/TypingRoles.jsx <<'EOF'
import { useEffect, useState } from "react";

const roles = ["Full-Stack Developer", "Linux Administrator", "Cybersecurity Enthusiast", "Tech Entrepreneur"];

export default function TypingRoles() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const word = roles[index];
    let i = 0;
    const timer = setInterval(() => {
      setText(word.slice(0, i + 1));
      i++;
      if (i === word.length) {
        clearInterval(timer);
        setTimeout(() => {
          setText("");
          setIndex((prev) => (prev + 1) % roles.length);
        }, 1200);
      }
    }, 75);

    return () => clearInterval(timer);
  }, [index]);

  return <p className="font-mono text-cyan-300 mt-4">&gt; {text}<span className="animate-pulse">_</span></p>;
}
EOF

cat > src/components/Hero.jsx <<'EOF'
import { motion } from "framer-motion";
import { FaGithub, FaYoutube, FaInstagram, FaTiktok, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { profile } from "../data/site";
import AnimatedBackground from "./AnimatedBackground";
import TypingRoles from "./TypingRoles";

const tech = ["React", "FastAPI", "Python", "Linux", "AWS", "Docker", "GitHub", "Networking", "Cybersecurity"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <AnimatedBackground />

      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 glass rounded-3xl p-4 z-40">
        <a href={profile.github} target="_blank" rel="noreferrer" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-cyan-400 hover:scale-110 transition"><FaGithub /></a>
        <a href={profile.youtube} target="_blank" rel="noreferrer" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-cyan-400 hover:scale-110 transition"><FaYoutube /></a>
        <a href={profile.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-cyan-400 hover:scale-110 transition"><FaInstagram /></a>
        <a href={profile.tiktok} target="_blank" rel="noreferrer" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-cyan-400 hover:scale-110 transition"><FaTiktok /></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-cyan-400 hover:scale-110 transition"><FaLinkedin /></a>
        <a href={`mailto:${profile.email}`} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-cyan-400 hover:scale-110 transition"><FaEnvelope /></a>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-400/30 text-green-300 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Available for new opportunities
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            {profile.brand.split(" ")[0]} <br />
            <span className="gradient-text">{profile.brand.split(" ")[1]}</span>
          </h1>

          <h2 className="text-2xl mt-6 text-gray-100 font-bold">
            Building Software. Securing Systems. Creating the Future.
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Founded by {profile.owner} — Full-Stack Developer, Cybersecurity Enthusiast & IT Support Specialist.
          </p>

          <TypingRoles />

          <div className="flex flex-wrap gap-3 mt-7">
            {tech.map((item) => (
              <span key={item} className="px-4 py-2 rounded-full bg-white/5 border border-cyan-500/30 text-sm text-gray-300">
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-5 mt-10">
            <a href="#projects" className="px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition font-semibold glow">View Projects →</a>
            <a href={`${import.meta.env.BASE_URL}files/Tarie_Cipher_Resume.pdf`} target="_blank" rel="noreferrer" className="px-8 py-4 rounded-xl border border-white/20 hover:border-cyan-500 transition">View Resume ↓</a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 glass rounded-2xl p-5">
            <div><h3 className="text-3xl font-black">12+</h3><p className="text-gray-400 text-sm">Projects</p></div>
            <div><h3 className="text-3xl font-black">4+</h3><p className="text-gray-400 text-sm">Years Building</p></div>
            <div><h3 className="text-3xl font-black">10+</h3><p className="text-gray-400 text-sm">Technologies</p></div>
            <div><h3 className="text-3xl font-black">∞</h3><p className="text-gray-400 text-sm">Learning</p></div>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}} transition={{duration:1}} className="relative flex justify-center">
          <div className="w-[390px] h-[390px] rounded-full bg-gradient-to-br from-cyan-400 via-purple-600 to-pink-500 p-1 glow">
            <div className="w-full h-full rounded-full bg-[#05020a] flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl font-black gradient-text">CT</div>
                <p className="text-gray-400 mt-3">Cypher Technologies</p>
              </div>
            </div>
          </div>

          <div className="absolute -left-16 bottom-0 glass rounded-2xl p-6 w-72 hidden xl:block">
            <p className="text-green-400 font-mono mb-3">cipher@cyphertech:~$</p>
            <p className="font-mono text-gray-300">&gt; whoami</p>
            <p className="font-mono text-cyan-300 mb-3">Tarie Cipher</p>
            <p className="font-mono text-gray-300">&gt; status</p>
            <p className="font-mono text-green-300">Available for work</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
EOF

cat > src/components/SectionTitle.jsx <<'EOF'
export default function SectionTitle({ label, title }) {
  return (
    <div className="mb-12">
      <p className="text-cyan-400 font-semibold mb-2">{label}</p>
      <h2 className="text-4xl md:text-5xl font-black gradient-text">{title}</h2>
    </div>
  );
}
EOF

cat > src/components/About.jsx <<'EOF'
import SectionTitle from "./SectionTitle";

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="About" title="A technology brand built for real solutions." />
        <div className="glass rounded-3xl p-8 md:p-10">
          <p className="text-gray-300 text-lg leading-8">
            Cypher Technologies creates modern websites, software systems, cybersecurity solutions,
            networking support, Linux administration, and device repair services. Our goal is to help
            businesses and individuals use technology securely, efficiently, and creatively.
          </p>
        </div>
      </div>
    </section>
  );
}
EOF

cat > src/components/Services.jsx <<'EOF'
import { services } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="Services" title="What we can help with." />
        <div className="grid md:grid-cols-3 gap-6">
          {services.map(([title, desc]) => (
            <div key={title} className="glass rounded-3xl p-7 hover:-translate-y-2 transition">
              <h3 className="text-2xl font-bold mb-4">{title}</h3>
              <p className="text-gray-400 leading-7">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

cat > src/components/Projects.jsx <<'EOF'
import { motion } from "framer-motion";
import { projects } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="Featured Project" title="Cypher Technologies Platform." />

        <div className="glass rounded-3xl p-8 md:p-10 mb-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-black mb-4">Official CypherTech Website</h3>
            <p className="text-gray-400 leading-8">
              A professional digital platform for showcasing services, projects, technical skills,
              business solutions, and future client features.
            </p>
            <div className="flex gap-3 mt-6">
              {["React", "Tailwind", "Framer Motion"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sm">{t}</span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 h-64 flex items-center justify-center">
            <span className="text-6xl font-black gradient-text">CT</span>
          </div>
        </div>

        <SectionTitle label="Projects" title="Selected work." />
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map(([title, desc, stack]) => (
            <motion.div whileHover={{ y: -8 }} key={title} className="glass rounded-3xl p-7">
              <div className="h-36 rounded-2xl bg-white/5 mb-5 flex items-center justify-center">
                <span className="text-3xl font-black gradient-text">{title.slice(0,2)}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{title}</h3>
              <p className="text-gray-400 leading-7">{desc}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {stack.map((t) => <span key={t} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10">{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

cat > src/components/Contact.jsx <<'EOF'
import { FaEnvelope, FaGithub, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { profile } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <SectionTitle label="Contact" title="Let's build something powerful." />
        <div className="glass rounded-3xl p-8 md:p-10 text-center">
          <p className="text-gray-400 mb-8">Need a website, business system, repair, or IT solution?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`mailto:${profile.email}`} className="px-6 py-3 rounded-full bg-cyan-600 glow flex items-center gap-2"><FaEnvelope /> Email</a>
            <a href={profile.github} className="px-6 py-3 rounded-full glass flex items-center gap-2"><FaGithub /> GitHub</a>
            <a href={profile.youtube} className="px-6 py-3 rounded-full glass flex items-center gap-2"><FaYoutube /> YouTube</a>
            <a href={profile.instagram} className="px-6 py-3 rounded-full glass flex items-center gap-2"><FaInstagram /> Instagram</a>
            <a href={profile.tiktok} className="px-6 py-3 rounded-full glass flex items-center gap-2"><FaTiktok /> TikTok</a>
          </div>
        </div>
      </div>
    </section>
  );
}
EOF

cat > src/components/Footer.jsx <<'EOF'
import { profile } from "../data/site";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 text-center text-gray-500">
      © {new Date().getFullYear()} {profile.brand}. Built by {profile.owner}.
    </footer>
  );
}
EOF

cat > src/App.jsx <<'EOF'
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  return (
    <main className="min-h-screen bg-[#05020a] text-white overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
EOF

cat > vite.config.js <<'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cyphertech-v2/',
})
EOF

node - <<'EOF'
const fs = require("fs");
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
pkg.homepage = "https://tarieciphertech.github.io/cyphertech-v2";
pkg.scripts = {
  ...pkg.scripts,
  predeploy: "npm run build",
  deploy: "gh-pages -d dist"
};
fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
EOF

npm run build
echo "Done. Run: npm run dev"
