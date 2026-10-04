import ServiceCard from "../ui/cards/ServiceCard";
import { useLocale } from "../../lib/i18n";
import { getUi } from "../../locales/ui";

/** Cover de chaque carte : aplat + icône (même ordre que les items localisés). */
const COVERS = [
  { coverColor: "bg-accent", iconSrc: "/icons/pinwheel.svg" },
  { coverColor: "bg-primary", iconSrc: "/icons/hammer.svg" },
  { coverColor: "bg-accent-c", iconSrc: "/icons/trefoil.svg" },
];

export default function ServicesSection() {
  const t = getUi(useLocale()).servicesSection;
  return (
    <section className="w-full bg-background my-section lg:py-section-lg">
      <div className="max-w-350 mx-auto px-page-x">
        {/* Title */}
        <h2 className="text-foreground text-4xl sm:text-5xl font-medium leading-tight mb-heading-content lg:mb-major max-w-xs lg:max-w-md text-center lg:text-left mx-auto lg:mx-0">
          {t.title}
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-heading-content lg:gap-major">
          {t.items.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              coverColor={COVERS[index]?.coverColor}
              iconSrc={COVERS[index]?.iconSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
