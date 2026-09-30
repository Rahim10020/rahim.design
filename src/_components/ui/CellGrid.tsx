import type { CSSProperties } from "react";

export interface CellDef {
  col: number;
  row: number;
  colSpan?: number | "end";
  rowSpan?: number;
  color: string;
}

interface CellGridProps {
  cells: CellDef[];
  className?: string;
  style?: CSSProperties;
}

export default function CellGrid({
  cells,
  className = "",
  style,
}: CellGridProps) {
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden border-foreground ${className}`}
      style={style}
    >
      {/* 1. couleurs en dessous */}
      {cells.map(({ col, row, colSpan = 1, rowSpan = 1, color }, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `calc(var(--cell) * ${col})`,
            top: `calc(var(--cell) * ${row})`,
            width:
              colSpan === "end"
                ? `calc(100% - var(--cell) * ${col})`
                : `calc(var(--cell) * ${colSpan})`,
            height: `calc(var(--cell) * ${rowSpan})`,
            backgroundColor: color,
          }}
        />
      ))}

      {/* 2. lignes de grille par-dessus (visibles aussi sur les zones colorées) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "var(--cell) var(--cell)",
        }}
      />
    </div>
  );
}
