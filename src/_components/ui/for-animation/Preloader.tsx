import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../../../lib/gsap";
import { useLocale } from "../../../lib/i18n";
import { getUi } from "../../../locales/ui";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const words = getUi(useLocale()).preloader.words;

  useGSAP(
    () => {
      if (sessionStorage.getItem("rd-preloader") === "1") {
        setDone(true);
        onDone();
        return;
      }
      if (prefersReducedMotion()) {
        setDone(true);
        onDone();
        return;
      }
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("rd-preloader", "1");
          setDone(true);
          onDone();
        },
      });
      words.forEach((w) => {
        tl.call(() => {
          if (wordRef.current) wordRef.current.textContent = w;
        });
        tl.fromTo(
          wordRef.current,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out" },
          ">",
        );
        tl.to(
          wordRef.current,
          { y: -14, autoAlpha: 0, duration: 0.25 },
          ">+0.2",
        );
      });
      tl.to(
        counter,
        {
          v: 100,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (numRef.current)
              numRef.current.textContent = String(
                Math.round(counter.v),
              ).padStart(3, "0");
            if (barRef.current)
              barRef.current.style.transform = `scaleX(${counter.v / 100})`;
          },
        },
        0,
      );
      tl.to(rootRef.current, {
        yPercent: -100,
        duration: 0.5,
        ease: "power4.inOut",
      });
    },
    { scope: rootRef },
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-primary-alt text-background"
      aria-hidden
    >
      <span
        ref={wordRef}
        className="text-4xl md:text-6xl font-medium tracking-tight min-h-[1.5em]"
      >
        Design
      </span>
      <span
        ref={numRef}
        className="mt-4 text-6xl md:text-8xl font-medium tabular-nums"
      >
        000
      </span>
      <div className="mt-8 h-1.5 w-48 overflow-hidden bg-white/20">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-primary"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
