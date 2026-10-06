import { type ProjectCategory } from "../../../data/project";
import LazyVideo from "../others/LazyVideo";
import ProjectMediaFrame from "../others/ProjectMediaFrame";
import { prefetchMarkdown } from "../others/markdownPrefetch";

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
  const isVideo = !!imageSrc && /\.(webm|mp4)(\?.*)?$/i.test(imageSrc);
  return (
    <a
      href={href}
      onMouseEnter={prefetchMarkdown}
      onFocus={prefetchMarkdown}
      className={`group relative block w-full mb-6 break-inside-avoid overflow-hidden bg-background ${className}`}
    >
      {/* Image — hauteur fixe identique au placeholder, le média s'adapte */}
      <ProjectMediaFrame className={imageHeight}>
        {imageSrc ? (
          isVideo ? (
            <LazyVideo
              src={imageSrc}
              ariaLabel={title}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <img
              src={imageSrc}
              alt={title}
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )
        ) : (
          <img
            src="/images/others/image_placeholder.svg"
            alt=""
            aria-hidden="true"
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        )}
      </ProjectMediaFrame>

      {/* Overlay — dégradé sombre en bas, apparaît au survol */}
      <div
        className="
          absolute inset-0 z-10 flex flex-col justify-end p-6
          bg-linear-to-t from-black/85 via-black/40 to-transparent
          opacity-0 group-hover:opacity-100 max-md:opacity-100
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
