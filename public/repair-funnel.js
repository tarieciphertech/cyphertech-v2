(() => {
  const GA_ID = "__VITE_GA_MEASUREMENT_ID__";
  window.dataLayer = window.dataLayer || [];

  const analyticsReady = /^G-[A-Z0-9]+$/i.test(GA_ID);
  if (analyticsReady && !document.querySelector('script[data-cypher-ga="true"]')) {
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { send_page_view: false });
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    script.dataset.cypherGa = "true";
    document.head.appendChild(script);
    window.__cypherGaInitialized = true;
  }
  window.dataLayer.push({ event: "page_view", page_location: window.location.href, page_path: window.location.pathname, page_title: document.title });
  if (analyticsReady && window.gtag) window.gtag("event", "page_view", { page_location: window.location.href, page_path: window.location.pathname, page_title: document.title });

  const identifyChannel = (anchor) => {
    const href = (anchor.getAttribute("href") || "").trim().toLowerCase();
    if (href.startsWith("tel:")) return "call";
    if (href.includes("wa.me/") || href.includes("whatsapp.com/")) return "whatsapp";
    if (href.includes("google.com/maps") || href.includes("maps.app.goo.gl") || href.includes("goo.gl/maps")) return "directions";
    if (href.startsWith("mailto:")) return "email";
    return null;
  };

  document.addEventListener("click", (event) => {
    const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!anchor) return;
    const channel = anchor.dataset.channel || identifyChannel(anchor);
    if (!channel) return;
    const params = {
      channel,
      source: anchor.dataset.repairSource || window.location.pathname,
      link_url: anchor.href,
      page_path: window.location.pathname,
      link_text: (anchor.innerText || anchor.getAttribute("aria-label") || "").trim().slice(0, 120),
    };
    window.dataLayer.push({ event: "repair_contact_click", ...params });
    if (analyticsReady && window.gtag) window.gtag("event", "repair_contact_click", params);
  });

  const revealItems = document.querySelectorAll(".section,.card,.notice,.faq,.two > *,.grid > *");
  revealItems.forEach((el) => el.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: "0px 0px -40px" });
    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

  const form = document.querySelector("[data-repair-form]");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const d = new FormData(form);
      const message = [
        "CypherTech repair enquiry",
        "Source page: " + (form.dataset.repairSource || window.location.pathname),
        "Name: " + (d.get("name") || ""),
        "Phone/WhatsApp: " + (d.get("phone") || ""),
        "Device: " + (d.get("device") || ""),
        "Problem: " + (d.get("problem") || ""),
        "Location: " + (d.get("location") || ""),
        "Photo/details: " + (d.get("photo") || ""),
      ].join("\n");
      const params = { source: form.dataset.repairSource || window.location.pathname, page_path: window.location.pathname };
      window.dataLayer.push({ event: "repair_enquiry_submit", ...params });
      if (analyticsReady && window.gtag) window.gtag("event", "repair_enquiry_submit", params);
      window.location.href = "https://wa.me/26771493735?text=" + encodeURIComponent(message);
    });
  }
})();
