import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CapabilitiesStrip from "../components/CapabilitiesStrip";
import About from "../components/About";
import Blog from "../components/Blog";
import Careers from "../components/Careers";
import Services from "../components/Services";
import Solutions from "../components/Solutions";
import Projects from "../components/Projects";
import Team from "../components/Team";
import Technologies from "../components/Technologies";
import ServicePromises from "../components/ServicePromises";
import WhyChooseUs from "../components/WhyChooseUs";
import Process from "../components/Process";
import FinalCTA from "../components/FinalCTA";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

/**
 * HomePage — the public marketing homepage.
 * Preserved exactly from the Stage 1–6 single-page layout to keep the
 * production site behavior and anchor navigation unchanged.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#05020a] text-white overflow-hidden">
      <Navbar />
      <Hero />
      <CapabilitiesStrip />
      <Services />
      <Solutions />
      <WhyChooseUs />
      <Projects />
      <Process />
      <About />
      <Team />
      <ServicePromises />
      <Technologies />
      <Blog />
      <Careers />
      <FinalCTA />
      <Contact />
      <Footer />
    </main>
  );
}