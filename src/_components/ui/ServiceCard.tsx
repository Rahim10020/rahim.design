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
      <div className="w-full aspect-6/5 overflow-hidden bg-[#f5f5f5] mb-6">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          // Placeholder (tu pourras remplacer plus tard)
          <img
            src="/images"
            alt="placeholder image"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Title */}
      <h3 className="text-[#1e1e1e] text-xl sm:text-2xl font-medium mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[#1e1e1e] text-base leading-relaxed">{description}</p>
    </article>
  );
}
