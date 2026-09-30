import Button from "../_components/ui/Button";
import { ROUTES } from "../routes";
import { Link } from "react-router-dom";
import KnowMeCard from "../_components/ui/cards/KnowMeCard";
import PieChart from "../_components/ui/others/PieChart";
import { useLocale } from "../lib/i18n";
import { getAbout } from "../locales/about";
import { getKnowme } from "../data/knowme";

export default function AboutPage() {
  const locale = useLocale();
  const t = getAbout(locale);
  const knowme = getKnowme(locale);
  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24 mb-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* First section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-16">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium text-foreground">
                {t.title}
              </h1>
              <div>
                <p className="text-foreground-alt-a text-xl font-light leading-relaxed mx-auto max-w-sm md:max-w-lg lg:max-w-xl">
                  {t.introAlt}
                </p>
                <p className="text-foreground text-xl leading-relaxed mx-auto max-w-sm md:max-w-lg lg:max-w-xl mt-6">
                  {t.intro}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-auto">
              <img
                src="/images/others/rahim-cartoon.png"
                alt="Illustration de Rahim ALI"
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                className="w-full h-full"
              />
            </div>
          </div>
          {/* Second section */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 py-24">
              <div className="flex flex-col gap-8">
                <h3 className="text-foreground text-2xl font-medium">
                  {t.designerTitle}
                </h3>
                <ul className="space-y-4">
                  {t.designerItems.map((item) => (
                    <li key={item} className="text-foreground-alt-a text-xl">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <PieChart />
              </div>
              <div className="flex flex-col gap-8">
                <h3 className="text-foreground text-2xl font-medium">
                  {t.coderTitle}
                </h3>
                <ul className="space-y-4">
                  {t.coderItems.map((item) => (
                    <li key={item} className="text-foreground-alt-a text-xl">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* third section */}
          <div className="flex items-center justify-between py-24">
            <div className="mx-auto max-w-sm md:max-w-lg lg:max-w-xl flex flex-col gap-12">
              <p className="text-foreground text-xl font-normal leading-relaxed">
                {t.bridge}
              </p>
              <h2 className="text-foreground text-4xl font-medium">
                {t.statement}
              </h2>
              <p className="text-foreground text-xl font-normal leading-relaxed">
                {t.philosophy}
              </p>
            </div>
          </div>
          {/* fourth section */}
          <div className="py-24">
            <h2 className="text-foreground text-4xl md:text-5xl lg:text-[2.6rem] font-medium leading-tight mb-16 lg:mb-20 max-w-xl">
              {t.expectTitle}
            </h2>

            {/* knowme Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-16 lg:gap-y-14">
              {knowme.map((step) => (
                <KnowMeCard
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
          {/* fith section */}
          <div className="py-24">
            <h2 className="text-foreground text-4xl md:text-5xl lg:text-[2.6rem] font-medium leading-tight mb-16 lg:mb-20 max-w-xs lg:max-w-lg">
              {t.toolsTitle}
            </h2>
            <div className="flex flex-col lg:flex-row items-start justify-between mx-auto max-w-sm lg:mx-0 lg:max-w-none gap-16">
              <div className="flex flex-col gap-6 lg:gap-16">
                <h3 className="text-foreground text-2xl md:text-3xl font-medium">
                  {t.toolsDesign}
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src="/icons/tools/figma.svg"
                    alt="Logo Figma"
                    width={96}
                    height={96}
                    loading="lazy"
                    decoding="async"
                    className="w-16 lg:w-24 h-16 lg:h-24"
                  />
                  <img
                    src="/icons/tools/excalidraw.png"
                    alt="Logo Excalidraw"
                    width={96}
                    height={96}
                    loading="lazy"
                    decoding="async"
                    className="w-16 lg:w-24 h-16 lg:h-24"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6 lg:gap-16">
                <h3 className="text-foreground text-2xl md:text-3xl font-medium">
                  {t.toolsFrontend}
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src="/icons/tools/react.svg"
                    alt="Logo React"
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 lg:w-16 lg:h-16"
                  />
                  <img
                    src="/icons/tools/typescript.svg"
                    alt="Logo TypeScript"
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 lg:w-16 lg:h-16"
                  />
                  <img
                    src="/icons/tools/next-js.svg"
                    alt="Logo Next.js"
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 lg:w-16 lg:h-16"
                  />
                  <img
                    src="/icons/tools/tailwind-css.png"
                    alt="Logo Tailwind CSS"
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 lg:w-16 lg:h-16"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6 lg:gap-16">
                <h3 className="text-foreground text-2xl md:text-3xl max-w-xs lg:max-w-xl font-medium">
                  {t.toolsBrainstorm}
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src="/icons/tools/claude.png"
                    alt="Logo Claude"
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 lg:w-16 lg:h-16"
                  />
                  <img
                    src="/icons/tools/open-ai.png"
                    alt="Logo OpenAI"
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 lg:w-16 lg:h-16"
                  />
                </div>
              </div>
            </div>
            <p className="text-foreground text-xl font-normal leading-relaxed mt-24 max-w-sm md:max-w-lg lg:max-w-2xl">
              {t.toolsNote}
            </p>
          </div>
          {/* sixth section */}
          <div className="pt-24">
            <div>
              <h2 className="text-foreground text-4xl md:text-5xl lg:text-[2.6rem] font-medium leading-tight mb-16 lg:mb-20 max-w-xs lg:max-w-lg">
                {t.hobbiesTitle}
              </h2>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-sm md:max-w-md">
                  <ul className="space-y-4">
                    {t.hobbies.map((hobby) => (
                      <li key={hobby} className="text-foreground-alt-a text-xl">
                        {hobby}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full lg:max-w-xl">
                  <img
                    src="/images/others/reads.png"
                    alt="Livres et passions de Rahim"
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-4xl pt-24 flex justify-center">
            <div className="flex flex-col items-center">
              <h2 className="text-foreground text-3xl sm:text-4xl lg:text-[3.8rem] font-medium text-center leading-tight mb-12 lg:mb-20 max-w-sm md:max-w-xl lg:max-w-3xl">
                {t.closingTitle}
              </h2>
              <p className="text-foreground text-xl leading-relaxed text-center flex items-center max-w-sm md:max-w-md">
                {t.closingSub}
              </p>
              <div className="text-center mt-16">
                <Link to={ROUTES.CONTACT} className="inline-flex">
                  <Button className="px-8 py-4 text-xl lg:text-2xl font-medium bg-primary border-2 border-foreground text-foreground">
                    {t.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
