import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GTM_ID = import.meta.env.VITE_GTM_ID || "";

function loadGoogleTagManager(id) {
  if (!/^GTM-[A-Z0-9]+$/i.test(id)) return;
  if (document.querySelector('script[data-cypher-gtm="true"]')) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  script.dataset.cypherGtm = "true";
  document.head.appendChild(script);
}

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
    window.dataLayer = window.dataLayer || [];
    loadGoogleTagManager(GTM_ID);

    const pageLocation = window.location.origin + location.pathname + location.search;
    window.dataLayer.push({
      event: "page_view",
      page_location: pageLocation,
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!anchor) return;

      const channel = anchor.dataset.channel || identifyContactLink(anchor);
      if (!channel) return;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "repair_contact_click",
        channel,
        source: anchor.dataset.repairSource || window.location.pathname,
        link_url: anchor.href,
        page_path: window.location.pathname,
        link_text: (anchor.innerText || anchor.getAttribute("aria-label") || "").trim().slice(0, 120),
      });
    };

    const handleSubmit = (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || !form.matches("[data-repair-form]")) return;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "repair_enquiry_submit",
        source: form.dataset.repairSource || window.location.pathname,
        page_path: window.location.pathname,
      });
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
