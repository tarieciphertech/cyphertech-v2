import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { profile, services } from "../data/site";
import SectionTitle from "./SectionTitle";

const budgets = ["Discovery call", "Under $500", "$500 - $2,000", "$2,000 - $5,000", "$5,000+"];

export default function Contact() {
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        setStatus("Sending your request...");
        await emailjs.sendForm(serviceId, templateId, form, { publicKey });
        setStatus("Request sent. We will reply as soon as possible.");
        form.reset();
        return;
      } catch {
        setStatus("EmailJS could not send right now, opening your email app instead.");
      }
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

    if (!serviceId || !templateId || !publicKey) {
      setStatus("Opening your email app with the project details.");
    }
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
            <Field label="Name" name="name" required />
            <Field label="Company" name="company" />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" />
            <label className="field-label">
              Service
              <select name="service" className="field-input">
                {services.slice(0, 15).map(([name]) => (
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
              <textarea name="message" rows="6" required className="field-input resize-none" placeholder="Describe your project, problem, or support request." />
            </label>
            <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center">
              <button type="submit" className="rounded-xl bg-cyan-400 px-6 py-4 font-black text-[#041015] glow transition hover:bg-cyan-300">
                Send Request
              </button>
              {status && <p className="text-sm font-semibold text-cyan-100">{status}</p>}
            </div>
          </form>

          <div className="grid gap-5">
            <div className="glass rounded-3xl p-6">
              <h3 className="text-2xl font-black text-white">Business Details</h3>
              <div className="mt-6 grid gap-4">
                <Info icon={<FaEnvelope />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
                <Info icon={<FaPhoneAlt />} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, "")}`} />
                <Info icon={<FaClock />} label="Business Hours" value={profile.hours} />
                <Info icon={<FaMapMarkerAlt />} label="Location" value={profile.location} />
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#071022]">
              <div className="grid min-h-64 place-items-center bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(124,58,237,0.14)),radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_28%)] p-8 text-center">
                <div>
                  <FaMapMarkerAlt className="mx-auto text-4xl text-cyan-200" />
                  <p className="mt-4 text-2xl font-black text-white">Google Maps Placeholder</p>
                  <p className="mt-2 text-gray-400">Serving clients from Gaborone and remotely across Africa.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required = false }) {
  return (
    <label className="field-label">
      {label}
      <input name={name} type={type} required={required} className="field-input" />
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
    <a href={href} className="transition hover:-translate-y-0.5">
      {content}
    </a>
  ) : (
    content
  );
}
