import {
  FaAws,
  FaBrain,
  FaBriefcase,
  FaBuilding,
  FaChurch,
  FaCloud,
  FaCode,
  FaDatabase,
  FaDocker,
  FaGithub,
  FaGraduationCap,
  FaHospital,
  FaLaptopCode,
  FaLinux,
  FaMobileAlt,
  FaNetworkWired,
  FaPython,
  FaReact,
  FaShieldAlt,
  FaShoppingCart,
  FaTools,
  FaTruck,
  FaUsers,
} from "react-icons/fa";
import { SiFastapi, SiMongodb, SiMysql, SiNodedotjs, SiPostgresql } from "react-icons/si";

// ---------------------------------------------------------------------------
// Central business data for Cypher Technologies.
// Components consume these exports — keep facts here accurate and honest.
// ---------------------------------------------------------------------------

export const profile = {
  brand: "Cypher Technologies",
  owner: "Tarie Cipher",
  role: "Founder & CEO",
  email: "cipher@cyphertech.co.zw",
  phone: "+267 71 493 735",
  whatsapp: "https://wa.me/26771493735",
  location: "Gaborone, Botswana",
  hours: "Mon - Sat, 08:00 - 18:00",
  website: "https://ciphertech.co.zw",
  github: "https://github.com/tarieciphertech",
  portfolio: "https://tarieciphertech.github.io/cypher-portfolio/",
  youtube: "https://youtube.com/@tarietech5958",
  instagram: "https://www.instagram.com/unclecipher",
  tiktok: "https://www.tiktok.com/@cipherhotspot",
  linkedin: "https://www.linkedin.com/in/tarie-cipher",
  tagline: "Software • Web • Cybersecurity • Cloud • IT",
  positioning:
    "Cypher Technologies builds modern software, websites, business systems, secure infrastructure, and digital solutions for businesses and organizations in Botswana and across Africa.",
  mission:
    "We build software, websites, digital business systems, secure infrastructure, and technology solutions that help organizations work smarter and grow faster.",
  vision:
    "To become a trusted technology partner for businesses, organizations, and communities across Africa.",
};

export const navLinks = [
  ["home", "Home"],
  ["services", "Services"],
  ["solutions", "Solutions"],
  ["projects", "Projects"],
  ["about", "About Us"],
  ["blog", "Blog"],
  ["careers", "Careers"],
  ["contact", "Contact"],
];

// Honest, verifiable figures only — derived from the data in this file.
export const stats = [
  ["15", "Services"],
  ["10", "Industries"],
  ["15+", "Technologies"],
  ["6 Days", "Weekly Support"],
  ["100%", "Botswana-Based"],
];

// Core capabilities shown in the homepage trust strip — no fabricated numbers,
// just the disciplines Cypher Technologies actually delivers.
export const capabilities = [
  ["Software Development", FaLaptopCode],
  ["Web Development", FaCode],
  ["Cybersecurity", FaShieldAlt],
  ["Cloud & Infrastructure", FaCloud],
  ["IT Support", FaTools],
];

// "How we work" process used by the Process section.
export const process = [
  ["Understand", "We learn your goals, workflows, and constraints before proposing anything."],
  ["Plan", "Clear scope, timeline, and budget — no surprises, no jargon."],
  ["Build", "Development with regular check-ins so you always know where things stand."],
  ["Test", "Quality checks across function, security, and performance before launch."],
  ["Deliver", "Clean handover with documentation and training for your team."],
  ["Support", "Ongoing maintenance and responsive support after go-live."],
];

// Shape: [name, description, Icon, category, problem, deliverables, audience]
// Categories power the filter in the Services section: Build | Secure | Infrastructure | Support
// All content is derived from the actual services Cypher Technologies provides.
export const services = [
  [
    "Software Development",
    "Custom platforms, internal tools, dashboards, and workflow systems built around your operations.",
    FaLaptopCode,
    "Build",
    "You need a custom tool or platform that off-the-shelf software can't provide.",
    ["Custom platforms", "Internal tools", "Dashboards", "Workflow systems"],
    "Businesses with unique processes that need software built around them.",
  ],
  [
    "Custom Business Systems",
    "Operations software tailored to your exact teams, approvals, and reports.",
    FaBriefcase,
    "Build",
    "Manual processes and disconnected tools are slowing your operations down.",
    ["Operations software", "Approval workflows", "Reporting", "Team access"],
    "Teams that still run on spreadsheets, paper, or disconnected apps.",
  ],
  [
    "Website Development",
    "High-performance company sites, portals, landing pages, and web apps that win trust.",
    FaCode,
    "Build",
    "You need a credible online presence that turns visitors into enquiries.",
    ["Company sites", "Portals", "Landing pages", "Web apps"],
    "Businesses and organizations that need a professional web presence.",
  ],
  [
    "E-commerce",
    "Online stores, payment-ready catalogs, inventory flows, and customer journeys.",
    FaShoppingCart,
    "Build",
    "You want to sell online but need a store that handles products and payments.",
    ["Online stores", "Payment-ready catalogs", "Inventory flows", "Customer journeys"],
    "Retailers and brands moving or expanding sales online.",
  ],
  [
    "Mobile Applications",
    "Mobile-first product experiences for Android, iOS, and responsive web.",
    FaMobileAlt,
    "Build",
    "Your customers or team need your product on their phones.",
    ["Android apps", "iOS apps", "Responsive web", "Mobile-first UX"],
    "Businesses that need a mobile experience for customers or staff.",
  ],
  [
    "AI Automation",
    "Smart assistants, content workflows, data extraction, and business automation.",
    FaBrain,
    "Build",
    "Repetitive tasks and content workflows are eating your team's time.",
    ["Smart assistants", "Content workflows", "Data extraction", "Business automation"],
    "Teams that want to remove repetitive manual work.",
  ],
  [
    "Cybersecurity",
    "Security reviews, hardening, safer access patterns, and awareness support.",
    FaShieldAlt,
    "Secure",
    "You're not sure how exposed your systems and data are.",
    ["Security reviews", "Hardening", "Access controls", "Awareness support"],
    "Businesses that handle sensitive data or want safer systems.",
  ],
  [
    "Networking",
    "LAN, Wi-Fi, hotspot, ISP, and small business connectivity deployments.",
    FaNetworkWired,
    "Infrastructure",
    "Your office or venue has unreliable or poorly structured connectivity.",
    ["LAN setup", "Wi-Fi deployment", "Hotspot systems", "ISP connectivity"],
    "Offices, cafes, venues, and small ISPs.",
  ],
  [
    "Cloud Infrastructure",
    "Cloud hosting, deployment pipelines, backups, and scalable environments.",
    FaCloud,
    "Infrastructure",
    "You need hosting and deployments that scale without managing servers manually.",
    ["Cloud hosting", "Deployment pipelines", "Backups", "Scalable environments"],
    "Teams that need reliable, scalable hosting.",
  ],
  [
    "Linux Administration",
    "Server setup, maintenance, monitoring, troubleshooting, and automation.",
    FaLinux,
    "Infrastructure",
    "Your servers need setup, maintenance, and monitoring you don't have time for.",
    ["Server setup", "Maintenance", "Monitoring", "Automation"],
    "Organizations running Linux servers.",
  ],
  [
    "Database Systems",
    "Schema design, migrations, reporting, tuning, and reliable data workflows.",
    FaDatabase,
    "Infrastructure",
    "Your data is disorganized or your reports are slow and unreliable.",
    ["Schema design", "Migrations", "Reporting", "Tuning"],
    "Businesses that depend on accurate, fast data.",
  ],
  [
    "Computer Repairs",
    "Diagnostics, software repair, upgrades, setup, and maintenance support.",
    FaTools,
    "Support",
    "A computer is slow, broken, or needs upgrading.",
    ["Diagnostics", "Software repair", "Upgrades", "Setup"],
    "Individuals and small businesses with computer issues.",
  ],
  [
    "Phone Repairs",
    "Mobile diagnostics, setup, data transfer, software fixes, and device support.",
    FaMobileAlt,
    "Support",
    "A phone has software issues or needs setup and data transfer.",
    ["Diagnostics", "Setup", "Data transfer", "Software fixes"],
    "Individuals and businesses with mobile device issues.",
  ],
  [
    "IT Consulting",
    "Technology planning, vendor guidance, infrastructure audits, and roadmaps.",
    FaUsers,
    "Support",
    "You need guidance on technology decisions, vendors, or infrastructure.",
    ["Technology planning", "Vendor guidance", "Infrastructure audits", "Roadmaps"],
    "Businesses making technology decisions.",
  ],
  [
    "Technical Support",
    "Responsive remote and on-site support for everyday technical issues.",
    FaTools,
    "Support",
    "Everyday technical issues are interrupting your work.",
    ["Remote support", "On-site support", "Maintenance", "Troubleshooting"],
    "Teams that need responsive ongoing support.",
  ],
];

// Shape: [problem, overview, whatWeProvide, Icon]
// Organized around the real problems Cypher Technologies helps clients solve.
export const solutions = [
  [
    "Need a professional website",
    "A credible online presence that turns visitors into enquiries.",
    ["Company websites", "Portals", "Landing pages", "SEO"],
    FaCode,
  ],
  [
    "Need custom business software",
    "Systems built around your exact workflows — not the other way around.",
    ["Business systems", "Dashboards", "Automation", "Integrations"],
    FaLaptopCode,
  ],
  [
    "Need to improve security",
    "Identify exposure and harden your systems, access, and data.",
    ["Security reviews", "Hardening", "Access controls", "Awareness"],
    FaShieldAlt,
  ],
  [
    "Need help deploying an application",
    "Get your product hosted, deployed, and running reliably.",
    ["Cloud hosting", "Deployment pipelines", "Backups", "Monitoring"],
    FaCloud,
  ],
  [
    "Need technical support",
    "Responsive help for everyday issues, repairs, and maintenance.",
    ["Remote support", "On-site support", "Repairs", "Maintenance"],
    FaTools,
  ],
  [
    "Need reliable connectivity",
    "Structured networks for offices, venues, and small ISPs.",
    ["LAN setup", "Wi-Fi", "Hotspots", "ISP systems"],
    FaNetworkWired,
  ],
];

// Industries Cypher Technologies serves — shown as a secondary strip under Solutions.
export const industries = [
  ["Healthcare", FaHospital],
  ["Education", FaGraduationCap],
  ["Retail", FaShoppingCart],
  ["Churches", FaChurch],
  ["Construction", FaBuilding],
  ["Hospitality", FaUsers],
  ["Government", FaShieldAlt],
  ["Transport", FaTruck],
  ["Manufacturing", FaBuilding],
  ["SMEs", FaBriefcase],
];

// Shape: [title, description, stack, liveUrl, githubUrl, status, category, problem, slides]
// status: Completed | Ongoing | In Development | Prototype | Concept
// category: Web | Software | Infrastructure | Network — only where the data supports it
// problem: what the project addresses, derived from the project description.
// slides: array of { src?, label, alt } — `src` is added only when a real product
//         screenshot exists (see the Job Board entry under images/projects/jobboard/).
//         When `src` is omitted the ProjectFrame component renders a clearly-marked
//         placeholder, so the portfolio stays visual without fabricating images.
// Statuses and links must stay honest — never fabricate URLs, clients, dates, or results.
export const projects = [
  [
    "Job Board Platform",
    "Recruitment platform with role listings, SEO-friendly pages, admin workflows, and email notifications.",
    ["Flask", "Python", "PostgreSQL"],
    "https://jobboard.co.zw/",
    null,
    "Completed",
    "Web",
    "Recruiters need a structured way to publish roles, attract applicants, and manage the hiring pipeline.",
    [
      { src: "images/projects/jobboard/home.webp", label: "Homepage", alt: "Job Board homepage — hero with Browse Jobs and Get Advertised calls to action, platform stats, and how it works." },
      { src: "images/projects/jobboard/jobs.webp", label: "Job listings", alt: "Job Board All Job Listings page — the live listing interface, currently with no active listings." },
      { src: "images/projects/jobboard/register.webp", label: "Registration", alt: "Job Board registration screen with Employer, Job Seeker, and Advertiser account types." },
      { src: "images/projects/jobboard/login.webp", label: "Login", alt: "Job Board login screen with email and social sign-in options." },
      { src: "images/projects/jobboard/contact.webp", label: "Contact & fees", alt: "Job Board contact page showing administrator details, EcoCash and bank payment methods, and service fees." },
      { src: "images/projects/jobboard/marketplace.webp", label: "Marketplace", alt: "Job Board marketplace advertisements page where advertisers list products and services." },
      { src: "images/projects/jobboard/candidates.webp", label: "Candidates", alt: "Job Board available candidates listing page for employers to browse talent." },
    ],
  ],
  [
    "FootballFlix",
    "Media platform concept for local and regional football content with a modern viewing experience.",
    ["React", "Streaming", "Media"],
    null,
    null,
    "Concept",
    "Web",
    "Local and regional football fans lack a dedicated platform for match content and viewing.",
    [{ label: "Landing page", alt: "FootballFlix — landing page (screenshot placeholder)" }],
  ],
  [
    "MiniFlix",
    "LAN-friendly movie streaming platform for private local networks and controlled access.",
    ["Flask", "HLS", "SQLite"],
    null,
    null,
    "Prototype",
    "Software",
    "Private networks need a controlled way to stream media without relying on external internet.",
    [{ label: "Media library", alt: "MiniFlix — media library (screenshot placeholder)" }],
  ],
  [
    "Internet Cafe Portal",
    "Captive portal for user sessions, timing, admin controls, and small business network operations.",
    ["Flask", "Networking", "SQLite"],
    null,
    null,
    "Prototype",
    "Network",
    "Internet cafes need reliable session management, time tracking, and admin control for customers.",
    [{ label: "Captive portal login", alt: "Internet Cafe Portal — login screen (screenshot placeholder)" }],
  ],
  [
    "ISP Management Platform",
    "Subscriber, package, ticketing, billing, and infrastructure management concept for ISPs.",
    ["React", "FastAPI", "Networking"],
    null,
    null,
    "Concept",
    "Software",
    "Small ISPs need a clear way to manage subscribers, packages, billing, and support tickets.",
    [{ label: "Subscriber management", alt: "ISP Management Platform — subscriber list (screenshot placeholder)" }],
  ],
  [
    "Business Websites",
    "Fast, modern, responsive websites for companies that need credibility and lead generation.",
    ["React", "Tailwind", "SEO"],
    null,
    null,
    "Ongoing",
    "Web",
    "Companies need an online presence that builds trust and turns visitors into enquiries.",
    [{ label: "Company website", alt: "Business Websites — company site (screenshot placeholder)" }],
  ],
  [
    "Inventory System",
    "Stock control platform with item records, movement history, reports, and team access.",
    ["Python", "Database", "Reports"],
    null,
    null,
    "Prototype",
    "Software",
    "Businesses need accurate stock tracking, movement history, and reporting without manual spreadsheets.",
    [{ label: "Stock list", alt: "Inventory System — stock list (screenshot placeholder)" }],
  ],
  [
    "School Management System",
    "Administrative system for students, staff, results, attendance, and communication.",
    ["React", "PostgreSQL", "Dashboards"],
    null,
    null,
    "In Development",
    "Software",
    "Schools need a central system to manage students, staff, results, attendance, and parent communication.",
    [{ label: "Student records", alt: "School Management System — student records (screenshot placeholder)" }],
  ],
  [
    "Church Management System",
    "Member, giving, event, and communication workflows for growing churches.",
    ["Web App", "CRM", "Reports"],
    null,
    null,
    "In Development",
    "Software",
    "Growing churches need organized workflows for members, giving, events, and communication.",
    [{ label: "Members directory", alt: "Church Management System — members directory (screenshot placeholder)" }],
  ],
  [
    "Network Deployments",
    "Structured Wi-Fi, hotspot, LAN, and small business network rollout projects.",
    ["Linux", "Routing", "Wi-Fi"],
    null,
    null,
    "Ongoing",
    "Network",
    "Offices and venues need reliable, structured connectivity that users can depend on.",
    [{ label: "Network diagram", alt: "Network Deployments — site network diagram (screenshot placeholder)" }],
  ],
];

export const benefits = [
  "Experienced Engineers",
  "Reliable Support",
  "Modern Technologies",
  "Affordable Pricing",
  "Secure Development",
  "Custom Solutions",
  "Scalable Infrastructure",
  "Fast Delivery",
  "Professional Consultation",
];

// Honest structure: founder-led, disciplines covered, specialists join per project.
export const team = [
  ["Founder & Lead Engineer", "Tarie Cipher — strategy, architecture, development, security, and client delivery."],
  ["Software Development", "Web apps, business systems, integrations, dashboards, and automation."],
  ["Cybersecurity", "Security reviews, hardening, access controls, and safer workflows."],
  ["Networks & Infrastructure", "LAN, Wi-Fi, routing, Linux, cloud, and deployment support."],
  ["Client Support", "Responsive technical support, maintenance, and handover."],
  ["Growing Team", "Trusted specialists join per project as Cypher Technologies expands."],
];

// Company commitments — not client quotes. Replace with verified testimonials
// only when real clients provide them.
export const servicePromises = [
  ["Clear communication", "You always know what we are building, why it matters, and what happens next — no disappearing acts."],
  ["Security by design", "Safer access, cleaner data flows, and hardened deployments are part of the build, not an afterthought."],
  ["Systems your team can run", "We hand over documentation, training, and support so your system keeps working after launch."],
  ["Honest scoping", "Practical technology choices, sensible budgets, and no unnecessary complexity."],
];

export const techStack = [
  ["React", FaReact],
  ["Python", FaPython],
  ["FastAPI", SiFastapi],
  ["Node.js", SiNodedotjs],
  ["Linux", FaLinux],
  ["AWS", FaAws],
  ["Docker", FaDocker],
  ["GitHub", FaGithub],
  ["PostgreSQL", SiPostgresql],
  ["MySQL", SiMysql],
  ["MongoDB", SiMongodb],
  ["Networking", FaNetworkWired],
  ["Cybersecurity", FaShieldAlt],
  ["Cloud", FaCloud],
  ["AI", FaBrain],
];

// Technologies grouped by discipline — makes the stack meaningful, not decorative.
// Each group references names from techStack above; icons are looked up from there.
export const techGroups = [
  ["Frontend", ["React"]],
  ["Backend & APIs", ["Python", "FastAPI", "Node.js"]],
  ["Databases", ["PostgreSQL", "MySQL", "MongoDB"]],
  ["Cloud & Infrastructure", ["AWS", "Docker", "Linux", "Cloud"]],
  ["Security", ["Cybersecurity"]],
  ["Networking", ["Networking"]],
  ["Development Tools", ["GitHub", "AI"]],
];

// Upcoming writing topics — articles are in preparation, not yet published.
export const blogPosts = [
  ["Technology", "How modern businesses can use custom software to reduce operational friction."],
  ["Programming", "Why React and API-first systems are a strong foundation for scalable products."],
  ["Cybersecurity", "Practical security habits every small business should adopt before growth."],
  ["Networking", "What to consider before deploying office Wi-Fi, hotspots, or ISP-style networks."],
  ["Cloud", "Cloud infrastructure basics: backups, monitoring, deployment, and cost control."],
  ["AI", "Where AI automation can save time without making business workflows confusing."],
    ["Business", "Choosing the right digital partner for long-term technology growth."],
];

// ---------------------------------------------------------------------------
// Visual service showcase — the 7 headline disciplines Cypher Technologies
// markets. Each entry pairs an honest short description (derived from the
// existing `services` catalogue) with a dedicated illustration. The `image`
// value is a path under public/images/ resolved via the `asset()` helper so it
// works on both the custom domain and a GitHub Pages project path.
// ---------------------------------------------------------------------------
export const servicesShowcase = [
  {
    name: "Software Development",
    short: "Custom platforms and internal tools.",
    desc: "Custom platforms, internal tools, dashboards, and workflow systems built around your operations.",
    image: "images/services/code-scene.svg",
    Icon: FaLaptopCode,
    cta: "Get a quote",
    ctaHref: "#contact",
  },
  {
    name: "Web Development",
    short: "Sites and portals that win trust.",
    desc: "High-performance company sites, client portals, landing pages, and web apps that turn visitors into enquiries.",
    image: "images/services/web-development.svg",
    Icon: FaCode,
    cta: "See our work",
    ctaHref: "#projects",
  },
  {
    name: "Business Systems",
    short: "Operations software that fits.",
    desc: "Operations software tailored to your exact teams, approvals, reports, and data flows — not the other way around.",
    image: "images/services/business-systems.svg",
    Icon: FaBriefcase,
    cta: "Get a quote",
    ctaHref: "#contact",
  },
  {
    name: "Cybersecurity",
    short: "Safer systems by design.",
    desc: "Security reviews, hardening, safer access patterns, and awareness support built into every deliverable.",
    image: "images/services/cybersecurity.svg",
    Icon: FaShieldAlt,
    cta: "Secure my systems",
    ctaHref: "#contact",
  },
  {
    name: "Cloud Infrastructure",
    short: "Hosting that scales.",
    desc: "Cloud hosting, deployment pipelines, backups, and scalable environments that run without constant hands-on management.",
    image: "images/services/cloud-infrastructure.svg",
    Icon: FaCloud,
    cta: "Talk hosting",
    ctaHref: "#contact",
  },
  {
    name: "AI & Automation",
    short: "Automate the repetitive work.",
    desc: "Smart assistants, content workflows, data extraction, and business automation that removes repetitive manual work.",
    image: "images/services/ai-automation.svg",
    Icon: FaBrain,
    cta: "Automate a workflow",
    ctaHref: "#contact",
  },
  {
    name: "IT Support & Repairs",
    short: "Fix, upgrade, keep running.",
    desc: "Diagnostics, computer and phone repairs, upgrades, setup, and responsive remote and on-site support.",
    image: "images/services/it-support.svg",
    Icon: FaTools,
    cta: "Get support",
    ctaHref: "#contact",
  },
];

// ---------------------------------------------------------------------------
// "Inside Cypher" collage — real disciplines the company actually performs,
// expressed as short, human labels over authentic illustration scenes.
// ---------------------------------------------------------------------------
export const insideCypher = [
  { label: "BUILD", image: "images/services/code-scene.svg", caption: "Software, websites and business systems" },
  { label: "DEPLOY", image: "images/services/cloud-infrastructure.svg", caption: "Cloud, servers and release pipelines" },
  { label: "SECURE", image: "images/services/cybersecurity.svg", caption: "Hardening, reviews and safer access" },
  { label: "CONNECT", image: "images/services/network.svg", caption: "Networks, Wi-Fi and structured cabling" },
  { label: "SCALE", image: "images/services/business-systems.svg", caption: "Operations and reporting systems" },
  { label: "SUPPORT", image: "images/services/it-support.svg", caption: "Repairs, setup and responsive support" },
];
