import ServiceCard from "../ui/ServiceCard";
import { SECTION_IDS } from "../../routes";

interface Service {
  title: string;
  description: string;
  imageSrc?: string;
}

const services: Service[] = [
  {
    title: "Design an interface",
    description:
      "I transform your ideas into clear, coherent and pleasant to use interfaces, designed for your users and your objective.",
    // imageSrc: "/images/service-design.jpg", // à ajouter plus tard
  },
  {
    title: "Build the product",
    description:
      "I develop fast, responsive and design-friendly web interfaces, with particular attention to detail.",
    // imageSrc: "/images/service-build.jpg",
  },
  {
    title: "Improve the existing",
    description:
      "I can take an existing interface, identify experience issues, and restore clarity, consistency, and character.",
    // imageSrc: "/images/service-improve.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section
      id={SECTION_IDS.SERVICES}
      className="w-full min-h-[calc(100svh-104px)] bg-background py-20 lg:py-28"
    >
      <div className="max-w-350 mx-auto px-6">
        {/* Title */}
        <h2 className="text-foreground text-4xl sm:text-5xl font-medium leading-tight mb-16 lg:mb-20 max-w-md">
          What I can do
          <br />
          for you
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
