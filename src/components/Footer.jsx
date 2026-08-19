import { FaClock, FaEnvelope, FaGithub, FaGlobe, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { navLinks, profile, services } from "../data/site";
import { asset } from "../utils/paths";

const socials = [
  ["Portfolio", profile.portfolio, FaGlobe],
  ["GitHub", profile.github, FaGithub],
  ["YouTube", profile.youtube, FaYoutube],
  ["Instagram", profile.instagram, FaInstagram],
  ["TikTok", profile.tiktok, FaTiktok],
  ["LinkedIn", profile.linkedin, FaLinkedin],
  ["WhatsApp", profile.whatsapp, FaWhatsapp],
  ["Email", `mailto:${profile.email}`, FaEnvelope],
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030107] px-5 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-11 w-11 overflow-hidden rounded-xl border border-cyan-300/30">
              <img src={asset("brand/cypher-logo-dark.webp")} alt="" className="h-full w-full object-cover" loading="lazy" />
            </span>
            <span className="text-xl font-black text-white">{profile.brand}</span>
          </div>
          <p className="mt-5 max-w-sm leading-7 text-gray-400">
            Building software, securing systems, and creating the future with modern technology solutions for businesses and organizations.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map(([label, href, Icon]) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={label} className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-gray-300 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-200">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Quick Links" items={navLinks.map(([id, label]) => [label, `#${id}`])} />
        <FooterColumn title="Services" items={services.slice(0, 8).map(([name]) => [name, "#services"])} />

        <div>
          <h3 className="font-black text-white">Contact</h3>
          <div className="mt-5 grid gap-3 text-sm font-semibold text-gray-400">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 transition hover:text-cyan-200">
              <FaEnvelope className="shrink-0 text-cyan-300" /> {profile.email}
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 transition hover:text-cyan-200">
              <FaPhoneAlt className="shrink-0 text-cyan-300" /> {profile.phone}
            </a>
            <p className="flex items-center gap-3">
              <FaClock className="shrink-0 text-cyan-300" /> {profile.hours}
            </p>
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="shrink-0 text-cyan-300" /> {profile.location}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
        <p>Copyright © {new Date().getFullYear()} {profile.brand}. All rights reserved.</p>
        <p>
          Founded by {profile.owner} · {profile.location}
        </p>
        <a href="#home" className="font-bold text-gray-400 transition hover:text-cyan-200">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h3 className="font-black text-white">{title}</h3>
      <div className="mt-5 grid gap-3">
        {items.map(([label, href]) => (
          <a key={label} href={href} className="text-sm font-semibold text-gray-400 transition hover:text-cyan-200">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
