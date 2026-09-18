import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../ui/cards/ProjectCard";
import { ChevronRightIcon } from "../icons";
import { getProjectPath } from "../../routes";
import { projects } from "../../data/project";
import { ROUTES } from "../../routes";
import { gsap, useGSAP } from "../../lib/gsap";

const TOTAL_BARS = 16;

export default function ProjectsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
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

      /* --- Gauge qui respire (subtile, en boucle) --- */
      gsap.to(bars, {
        height: "+=3",
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.06, from: "center" },
      });

      /* --- Flèche "See all" qui glisse en boucle --- */
      gsap.to(arrow, {
        x: 4,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

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
    <section
      ref={sectionRef}
      className="w-full bg-background my-section py-section lg:py-section-lg overflow-hidden"
    >
      <div className="max-w-350 mx-auto px-page-x">
        {/* Title — pas d'animation */}
        <h2 className="text-foreground text-4xl sm:text-5xl font-medium leading-tight mb-heading-content lg:mb-major max-w-lg text-left">
          Let's look at what I've already built
        </h2>
      </div>

      {/* Wrapper du slider pour positionner le fade en absolute */}
      <div className="relative max-w-350 mx-auto">
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
              See all projects{" "}
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
    </section>
  );
}
