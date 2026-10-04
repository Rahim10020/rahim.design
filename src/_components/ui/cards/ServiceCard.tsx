interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Aplat de couleur de la cover (classe Tailwind statique). */
  coverColor?: string;
  /** Icône décorative centrée sur l'aplat. */
  iconSrc?: string;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  imageSrc,
  imageAlt = "",
  coverColor,
  iconSrc,
  className = "",
}: ServiceCardProps) {
  return (
    <article
      className={`flex flex-col mx-auto w-full max-w-sm lg:max-w-none ${className}`}
    >
      {/* Cover : image, ou aplat couleur + icône, ou placeholder */}
      <div
        className={`w-full max-w-none aspect-video md:aspect-6/5 overflow-hidden mb-comfortable flex items-center justify-center ${coverColor ?? "bg-background"}`}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            width={800}
            height={800}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        ) : iconSrc ? (
          <img
            src={iconSrc}
            alt=""
            aria-hidden="true"
            width={128}
            height={128}
            loading="lazy"
            decoding="async"
            className="w-24 h-24 md:w-32 md:h-32"
          />
        ) : (
          //Placeholder
          <img
            src="/images/others/image_placeholder.svg"
            alt=""
            aria-hidden="true"
            width={800}
            height={800}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Title */}
      <h3 className="text-foreground text-2xl md:text-3xl font-medium mb-heading-text text-left">
        {title}
      </h3>

      {/* Description */}
      <p className="text-foreground-alt-a text-base md:text-xl font-normal mx-auto max-w-sm lg:max-w-none leading-relaxed text-left">
        {description}
      </p>
    </article>
  );
}
