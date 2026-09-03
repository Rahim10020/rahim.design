interface KnowMeCardProps {
  number: string;
  title: string;
  description: string;
  className?: string;
}

export default function KnowMeCard({
  number,
  title,
  description,
  className = "",
}: KnowMeCardProps) {
  return (
    <article className={`relative flex gap-6 ${className}`}>
      {/* Number */}
      <div className="shrink-0 pt-2">
        <span className="text-foreground text-5xl sm:text-6xl md:text-7xl font-medium leading-none">
          {number}
        </span>
      </div>

      {/* Card */}
      <div className="relative flex-1 p-6 sm:p-8 min-h-60 flex flex-col">
        {/* Orange accent bar */}
        <div className="absolute top-6 left-0 w-16 h-1.5 bg-accent" />

        {/* Title */}
        <h3 className="text-xl md:text-3xl font-medium text-foreground mt-6 mb-4 ">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-xl text-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
}
