interface LearnCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export default function LearnCard({
  title,
  description,
  imageSrc,
  imageAlt = "",
  className = "",
}: LearnCardProps) {
  return (
    <article className={`flex flex-col group ${className}`}>
      {/* Image */}
      <div className="w-full aspect-6/5 overflow-hidden bg-background mb-6">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          // Placeholder
          <img
            src="/images/others/image_placeholder.svg"
            alt="placeholder image"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Title */}
      <h3 className="text-foreground text-xl sm:text-3xl font-medium group-hover:underline mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-foreground text-xl font-normal leading-relaxed">
        {description}
      </p>
    </article>
  );
}
