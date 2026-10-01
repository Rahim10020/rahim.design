import { useRef, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { gsap, useGSAP } from "../../lib/gsap";

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
 * Attache le remplissage liquide directionnel double couche à l'élément.
 * Listeners natifs attachés dans le contexte GSAP -> cleanup automatique,
 * aucune lecture de ref pendant le render (compatible eslint react-hooks/refs).
 * Perf : uniquement transform + border-radius, overwrite auto.
 */
function useLiquidTargets(disabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const el = ref.current;
      if (!el || disabled || prefersReducedMotion()) return;
      if (!contextSafe) return;
      const fills = el.querySelectorAll<HTMLElement>("[data-liquid-fill]");
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

      const playEnter = contextSafe((fromTop: boolean) => {
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
      });

      const playLeave = contextSafe((toTop: boolean) => {
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
      });

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
        playEnter?.(directionFromEvent(event, false));
      };
      const onLeave = (event: Event) => {
        playLeave?.(directionFromEvent(event, false));
      };
      const onFocusIn = () => {
        playEnter?.(false);
      };
      const onFocusOut = () => {
        playLeave?.(false);
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("focus", onFocusIn);
      el.addEventListener("blur", onFocusOut);

      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("focus", onFocusIn);
        el.removeEventListener("blur", onFocusOut);
      };
    },
    { scope: ref, dependencies: [disabled] },
  );

  return ref;
}

function Fills({ fillClassName = "bg-primary" }: { fillClassName?: string }) {
  return (
    <span
      aria-hidden="true"
      className="liquid-mask pointer-events-none absolute inset-0 overflow-hidden"
    >
      <span
        data-liquid-fill
        className={`liquid-fill absolute inset-0 ${fillClassName}`}
        style={{ transform: "translateY(101%)" }}
      />
      <span
        data-liquid-fill
        className={`liquid-fill absolute inset-0 ${fillClassName}`}
        style={{ transform: "translateY(101%)" }}
      />
    </span>
  );
}

type HoverProps = {
  active?: boolean;
  className?: string;
  /** Couleur de la vague liquide (défaut: bg-primary comme la nav). */
  fillClassName?: string;
  /** Classes du contenu interne (défaut: gap-1 comme la nav). */
  contentClassName?: string;
  children: ReactNode;
};

/** Link react-router avec remplissage liquide directionnel double couche. */
export function LiquidHoverLink({
  active = false,
  className = "",
  fillClassName = "bg-primary",
  contentClassName = "gap-1",
  children,
  ...rest
}: HoverProps & LinkProps) {
  const targetRef = useLiquidTargets(active);
  return (
    <Link
      {...rest}
      ref={targetRef as never}
      className={`relative block overflow-hidden isolate ${className}`}
    >
      {!active && <Fills fillClassName={fillClassName} />}
      <span className={`relative z-10 flex items-center ${contentClassName}`}>
        {children}
      </span>
    </Link>
  );
}

/** Ancre <a> avec le même effet (externe, ancres). */
export function LiquidHoverAnchor({
  active = false,
  className = "",
  fillClassName = "bg-primary",
  contentClassName = "gap-1",
  children,
  ...rest
}: HoverProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const targetRef = useLiquidTargets(active);
  return (
    <a
      {...rest}
      ref={targetRef as never}
      className={`relative block overflow-hidden isolate ${className}`}
    >
      {!active && <Fills fillClassName={fillClassName} />}
      <span className={`relative z-10 flex items-center ${contentClassName}`}>
        {children}
      </span>
    </a>
  );
}

/** Bouton (filters pills) avec le même effet. */
export function LiquidHoverButton({
  active = false,
  className = "",
  fillClassName = "bg-primary",
  children,
  ...rest
}: HoverProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const targetRef = useLiquidTargets(active);
  return (
    <button
      {...rest}
      ref={targetRef as never}
      type={rest.type ?? "button"}
      className={`relative overflow-hidden isolate ${className}`}
    >
      {!active && <Fills fillClassName={fillClassName} />}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
