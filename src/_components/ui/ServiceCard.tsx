interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  imageSrc,
  imageAlt = "",
  className = "",
}: ServiceCardProps) {
  return (
    <article className={`flex flex-col ${className}`}>
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
      <h3 className="text-foreground text-xl md:text-3xl font-medium mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-foreground text-xl font-normal leading-relaxed">
        {description}
      </p>
    </article>
  );
}
