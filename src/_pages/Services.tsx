import { useState } from "react";
import ButtonLink from "../_components/ui/ButtonLink";
import KnowMeGrid from "../_components/ui/cards/KnowMeGrid";
import SectionTitle from "../_components/ui/others/SectionTitle";
import PageShell from "../_components/ui/layout/PageShell";
import ProjectSlider from "../_components/sections/ProjectSlider";
import ServiceDetailBlock from "./services/ServiceDetailBlock";
import { getProjects } from "../data/project";
import { ROUTES } from "../routes";
import { getWorkWithMe } from "../data/workwithme";
import { useLocale } from "../lib/i18n";
import { getServices } from "../locales/services";
import FaqItem from "../_components/ui/for-animation/FaqItem";

export default function ServicesPage() {
  const locale = useLocale();
  const t = getServices(locale);
  const workwithme = getWorkWithMe(locale);
  const projects = getProjects(locale);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <PageShell overflowHidden>
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
            <ButtonLink
              to={ROUTES.CONTACT}
              buttonClassName="px-6 py-4 text-xl font-medium bg-primary border-2 border-foreground text-foreground"
            >
              {t.ctaTalk}
            </ButtonLink>
            <ButtonLink
              to={ROUTES.PROJECTS.LIST}
              buttonClassName="px-6 py-4 text-xl font-medium bg-white border-2 border-foreground text-foreground"
            >
              {t.ctaProjects}
            </ButtonLink>
          </div>
        </div>
      </div>
      {/* Second section */}
      <ServiceDetailBlock
        variant="design"
        title={t.designTitle}
        sub={t.designSub}
        whatICanDo={t.whatICanDo}
        descriptions={[t.designDesc]}
        items={t.designItems}
        videoSrc="/images/projects/twocoderz/twocoderz.webm"
        videoLabel="Démo vidéo du projet Twocoderz"
      />
      {/* Third section */}
      <ServiceDetailBlock
        variant="build"
        title={t.buildTitle}
        sub={t.buildSub}
        whatICanDo={t.whatICanDo}
        descriptions={[t.buildDesc]}
        items={t.buildItems}
        videoSrc="/images/projects/rahimdev.me/rahimdev.webm"
        videoLabel="Démo vidéo du projet Rahimdev.me"
      />
      {/* Fourth section */}
      <ServiceDetailBlock
        variant="visible"
        title={t.visibleTitle}
        sub={t.visibleSub}
        whatICanDo={t.whatICanDo}
        descriptions={[t.visibleDescA, t.visibleDescB]}
        items={t.visibleItems}
        videoSrc="/images/projects/pixelpulse/pixelpulse.webm"
        videoLabel="Démo vidéo du projet Pixelpulse"
      />
      {/* Fith section */}
      <ServiceDetailBlock
        variant="improve"
        title={t.improveTitle}
        sub={t.improveSub}
        whatICanDo={t.whatICanDo}
        descriptions={[t.improveDescA, t.improveDescB]}
        items={t.improveItems}
      />
      {/* Sixth section */}
      <div className="py-14 lg:py-24">
        <SectionTitle variant="lg" className="max-w-xs md:max-w-lg lg:max-w-xl">
          {t.togetherTitle}
        </SectionTitle>
        <KnowMeGrid items={workwithme} />
      </div>
      {/* Seventh section */}
      <div className="py-8 lg:py-24 overflow-hidden">
        <div className="max-w-350 mx-auto px-page-x">
          <div className="flex flex-col">
            <SectionTitle
              variant="lg"
              className="max-w-xs md:max-w-lg lg:max-w-xl mb-8"
            >
              {t.practiceTitle}
            </SectionTitle>
            <div className="flex items-center justify-end">
              <p className="text-foreground text-xl font-normal max-w-sm md:max-w-md lg:max-w-lg">
                {t.practiceSub}
              </p>
            </div>
          </div>
        </div>

        <ProjectSlider
          projects={projects}
          seeAllLabel={t.seeAll}
          wrapperClassName="mt-16 overflow-hidden"
        />
      </div>
      {/* Eight section */}
      <div className="pt-24">
        <SectionTitle variant="lg" className="max-w-xs md:max-w-md lg:max-w-xl">
          {t.faqTitle}
        </SectionTitle>
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
            <ButtonLink
              to={ROUTES.CONTACT}
              linkClassName="mt-8 inline-flex"
              buttonClassName="px-8 py-4 text-xl lg:text-2xl font-medium bg-primary border-2 border-foreground text-foreground"
            >
              {t.ctaTalk}
            </ButtonLink>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
