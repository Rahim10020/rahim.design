import type { RefObject } from "react";
import { gsap, useGSAP } from "../../../lib/gsap";

type MobileMenuAnimationArgs = {
  headerRef: RefObject<HTMLElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
  itemsRef: RefObject<HTMLDivElement | null>;
  bottomCloseRef: RefObject<HTMLButtonElement | null>;
  mobileMenuOpen: boolean;
  pathname: string;
  hash: string;
  onNavigate: () => void;
};

export function useMobileMenuAnimation({
  headerRef,
  overlayRef,
  itemsRef,
  bottomCloseRef,
  mobileMenuOpen,
  pathname,
  hash,
  onNavigate,
}: MobileMenuAnimationArgs) {
  useGSAP(
    () => {
      gsap.set(overlayRef.current, {
        autoAlpha: 0,
        scaleY: 0,
        transformOrigin: "top center",
      });
      gsap.set(itemsRef.current?.children ?? [], {
        y: 40,
        autoAlpha: 0,
      });
      gsap.set(bottomCloseRef.current, {
        autoAlpha: 0,
        scale: 0.8,
      });
    },
    { scope: headerRef },
  );

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const items = itemsRef.current?.children;
      const bottomClose = bottomCloseRef.current;
      if (!overlay || !items || !bottomClose) return;

      if (mobileMenuOpen) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(overlay, {
          autoAlpha: 1,
          scaleY: 1,
          duration: 0.4,
        })
          .to(
            items,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              stagger: 0.08,
            },
            "-=0.2",
          )
          .to(
            bottomClose,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.3,
            },
            "-=0.15",
          );
      } else {
        const tl = gsap.timeline({ defaults: { ease: "power2.in" } });

        tl.to(bottomClose, {
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.2,
        })
          .to(
            items,
            {
              y: -20,
              autoAlpha: 0,
              duration: 0.25,
              stagger: { each: 0.05, from: "end" },
            },
            "-=0.1",
          )
          .to(
            overlay,
            {
              autoAlpha: 0,
              scaleY: 0,
              duration: 0.35,
              ease: "power3.inOut",
            },
            "-=0.1",
          );
      }
    },
    { dependencies: [mobileMenuOpen], scope: headerRef },
  );

  useGSAP(
    () => {
      if (mobileMenuOpen) onNavigate();
    },
    { dependencies: [pathname, hash], scope: headerRef },
  );

  useGSAP(
    () => {
      document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    },
    { dependencies: [mobileMenuOpen], scope: headerRef },
  );
}
