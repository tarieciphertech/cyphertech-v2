import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Blog from "./components/Blog";
import Careers from "./components/Careers";
import Services from "./components/Services";
import Solutions from "./components/Solutions";
import Projects from "./components/Projects";
import Team from "./components/Team";
import Technologies from "./components/Technologies";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  return (
    <main className="min-h-screen bg-[#05020a] text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Solutions />
      <Projects />
      <WhyChooseUs />
      <About />
      <Team />
      <Testimonials />
      <Technologies />
      <Blog />
      <Careers />
      <Contact />
      <Footer />
    </main>
  );
}
