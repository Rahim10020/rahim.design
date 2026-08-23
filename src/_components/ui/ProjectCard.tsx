interface ProjectCardProps {
  title: string;
  category?: string;
  imageSrc?: string;
  imageAlt?: string;
  href: string;
  imageHeight?: string; // ex: "h-64", "h-80", "h-96"...
  className?: string;
}

export default function ProjectCard({
  title,
  category,
  imageSrc,
  imageAlt = "",
  href,
  imageHeight = "h-72",
  className = "",
}: ProjectCardProps) {
  return (
    <a
      href={href}
      className={`group shrink-0 w-72 sm:w-80 snap-center flex flex-col ${className}`}
    >
      {/* Image */}
      <div
        className={`w-full ${imageHeight} overflow-hidden bg-background mb-4`}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt || title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          // Placeholder
          <img
            src="/images/image_placeholder.svg"
            alt="placeholder image"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Title + Category */}
      <div className="px-1">
        <h3 className="text-foreground text-lg font-medium group-hover:underline underline-offset-4 decoration-1 transition-all">
          {title}
        </h3>
        {category && (
          <p className="text-neutral-500 text-sm mt-1">{category}</p>
        )}
      </div>
    </a>
  );
}
