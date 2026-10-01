import { WHATSAPP_URL } from "../../../routes";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

export default function BlueprintNote() {
  return (
    <div className="relative w-full max-w-[460px] text-foreground">
      {/* Ligne verticale principale (pleine hauteur) */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-[38px] w-0.5 bg-foreground"
      />

      {/* Rangée 1 */}
      <div className="flex h-[88px] items-center border-b-2 border-foreground pl-[90px]">
        <p className="whitespace-nowrap pl-8 text-4xl">Don't want to</p>
      </div>

      {/* Rangée 2 : cellule vide + séparateur secondaire */}
      <div className="flex h-[88px] items-stretch border-b-2 border-foreground pl-[90px]">
        <div
          aria-hidden
          className="w-[100px] shrink-0 border-r-2 border-foreground"
        />
        <p className="flex items-center whitespace-nowrap pl-6 text-4xl">
          fill out the form?
        </p>
      </div>

      {/* Rangée 3 */}
      <div className="flex h-[88px] items-center border-b-2 border-foreground pl-[90px]">
        <p className="whitespace-nowrap pl-5 text-xl">Say hello on WhatsApp.</p>
      </div>

      {/* Connecteur + bouton */}
      <div className="pb-6 pl-[135px] pr-[45px]">
        <div aria-hidden className="mx-auto h-[50px] w-0.5 bg-foreground" />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-[240px] items-center gap-12 border-2 border-foreground py-3 pl-10 text-xl transition-colors hover:bg-background-alt"
        >
          Whatsapp <ArrowRightIcon size={20} />
        </a>
      </div>
    </div>
  );
}
