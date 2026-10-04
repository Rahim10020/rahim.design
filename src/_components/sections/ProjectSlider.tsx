import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../ui/cards/ProjectCard";
import { ChevronRightIcon } from "../icons";
import { getProjectPath, ROUTES } from "../../routes";
import type { Project } from "../../data/project";
import { gsap, useGSAP } from "../../lib/gsap";
import { isMobileViewport, saveDataEnabled } from "../../lib/device";

/** Pas d'animations en boucle sur mobile / reduced-motion / save-data (INP + batterie). */
function loopsAllowed(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (isMobileViewport() || saveDataEnabled()) return false;
  return true;
}

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
  const rightFadeRef = useRef<HTMLDivElement>(null);
  const seeAllArrowRef = useRef<HTMLSpanElement>(null);
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

  const getBarHeight = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    if (distance === 0) return 32;
    if (distance === 1) return 22;
    if (distance === 2) return 14;
    return 8;
  };

  /* ------------------------------------------------------------------
   *  Animations GSAP
   * ------------------------------------------------------------------ */
  useGSAP(
    () => {
      const cards = cardsWrapperRef.current?.children;
      const bars = gaugeRef.current?.children;
      const arrow = seeAllArrowRef.current;
      const slider = sliderRef.current;

      if (!cards || !bars || !arrow || !slider) return;

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

      /* --- Gauge qui respire (opacity compositeur, pas height:layout) --- */
      /* --- Flèche "See all" qui glisse --- */
      /* Boucles désactivées sur mobile / reduced-motion / save-data. */
      if (loopsAllowed()) {
        gsap.to(bars, {
          opacity: 0.55,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { each: 0.06, from: "center" },
        });

        gsap.to(arrow, {
          x: 4,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      /* --- Nudge d'invitation au scroll (une seule fois, au chargement) --- */
      gsap.fromTo(
        slider,
        { scrollLeft: 0 },
        {
          scrollLeft: 60,
          duration: 0.7,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1,
          delay: 1.2,
          scrollTo: { autoKill: false },
        },
      );
    },
    { scope: sectionRef },
  );

  /* ------------------------------------------------------------------
   *  Rebond de la barre active quand activeIndex change
   * ------------------------------------------------------------------ */
  useGSAP(
    () => {
      const bars = gaugeRef.current?.children;
      if (!bars) return;

      const activeBar = bars[activeIndex] as HTMLElement | undefined;
      if (!activeBar) return;

      gsap.fromTo(
        activeBar,
        { scaleY: 1.3 },
        { scaleY: 1, duration: 0.3, ease: "back.out(2)" },
      );
    },
    { dependencies: [activeIndex], scope: sectionRef },
  );

  /* ------------------------------------------------------------------
   *  Fade du bord droit selon position de scroll
   * ------------------------------------------------------------------ */
  useGSAP(
    () => {
      if (!rightFadeRef.current) return;
      gsap.to(rightFadeRef.current, {
        autoAlpha: isAtEnd ? 0 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    { dependencies: [isAtEnd], scope: sectionRef },
  );

  return (
    <div ref={sectionRef}>
      {/* Wrapper du slider pour positionner le fade en absolute */}
      <div className={`relative max-w-350 mx-auto${wrapperClassName ? ` ${wrapperClassName}` : ""}`}>
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
              <span ref={seeAllArrowRef} className="pl-tight inline-flex">
                <ChevronRightIcon />
              </span>
            </Link>
          </div>
        </div>

        {/* Fade subtil sur le bord droit (indique qu'il y a du contenu) */}
        <div
          ref={rightFadeRef}
          className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-background to-transparent"
          style={{ opacity: 0 }}
        />
      </div>

      {/*  GAUGE  */}
      <div className="max-w-350 mx-auto px-page-x mt-heading-content">
        <div
          ref={gaugeRef}
          className="flex items-end justify-center gap-1.5 h-10"
        >
          {Array.from({ length: TOTAL_BARS }).map((_, index) => (
            <div
              key={index}
              className="w-0.5 bg-neutral-800 rounded-full transition-[height] duration-150 ease-out"
              style={{ height: `${getBarHeight(index)}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
