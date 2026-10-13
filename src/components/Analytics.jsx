import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";
const GA_ENABLED = /^G-[A-Z0-9]+$/i.test(GA_ID);

function identifyContactLink(anchor) {
  const href = (anchor.getAttribute("href") || "").trim().toLowerCase();
  if (href.startsWith("tel:")) return "call";
  if (href.includes("wa.me/") || href.includes("whatsapp.com/")) return "whatsapp";
  if (href.includes("google.com/maps") || href.includes("maps.app.goo.gl") || href.includes("goo.gl/maps")) return "directions";
  if (href.startsWith("mailto:")) return "email";
  return null;
}

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    const page = {
      page_location: window.location.origin + location.pathname + location.search,
      page_path: location.pathname + location.search,
      page_title: document.title,
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "page_view", ...page });
    if (GA_ENABLED && typeof window.gtag === "function") {
      window.gtag("event", "page_view", page);
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!anchor) return;
      const channel = anchor.dataset.channel || identifyContactLink(anchor);
      if (!channel) return;

      const params = {
        channel,
        source: anchor.dataset.repairSource || window.location.pathname,
        link_url: anchor.href,
        page_path: window.location.pathname,
        link_text: (anchor.innerText || anchor.getAttribute("aria-label") || "").trim().slice(0, 120),
      };
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "repair_contact_click", ...params });
      if (GA_ENABLED && typeof window.gtag === "function") {
        window.gtag("event", "repair_contact_click", params);
      }
    };

    const handleSubmit = (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || !form.matches("[data-repair-form]")) return;
      const params = {
        source: form.dataset.repairSource || window.location.pathname,
        page_path: window.location.pathname,
      };
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "repair_enquiry_submit", ...params });
      if (GA_ENABLED && typeof window.gtag === "function") {
        window.gtag("event", "repair_enquiry_submit", params);
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit, true);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit, true);
    };
  }, []);

  return null;
}
