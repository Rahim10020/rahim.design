import AboutSection from "../_components/sections/AboutSection";
import ContactSection from "../_components/sections/ContactSection";
import HeroSection from "../_components/sections/HeroSection";
import ProjectsSection from "../_components/sections/ProjectsSection";
import ServicesSection from "../_components/sections/ServicesSection";
import StepsSection from "../_components/sections/StepsSection";

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
      <StepsSection />
      {/* Contact section */}
      <ContactSection />
    </div>
  );
}
