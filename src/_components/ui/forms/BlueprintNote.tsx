import { WHATSAPP_URL } from "../../../routes";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import { useLocale } from "../../../lib/i18n";
import { getContact } from "../../../locales/contact";

export default function BlueprintNote() {
  const t = getContact(useLocale()).blueprint;

  return (
    <div className="relative w-full max-w-115 text-foreground">
      {/* Ligne verticale principale (pleine hauteur) */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-7 lg:left-9.5 w-0.5 bg-foreground"
      />

      {/* Rangée 1 */}
      <div className="flex h-17 lg:h-22 items-center border-b-2 border-foreground-alt-a pl-10 lg:pl-22.5">
        <p className="whitespace-nowrap pl-8 text-3xl">{t.line1}</p>
      </div>

      {/* Rangée 2 : cellule vide + séparateur secondaire */}
      <div className="flex h-17 lg:h-22 items-stretch border-b-2 border-foreground-alt-a pl-22.5">
        <div
          aria-hidden
          className="w-9.5 lg:w-25 shrink-0 border-r-2 border-foreground-alt-a"
        />
        <p className="flex items-center whitespace-nowrap pl-6 text-3xl">
          {t.line2}
        </p>
      </div>

      {/* Rangée 3 */}
      <div className="flex h-17 lg:h-22 items-center border-b-2 border-foreground-alt-a pl-7.5 lg:pl-22.5">
        <p className="whitespace-nowrap pl-5 text-xl text-foreground-alt-a">
          {t.line3}
        </p>
      </div>

      {/* Connecteur + bouton */}
      <div className="pb-6 pl-20 lg:pl-33.75 pr-11.25">
        <div aria-hidden className="mx-auto h-12.5 w-0.5 bg-foreground" />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-55 items-center gap-8 border-2 border-foreground-alt-a py-2 pl-10 text-xl bg-accent-e"
        >
          {t.cta} <ArrowRightIcon size={20} />
        </a>
      </div>
    </div>
  );
}
