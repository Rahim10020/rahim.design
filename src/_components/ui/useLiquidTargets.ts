import { useEffect, useRef } from "react";

const ENTER_DURATION = 0.45;
const LEAVE_DURATION = 0.4;

const RADIUS_BOTTOM = "50% 50% 0% 0% / 100% 100% 0% 0%";
const RADIUS_TOP = "0% 0% 50% 50% / 0% 0% 100% 100%";
const RADIUS_FLAT = "0% 0% 0% 0% / 0% 0% 0% 0%";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Pas d'effet sur tactile : sans hover, la vague resterait bloquée visible
 * après un tap (focus). Réservé aux pointeurs fins.
 */
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
 * Attache le remplissage liquide directionnel double couche à l'élément.
 * GSAP chargé en dynamique (hors chemin critique) : pas d'animation tant
 * que le chunk n'est pas là, listeners nettoyés au démontage.
 * Perf : uniquement transform + border-radius, overwrite auto.
 */
export function useLiquidTargets(disabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled || prefersReducedMotion() || !hasFineHover()) return;
    let cancelled = false;
    let detach: (() => void) | undefined;

    void import("../../lib/gsap").then(({ gsap }) => {
      if (cancelled) return;
      const root = ref.current;
      if (!root) return;
      const fills = root.querySelectorAll<HTMLElement>("[data-liquid-fill]");
      if (fills.length === 0) return;

      gsap.set(fills, {
        // NOTE: x/y à 0 obligatoire — sinon GSAP récupère le translateY(101%)
        // du style inline comme un offset px qui fausse tous les yPercent.
        x: 0,
        y: 0,
        yPercent: 101,
        borderRadius: RADIUS_BOTTOM,
        xPercent: 0,
      });

      const playEnter = (fromTop: boolean) => {
        const targets =
          ref.current?.querySelectorAll<HTMLElement>("[data-liquid-fill]") ??
          [];
        if (targets.length === 0) return;
        const start = fromTop ? -101 : 101;
        gsap.killTweensOf(targets);
        gsap.set(targets, {
          x: 0,
          y: 0,
          yPercent: start,
          borderRadius: fromTop ? RADIUS_TOP : RADIUS_BOTTOM,
          xPercent: (index) => (index === 1 ? gsap.utils.random(-7, 7) : 0),
        });
        gsap.to(targets, {
          x: 0,
          y: 0,
          yPercent: 0,
          borderRadius: RADIUS_FLAT,
          xPercent: 0,
          duration: ENTER_DURATION,
          ease: "power3.out",
          overwrite: "auto",
          stagger: 0.06,
        });
      };

      const playLeave = (toTop: boolean) => {
        const targets =
          ref.current?.querySelectorAll<HTMLElement>("[data-liquid-fill]") ??
          [];
        if (targets.length === 0) return;
        gsap.killTweensOf(targets);
        gsap.to(targets, {
          x: 0,
          y: 0,
          yPercent: toTop ? -101 : 101,
          borderRadius: toTop ? RADIUS_TOP : RADIUS_BOTTOM,
          duration: LEAVE_DURATION,
          ease: "power3.in",
          overwrite: "auto",
          stagger: 0.05,
        });
      };

      const directionFromEvent = (event: Event, fallback: boolean) => {
        const target = event.currentTarget as HTMLElement | null;
        if (!target) return fallback;
        if (!("clientY" in event) || typeof event.clientY !== "number") {
          return fallback;
        }
        const rect = target.getBoundingClientRect();
        return event.clientY - rect.top < rect.height / 2;
      };

      const onEnter = (event: Event) => {
        playEnter(directionFromEvent(event, false));
      };
      const onLeave = (event: Event) => {
        playLeave(directionFromEvent(event, false));
      };
      const onFocusIn = () => {
        playEnter(false);
      };
      const onFocusOut = () => {
        playLeave(false);
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("focus", onFocusIn);
      el.addEventListener("blur", onFocusOut);

      detach = () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("focus", onFocusIn);
        el.removeEventListener("blur", onFocusOut);
        gsap.killTweensOf(
          root.querySelectorAll<HTMLElement>("[data-liquid-fill]"),
        );
      };
    });

    return () => {
      cancelled = true;
      detach?.();
    };
  }, [disabled]);

  return ref;
}
