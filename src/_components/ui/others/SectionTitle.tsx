import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";

interface SectionTitleProps {
  children: ReactNode;
  variant: "xl" | "lg";
  className?: string;
}

const VARIANTS = {
  xl: "text-foreground text-4xl md:text-5xl lg:text-6xl",
  lg: "text-foreground text-4xl sm:text-4xl lg:text-5xl",
} as const;

/** Titre h2 de section (pages About / Services). */
export default function SectionTitle({
  children,
  variant,
  className,
}: SectionTitleProps) {
  return (
    <h2
      className={cn(
        VARIANTS[variant],
        "font-medium leading-tight mb-12 lg:mb-24 text-center max-w-xs lg:max-w-xl mx-auto",
        className,
      )}
    >
      {children}
    </h2>
  );
}
