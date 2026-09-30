import { WHATSAPP_URL } from "../../routes";
import Button from "../ui/Button";
import CellGrid, { type CellDef } from "../ui/CellGrid";
import { useLocale } from "../../lib/i18n";
import { getUi } from "../../locales/ui";

// col / row = position (départ à 0), colSpan / rowSpan = taille en cases
// colSpan: "end" = jusqu'au bord droit du conteneur
const DESKTOP_CELLS: CellDef[] = [
  { col: 0, row: 3, colSpan: 2, color: "var(--background-alt)" },
  { col: 1, row: 7, color: "var(--foreground)" },
  { col: 4, row: 8, color: "var(--foreground)" },
];

const MOBILE_CELLS: CellDef[] = [
  { col: 8, row: 0, color: "var(--foreground)" },
  { col: 1, row: 1, rowSpan: 2, color: "var(--foreground)" },
  {
    col: 4,
    row: 1,
    rowSpan: 2,
    colSpan: "end",
    color: "var(--background-alt)",
  },
];

export default function ContactSection() {
  const t = getUi(useLocale()).contactSection;
  return (
    <section className="flex w-full flex-col border-2 border-foreground mt-0 lg:mt-16 bg-background lg:h-[650px] lg:flex-row">
      {/* MOBILE */}
      <div
        aria-hidden
        className="grid h-7.5 grid-cols-2 border-b-2 border-foreground lg:hidden"
      >
        <div />
        <div className="border-l-2 border-foreground bg-background-alt" />
      </div>

      {/* DESKTOP  */}
      <div className="hidden w-8.5 shrink-0 bg-foreground lg:block" />
      <div
        aria-hidden
        className="relative hidden w-77.5 shrink-0 border-r-2 border-foreground text-foreground lg:block"
      ></div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col items-center justify-center px-7 py-16 text-center lg:py-0">
        <h2 className="text-foreground text-5xl font-medium leading-tight max-w-xl lg:text-7xl">
          {t.titleMobile}
        </h2>

        <p className="text-foreground mt-comfortable text-2xl leading-relaxed max-w-sm">
          {t.paragraph}
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-block flex w-full max-w-sm justify-center lg:w-auto lg:max-w-none"
        >
          <Button className="w-full px-10 py-4 text-center text-xl md:text-2xl font-medium lg:w-auto">
            {t.cta}
          </Button>
        </a>
      </div>

      {/* MOBILE : grille de 3 rangées, pleine largeur */}
      <CellGrid
        cells={MOBILE_CELLS}
        className="border-t [--cell:28px] lg:hidden"
        style={{ height: "calc(var(--cell) * 3 + 1px)" }}
      />

      {/* DESKTOP : grille verticale à droite */}
      <CellGrid
        cells={DESKTOP_CELLS}
        className="hidden shrink-0 border-l [--cell:46px] lg:block"
        style={{ width: "calc(var(--cell) * 8)" }}
      />
    </section>
  );
}
