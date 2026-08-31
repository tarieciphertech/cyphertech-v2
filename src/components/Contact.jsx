import { useRef, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane, FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { profile } from "../data/site";
import { asset } from "../utils/paths";
import SectionTitle from "./SectionTitle";

const { email, phone, whatsapp, hours, location: address } = profile;

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wide text-gray-500">
        {label}
      </label>
      {children}
    </div>
  );
}

function Info({ icon: Icon, label, value, href }) {
  const content = (
    <>
      {Icon && <Icon className="text-cyan-300" />}
      <span className="font-medium text-gray-300">{label}</span>
      <span className="text-gray-400">{value}</span>
    </>
  );
  return (
    <div className="flex items-start gap-3 rounded-lg border border-white/5 bg-[#071022] px-4 py-3">
      {href ? (
        <a href={href} className="flex items-start gap-3 text-left">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

export default function Contact() {
  const form = useRef(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data.entries());
    setLoading(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE ?? "default_service";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE ?? "default_template";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (publicKey) {
        await emailjs.send(serviceId, templateId, payload, publicKey);
        setSent(true);
        form.current?.reset();
      } else {
        // No EmailJS key — fall back to a prefilled mailto link.
        const body = `${payload.name} <${payload.email}>\n${payload.message}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(
          payload.subject || "Website contact form",
        )}&body=${encodeURIComponent(body)}`;
        setSent(true);
        form.current?.reset();
      }
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          title="Let's build something."
          copy="Have a project in mind, a question, or want a private walkthrough of our work? Send a note or drop us a line on WhatsApp — we read every message."
          centered
        />

                <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-12">
          {/* ── Form ── */}
          <div className="space-y-6">
            {sent ? (
              <div className="card p-8 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-cyan-300/10 text-cyan-300">
                  <FaPaperPlane className="text-xl" />
                </div>
                <h3 className="mt-4 text-xl font-black text-white">Message sent.</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Thanks for reaching out. We'll be in touch within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setError("");
                  }}
                  className="btn btn-ghost mt-6 !text-sm"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                ref={form}
                onSubmit={handleSubmit}
                className="card grid gap-5 p-6 sm:p-8"
                noValidate
              >
                <Field label="Your name">
                                    <input name="name" type="text" required placeholder="Jane Doe" className="field-input peer" />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email">
                                        <input name="email" type="email" required placeholder="jane@example.com" className="field-input peer" />
                  </Field>
                  <Field label="Subject">
                                        <input name="subject" type="text" placeholder="Brief subject" className="field-input peer" />
                  </Field>
                </div>

                <Field label="Message">
                                    <textarea name="message" required rows={5} placeholder="What can we help with?" className="field-input peer" />
                </Field>

                <input name="bot-field" type="text" className="hidden" tabIndex={-1} autoComplete="off" />

                {error && <p className="text-sm text-amber-300">{error}</p>}

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-400">
                                        <input type="checkbox" name="newsletter" value="yes" defaultChecked className="h-4 w-4 rounded border-white/30 bg-[#0a0f1a] text-cyan-400 focus:ring-2 focus:ring-cyan-300" />
                    <span>Join the newsletter</span>
                  </label>
                  <button type="submit" disabled={loading} className="btn btn-primary !px-5 !py-2.5">
                    {loading ? "Sending…" : "Send message"} <FaPaperPlane className="text-xs" />
                  </button>
                </div>
              </form>
            )}

            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#071022] p-4 text-sm text-gray-400">
              <FaWhatsapp className="text-3xl text-green-500" />
              <div>
                Prefer WhatsApp?{" "}
                <a href={whatsapp ?? "#"} target="_blank" rel="noreferrer" className="font-medium text-cyan-200">
                  Tap to chat
                </a>{" "}
                — we're usually online {hours ?? "Mon–Fri, 9–6"}.
              </div>
            </div>
          </div>

          {/* ── Details + map ── */}
          <div className="space-y-6">
            <Info icon={FaEnvelope} label="Email us" value={email} href={`mailto:${email}`} />
            <Info icon={FaPhone} label="Call us" value={phone} href={`tel:${phone}`} />
            <Info icon={FaWhatsapp} label="WhatsApp" value={whatsapp} href={whatsapp ?? "#"} />
            <Info icon={FaMapMarkerAlt} label="Visit us" value={address} />

            <div className="mt-2 rounded-xl border border-white/5 bg-[#071022] p-3 shadow-inner">
              <img
                src={asset("images/hero/code-scene.svg")}
                alt=""
                aria-hidden="true"
                className="aspect-[4/3] w-full rounded-lg border border-white/5 object-cover opacity-55 grayscale"
                loading="lazy"
                decoding="async"
              />
              <p className="mt-2 text-center text-xs text-gray-500">Cypher Technologies HQ</p>
            </div>

            <div className="aspect-[4/3] w-full rounded-xl border border-white/5 bg-[#071022] p-3">
              <iframe
                title="map"
                className="block h-full w-full rounded-lg opacity-60"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.832290928215!2d-122.3538!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2zMjAy!5e0!3m2!1sen!2sus!4v1!6m1!1v1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
