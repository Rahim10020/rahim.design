import {
  WHATSAPP_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
} from "../../routes";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "../icons";
import Button from "../ui/Button";
import { useLocale } from "../../lib/i18n";
import { getUi } from "../../locales/ui";

export default function ContactSection() {
  const t = getUi(useLocale()).contactSection;
  return (
    <section className="flex w-full my-section bg-background">
      <div className="max-w-350 mx-auto flex w-full px-page-x">
        <div className="mx-auto w-full max-w-6xl mt-block">
          {/* ============================================================
              MOBILE (< lg) — tout centré, ordre simplifié
              ============================================================ */}
          <div className="lg:hidden flex flex-col items-center gap-major text-center">
            {/* Titre complet */}
            <h2 className="text-foreground text-5xl font-medium max-w-xs">
              {t.titleMobile}
            </h2>

            {/* Paragraphe */}
            <p className="text-foreground text-2xl leading-relaxed max-w-sm">
              {t.paragraph}
            </p>

            {/* Bouton */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-sm"
            >
              <Button className="w-full px-12 py-4 text-center text-xl md:text-2xl font-medium bg-primary border-2 border-foreground text-foreground">
                {t.cta}
              </Button>
            </a>

            {/* Icônes sociales */}
            <div className="flex items-center justify-center gap-block">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-foreground-alt-a transition-all duration-300"
              >
                <GithubIcon size={46} />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-foreground-alt-a transition-all duration-300"
              >
                <InstagramIcon size={46} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-foreground-alt-a transition-all duration-300"
              >
                <LinkedinIcon size={46} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:text-foreground-alt-a transition-all duration-300"
              >
                <WhatsappIcon size={46} />
              </a>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 items-center">
              <p className="text-foreground text-xl font-normal">
                {t.writeTo}
              </p>
              <a
                href="mailto:rahim100codeur@gmail.com"
                className="underline cursor-pointer text-foreground text-2xl decoration-2 break-all"
              >
                rahim100codeur@gmail.com
              </a>
            </div>
          </div>

          {/* ============================================================
              DESKTOP (lg+)
              ============================================================ */}
          <div className="hidden lg:block pb-section">
            {/* 1st line */}
            <div className="flex justify-center">
              <div className="flex justify-start max-w-md">
                <h2 className="text-foreground text-4xl md:text-8xl">{t.titleA}</h2>
              </div>
            </div>
            {/* 2nd line */}
            <div className="flex justify-end mx-auto max-w-md">
              <div className="flex justify-end max-w-xs">
                <h2 className="text-foreground text-4xl md:text-8xl">{t.titleB}</h2>
              </div>
            </div>
            {/* 3rd line */}
            <div className="flex items-end justify-between max-w-6xl mx-auto mb-major">
              <div className="flex flex-col gap-comfortable">
                <div className="flex items-center justify-start gap-block">
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="hover:text-foreground-alt-a transition-all duration-300"
                  >
                    <GithubIcon size={46} />
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="hover:text-foreground-alt-a transition-all duration-300"
                  >
                    <LinkedinIcon size={46} />
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="hover:text-foreground-alt-a transition-all duration-300"
                  >
                    <InstagramIcon size={46} />
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="hover:text-foreground-alt-a transition-all duration-300"
                  >
                    <WhatsappIcon size={46} />
                  </a>
                </div>
                <p className="text-foreground text-2xl leading-relaxed max-w-sm">
                  {t.paragraph}
                </p>
              </div>
              <h2 className="flex flex-col items-end text-foreground text-4xl md:text-8xl">
                <span>{t.titleC}</span>
                <span>{t.titleD}</span>
              </h2>
            </div>
            {/* 4th line */}
            <div className="flex min-w-0 max-w-6xl mx-auto flex-wrap items-center justify-between gap-comfortable">
              <div className="min-w-0">
                <p className="text-foreground text-xl font-normal">
                  {t.writeTo}
                </p>
                <a
                  href="mailto:rahim100codeur@gmail.com"
                  className="hover:underline cursor-pointer text-foreground text-2xl decoration-2"
                >
                  rahim100codeur@gmail.com
                </a>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex w-full min-w-0 max-w-full sm:w-auto"
              >
                <Button className="w-full max-w-full whitespace-normal px-12 py-4 text-center text-xl md:text-2xl font-medium bg-primary border-2 border-foreground text-foreground sm:w-auto">
                  {t.cta}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
