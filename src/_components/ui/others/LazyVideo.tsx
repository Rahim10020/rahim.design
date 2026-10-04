import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  ariaLabel?: string;
  className?: string;
  /** Média hero (candidat LCP) : source chargée d'emblée, pas d'attente viewport. */
  eager?: boolean;
}

function autoplayAllowed(): boolean {
  if (typeof window === "undefined") return true;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const saveData =
    "connection" in navigator &&
    (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData === true;
  return !reducedMotion && !saveData;
}

function hasFineHover(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return (
      window.matchMedia("(hover: hover)").matches &&
      window.matchMedia("(pointer: fine)").matches
    );
  } catch {
    return false;
  }
}

/**
 * Vidéo à déclenchement contextuel, zéro octet au chargement initial :
 * - Desktop (pointeur fin) : le poster s'affiche, le flux n'est branché
 *   et lu qu'au survol (`mouseenter` → lecture, `mouseleave` → pause).
 * - Tactile : lecture auto quand la vidéo entre dans le viewport
 *   (muted + playsInline), pause hors écran. Aucune UI ajoutée.
 * - `prefers-reduced-motion` / `Save-Data` : poster fixe + contrôles natifs.
 * - `eager` (hero LCP) : flux branché et lu d'emblée.
 */
export default function LazyVideo({
  src,
  poster,
  ariaLabel,
  className = "",
  eager = false,
}: LazyVideoProps) {
  // Poster conventionnel : `<nom>-poster.webp` à côté du .webm/.mp4.
  // Évite de toucher chaque appelant ; 404 inoffensif si absent.
  const posterSrc =
    poster ??
    (/\.(webm|mp4)$/i.test(src)
      ? src.replace(/\.(webm|mp4)$/i, "-poster.webp")
      : undefined);
  const ref = useRef<HTMLVideoElement>(null);
  const [canAutoplay] = useState(autoplayAllowed);
  const [fineHover] = useState(hasFineHover);
  const [activeSrc, setActiveSrc] = useState<string | undefined>(() =>
    canAutoplay ? (eager ? src : undefined) : src,
  );
  // Lecture demandée avant le branchement du flux (survol/visible/eager).
  const wantPlayRef = useRef(canAutoplay && eager);
  // Miroir du branchement (les listeners ne sont pas ré-abonnés).
  const srcSetRef = useRef(activeSrc !== undefined);

  // Branchement effectif : avec preload="none", poser src ne fetche rien —
  // seul load()+play() déclenche le téléchargement.
  useEffect(() => {
    if (!activeSrc || !wantPlayRef.current) return;
    wantPlayRef.current = false;
    const video = ref.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {
      /* autoplay bloqué : reste sur le poster */
    });
  }, [activeSrc]);

  useEffect(() => {
    if (!canAutoplay) return;
    const video = ref.current;
    if (!video) return;

    const play = () => {
      const current = ref.current;
      if (!current) return;
      if (srcSetRef.current) {
        if (current.paused) {
          current.play().catch(() => {
            /* autoplay bloqué : reste sur le poster */
          });
        }
        return;
      }
      srcSetRef.current = true;
      wantPlayRef.current = true;
      setActiveSrc(src);
    };

    // Eager déjà couvert par l'initialiseur + l'effet ci-dessus.
    if (eager) return;

    // Desktop : lecture au survol uniquement (aucun téléchargement avant).
    if (fineHover) {
      const onEnter = () => {
        play();
      };
      const onLeave = () => {
        video.pause();
      };
      video.addEventListener("mouseenter", onEnter);
      video.addEventListener("mouseleave", onLeave);
      return () => {
        video.removeEventListener("mouseenter", onEnter);
        video.removeEventListener("mouseleave", onLeave);
      };
    }

    // Tactile : lecture auto à l'entrée dans le viewport, pause hors écran.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          play();
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [canAutoplay, eager, fineHover, src]);

  return (
    <video
      ref={ref}
      src={activeSrc}
      muted
      loop
      playsInline
      autoPlay={canAutoplay && eager}
      preload={eager ? "metadata" : "none"}
      controls={!canAutoplay}
      aria-label={ariaLabel}
      {...(posterSrc ? { poster: posterSrc } : {})}
      className={className}
    />
  );
}
