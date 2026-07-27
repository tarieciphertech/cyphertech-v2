import { FaEnvelope, FaGithub, FaGlobe, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import { navLinks, profile, services, solutions } from "../data/site";

const socials = [
  ["Portfolio", profile.portfolio, FaGlobe],
  ["GitHub", profile.github, FaGithub],
  ["YouTube", profile.youtube, FaYoutube],
  ["Instagram", profile.instagram, FaInstagram],
  ["TikTok", profile.tiktok, FaTiktok],
  ["LinkedIn", profile.linkedin, FaLinkedin],
  ["Email", `mailto:${profile.email}`, FaEnvelope],
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030107] px-5 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-300/10 font-black text-cyan-200">CT</span>
            <span className="text-xl font-black text-white">{profile.brand}</span>
          </div>
          <p className="mt-5 max-w-sm leading-7 text-gray-400">
            Building software, securing systems, and creating the future with modern technology solutions for businesses and individuals.
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
        <FooterColumn title="Services" items={services.slice(0, 7).map(([name]) => [name, "#services"])} />
        <FooterColumn title="Solutions" items={solutions.slice(0, 7).map(([name]) => [name, "#solutions"])} />
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
        <p>Copyright © {new Date().getFullYear()} {profile.brand}. All rights reserved.</p>
        <form className="flex w-full max-w-md gap-2" onSubmit={(event) => event.preventDefault()}>
          <input type="email" aria-label="Newsletter email" placeholder="Email for updates" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/50 focus:bg-white/[0.08]" />
          <button type="submit" className="rounded-xl bg-white px-4 py-3 font-black text-[#05020a]">Subscribe</button>
        </form>
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
