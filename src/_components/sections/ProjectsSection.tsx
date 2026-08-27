import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../ui/ProjectCard";
import { ChevronRightIcon } from "../icons";
import { getProjectPath, SECTION_IDS } from "../../routes";
import { projects } from "../../data/project";
import { ROUTES } from "../../routes";

const TOTAL_BARS = 16;

export default function ProjectsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const { scrollLeft, scrollWidth, clientWidth } = slider;
        const maxScroll = scrollWidth - clientWidth;

        if (maxScroll <= 0) {
          setActiveIndex(0);
          return;
        }

        const progress = scrollLeft / maxScroll;
        const index = Math.round(progress * (TOTAL_BARS - 1));
        setActiveIndex(index);
      });
    };

    slider.addEventListener("scroll", handleScroll, { passive: true });
    // Init
    handleScroll();

    return () => {
      slider.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Hauteur dynamique des barres selon la distance à l'index actif
  const getBarHeight = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    // Plus la barre est proche de activeIndex, plus elle est haute
    if (distance === 0) return 32;
    if (distance === 1) return 22;
    if (distance === 2) return 14;
    return 8;
  };

  return (
    <section
      id={SECTION_IDS.PROJECTS}
      className="w-full min-h-[calc(100svh-104px)] bg-background py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-350 mx-auto px-6">
        {/* Title */}
        <h2 className="text-foreground text-4xl sm:text-5xl font-medium leading-tight mb-14 lg:mb-20 max-w-lg">
          Let's look at what I've already built
        </h2>
      </div>

      <div className="max-w-350 mx-auto">
        {/*  SLIDER  */}
        <div
          ref={sliderRef}
          className="flex items-end gap-8 sm:gap-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-12 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              category={project.category}
              href={getProjectPath(project.slug)}
              imageHeight={project.imageHeight}
              imageSrc={project.imageSrc}
            />
          ))}

          {/* "See all projects" link at the end */}
          <div className="shrink-0 snap-center flex items-center self-center pl-4 pr-10">
            <Link
              to={ROUTES.PROJECTS.LIST}
              className="flex items-center text-foreground text-xl font-medium underline underline-offset-4 hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              See all projects <ChevronRightIcon className="pl-2" />
            </Link>
          </div>
        </div>
      </div>

      {/*  GAUGE (Camera-style)  */}
      <div className="max-w-350 mx-auto px-6 mt-10">
        <div className="flex items-end justify-center gap-1.5 h-10">
          {Array.from({ length: TOTAL_BARS }).map((_, index) => (
            <div
              key={index}
              className="w-0.5 bg-neutral-800 rounded-full transition-[height] duration-150 ease-out"
              style={{ height: `${getBarHeight(index)}px` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
