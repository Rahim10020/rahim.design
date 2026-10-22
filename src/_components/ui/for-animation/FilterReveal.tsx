import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

interface FilterRevealProps {
  filterKey: string;
  className?: string;
  children: ReactNode;
}

type FilterRevealModule = typeof import("./filterRevealAnimation");

/**
 * Révèle les cartes d'une liste filtrée avec un rideau média.
 *
 * Volontairement déclenché uniquement au changement de filtre : le premier
 * render (et donc le HTML pré-rendu) reste intact, sans état caché ni CLS.
 * Le module GSAP est importé après le premier paint pour ne pas alourdir
 * le chemin critique de la route ; si l'utilisateur filtre avant son
 * chargement, le contenu change simplement sans animation.
 */
export default function FilterReveal({
  filterKey,
  className = "",
  children,
}: FilterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastFilter = useRef(filterKey);
  const animationModule = useRef<FilterRevealModule | null>(null);

  // Préchargement non bloquant, après le premier paint.
  useEffect(() => {
    let cancelled = false;
    void import("./filterRevealAnimation").then((module) => {
      if (!cancelled) animationModule.current = module;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // useLayoutEffect : l'état initial des rideaux est posé avant le paint,
  // donc aucune image non masquée ne clignote au changement de filtre.
  useLayoutEffect(() => {
    if (lastFilter.current === filterKey) return;
    lastFilter.current = filterKey;

    const container = containerRef.current;
    const animate = animationModule.current?.animateFilterReveal;
    if (!container || !animate) return;

    const context = animate(container);
    return () => context?.revert();
  }, [filterKey]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
