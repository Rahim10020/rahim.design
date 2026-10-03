interface ToolIcon {
  src: string;
  alt: string;
}

interface ToolGroupProps {
  title: string;
  titleClassName: string;
  icons: ToolIcon[];
  iconClassName: string;
  iconSize: number;
}

/** Groupe d'outils : titre + rangée d'icônes (page About). */
export default function ToolGroup({
  title,
  titleClassName,
  icons,
  iconClassName,
  iconSize,
}: ToolGroupProps) {
  return (
    <div className="flex flex-col gap-6 lg:gap-16">
      <h3 className={titleClassName}>{title}</h3>
      <div className="flex items-center gap-4">
        {icons.map((icon) => (
          <img
            key={icon.src}
            src={icon.src}
            alt={icon.alt}
            width={iconSize}
            height={iconSize}
            loading="lazy"
            decoding="async"
            className={iconClassName}
          />
        ))}
      </div>
    </div>
  );
}
