import { useParams, Link } from "react-router-dom";
import { getArticleBySlug } from "../../data/articles";
import { useEffect, useState } from "react";
import { ROUTES } from "../../routes";
import {
  ArrowLeftIcon,
  AsteriskIcon,
  OpenLinkIcon,
} from "../../_components/icons";

const modules = import.meta.glob("../../../../public/content/learn/*.md", {
  as: "raw",
});

export default function LearnArticle() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug || "");
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const loader = modules[`../../../../public/content/learn/${slug}.md`];
    if (loader) {
      loader().then(setContent);
    }
  }, [slug]);

  if (!article) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-center justify-center py-48">
          <div>
            <div className="flex flex-col items-center gap-12">
              <AsteriskIcon size={54} />
              <h4 className="text-foreground text-xl font-normal">
                Learn article not found.
              </h4>
            </div>
            <Link
              to={ROUTES.PROJECTS.LIST}
              className="mt-8 flex items-center gap-4 text-foreground text-xl underline underline-offset-4"
            >
              <ArrowLeftIcon size={16} />
              Back to learns
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      {/* Content */}
      <div>
        {/* All textual content will have "mx-auto max-w-xl mb-8" */}
        <div className="mx-auto max-w-xl mb-8 mt-8 ">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-foreground text-4xl md:text-6xl">
              {article.title}
            </h1>
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <OpenLinkIcon />
            </a>
          </div>
          <p className="text-foreground text-xl font-normal leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus
            mattis aliquam. Phasellus ante arcu, semper quis mi a, volutpat
            bibendum risus. Donec at quam pellentesque, aliquam ipsum sed
          </p>
        </div>
        {/* All images will have "" */}
        <div className="mx-auto max-w-4xl my-8">
          <img
            src="/images/others/image_placeholder.svg"
            alt="placeholder image"
            className="w-full h-100 object-cover"
          />
        </div>
        <div className="mx-auto max-w-xl flex flex-col gap-4">
          <p className="text-foreground text-xl font-normal leading-relaxed">
            Pellentesque et metus ut est finibus fringilla. Curabitur sit amet
            mi dolor. Nam fermentum mi in erat pellentesque venenatis. Mauris
            justo ante, vulputate quis laoreet ac, mattis eget justo. Aliquam
            euismod lobortis commodo. Nam et accumsan dui. Etiam sit amet dolor
            quis elit tristique interdum non ac ex. Nullam massa lorem, sodales
            viverra leo eget, blandit pharetra mauris. Integer sed consequat
            libero. Aliquam venenatis semper tortor quis volutpat. Vivamus sit
            amet molestie leo, eget luctus odio. Ut tempor nisl sem, at congue
            urna ultricies eu. Maecenas scelerisque sagittis lorem et auctor.
            Aenean et gravida enim.
          </p>
          <p className="text-foreground text-xl font-normal leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus
            mattis aliquam. Phasellus ante arcu, semper quis mi a, volutpat
            bibendum risus. Donec at quam pellentesque, aliquam ipsum sed
          </p>
        </div>
        <div className="mx-auto max-w-4xl my-8">
          <img
            src="/images/others/image_placeholder.svg"
            alt="placeholder image"
            className="w-full h-100 object-cover"
          />
        </div>
        <div className="mx-auto max-w-xl flex flex-col gap-4">
          <p className="text-foreground text-xl font-normal leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus
            mattis aliquam. Phasellus ante arcu, semper quis mi a, volutpat
            bibendum risus. Donec at quam pellentesque, aliquam ipsum sed
          </p>
          <p className="text-foreground text-xl font-normal leading-relaxed">
            Pellentesque et metus ut est finibus fringilla. Curabitur sit amet
            mi dolor. Nam fermentum mi in erat pellentesque venenatis. Mauris
            justo ante, vulputate quis laoreet ac, mattis eget justo. Aliquam
            euismod lobortis commodo. Nam et accumsan dui. Etiam sit amet dolor
            quis elit tristique interdum non ac ex. Nullam massa lorem, sodales
            viverra leo eget, blandit pharetra mauris. Integer sed consequat
            libero. Aliquam venenatis semper tortor quis volutpat. Vivamus sit
            amet molestie leo, eget luctus odio. Ut tempor nisl sem, at congue
            urna ultricies eu. Maecenas scelerisque sagittis lorem et auctor.
            Aenean et gravida enim.
          </p>
        </div>
        <div className="mx-auto max-w-xl flex flex-col gap-4 mt-4">
          <p className="text-foreground text-xl font-normal leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus
            mattis aliquam. Phasellus ante arcu, semper quis mi a, volutpat
            bibendum risus. Donec at quam pellentesque, aliquam ipsum sed
          </p>
          <p className="text-foreground text-xl font-normal leading-relaxed">
            Pellentesque et metus ut est finibus fringilla. Curabitur sit amet
            mi dolor. Nam fermentum mi in erat pellentesque venenatis. Mauris
            justo ante, vulputate quis laoreet ac, mattis eget justo. Aliquam
            euismod lobortis commodo. Nam et accumsan dui. Etiam sit amet dolor
            quis elit tristique interdum non ac ex. Nullam massa lorem, sodales
            viverra leo eget, blandit pharetra mauris. Integer sed consequat
            libero. Aliquam venenatis semper tortor quis volutpat. Vivamus sit
            amet molestie leo, eget luctus odio. Ut tempor nisl sem, at congue
            urna ultricies eu. Maecenas scelerisque sagittis lorem et auctor.
            Aenean et gravida enim.
          </p>
        </div>
      </div>
    </div>
  );
}
