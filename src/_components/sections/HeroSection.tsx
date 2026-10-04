import Button from "../ui/Button";
import { ROUTES } from "../../routes";
import Words from "../ui/for-animation/Words";
import { useLocale } from "../../lib/i18n";
import { getUi } from "../../locales/ui";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const t = getUi(useLocale()).hero;
  return (
    <section className="flex min-h-[calc(100svh-104px)] w-full bg-background">
      <div className="max-w-350 mx-auto flex w-full px-page-x">
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-between py-block mt-block">
          <div className="w-full">
            <div className="flex flex-col gap-block">
              <div className="w-full">
                {/* Headline */}
                <h1 className="text-5xl md:text-5xl lg:text-7xl font-medium text-foreground max-w-md md:max-w-2xl lg:max-w-4xl text-center lg:text-left mx-auto lg:mx-0">
                  <Words
                    text={t.headline}
                    highlight={{ [t.highlightWord]: "" }}
                  />
                </h1>
              </div>

              <div className="w-full flex justify-center lg:justify-end">
                <div className="flex flex-col items-center lg:items-start gap-12 md:gap-14 text-center lg:text-left">
                  <p className="text-foreground-alt-a text-xl md:text-2xl leading-relaxed font-normal max-w-xs md:max-w-lg">
                    {t.sub}
                  </p>

                  <div>
                    <Link to={ROUTES.CONTACT} className="inline-flex">
                      <Button className="px-8 py-4 text-xl md:text-2xl font-medium bg-primary border-2 border-foreground text-foreground">
                        {t.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
