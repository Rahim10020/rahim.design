import { useRef } from "react";
import StepCard from "../ui/cards/StepCard";
import { stepsData } from "../../data/steps";
import { gsap, useGSAP } from "../../lib/gsap";

export default function StepsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gridRef.current?.children;
      if (!cards) return;

      const numbers = gsap.utils.toArray<HTMLElement>(
        gridRef.current!.querySelectorAll("[data-step-number]"),
      );
      const cardBodies = gsap.utils.toArray<HTMLElement>(
        gridRef.current!.querySelectorAll("[data-step-body]"),
      );
      const bars = gsap.utils.toArray<HTMLElement>(
        gridRef.current!.querySelectorAll("[data-step-bar]"),
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // 1. Numéros qui pop
      tl.from(numbers, {
        scale: 0,
        rotate: -30,
        autoAlpha: 0,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: 0.15,
      });

      // 2. Cards qui glissent depuis la gauche
      tl.from(
        cardBodies,
        {
          x: -30,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.15,
        },
        "<", // en même temps que les numéros
      );

      // 3. Barres orange qui se dessinent
      tl.from(
        bars,
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.3",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-background py-section lg:py-section-lg"
    >
      <div className="max-w-350 mx-auto px-page-x">
        <div className="mx-auto max-w-6xl">
          {/* Title */}
          <h2 className="text-foreground text-center lg:text-left text-4xl sm:text-5xl font-medium leading-tight mb-16 lg:mb-18 max-w-2xl">
            This is how we will move from your idea to something concrete
          </h2>

          {/* Steps Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-heading-content lg:gap-x-section lg:gap-y-cluster"
          >
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
      </div>
    </section>
  );
}
