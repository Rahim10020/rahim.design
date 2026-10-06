import ProjectMediaFrame from "../others/ProjectMediaFrame";

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
      <ProjectMediaFrame className="aspect-2/1 mb-6">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            width={800}
            height={400}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        ) : (
          //Placeholder
          <img
            src="/images/others/image_placeholder.svg"
            alt=""
            aria-hidden="true"
            width={800}
            height={400}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        )}
      </ProjectMediaFrame>

      {/* Title */}
      <h3 className="text-foreground text-2xl md:text-3xl font-medium underline  lg:no-underline lg:group-hover:underline mb-3">
        {title}
      </h3>
    </article>
  );
}
