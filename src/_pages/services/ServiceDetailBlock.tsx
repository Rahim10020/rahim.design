import LazyVideo from "../../_components/ui/others/LazyVideo";

type ServiceDetailVariant = "design" | "build" | "visible" | "improve";

interface ServiceDetailBlockProps {
  variant: ServiceDetailVariant;
  title: string;
  sub: string;
  whatICanDo: string;
  descriptions: string[];
  items: string[];
  imageSrc?: string;
  /** Démo vidéo (même cadre que l'image : w-full h-120 object-cover). */
  videoSrc?: string;
  videoLabel?: string;
}

/** Classes exactes de chaque bloc (recopiées des sections Services). */
const VARIANTS: Record<
  ServiceDetailVariant,
  { title: string; descriptions: string[] }
> = {
  design: {
    title: "text-foreground text-4xl font-medium max-w-sm md:max-w-md",
    descriptions: [
      "text-foreground text-xl leading-relaxed max-w-sm md:max-w-lg",
    ],
  },
  build: {
    title: "text-foreground text-4xl font-medium max-w-xs md:max-w-md",
    descriptions: [
      "text-foreground text-xl leading-relaxed max-w-sm md:max-w-lg",
    ],
  },
  visible: {
    title:
      "text-foreground text-4xl font-medium max-w-xs md:max-w-sm lg:max-w-md",
    descriptions: [
      "text-foreground text-xl leading-relaxed max-w-sm md:max-w-lg",
      "text-foreground text-xl leading-relaxed max-w-sm md:max-w-lg",
    ],
  },
  improve: {
    title: "text-foreground text-4xl font-medium max-w-sm lg:max-w-md",
    descriptions: [
      "text-foreground text-xl leading-relaxed max-w-xs md:max-w-md lg:max-w-lg",
      "text-foreground text-xl leading-relaxed max-w-sm md:max-w-lg",
    ],
  },
};

const DOT_ITEM =
  "text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']";

/** Bloc détail d'un service : en-tête, descriptions, liste à puces, visuel. */
export default function ServiceDetailBlock({
  variant,
  title,
  sub,
  whatICanDo,
  descriptions,
  items,
  imageSrc,
  videoSrc,
  videoLabel,
}: ServiceDetailBlockProps) {
  const classes = VARIANTS[variant];
  return (
    <div className="py-8 lg:py-24 mx-auto max-w-6xl flex flex-col gap-16">
      <div className="flex flex-col lg:flex-row gap-4 items-start justify-between">
        <div className="flex flex-col gap-2">
          <h3 className={classes.title}>{title}</h3>
          <h5 className="text-foreground-alt-a text-xl leading-relaxed">
            {sub}
          </h5>
        </div>
        <div>
          {descriptions.map((paragraph, index) => (
            <p
              key={index}
              className={
                classes.descriptions[
                  Math.min(index, classes.descriptions.length - 1)
                ]
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
        <div className="text-3xl text-foreground font-medium">
          <h4>{whatICanDo}</h4>
        </div>
        <div className="min-w-lg">
          <ul className="flex flex-col gap-4">
            {items.map((label) => (
              <li key={label} className={DOT_ITEM}>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {videoSrc ? (
        <div className="my-4">
          <LazyVideo
            src={videoSrc}
            ariaLabel={videoLabel ?? title}
            className="w-full h-120 object-cover rounded-3xl"
          />
        </div>
      ) : (
        imageSrc && (
          <div className="my-4">
            <img
              src={imageSrc}
              alt=""
              aria-hidden="true"
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              className="w-full h-120 object-cover rounded-3xl"
            />
          </div>
        )
      )}
    </div>
  );
}
