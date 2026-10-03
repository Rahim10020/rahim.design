import { ROUTES } from "../../routes";
import Logo from "../ui/Logo";
import { useLocale } from "../../lib/i18n";
import { getUi } from "../../locales/ui";

export default function AboutSection() {
  const t = getUi(useLocale()).aboutSection;
  return (
    <section className="flex w-full my-section bg-background">
      <div className="max-w-350 mx-auto flex w-full px-page-x">
        <div className="mx-auto w-full max-w-6xl py-block mt-block space-y-block">
          {/* First line — logo + titre (desktop only) */}
          <div className="hidden lg:flex items-start justify-between gap-block">
            <div className="border-r-2 pr-tight">
              <Logo size={128} />
            </div>
            <div className="flex items-start justify-end">
              <h2 className="text-2xl md:text-4xl font-medium">{t.behind}</h2>
            </div>
          </div>

          {/* Titre mobile */}
          <h2 className="lg:hidden text-4xl md:text-5xl lg:text-4xl font-medium text-foreground text-center">
            {t.behind}
          </h2>

          <div>
            {/* Designer, / Coder💀 — desktop only */}
            <div className="hidden lg:block space-y-tight">
              <h2 className="text-4xl md:text-7xl font-medium text-foreground">
                {t.designer}
              </h2>
              <h2 className="text-4xl md:text-7xl font-medium text-foreground">
                {t.coder}
              </h2>
            </div>

            {/* Paragraphes */}
            <div className="flex justify-center lg:justify-end">
              <div className="max-w-sm md:max-w-lg lg:max-w-2xl space-y-comfortable">
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed text-center lg:text-left">
                  {t.p1}
                </p>
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed text-center lg:text-left">
                  {t.p2}
                </p>
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed text-center lg:text-left">
                  {t.p3}
                </p>
                <div className="flex items-center justify-center lg:justify-start">
                  <a
                    href={ROUTES.ABOUT}
                    className="text-xl text-foreground-alt font-normal hover:underline"
                  >
                    {t.knowMore}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
