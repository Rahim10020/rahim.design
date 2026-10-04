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

/**
 * Vidéo lazy avec autoplay optimisé :
 * - `preload="none"` + src injectée seulement à ~200px du viewport (plus
 *   aucun téléchargement au chargement initial pour les vidéos hors écran).
 * - Lecture seulement quand visible, pause hors écran (économise CPU/batterie).
 * - Respecte `prefers-reduced-motion` et `Save-Data` : pas d'autoplay,
 *   source chargée d'emblée avec contrôles natifs.
 */
export default function LazyVideo({
  src,
  poster,
  ariaLabel,
  className = "",
  eager = false,
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [canAutoplay] = useState(autoplayAllowed);
  const [activeSrc, setActiveSrc] = useState<string | undefined>(() =>
    canAutoplay ? (eager ? src : undefined) : src,
  );

  useEffect(() => {
    if (!canAutoplay) return;
    const video = ref.current;
    if (!video) return;

    // Eager (hero LCP) : la src est déjà posée, joue dès que possible.
    if (eager) {
      const onCanPlay = () => {
        void video.play().catch(() => {
          /* autoplay bloqué : reste sur la première frame */
        });
      };
      video.addEventListener("canplay", onCanPlay);
      return () => video.removeEventListener("canplay", onCanPlay);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setActiveSrc((current) => current ?? src);
          void video.play().catch(() => {
            /* autoplay bloqué : reste sur la première frame */
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [canAutoplay, eager, src]);

  return (
    <video
      ref={ref}
      src={activeSrc}
      muted
      loop
      playsInline
      autoPlay={canAutoplay}
      preload={eager ? "metadata" : "none"}
      controls={!canAutoplay}
      aria-label={ariaLabel}
      {...(poster ? { poster } : {})}
      className={className}
    />
  );
}
