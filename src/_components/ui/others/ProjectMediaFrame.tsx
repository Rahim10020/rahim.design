import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ProjectMediaFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * Cadre unifié pour les médias de projet (vidéos .webm à fond blanc
 * comprises) : fond gris + ombre douce + liseré pour délimiter la card
 * sur fond blanc, sans toucher aux sources vidéo.
 */
export default function ProjectMediaFrame({
  children,
  className = "",
}: ProjectMediaFrameProps) {
  return (
    <div
      className={twMerge(
        "w-full overflow-hidden rounded-xl bg-background-alt ring-1 ring-black/5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
