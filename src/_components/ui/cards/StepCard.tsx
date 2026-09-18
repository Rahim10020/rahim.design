import { useRef } from "react";
import { gsap, useGSAP } from "../../../lib/gsap";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  backgroundColor: string;
  textColor?: "light" | "dark";
  className?: string;
}

export default function StepCard({
  number,
  title,
  description,
  backgroundColor,
  textColor = "dark",
  className = "",
}: StepCardProps) {
  const isLightText = textColor === "light";
  const cardRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  /* Hover desktop : la barre orange s'étend */
  useGSAP(
    () => {
      const card = cardRef.current;
      const bar = barRef.current;
      if (!card || !bar) return;

      const onEnter = () => {
        gsap.to(bar, {
          scaleX: 1.3,
          transformOrigin: "left center",
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const onLeave = () => {
        gsap.to(bar, {
          scaleX: 1,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: cardRef },
  );

  return (
    <article ref={cardRef} className={`relative flex gap-element ${className}`}>
      {/* Number */}
      <div className="shrink-0 pt-tight">
        <span
          data-step-number
          className="text-foreground text-5xl sm:text-6xl md:text-7xl font-medium leading-none"
        >
          {number}
        </span>
      </div>

      {/* Card */}
      <div
        data-step-body
        className="relative flex-1 p-comfortable sm:p-block min-h-60 flex flex-col"
        style={{ backgroundColor }}
      >
        {/* Orange accent bar */}
        <div
          ref={barRef}
          data-step-bar
          className="absolute top-comfortable left-0 w-16 h-1.5 bg-accent"
        />

        {/* Title */}
        <h3
          className={`text-2xl md:text-3xl font-medium mt-comfortable mb-element leading-snug ${
            isLightText ? "text-background" : "text-foreground"
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`text-md md:text-xl leading-relaxed ${
            isLightText ? "text-white/90" : "text-foreground"
          }`}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
