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
    <article className={`relative flex gap-6 ${className}`}>
      {/* Number */}
      <div className="shrink-0 pt-2">
        <span className="text-foreground text-5xl sm:text-6xl md:text-7xl font-medium leading-none">
          {number}
        </span>
      </div>

      {/* Card */}
      <div
        className="relative flex-1 p-6 sm:p-8 min-h-60 flex flex-col"
        style={{ backgroundColor }}
      >
        {/* Orange accent bar */}
        <div className="absolute top-6 left-0 w-16 h-1.5 bg-accent" />

        {/* Title */}
        <h3
          className={`text-xl sm:text-2xl font-medium mt-6 mb-4 leading-snug ${
            isLightText ? "text-background" : "text-foreground"
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            isLightText ? "text-white/90" : "text-foreground"
          }`}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
