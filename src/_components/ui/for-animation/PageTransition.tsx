import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap, useGSAP, prefersReducedMotion } from "../../../lib/gsap";

export default function PageTransition() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const first = useRef(true);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (first.current) {
        first.current = false;
        return;
      }
      const curtain = curtainRef.current;
      if (!curtain) return;
      const tl = gsap.timeline();
      tl.set(curtain, { display: "block", scaleY: 0, transformOrigin: "bottom center" })
        .to(curtain, { scaleY: 1, duration: 0.35, ease: "power3.inOut" })
        .set(curtain, { transformOrigin: "top center" })
        .to(curtain, { scaleY: 0, duration: 0.45, ease: "power4.inOut", delay: 0.05 })
        .set(curtain, { display: "none" });
    },
    { dependencies: [location.pathname], scope: curtainRef },
  );

  return (
    <div
      ref={curtainRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] hidden bg-primary"
      style={{ transform: "scaleY(0)" }}
    />
  );
}
