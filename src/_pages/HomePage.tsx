import AboutSection from "../_components/sections/AboutSection";
import HeroSection from "../_components/sections/HeroSection";
import ProjectsSection from "../_components/sections/ProjectsSection";
import ServicesSection from "../_components/sections/ServicesSection";

export default function HomePage() {
  return (
    <div>
      {/* Hero section */}
      <HeroSection />

      {/* About section */}
      <AboutSection />

      {/* Services section */}
      <ServicesSection />

      {/* Projects section */}
      <ProjectsSection />

      {/* Steps section */}
      <section className="min-h-[calc(100svh-104px)]"></section>

      {/* Contact section */}
      <section id="contact" className="min-h-[calc(100svh-104px)]"></section>
    </div>
  );
}
