interface LearnCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export default function LearnCard({
  title,
  imageSrc,
  imageAlt = "",
  className = "",
}: LearnCardProps) {
  return (
    <article className={`flex flex-col group ${className}`}>
      {/* Image */}
      <div className="w-full aspect-2/1 overflow-hidden bg-background mb-6">
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
      <h3 className="text-foreground text-3xl md::text-3xl font-medium underline lg:group-hover:underline mb-3">
        {title}
      </h3>
    </article>
  );
}
