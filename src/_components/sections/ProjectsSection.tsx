import ProjectSlider from "./ProjectSlider";
import { getProjects } from "../../data/project";
import { useLocale } from "../../lib/i18n";
import { getUi } from "../../locales/ui";

export default function ProjectsSection() {
  const locale = useLocale();
  const t = getUi(locale).projectsSection;
  const projects = getProjects(locale);

  return (
    <section className="w-full bg-background my-0 lg:my-section py-section lg:py-section-lg overflow-hidden">
      <div className="max-w-350 mx-auto px-page-x">
        {/* Title — pas d'animation */}
        <h2 className="text-foreground text-center text-4xl sm:text-6xl font-medium leading-tight mb-16 lg:mb-24 mx-auto max-w-xs lg:max-w-xl">
          {t.title}
        </h2>
      </div>

      <ProjectSlider projects={projects} seeAllLabel={t.seeAll} />
    </section>
  );
}
