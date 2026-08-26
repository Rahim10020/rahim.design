import { useParams, Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import { getProjectBySlug } from "../../data/project";
import { AddIcon } from "../../_components/icons";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug || "");

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p>Project not found.</p>
        <Link
          to={ROUTES.PROJECTS.LIST}
          className="mt-4 inline-block underline underline-offset-4"
        >
          ← Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      {/* Detail header */}
      <div className="flex items-center justify-between mb-8">
        <a
          href="#"
          className="underline cursor-pointer text-foreground text-xl"
        >
          Close
        </a>
        {/* icons */}
        <div className="flex items-center justify-between gap-6">
          <AddIcon />
          <AddIcon />
        </div>
      </div>
      {/* Content */}
      <div>
        {/* All textual content will have "mx-auto max-w-xl" */}
        <div className="mx-auto max-w-xl">
          <h1 className="text-foreground text-4xl md:text-6xl mb-4">
            {project.title}
          </h1>
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
            className="w-full h-100px object-cover"
          />
        </div>
        <div className="mx-auto max-w-xl">
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
