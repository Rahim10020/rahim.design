import { ROUTES } from "../../routes";
import { useLocale } from "../../lib/i18n";
import { getUi } from "../../locales/ui";

export default function AboutSection() {
  const t = getUi(useLocale()).aboutSection;
  return (
    <section className="flex w-full my-section bg-background">
      <div className="max-w-350 mx-auto flex w-full px-page-x">
        <div className="mx-auto w-full max-w-6xl py-block mt-block space-y-block">
          {/* Titre mobile */}
          <h2 className="lg:hidden text-4xl md:text-5xl lg:text-4xl font-medium text-foreground text-center">
            {t.behind}
          </h2>

          <div>
            {/* Titres desktop : Codeur commence à la fin de Designer. */}
            <div className="hidden mb-24 w-fit mx-auto lg:grid grid-cols-[max-content_max-content]">
              <h2 className="col-start-1 row-start-1 text-4xl md:text-8xl font-medium text-foreground">
                {t.designer}
              </h2>
              <h2 className="col-start-2 row-start-2 text-4xl md:text-8xl font-medium text-foreground">
                {t.coder}
              </h2>
            </div>

            {/* Paragraphes */}
            <div className="flex justify-center">
              <div className="max-w-sm md:max-w-lg lg:max-w-xl space-y-comfortable">
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed text-center lg:text-left">
                  {t.p1}
                </p>
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed text-center lg:text-left">
                  {t.p2}
                </p>
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed text-center lg:text-left">
                  {t.p3}
                  <span className="pl-2">
                    <a
                      href={ROUTES.ABOUT}
                      className="text-2xl text-foreground-alt font-normal hover:underline"
                    >
                      {t.knowMore}
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
