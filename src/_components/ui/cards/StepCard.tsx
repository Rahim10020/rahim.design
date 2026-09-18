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

  return (
    <article className={`relative flex gap-element ${className}`}>
      {/* Number */}
      <div className="shrink-0 pt-tight">
        <span className="text-foreground text-5xl sm:text-6xl md:text-7xl font-medium leading-none">
          {number}
        </span>
      </div>

      {/* Card */}
      <div
        className="relative flex-1 p-comfortable sm:p-block min-h-60 flex flex-col"
        style={{ backgroundColor }}
      >
        {/* Orange accent bar */}
        <div className="absolute top-comfortable left-0 w-16 h-1.5 bg-accent" />

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
