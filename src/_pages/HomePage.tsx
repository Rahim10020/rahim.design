import HeroSection from "../_components/sections/HeroSection";

export default function HomePage() {
  return (
    <div>
      {/* Hero section */}
      <HeroSection />

      {/* About section */}
      <section id="about" className="min-h-[calc(100svh-104px)]"></section>

      {/* Services section */}
      <section id="services" className="min-h-[calc(100svh-104px)]"></section>

      {/* Projects section */}
      <section id="projects" className="min-h-[calc(100svh-104px)]"></section>

      {/* Steps section */}
      <section className="min-h-[calc(100svh-104px)]"></section>

      {/* Contact section */}
      <section id="contact" className="min-h-[calc(100svh-104px)]"></section>
    </div>
  );
}
