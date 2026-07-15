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

export const profile = {
  brand: "Cypher Technologies",
  owner: "Tarie Cipher",
  role: "Founder & CEO",
  email: "mtshietarie@gmail.com",
  phone: "+26771493735",
  location: "Gaborone, Botswana",
  hours: "Mon - Sat, 08:00 - 18:00",
  github: "https://github.com/tarieciphertech",
  portfolio: "https://tarieciphertech.github.io/cypher-portfolio/",
  youtube: "https://youtube.com/@tarietech5958",
  instagram: "https://www.instagram.com/unclecipher",
  tiktok: "https://www.tiktok.com/@cipherhotspot",
  linkedin: "https://www.linkedin.com/in/tarie-cipher",
  mission:
    "Help people and small teams use technology with more confidence, less confusion, and systems that actually fit the way they work.",
  vision: "To grow into a trusted African technology partner known for honest advice, careful delivery, and useful digital products.",
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

export const stats = [
  ["Founder-led", "Direct communication"],
  ["Gaborone", "Local and remote"],
  ["Plain English", "No confusing jargon"],
  ["Practical", "Built around your work"],
  ["Aftercare", "Support after launch"],
];

export const services = [
  ["Software Development", "Custom apps, dashboards, portals, and internal tools built around your day-to-day process.", FaLaptopCode],
  ["Custom Business Systems", "Digitize the forms, approvals, reports, and handovers that currently live in notebooks or spreadsheets.", FaBriefcase],
  ["Website Development", "Clean, fast websites that explain what you do clearly and make it easier for clients to contact you.", FaCode],
  ["E-commerce", "Simple online stores, product catalogs, payment-ready flows, and inventory-friendly customer journeys.", FaShoppingCart],
  ["Mobile Applications", "Mobile-first experiences for customers, staff, field teams, and communities that need access on the go.", FaMobileAlt],
  ["Cybersecurity", "Practical security checks, safer login patterns, backups, and advice your team can actually follow.", FaShieldAlt],
  ["Networking", "Office Wi-Fi, LAN setup, hotspot support, routing, and connectivity help for homes and small businesses.", FaNetworkWired],
  ["Cloud Infrastructure", "Hosting, deployment, backups, monitoring, and simple cloud setups that do not become a mystery later.", FaCloud],
  ["Linux Administration", "Server setup, updates, troubleshooting, automation, and everyday Linux support.", FaLinux],
  ["Database Systems", "Organized data, useful reports, migrations, cleanup, and database designs that stay understandable.", FaDatabase],
  ["AI Automation", "Small, useful automations for repetitive admin, content, data extraction, and customer support tasks.", FaBrain],
  ["Computer Repairs", "Diagnostics, software fixes, upgrades, setup, and maintenance for work or personal machines.", FaTools],
  ["Phone Repairs", "Mobile diagnostics, setup, data transfer, software fixes, and practical device support.", FaMobileAlt],
  ["IT Consulting", "Straight answers before you spend money on tools, vendors, hosting, hardware, or a new system.", FaUsers],
  ["Technical Support", "Remote and on-site help for the everyday tech problems that slow work down.", FaTools],
];

export const solutions = [
  ["Healthcare", "Calmer booking, records, reminders, and reporting workflows for busy clinics and care teams.", ["Booking portals", "Records dashboards", "SMS reminders"], FaHospital],
  ["Education", "School tools for attendance, results, learning content, parent updates, and admin work.", ["Student portals", "Results systems", "Learning hubs"], FaGraduationCap],
  ["Retail", "Stock, sales, customer records, simple e-commerce, and clearer day-end visibility.", ["POS dashboards", "Stock systems", "Online stores"], FaShoppingCart],
  ["Churches", "Member records, giving logs, event planning, livestream support, and better communication.", ["Member CRM", "Giving records", "Event tools"], FaChurch],
  ["Construction", "Project progress, quotes, site reports, documents, procurement, and equipment records.", ["Project dashboards", "Asset logs", "Quote systems"], FaBuilding],
  ["Hospitality", "Reservations, guest records, menus, ordering, staff coordination, and digital presence.", ["Reservation portals", "Guest CRM", "Menu systems"], FaUsers],
  ["Government", "Secure forms, citizen service portals, case tracking, reporting, and internal workflows.", ["Service portals", "Case tracking", "Data reports"], FaShieldAlt],
  ["Transport", "Fleet records, routes, tickets, maintenance reminders, and dispatch support.", ["Fleet systems", "Ticket portals", "Route dashboards"], FaTruck],
  ["Manufacturing", "Inventory, production notes, maintenance logs, procurement, and simple analytics.", ["Production boards", "Stock control", "Maintenance logs"], FaBuilding],
  ["SMEs", "Affordable websites and systems that bring order to sales, admin, finance, and support.", ["Company websites", "Client portals", "Admin dashboards"], FaBriefcase],
];

export const projects = [
  [
    "Job Board Platform",
    "Recruitment platform with role listings, SEO-friendly pages, admin workflows, and email notifications.",
    ["Flask", "Python", "PostgreSQL"],
    "https://jobboard.co.zw/",
  ],
  ["FootballFlix", "Media platform concept for local and regional football content with a modern viewing experience.", ["React", "Streaming", "Media"]],
  ["MiniFlix", "LAN-friendly movie streaming platform for private local networks and controlled access.", ["Flask", "HLS", "SQLite"]],
  ["Internet Cafe Portal", "Captive portal for user sessions, timing, admin controls, and small business network operations.", ["Flask", "Networking", "SQLite"]],
  ["ISP Management Platform", "Subscriber, package, ticketing, billing, and infrastructure management concept for ISPs.", ["React", "FastAPI", "Networking"]],
  ["Business Websites", "Fast, modern, responsive websites for companies that need credibility and lead generation.", ["React", "Tailwind", "SEO"]],
  ["Inventory System", "Stock control platform with item records, movement history, reports, and team access.", ["Python", "Database", "Reports"]],
  ["School Management System", "Administrative system for students, staff, results, attendance, and communication.", ["React", "PostgreSQL", "Dashboards"]],
  ["Church Management System", "Member, giving, event, and communication workflows for growing churches.", ["Web App", "CRM", "Reports"]],
  ["Network Deployments", "Structured Wi-Fi, hotspot, LAN, and small business network rollout projects.", ["Linux", "Routing", "Wi-Fi"]],
];

export const benefits = [
  "You speak directly with the builder",
  "Clear explanations before code",
  "Budgets discussed early",
  "Security considered from day one",
  "Built for real daily use",
  "Simple handover and training",
  "Support after launch",
  "Local context, remote-ready delivery",
  "No pressure, just honest advice",
];

export const team = [
  ["Founder-led Delivery", "Tarie stays close to the work, from the first conversation to launch and support."],
  ["Software Build Partner", "Web apps, internal systems, dashboards, integrations, and automations with practical structure."],
  ["Security Mindset", "Security reviews, safer access, backups, and habits that protect the people using the system."],
  ["Network and Linux Support", "Connectivity, Wi-Fi, routing, Linux servers, troubleshooting, and infrastructure support."],
  ["Client Support", "Patient help when something breaks, changes, or needs to be explained again."],
  ["Growing Carefully", "Cypher Technologies is expanding with intention, adding help where clients need it most."],
];

export const testimonials = [
  ["What clients often need", "I have records everywhere. I need one place where my team can see what is happening."],
  ["What small businesses ask", "I need a website that looks serious, loads fast, and makes it easy for people to reach me."],
  ["What support calls sound like", "The internet is slow, the computers are acting up, and I need someone who can explain the fix clearly."],
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

export const blogPosts = [
  ["Technology", "Signs your business has outgrown spreadsheets and needs a simple internal system."],
  ["Programming", "What a good website should do before you spend money on fancy features."],
  ["Cybersecurity", "Practical security habits every small business can start this week."],
  ["Networking", "What to check before blaming the router for slow office Wi-Fi."],
  ["Cloud", "Backups, hosting, and monitoring explained without the cloud confusion."],
  ["AI", "Small ways AI can save admin time without making your workflow weird."],
  ["Business", "How to choose a tech partner when you are not a technical person."],
];
