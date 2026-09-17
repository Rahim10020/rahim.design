import { type ProjectCategory } from "../../../data/project";

interface AllProjectCardProps {
  title: string;
  description: string;
  category: ProjectCategory;
  imageSrc?: string;
  imageHeight: string;
  href: string;
  className?: string;
}

export default function AllProjectCard({
  title,
  description,
  category,
  imageSrc,
  imageHeight,
  href,
  className = "",
}: AllProjectCardProps) {
  return (
    <a
      href={href}
      className={`group relative block w-full mb-6 break-inside-avoid overflow-hidden bg-background ${className}`}
    >
      {/* Image */}
      <div className={`w-full ${imageSrc ? "" : imageHeight}`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <img
            src="/images/others/image_placeholder.svg"
            alt="placeholder image"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Overlay — dégradé sombre en bas, apparaît au survol */}
      <div
        className="
          absolute inset-0 z-10 flex flex-col justify-end p-6
          bg-linear-to-t from-black/85 via-black/40 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          pointer-events-none
        "
      >
        <p
          className="
            text-white/80 text-sm md:text-lg tracking-wide uppercase mb-3
            translate-y-3 group-hover:translate-y-0
            transition-transform duration-300
          "
        >
          {category}
        </p>

        <h3
          className="
            text-white text-2xl md:text-4xl font-medium mb-2
            translate-y-3 group-hover:translate-y-0
            transition-transform duration-300
          "
        >
          {title}
        </h3>

        <p
          className="
            text-white/90 text-xl leading-relaxed max-w-md
            translate-y-3 group-hover:translate-y-0
            transition-transform duration-300 delay-75
          "
        >
          {description}
        </p>
      </div>
    </a>
  );
}
