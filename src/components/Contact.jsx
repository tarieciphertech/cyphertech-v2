import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaClock, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { profile, services } from "../data/site";
import SectionTitle from "./SectionTitle";

const budgets = ["Not sure yet", "Discovery call (free)", "Under P2,500", "P2,500 - P10,000", "P10,000 - P30,000", "P30,000+"];

const statusStyles = {
  info: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
  success: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  error: "border-rose-300/30 bg-rose-300/10 text-rose-200",
};

const whatsappUrl = `${profile.whatsapp}?text=${encodeURIComponent(
  "Hello Cypher Technologies, I would like to discuss a project.",
)}`;

export default function Contact() {
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    // Honeypot: real users never see or fill this field — silently drop spam.
    if (payload.website) {
      setStatus({ type: "success", message: "Request sent. We will reply as soon as possible." });
      form.reset();
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        setSending(true);
        setStatus({ type: "info", message: "Sending your request..." });
        await emailjs.sendForm(serviceId, templateId, form, { publicKey });
        setStatus({ type: "success", message: "Request sent. We will reply within one business day." });
        form.reset();
        return;
      } catch {
        setStatus({ type: "error", message: "EmailJS could not send right now — opening your email app instead." });
      } finally {
        setSending(false);
      }
    } else {
      setStatus({ type: "info", message: "Opening your email app with the project details." });
    }

    const subject = encodeURIComponent(`Quote request from ${payload.name || "Cypher Technologies website"}`);
    const body = encodeURIComponent(
      [
        `Name: ${payload.name}`,
        `Company: ${payload.company}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `Service: ${payload.service}`,
        `Budget: ${payload.budget}`,
        "",
        payload.message,
      ].join("\n"),
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Contact"
          title="Let's build something powerful."
          copy="Tell us what you need: a product, business system, cybersecurity review, network deployment, repair, or technical support."
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <form onSubmit={handleSubmit} className="glass grid gap-5 rounded-3xl p-6 md:grid-cols-2 md:p-8">
            <Field label="Name" name="name" required autoComplete="name" placeholder="Your full name" />
            <Field label="Company" name="company" autoComplete="organization" placeholder="Optional" />
            <Field label="Email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="+267 ..." />
            <label className="field-label">
              Service
              <select name="service" className="field-input">
                <option>Not sure yet — advise me</option>
                {services.map(([name]) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </label>
            <label className="field-label">
              Budget
              <select name="budget" className="field-input">
                {budgets.map((budget) => (
                  <option key={budget}>{budget}</option>
                ))}
              </select>
            </label>
            <label className="field-label md:col-span-2">
              Message
              <textarea
                name="message"
                rows="6"
                required
                minLength={10}
                className="field-input resize-none"
                placeholder="Describe your project, problem, or support request."
              />
            </label>

            {/* Honeypot — hidden from humans, catches simple spam bots */}
            <div className="hidden" aria-hidden="true">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="flex flex-col gap-4 md:col-span-2">
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={sending}
                  className="rounded-xl bg-cyan-400 px-6 py-4 font-black text-[#041015] glow transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? "Sending..." : "Send Request"}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-emerald-300/30 bg-emerald-300/10 px-6 py-4 font-bold text-emerald-200 transition hover:border-emerald-300/60 hover:bg-emerald-300/20"
                >
                  <FaWhatsapp className="text-lg" /> Chat on WhatsApp
                </a>
              </div>
              {status && (
                <p role={status.type === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-sm font-semibold ${statusStyles[status.type]}`}>
                  {status.message}
                </p>
              )}
            </div>
          </form>

          <div className="grid gap-5">
            <div className="glass rounded-3xl p-6">
              <h3 className="text-2xl font-black text-white">Business Details</h3>
              <div className="mt-6 grid gap-4">
                <Info icon={<FaEnvelope />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
                <Info icon={<FaPhoneAlt />} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, "")}`} />
                <Info icon={<FaWhatsapp />} label="WhatsApp" value={profile.phone} href={whatsappUrl} />
                <Info icon={<FaGlobe />} label="Website" value={profile.website.replace("https://", "")} href={profile.website} />
                <Info icon={<FaClock />} label="Business Hours" value={profile.hours} />
                <Info icon={<FaMapMarkerAlt />} label="Location" value={profile.location} />
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#071022]">
              <iframe
                title="Cypher Technologies location — Gaborone, Botswana"
                src="https://www.google.com/maps?q=Gaborone%2C%20Botswana&output=embed"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <p className="px-5 py-4 text-sm text-gray-400">Based in Gaborone — serving clients across Botswana and remotely across Africa.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required = false, autoComplete, placeholder }) {
  return (
    <label className="field-label">
      {label}
      {required && <span className="sr-only">(required)</span>}
      <input name={name} type={type} required={required} autoComplete={autoComplete} placeholder={placeholder} className="field-input" />
    </label>
  );
}

function Info({ icon, label, value, href }) {
  const content = (
    <span className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">{icon}</span>
      <span>
        <span className="block text-xs font-black uppercase tracking-wide text-gray-500">{label}</span>
        <span className="block font-bold text-gray-100">{value}</span>
      </span>
    </span>
  );

  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="transition hover:-translate-y-0.5">
      {content}
    </a>
  ) : (
    content
  );
}
