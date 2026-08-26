interface ContentImagesProps {
  primaryImage?: string;
  images: string[];
  alt: string;
}

export default function ContentImages({
  primaryImage,
  images,
  alt,
}: ContentImagesProps) {
  return (
    <>
      {primaryImage && (
        <figure className="mx-auto mb-10 max-w-4xl">
          <img
            src={primaryImage}
            alt={alt}
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
              className="w-full object-cover"
            />
          ))}
        </section>
      )}
    </>
  );
}
