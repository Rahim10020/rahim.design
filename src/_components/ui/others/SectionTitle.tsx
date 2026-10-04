import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";

interface SectionTitleProps {
  children: ReactNode;
  variant: "xl" | "lg";
  className?: string;
}

const VARIANTS = {
  xl: "text-foreground text-4xl md:text-5xl lg:text-[2.6rem]",
  lg: "text-foreground text-3xl sm:text-4xl lg:text-[2.6rem]",
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
        "font-medium leading-tight mb-12 lg:mb-20",
        className,
      )}
    >
      {children}
    </h2>
  );
}
