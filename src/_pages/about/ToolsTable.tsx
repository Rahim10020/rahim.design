interface ToolIcon {
  src: string;
  alt: string;
}

interface ToolRowData {
  label: string;
  description: string;
  icons: ToolIcon[];
}

interface ToolsTableProps {
  title: string;
  rows: ToolRowData[];
  note: string;
}

/**
 * Tableau des outils (page About) : le cadre sort du conteneur 6xl
 * (full-bleed plafonné à 96rem = 8xl, gouttières px-6 préservées),
 * le contenu des lignes reste centré en max-w-6xl.
 */
export default function ToolsTable({ title, rows, note }: ToolsTableProps) {
  return (
    <div className="w-[min(100vw-3rem,96rem)] ml-[50%] -translate-x-1/2">
      {/* Header — pleine largeur du cadre (alignement actuel conservé) */}
      <div className="grid md:grid-cols-[1fr_3fr]">
        <div
          aria-hidden="true"
          className="hidden md:block border-r-2 border-foreground"
        />
        <h2 className="text-foreground text-3xl md:text-4xl max-w-sm font-medium leading-tight p-6 md:p-10 lg:p-12">
          {title}
        </h2>
      </div>
      {/* Rows — filets pleine largeur, contenu en 6xl */}
      {rows.map((row) => (
        <div key={row.label} className="border-t-2 border-foreground">
          <div className="mx-auto w-full max-w-8xl px-6 py-8 md:px-10 md:py-10 grid gap-6 md:grid-cols-[1fr_1.5fr_1fr] md:items-center">
            <h3 className="text-foreground text-2xl max-w-50 md:text-3xl font-medium">
              {row.label}
            </h3>
            <p className="text-foreground-alt-a text-lg md:text-xl max-w-sm leading-relaxed">
              {row.description}
            </p>
            <div className="flex items-center justify-start lg:justify-end gap-4 lg:gap-6">
              {row.icons.map((icon) => (
                <img
                  key={icon.src}
                  src={icon.src}
                  alt={icon.alt}
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="w-8 h-8 lg:w-10 lg:h-10"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
      {/* Footer — filet pleine largeur, citation en 6xl */}
      <div className="border-t-2 border-foreground">
        <p className="mx-auto w-full max-w-6xl px-6 py-10 md:p-12 text-center lg:text-left text-foreground-alt-a text-xl md:text-2xl leading-relaxed">
          <span className="block max-w-2xl mx-auto">{note}</span>
        </p>
      </div>
    </div>
  );
}
