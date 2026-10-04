import { Suspense, lazy } from "react";
import HeroSection from "../_components/sections/HeroSection";

// Below-fold en lazy : seul le hero part avec le JS initial. Les sections
// suivantes chargent en parallèle dès que le hero est peint.
const AboutSection = lazy(
  () => import("../_components/sections/AboutSection"),
);
const ServicesSection = lazy(
  () => import("../_components/sections/ServicesSection"),
);
const ProjectsSection = lazy(
  () => import("../_components/sections/ProjectsSection"),
);
const StepsSection = lazy(
  () => import("../_components/sections/StepsSection"),
);
const ContactSection = lazy(
  () => import("../_components/sections/ContactSection"),
);

/**
 * Placeholder dimensionné (pas de CLS) + signal pour le crawl de pré-rendu
 * qui attend `[data-section]` avant le snapshot.
 */
function BelowFold({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div data-section={name} className="cv-auto">
      <Suspense fallback={<div className="min-h-[40vh]" aria-hidden />}>
        {children}
      </Suspense>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero section */}
      <div data-section="hero">
        <HeroSection />
      </div>

      {/* About section */}
      <BelowFold name="about">
        <AboutSection />
      </BelowFold>

      {/* Services section */}
      <BelowFold name="services">
        <ServicesSection />
      </BelowFold>

      {/* Projects section */}
      <BelowFold name="projects">
        <ProjectsSection />
      </BelowFold>

      {/* Steps section */}
      <BelowFold name="steps">
        <StepsSection />
      </BelowFold>
      {/* Contact section */}
      <BelowFold name="contact">
        <ContactSection />
      </BelowFold>
    </div>
  );
}
