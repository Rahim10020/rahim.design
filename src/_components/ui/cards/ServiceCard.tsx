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
    <article
      className={`flex flex-col mx-auto w-full max-w-xs lg:max-w-none ${className}`}
    >
      {/* Image */}
      <div className="w-full max-w-none aspect-square md:aspect-6/5 overflow-hidden bg-background mb-comfortable">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          //Placeholder
          <img
            src="/images/others/image_placeholder.svg"
            alt="placeholder image"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Title */}
      <h3 className="text-foreground text-xl md:text-3xl font-medium mb-heading-text text-left">
        {title}
      </h3>

      {/* Description */}
      <p className="text-foreground text-base md:text-xl font-normal mx-auto max-w-xs lg:max-w-none leading-relaxed text-left">
        {description}
      </p>
    </article>
  );
}
