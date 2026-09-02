import { Link } from "react-router-dom";
import ServiceCard from "../_components/ui/cards/ServiceCard";
import StepCard from "../_components/ui/cards/StepCard";
import Button from "../_components/ui/Button";
import { ArrowLeftIcon } from "../_components/icons";
import { stepsData } from "../data/steps";
import { ROUTES } from "../routes";

const services = [
  {
    title: "Design an interface",
    description:
      "I transform your ideas into clear, coherent and pleasant-to-use interfaces, designed for your users and your objective.",
    idealFor:
      "Early-stage ideas that need a polished, user-tested direction before development.",
    deliverables: ["User flows", "Wireframes", "High-fidelity mockups", "Design system"],
  },
  {
    title: "Build the product",
    description:
      "I develop fast, responsive and design-friendly web interfaces, with particular attention to detail.",
    idealFor:
      "Products ready to ship that need a clean, efficient codebase faithful to the design.",
    deliverables: ["Component library", "Responsive pages", "Animations", "Performance audit"],
  },
  {
    title: "Improve the existing",
    description:
      "I can take an existing interface, identify experience issues, and restore clarity, consistency, and character.",
    idealFor:
      "Live products that feel off — slow, confusing, or inconsistent — and need a strategic lift.",
    deliverables: ["UX audit", "Refactor plan", "Component cleanup", "Speed tuning"],
  },
];

export default function ServicesPage() {
  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24 mb-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* Back link */}
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-foreground text-base mb-12"
          >
            <ArrowLeftIcon size={20} />
            <span>Back to home</span>
          </Link>

          {/* Heading */}
          <h1 className="text-foreground text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight mb-10">
            Services.
          </h1>

          {/* Block A — Intro */}
          <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed max-w-3xl mb-20">
            I help you take an idea from a rough sketch to something real,
            fast. Whether you need to design an interface from scratch, build
            the product, or fix what's already there — I bring a sharp eye for
            detail and a focus on the work that actually moves things forward.
          </p>

          {/* Block B — Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {services.map((service) => (
              <div key={service.title} className="flex flex-col">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                />
                <div className="mt-6 space-y-3">
                  <p className="text-foreground text-lg font-medium">
                    Ideal for
                  </p>
                  <p className="text-foreground text-lg font-normal leading-relaxed">
                    {service.idealFor}
                  </p>
                  <ul className="text-foreground text-sm font-normal leading-relaxed list-disc list-inside">
                    {service.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Block C — Process */}
          <div className="mt-24">
            <h2 className="text-foreground text-3xl sm:text-4xl font-medium leading-tight mb-16 lg:mb-20 max-w-2xl">
              This is how we will move from your idea to something concrete
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-16 lg:gap-y-14">
              {stepsData.map((step) => (
                <StepCard
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  backgroundColor={step.backgroundColor}
                  textColor={step.textColor}
                />
              ))}
            </div>
          </div>

          {/* Block D — CTA */}
          <div className="mt-24 flex items-center">
            <Link to="/#contact" className="relative inline-block">
              <Button className="px-8 py-4 text-2xl font-medium bg-primary border-2 border-foreground text-foreground">
                Let's build something
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
