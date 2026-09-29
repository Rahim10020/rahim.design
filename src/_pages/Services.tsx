import { useRef, useState, useEffect } from "react";
import Button from "../_components/ui/Button";
import KnowMeCard from "../_components/ui/cards/KnowMeCard";
import ProjectCard from "../_components/ui/cards/ProjectCard";
import { getProjects } from "../data/project";
import { getProjectPath, ROUTES, WHATSAPP_URL } from "../routes";
import { getWorkWithMe } from "../data/workwithme";
import { useLocale } from "../lib/i18n";
import { getServices } from "../locales/services";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "../_components/icons";
import FaqItem from "../_components/ui/for-animation/FaqItem";
import { gsap, useGSAP } from "../lib/gsap";

const TOTAL_BARS = 16;

export default function ServicesPage() {
  const locale = useLocale();
  const t = getServices(locale);
  const workwithme = getWorkWithMe(locale);
  const projects = getProjects(locale);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const rightFadeRef = useRef<HTMLDivElement>(null);
  const seeAllArrowRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);

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

  useGSAP(
    () => {
      const cards = cardsWrapperRef.current?.children;
      const bars = gaugeRef.current?.children;
      const arrow = seeAllArrowRef.current;
      const slider = sliderRef.current;

      if (!cards || !bars || !arrow || !slider) return;

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

      gsap.to(bars, {
        height: "+=3",
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
    <section className="w-full bg-background min-h-screen overflow-x-hidden">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24 mb-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* First section */}
          <div className="mb-24">
            <div className="flex flex-col gap-2 mb-16 lg:mb-32">
              <div className="flex items-center justify-end">
                <p className="text-2xl lg:text-4xl font-medium text-foreground">
                  {t.eyebrow}
                </p>
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-medium text-foreground max-w-xs md:max-w-md lg:max-w-none">
                  {t.heroTitle}
                </h1>
              </div>
            </div>
            {/* Center */}
            <div className="mx-auto max-w-3xl flex flex-col gap-12 lg:gap-8">
              <p className="text-foreground text-2xl text-center md:text-left leading-relaxed max-w-sm md:max-w-2xl">
                {t.heroSub}
              </p>
              {/* Buttons */}
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button className="px-6 py-4 text-xl font-medium bg-primary border-2 border-foreground text-foreground">
                    {t.ctaTalk}
                  </Button>
                </a>
                <Link to={ROUTES.PROJECTS.LIST} className="inline-flex">
                  <Button className="px-6 py-4 text-xl font-medium bg-white border-2 border-foreground text-foreground">
                    {t.ctaProjects}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {/* Second section */}
          <div className="py-24 mx-auto max-w-6xl flex flex-col gap-16">
            <div className="flex flex-col gap-4 lg:flex-row items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-4xl font-medium max-w-sm md:max-w-md">
                  {t.designTitle}
                </h3>
                <h5 className="text-foreground-alt-a text-xl leading-relaxed">
                  {t.designSub}
                </h5>
              </div>
              <div>
                <p className="text-foreground text-xl leading-relaxed max-w-sm md:max-w-lg">
                  {t.designDesc}
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
              <div className="text-3xl text-foreground font-medium">
                <h4>{t.whatICanDo}</h4>
              </div>
              <div className="min-w-lg">
                <ul className="flex flex-col gap-4">
                  {t.designItems.map((label) => (
                    <li
                      key={label}
                      className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="my-4">
              {/* Placeholder */}
              <img
                src="/images/others/image_placeholder.svg"
                alt=""
                aria-hidden="true"
                width={1600}
                height={900}
                loading="lazy"
                decoding="async"
                className="w-full h-120 object-cover"
              />
            </div>
          </div>
          {/* Third section */}
          <div className="py-24 mx-auto max-w-6xl flex flex-col gap-16">
            <div className="flex flex-col lg:flex-row gap-4 items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-4xl font-medium max-w-xs md:max-w-md">
                  {t.buildTitle}
                </h3>
                <h5 className="text-foreground-alt-a text-xl leading-relaxed">
                  {t.buildSub}
                </h5>
              </div>
              <div>
                <p className="text-foreground text-xl leading-relaxed max-w-sm md:max-w-lg">
                  {t.buildDesc}
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
              <div className="text-3xl text-foreground font-medium">
                <h4>{t.whatICanDo}</h4>
              </div>
              <div className="min-w-lg">
                <ul className="flex flex-col gap-4">
                  {t.buildItems.map((label) => (
                    <li
                      key={label}
                      className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="my-4">
              {/* Placeholder */}
              <img
                src="/images/others/image_placeholder.svg"
                alt=""
                aria-hidden="true"
                width={1600}
                height={900}
                loading="lazy"
                decoding="async"
                className="w-full h-120 object-cover"
              />
            </div>
          </div>
          {/* Fourth section */}
          <div className="py-24 mx-auto max-w-6xl flex flex-col gap-16">
            <div className="flex flex-col lg:flex-row gap-4 items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-4xl font-medium max-w-xs md:max-w-sm lg:max-w-md">
                  {t.visibleTitle}
                </h3>
                <h5 className="text-foreground-alt-a text-xl leading-relaxed">
                  {t.visibleSub}
                </h5>
              </div>
              <div>
                <p className="text-foreground text-xl leading-relaxed max-w-sm md:max-w-lg">
                  {t.visibleDescA}
                </p>
                <p className="text-foreground text-xl leading-relaxed max-w-sm md:max-w-lg">
                  {t.visibleDescB}
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
              <div className="text-3xl text-foreground font-medium">
                <h4>{t.whatICanDo}</h4>
              </div>
              <div className="min-w-lg">
                <ul className="flex flex-col gap-4">
                  {t.visibleItems.map((label) => (
                    <li
                      key={label}
                      className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="my-4">
              {/* Placeholder */}
              <img
                src="/images/others/image_placeholder.svg"
                alt=""
                aria-hidden="true"
                width={1600}
                height={900}
                loading="lazy"
                decoding="async"
                className="w-full h-120 object-cover"
              />
            </div>
          </div>
          {/* Fith section */}
          <div className="py-24 mx-auto max-w-6xl flex flex-col gap-16">
            <div className="flex flex-col lg:flex-row gap-4 items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-4xl font-medium max-w-sm lg:max-w-md">
                  {t.improveTitle}
                </h3>
                <h5 className="text-foreground-alt-a text-xl leading-relaxed">
                  {t.improveSub}
                </h5>
              </div>
              <div>
                <p className="text-foreground text-xl leading-relaxed max-w-xs md:max-w-md lg:max-w-lg">
                  {t.improveDescA}
                </p>
                <p className="text-foreground text-xl leading-relaxed max-w-sm md:max-w-lg">
                  {t.improveDescB}
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
              <div className="text-3xl text-foreground font-medium">
                <h4>{t.whatICanDo}</h4>
              </div>
              <div className="min-w-lg">
                <ul className="flex flex-col gap-4">
                  {t.improveItems.map((label) => (
                    <li
                      key={label}
                      className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Sixth section */}
          <div className="py-24">
            <h2 className="text-foreground text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-tight mb-16 lg:mb-20 max-w-xs md:max-w-lg lg:max-w-xl">
              {t.togetherTitle}
            </h2>

            {/* knowme Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-16 lg:gap-y-14">
              {workwithme.map((step) => (
                <KnowMeCard
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
          {/* Seventh section */}
          <div ref={sectionRef} className="py-24 overflow-hidden">
            <div className="max-w-350 mx-auto px-page-x">
              <div className="flex flex-col">
                <h2 className="text-foreground text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-tight mb-8 lg:mb-20 max-w-xs md:max-w-lg lg:max-w-xl">
                  {t.practiceTitle}
                </h2>
                <div className="flex items-center justify-end">
                  <p className="text-foreground text-xl font-normal max-w-sm md:max-w-md lg:max-w-lg">
                    {t.practiceSub}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative max-w-350 mx-auto mt-16 overflow-hidden">
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

                <div className="shrink-0 snap-center flex items-center self-center pl-element pr-heading-content">
                  <Link
                    to={ROUTES.PROJECTS.LIST}
                    className="flex items-center text-foreground text-xl font-medium underline underline-offset-4 hover:opacity-70 transition-opacity whitespace-nowrap"
                  >
                    {t.seeAll}{" "}
                    <span ref={seeAllArrowRef} className="pl-tight inline-flex">
                      <ChevronRightIcon />
                    </span>
                  </Link>
                </div>
              </div>

              <div
                ref={rightFadeRef}
                className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-background to-transparent"
                style={{ opacity: 0 }}
              />
            </div>

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
          {/* Eight section */}
          <div className="pt-24">
            <h2 className="text-foreground text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-tight mb-16 lg:mb-20 max-w-xs md:max-w-md lg:max-w-xl">
              {t.faqTitle}
            </h2>
            <div className="mx-auto max-w-4xl">
              <div className="flex flex-col gap-4">
                {t.faq.map((item, index) => (
                  <FaqItem
                    key={item.question}
                    index={index}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openFaqIndex === index}
                    onToggle={() =>
                      setOpenFaqIndex(openFaqIndex === index ? null : index)
                    }
                  />
                ))}
              </div>
              <div className="mt-24 text-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex"
                >
                  <Button className="px-8 py-4 text-xl lg:text-2xl font-medium bg-primary border-2 border-foreground text-foreground">
                    {t.ctaTalk}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
