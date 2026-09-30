import { useEffect, useState } from "react";
import {
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  WHATSAPP_URL,
} from "../../routes";
import { getUi } from "../../locales/ui";
import { useLocale } from "../../lib/i18n";
import Button from "../ui/Button";
import EmailLink from "../ui/EmailLink";

const EMAIL = "rahim100codeur@gmail.com";

const SOCIALS = [
  { label: "Github", href: GITHUB_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "Whatsapp", href: WHATSAPP_URL },
];

function useLomeTime() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Africa/Lome",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function ContactSection() {
  const t = getUi(useLocale()).contactSection;
  const lomeTime = useLomeTime();

  return (
    <section className="w-full bg-background my-section lg:py-section-lg">
      <div className="max-w-350 mx-auto px-page-x">
        <div className="mx-auto max-w-8xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-major">
            {/* Left col */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <div className="flex flex-col gap-6 lg:gap-8">
                <h2 className="text-5xl md:text-6xl font-medium text-foreground leading-[1.05]">
                  {t.contactSectionTitle}
                </h2>
                <p className="text-foreground leading-relaxed text-xl max-w-sm mx-auto lg:mx-0 ">
                  {t.leftParagraph}
                </p>
              </div>
              <div className="mt-12">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button className="px-8 lg:px-10 py-4 text-xl font-medium bg-primary border-2 border-foreground text-foreground">
                    {t.cta}
                  </Button>
                </a>
              </div>
            </div>
            {/* Center col */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-element text-center lg:text-left">
              <EmailLink label={EMAIL} />
              <p className="text-foreground leading-relaxed text-xl max-w-sm lg:max-w-lg mx-auto lg:mx-0 ">
                {t.centerParagraph}
              </p>
            </div>
            {/* Right col */}
            <nav aria-label="Socials" className="lg:col-span-3">
              <div className="flex flex-col items-center lg:items-end">
                <ul className="flex flex-col items-center lg:items-start gap-element">
                  {SOCIALS.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl md:text-3xl hover:underline underline-offset-4 "
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
