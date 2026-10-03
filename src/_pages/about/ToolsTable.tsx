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

/** Tableau des outils : titre, une ligne par catégorie, citation (page About). */
export default function ToolsTable({ title, rows, note }: ToolsTableProps) {
  return (
    <div className="">
      {/* Header */}
      <div className="grid md:grid-cols-[1fr_3fr]">
        <div
          aria-hidden="true"
          className="hidden md:block border-r-2 border-foreground"
        />
        <h2 className="text-foreground text-3xl md:text-4xl max-w-sm font-medium leading-tight py-6 md:p-10 lg:p-12">
          {title}
        </h2>
      </div>
      {/* Rows */}
      {rows.map((row) => (
        <div
          key={row.label}
          className="border-t-2 border-foreground py-8 md:py-10 grid gap-6 md:grid-cols-[1fr_1.5fr_1fr] md:items-center"
        >
          <h3 className="text-foreground text-2xl md:text-3xl font-medium">
            {row.label}
          </h3>
          <p className="text-foreground-alt-a text-lg md:text-xl leading-relaxed max-w-sm">
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
      ))}
      {/* Footer */}
      <p className="px-6 py-10 md:p-12 text-center md:text-left text-foreground-alt-a text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
        {note}
      </p>
    </div>
  );
}
