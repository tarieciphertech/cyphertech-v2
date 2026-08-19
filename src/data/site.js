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

// Shape: [name, description, Icon, category]
// Categories power the filter in the Services section: Build | Secure | Infrastructure | Support
export const services = [
  ["Software Development", "Custom platforms, internal tools, dashboards, and workflow systems built around your operations.", FaLaptopCode, "Build"],
  ["Custom Business Systems", "Operations software tailored to your exact teams, approvals, and reports.", FaBriefcase, "Build"],
  ["Website Development", "High-performance company sites, portals, landing pages, and web apps that win trust.", FaCode, "Build"],
  ["E-commerce", "Online stores, payment-ready catalogs, inventory flows, and customer journeys.", FaShoppingCart, "Build"],
  ["Mobile Applications", "Mobile-first product experiences for Android, iOS, and responsive web.", FaMobileAlt, "Build"],
  ["AI Automation", "Smart assistants, content workflows, data extraction, and business automation.", FaBrain, "Build"],
  ["Cybersecurity", "Security reviews, hardening, safer access patterns, and awareness support.", FaShieldAlt, "Secure"],
  ["Networking", "LAN, Wi-Fi, hotspot, ISP, and small business connectivity deployments.", FaNetworkWired, "Infrastructure"],
  ["Cloud Infrastructure", "Cloud hosting, deployment pipelines, backups, and scalable environments.", FaCloud, "Infrastructure"],
  ["Linux Administration", "Server setup, maintenance, monitoring, troubleshooting, and automation.", FaLinux, "Infrastructure"],
  ["Database Systems", "Schema design, migrations, reporting, tuning, and reliable data workflows.", FaDatabase, "Infrastructure"],
  ["Computer Repairs", "Diagnostics, software repair, upgrades, setup, and maintenance support.", FaTools, "Support"],
  ["Phone Repairs", "Mobile diagnostics, setup, data transfer, software fixes, and device support.", FaMobileAlt, "Support"],
  ["IT Consulting", "Technology planning, vendor guidance, infrastructure audits, and roadmaps.", FaUsers, "Support"],
  ["Technical Support", "Responsive remote and on-site support for everyday technical issues.", FaTools, "Support"],
];

// Shape: [industry, overview, exampleDeliverables, Icon]
export const solutions = [
  ["Healthcare", "Secure patient workflows, appointment systems, staff dashboards, and reporting.", ["Booking portals", "Records dashboards", "SMS reminders"], FaHospital],
  ["Education", "School management, e-learning portals, attendance, results, and parent communication.", ["Student portals", "Results systems", "Learning hubs"], FaGraduationCap],
  ["Retail", "Inventory, sales, customer records, e-commerce, and stock visibility.", ["POS dashboards", "Stock systems", "Online stores"], FaShoppingCart],
  ["Churches", "Member management, donations, event scheduling, livestream support, and communication.", ["Member CRM", "Giving records", "Event tools"], FaChurch],
  ["Construction", "Project tracking, procurement, site reporting, documents, and equipment logs.", ["Project dashboards", "Asset logs", "Quote systems"], FaBuilding],
  ["Hospitality", "Booking, guest records, menus, ordering, staff coordination, and digital presence.", ["Reservation portals", "Guest CRM", "Menu systems"], FaUsers],
  ["Government", "Citizen portals, secure forms, reporting tools, internal workflow automation.", ["Service portals", "Case tracking", "Data reports"], FaShieldAlt],
  ["Transport", "Fleet visibility, route records, ticketing, maintenance tracking, and dispatch tools.", ["Fleet systems", "Ticket portals", "Route dashboards"], FaTruck],
  ["Manufacturing", "Inventory, production tracking, maintenance logs, procurement, and analytics.", ["Production boards", "Stock control", "Maintenance logs"], FaBuilding],
  ["SMEs", "Affordable digital systems that bring order to sales, operations, finance, and support.", ["Company websites", "Client portals", "Admin dashboards"], FaBriefcase],
];

// Shape: [title, description, stack, liveUrl, githubUrl, status]
// status: Completed | Ongoing | In Development | Prototype | Concept
// Statuses must stay honest — do not present concepts as delivered client work.
export const projects = [
  [
    "Job Board Platform",
    "Recruitment platform with role listings, SEO-friendly pages, admin workflows, and email notifications.",
    ["Flask", "Python", "PostgreSQL"],
    "https://jobboard.co.zw/",
    null,
    "Completed",
  ],
  ["FootballFlix", "Media platform concept for local and regional football content with a modern viewing experience.", ["React", "Streaming", "Media"], null, null, "Concept"],
  ["MiniFlix", "LAN-friendly movie streaming platform for private local networks and controlled access.", ["Flask", "HLS", "SQLite"], null, null, "Prototype"],
  ["Internet Cafe Portal", "Captive portal for user sessions, timing, admin controls, and small business network operations.", ["Flask", "Networking", "SQLite"], null, null, "Prototype"],
  ["ISP Management Platform", "Subscriber, package, ticketing, billing, and infrastructure management concept for ISPs.", ["React", "FastAPI", "Networking"], null, null, "Concept"],
  ["Business Websites", "Fast, modern, responsive websites for companies that need credibility and lead generation.", ["React", "Tailwind", "SEO"], null, null, "Ongoing"],
  ["Inventory System", "Stock control platform with item records, movement history, reports, and team access.", ["Python", "Database", "Reports"], null, null, "Prototype"],
  ["School Management System", "Administrative system for students, staff, results, attendance, and communication.", ["React", "PostgreSQL", "Dashboards"], null, null, "In Development"],
  ["Church Management System", "Member, giving, event, and communication workflows for growing churches.", ["Web App", "CRM", "Reports"], null, null, "In Development"],
  ["Network Deployments", "Structured Wi-Fi, hotspot, LAN, and small business network rollout projects.", ["Linux", "Routing", "Wi-Fi"], null, null, "Ongoing"],
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
