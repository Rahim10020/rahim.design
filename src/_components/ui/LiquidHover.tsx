import { type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { useLiquidTargets } from "./useLiquidTargets";

export function LiquidFills({
  fillClassName = "bg-primary",
}: {
  fillClassName?: string;
}) {
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
      {!active && <LiquidFills fillClassName={fillClassName} />}
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
      {!active && <LiquidFills fillClassName={fillClassName} />}
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
      {!active && <LiquidFills fillClassName={fillClassName} />}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
