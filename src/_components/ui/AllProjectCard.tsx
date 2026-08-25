interface AllProjectCardProps {
  title: string;
  description: string;
  category: "project" | "design";
  imageSrc?: string;
  href: string;
  className?: string;
}

export default function AllProjectCard({
  title,
  description,
  imageSrc,
  href,
  className = "",
}: AllProjectCardProps) {
  return (
    <a
      href={href}
      className={`group relative block w-full mb-6 break-inside-avoid overflow-hidden bg-background ${className}`}
    >
      {/* Image */}
      <div className="w-full">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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

      {/* Overlay (only on hover) */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 className="text-white text-xl sm:text-2xl font-medium mb-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
          {title}
        </h3>
        <p className="text-white/80 text-sm leading-relaxed translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {description}
        </p>
      </div>
    </a>
  );
}
