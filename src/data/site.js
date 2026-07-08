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
    "Deliver innovative software, cybersecurity, networking, cloud, AI, and digital solutions that empower businesses and individuals.",
  vision: "To become one of Africa's leading technology solution providers.",
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
  ["100+", "Projects"],
  ["50+", "Happy Clients"],
  ["24/7", "Support"],
  ["10+", "Technology Stacks"],
  ["5+", "Industries Served"],
];

export const services = [
  ["Software Development", "Custom platforms, internal tools, dashboards, and workflow systems.", FaLaptopCode],
  ["Custom Business Systems", "Operations software tailored to your exact teams, approvals, and reports.", FaBriefcase],
  ["Website Development", "High-performance company sites, portals, landing pages, and web apps.", FaCode],
  ["E-commerce", "Online stores, payment-ready catalogs, inventory flows, and customer journeys.", FaShoppingCart],
  ["Mobile Applications", "Mobile-first product experiences for Android, iOS, and responsive web.", FaMobileAlt],
  ["Cybersecurity", "Security reviews, hardening, safer access patterns, and awareness support.", FaShieldAlt],
  ["Networking", "LAN, Wi-Fi, hotspot, ISP, and small business connectivity deployments.", FaNetworkWired],
  ["Cloud Infrastructure", "Cloud hosting, deployment pipelines, backups, and scalable environments.", FaCloud],
  ["Linux Administration", "Server setup, maintenance, monitoring, troubleshooting, and automation.", FaLinux],
  ["Database Systems", "Schema design, migrations, reporting, tuning, and reliable data workflows.", FaDatabase],
  ["AI Automation", "Smart assistants, content workflows, data extraction, and business automation.", FaBrain],
  ["Computer Repairs", "Diagnostics, software repair, upgrades, setup, and maintenance support.", FaTools],
  ["Phone Repairs", "Mobile diagnostics, setup, data transfer, software fixes, and device support.", FaMobileAlt],
  ["IT Consulting", "Technology planning, vendor guidance, infrastructure audits, and roadmaps.", FaUsers],
  ["Technical Support", "Responsive remote and on-site support for everyday technical issues.", FaTools],
];

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

export const team = [
  ["Founder", "Strategy, product direction, architecture, and client delivery."],
  ["Software Engineers", "Web apps, systems, integrations, dashboards, and automation."],
  ["Cybersecurity Specialists", "Security reviews, hardening, access controls, and safer workflows."],
  ["Network Engineers", "Connectivity, LAN, Wi-Fi, routing, Linux, and infrastructure support."],
  ["Support Team", "Responsive technical support, maintenance, and client success."],
  ["Hiring Soon", "We are building a stronger team as Cypher Technologies grows."],
];

export const testimonials = [
  ["Operations Manager", "Cypher Technologies helped us turn a messy manual process into a clean digital workflow."],
  ["Small Business Owner", "The team understood our budget, moved fast, and delivered a site that feels professional."],
  ["Network Client", "Reliable support, clear explanations, and practical solutions for our office network."],
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
  ["Technology", "How modern businesses can use custom software to reduce operational friction."],
  ["Programming", "Why React and API-first systems are a strong foundation for scalable products."],
  ["Cybersecurity", "Practical security habits every small business should adopt before growth."],
  ["Networking", "What to consider before deploying office Wi-Fi, hotspots, or ISP-style networks."],
  ["Cloud", "Cloud infrastructure basics: backups, monitoring, deployment, and cost control."],
  ["AI", "Where AI automation can save time without making business workflows confusing."],
  ["Business", "Choosing the right digital partner for long-term technology growth."],
];
