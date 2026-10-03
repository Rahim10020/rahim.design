import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../../../lib/gsap";

interface ReadingProgressProps {
  label: string;
}

/**
 * Barre de progression de lecture — rail vertical fixe à droite,
 * rempli en primary au fur et à mesure du scroll sur la page entière.
 * Masquée sous le breakpoint lg (l'article y occupe toute la largeur).
 */
export default function ReadingProgress({ label }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(
          max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 1,
        );
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 lg:block"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div className="h-48 w-4 overflow-hidden bg-background-alt">
        <div
          className={`w-full border-b-2 border-foreground bg-primary ${
            reducedMotion ? "" : "transition-[height] duration-150 ease-out"
          }`}
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
