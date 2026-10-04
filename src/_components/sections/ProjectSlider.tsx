import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../ui/cards/ProjectCard";
import { ChevronRightIcon } from "../icons";
import { getProjectPath, ROUTES } from "../../routes";
import type { Project } from "../../data/project";
import { gsap, useGSAP } from "../../lib/gsap";

const TOTAL_BARS = 16;

interface ProjectSliderProps {
  projects: Project[];
  seeAllLabel: string;
  wrapperClassName?: string;
}

/**
 * Slider horizontal de projets + lien "voir tout" + jauge animée.
 * Utilisé par la home (ProjectsSection) et la page Services.
 */
export default function ProjectSlider({
  projects,
  seeAllLabel,
  wrapperClassName = "",
}: ProjectSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);

  /* ------------------------------------------------------------------
   *  Scroll listener (logique gauge + détection fin de scroll)
   * ------------------------------------------------------------------ */
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
          setIsAtEnd(true);
          return;
        }

        const progress = scrollLeft / maxScroll;
        const index = Math.round(progress * (TOTAL_BARS - 1));
        setActiveIndex(index);

        // Considéré "à la fin" si on est à moins de 20px de la fin
        setIsAtEnd(scrollLeft >= maxScroll - 20);
      });
    };

    slider.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      slider.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // État visuel de la jauge (compositeur uniquement : transform + opacity,
  // pas de height:layout). Index 0 = début du scroll.
  const getBarStyle = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    if (distance === 0) return { scaleY: 1, opacity: 1 };
    if (distance === 1) return { scaleY: 0.7, opacity: 0.7 };
    if (distance === 2) return { scaleY: 0.45, opacity: 0.45 };
    return { scaleY: 0.25, opacity: 0.3 };
  };

  /* ------------------------------------------------------------------
   *  Animation d'entrée GSAP (one-shot, pas de boucle)
   * ------------------------------------------------------------------ */
  useGSAP(
    () => {
      const cards = cardsWrapperRef.current?.children;
      const bars = gaugeRef.current?.children;

      if (!cards || !bars) return;

      /* --- Entrée de section (cards + gauge, pas le titre) --- */
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      introTl
        .from(cards, {
          x: 60,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        })
        .from(
          bars,
          {
            scaleY: 0,
            transformOrigin: "bottom center",
            duration: 0.4,
            ease: "power3.out",
            stagger: 0.02,
          },
          "-=0.3",
        );
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef}>
      {/* Wrapper du slider pour positionner le fade en absolute */}
      <div
        className={`relative max-w-350 mx-auto${wrapperClassName ? ` ${wrapperClassName}` : ""}`}
      >
        {/*  SLIDER  */}
        <div
          ref={sliderRef}
          className="flex items-end gap-block sm:gap-heading-content overflow-x-auto snap-x snap-mandatory scrollbar-hide px-page-x lg:px-major pb-element"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div ref={cardsWrapperRef} className="contents">
            {projects.slice(0, 4).map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                category={project.category}
                href={getProjectPath(project.slug)}
                imageHeight={project.imageHeight}
                imageSrc={project.imageSrc}
              />
            ))}
          </div>

          {/* "See all projects" link */}
          <div className="shrink-0 snap-center flex items-center self-center pl-element pr-heading-content">
            <Link
              to={ROUTES.PROJECTS.LIST}
              className="flex items-center text-foreground text-xl font-medium underline underline-offset-4 hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              {seeAllLabel}{" "}
              <span className="pl-tight inline-flex">
                <ChevronRightIcon />
              </span>
            </Link>
          </div>
        </div>

        {/* Fade subtil sur le bord droit (indique qu'il y a du contenu) */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-background to-transparent transition-opacity duration-300"
          style={{ opacity: isAtEnd ? 0 : 1 }}
        />
      </div>

      {/*  GAUGE  */}
      <div className="max-w-350 mx-auto px-page-x mt-heading-content">
        <div
          ref={gaugeRef}
          className="flex items-end justify-center gap-1.5 h-10"
        >
          {Array.from({ length: TOTAL_BARS }).map((_, index) => {
            const style = getBarStyle(index);
            return (
              <div
                key={index}
                className="w-0.5 h-8 bg-neutral-800 rounded-full origin-bottom transition-[transform,opacity] duration-150 ease-out"
                style={{
                  transform: `scaleY(${style.scaleY})`,
                  opacity: style.opacity,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
