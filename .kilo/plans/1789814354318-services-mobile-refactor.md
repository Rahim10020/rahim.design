# Services Page Mobile Refactor — Implementation Plan

## Goal
Refactor the project cards section (section 7) in `src/_pages/Services.tsx` to match the horizontal scroll behavior, gauge indicator, right fade, and GSAP animations of `ProjectsSection.tsx`, while keeping the rest of the page vertically stacked.

## Scope
- **Only section 7** (project cards + "See all projects" link) becomes horizontally scrollable
- Sections 1-6 and 8 (FAQ) remain vertically stacked as-is
- 3 project cards shown (not 4 like ProjectsSection)
- Gauge placed after project cards, before FAQ section
- GSAP animations trigger when project cards section enters viewport

---

## Files to Modify
- `src/_pages/Services.tsx` — primary modification
- No new components needed (reuse `ProjectCard`, `ChevronRightIcon`, `gsap`/`useGSAP`)

---

## Implementation Steps

### 1. Add Required Imports & Constants
- Import `useRef`, `useState`, `useEffect` (already present)
- Import `gsap`, `useGSAP` from `../../lib/gsap`
- Add `const TOTAL_BARS = 16;` at component top level

### 2. Add Refs & State for Project Cards Section
```tsx
const sliderRef = useRef<HTMLDivElement>(null);
const sectionRef = useRef<HTMLElement>(null);      // for scroll-trigger
const cardsWrapperRef = useRef<HTMLDivElement>(null);
const gaugeRef = useRef<HTMLDivElement>(null);
const rightFadeRef = useRef<HTMLDivElement>(null);
const seeAllArrowRef = useRef<HTMLSpanElement>(null);
const [activeIndex, setActiveIndex] = useState(0);
const [isAtEnd, setIsAtEnd] = useState(false);
```

### 3. Add Scroll Listener (port from ProjectsSection:25-60)
- Attach passive scroll listener to `sliderRef`
- Compute `progress = scrollLeft / maxScroll`
- `activeIndex = Math.round(progress * (TOTAL_BARS - 1))`
- `isAtEnd = scrollLeft >= maxScroll - 20`
- Cleanup on unmount

### 4. Add `getBarHeight` Helper (port from ProjectsSection:62-68)
```tsx
const getBarHeight = (index: number) => {
  const distance = Math.abs(index - activeIndex);
  if (distance === 0) return 32;
  if (distance === 1) return 22;
  if (distance === 2) return 14;
  return 8;
};
```

### 5. Add GSAP Animations — Three `useGSAP` Blocks

**A. Entrance + Looping Animations** (port from ProjectsSection:73-146)
- Scope: `sectionRef` (the project cards section wrapper)
- Trigger: `sectionRef.current`, `start: "top 75%"`, `once: true`
- Animate cards: `from(cards, { x: 60, autoAlpha: 0, stagger: 0.1 })`
- Animate gauge bars: `from(bars, { scaleY: 0, stagger: 0.02 }, "-=0.3")`
- Breathing gauge: `gsap.to(bars, { height: "+=3", repeat: -1, yoyo: true, stagger: { each: 0.06, from: "center" } })`
- Pulsing arrow: `gsap.to(arrow, { x: 4, repeat: -1, yoyo: true })`
- Scroll nudge: `gsap.fromTo(slider, { scrollLeft: 0 }, { scrollLeft: 60, yoyo: true, repeat: 1, delay: 1.2 })`

**B. Active Bar Rebound** (port from ProjectsSection:151-166)
- Dependencies: `[activeIndex]`
- Scope: `sectionRef`
- Animate `bars[activeIndex]`: `fromTo({ scaleY: 1.3 }, { scaleY: 1, duration: 0.3, ease: "back.out(2)" })`

**C. Right Fade Toggle** (port from ProjectsSection:171-181)
- Dependencies: `[isAtEnd]`
- Scope: `sectionRef`
- `gsap.to(rightFadeRef.current, { autoAlpha: isAtEnd ? 0 : 1, duration: 0.3 })`

### 6. Restructure Section 7 JSX

**Current (lines 315-350):**
```tsx
<div className="flex items-between gap-8 mt-16">
  <div className="flex items-center gap-8">
    {projects.slice(0, 3).map(...)}
  </div>
  <div className="shrink-0 snap-center flex items-center self-center pl-element pr-heading-content">
    <Link to={ROUTES.PROJECTS.LIST} ...>See all projects <ChevronRightIcon /></Link>
  </div>
</div>
```

**New Structure (mirroring ProjectsSection:195-236):**
```tsx
{/* Wrapper for slider + fade + gauge */}
<div className="relative max-w-350 mx-auto mt-16">
  {/* SLIDER */}
  <div
    ref={sliderRef}
    className="flex items-end gap-block sm:gap-heading-content overflow-x-auto snap-x snap-mandatory scrollbar-hide px-page-x lg:px-major pb-element"
    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
  >
    <div ref={cardsWrapperRef} className="contents">
      {projects.slice(0, 3).map((project) => (
        <ProjectCard
          key={project.title}
          title={project.title}
          category={project.category}
          href={getProjectPath(project.slug)}
          imageHeight={project.imageHeight}
          imageSrc={project.imageSrc}
        />
      ))}
    </div>

    {/* "See all projects" link — snap-center with pulsing arrow */}
    <div className="shrink-0 snap-center flex items-center self-center pl-element pr-heading-content">
      <Link
        to={ROUTES.PROJECTS.LIST}
        className="flex items-center text-foreground text-xl font-medium underline underline-offset-4 hover:opacity-70 transition-opacity whitespace-nowrap"
      >
        See all projects{" "}
        <span ref={seeAllArrowRef} className="pl-tight inline-flex">
          <ChevronRightIcon />
        </span>
      </Link>
    </div>
  </div>

  {/* Right fade indicator */}
  <div
    ref={rightFadeRef}
    className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-background to-transparent"
    style={{ opacity: 0 }}
  />
</div>

{/* GAUGE — placed after slider, before FAQ */}
<div className="max-w-350 mx-auto px-page-x mt-heading-content">
  <div ref={gaugeRef} className="flex items-end justify-center gap-1.5 h-10">
    {Array.from({ length: TOTAL_BARS }).map((_, index) => (
      <div
        key={index}
        className="w-0.5 bg-neutral-800 rounded-full transition-[height] duration-150 ease-out"
        style={{ height: `${getBarHeight(index)}px` }}
      />
    ))}
  </div>
</div>
```

### 7. Wrap Section 7 Title/Description in a Container with `sectionRef`
- The title ("Want to see what it looks like in practice?") and description should be inside the `sectionRef` wrapper so the scroll-trigger works
- Apply `sectionRef` to a `div` wrapping the title, description, AND the new slider/gauge structure

### 8. Update Container Padding
- Change section 7's outer container from `px-6` to `px-page-x` (8px) to match ProjectsSection horizontal padding
- Keep `max-w-350 mx-auto` for consistency

---

## Validation Checklist
- [ ] Horizontal scroll works on mobile with snap behavior
- [ ] 3 project cards visible, "See all" link snaps to center
- [ ] Right fade appears when not at end, disappears at end
- [ ] Gauge shows 16 bars, active bar highlighted, breathing animation runs
- [ ] Entrance animation triggers when section enters viewport (top 75%)
- [ ] Arrow pulses continuously
- [ ] Scroll nudge plays once on load
- [ ] Active bar rebounds on scroll position change
- [ ] No horizontal scroll on other sections
- [ ] FAQ section (section 8) unchanged and functional
- [ ] Desktop layout unchanged (cards in row, no scroll, gauge hidden or static)

---

## Risks & Notes
- **Desktop behavior**: ProjectsSection hides gauge on desktop via CSS? Check if gauge should be hidden on `lg:`. Current ProjectsSection shows gauge on all sizes. Decision: keep gauge visible on all sizes for parity.
- **GSAP cleanup**: `useGSAP` with `scope: sectionRef` handles cleanup automatically.
- **Scroll listener**: Must use `passive: true` and `requestAnimationFrame` for performance.
- **Z-index**: Right fade uses `absolute` positioning inside `relative` wrapper — ensure no stacking context issues.
- **ProjectsSection uses `className="contents"` on cards wrapper** — this removes the wrapper from flex layout, making cards direct children of slider. Replicate exactly.

---

## Dependencies
- Existing: `gsap`, `@gsap/react` (via `useGSAP`), `ProjectCard`, `ChevronRightIcon`, `getProjectPath`, `ROUTES`
- No new dependencies required