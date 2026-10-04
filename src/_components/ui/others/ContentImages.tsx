interface ContentImagesProps {
  primaryImage?: string;
  images: string[];
  alt: string;
  /**
   * Image LCP above-the-fold : chargement eager + priorité haute.
   * Réservé à la primaryImage des pages détail. La galerie reste lazy.
   */
  priority?: boolean;
}

export default function ContentImages({
  primaryImage,
  images,
  alt,
  priority = false,
}: ContentImagesProps) {
  return (
    <>
      {primaryImage && (
        <figure className="mx-auto mb-10 max-w-4xl">
          <img
            src={primaryImage}
            alt={alt}
            width={1280}
            height={720}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className="aspect-video w-full object-cover"
          />
        </figure>
      )}
      {images.length > 0 && (
        <section className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${alt} — image ${index + 2}`}
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              className="w-full object-cover"
            />
          ))}
        </section>
      )}
    </>
  );
}
