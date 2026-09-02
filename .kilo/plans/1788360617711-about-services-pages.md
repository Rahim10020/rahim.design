# Plan — About & Services detail pages

## Goal

Promote the existing in-page `AboutSection` and `ServicesSection` into dedicated, multi-block detail pages reachable from the header (`/about`, `/services`). Header anchor links become real routes; the home page no longer renders the old sections.

## Decisions (locked)

- **Routing**: dedicated routes `/about` and `/services`. Header links navigate to them (no more anchor scrolls).
- **Content source**: JSX authored in the page components (no new markdown files, no changes to `src/content/`, no changes to `lib/content.ts`).
- **Scope**: pages are multi-block expansions of the current sections (intro + body blocks + CTA), not 1:1 copies.
- **Sections removed from `HomePage`**: `AboutSection`, `ServicesSection`. Other sections (Hero, Projects, Steps, Contact) stay.

## Affected boundaries

- `src/routes.ts` — add `ROUTES.ABOUT` and `ROUTES.SERVICES` constants + path helpers.
- `src/navigation.ts` — convert About and Services `NAV_ITEMS` from `anchor` to `route` (kind).
- `src/App.tsx` — register two new routes under `MainLayout`.
- `src/_components/layout/Header.tsx` — the existing anchor branch (`isHome` → `<a href>`, else → `<Link to="/#...">`) becomes a clean route `Link`. `isAnchorSectionActive` and the `pathname === "/"` special case can be simplified for these two items but only if it doesn't affect `Projects`, `Learn`, `Contact` semantics — see Risks.
- `src/_pages/HomePage.tsx` — drop `AboutSection` and `ServicesSection` imports + JSX.
- New: `src/_pages/About.tsx`, `src/_pages/Services.tsx`.

## Plan file location

`/home/rahimdev/projects/rahim-design/.kilo/plans/1788360617711-about-services-pages.md`

## Ordered tasks

1. **Add routes + helpers** in `src/routes.ts`
   - `ROUTES.ABOUT = "/about"`, `ROUTES.SERVICES = "/services"`.
   - Keep `SECTION_IDS.ABOUT/SERVICES` only if still referenced; otherwise drop (still referenced by old sections — once removed, drop unused exports).
   - Add `getAboutPath()` and `getServicesPath()` (small helpers, mirror style of `getProjectPath`/`getLearnPath`).
   - Keep `SECTION_IDS.CONTACT` because `ContactSection` still uses it for in-page scroll.

2. **Update `src/navigation.ts`**
   - Change About and Services entries to:
     - `{ label: "About", kind: "route", to: ROUTES.ABOUT }`
     - `{ label: "Services", kind: "route", to: ROUTES.SERVICES }`
   - Contact stays `anchor` for now (scoped out unless requested).

3. **Wire routes in `src/App.tsx`**
   - Import `About` and `Services` page components.
   - Add:
     ```
     { path: ROUTES.ABOUT, element: <About /> },
     { path: ROUTES.SERVICES, element: <Services /> },
     ```
   - Keep `MainLayout` as parent so `Header`/`Footer` wrap them.

4. **Simplify `Header.tsx` for these items (optional, conditional)**
   - Because `NAV_ITEMS` now contains both `route` and `anchor` items, the existing render branch (`link.kind === "route"` → `<Link>`, else → `<a>` on home / `<Link to="/#...">` elsewhere) already handles the new route items correctly.
   - Action: verify no leftover anchor-specific CSS or `isAnchorSectionActive` call is applied to About/Services. The `linkClassName` builder uses `isAnchorSectionActive(link.href)` only inside the anchor branch — should be safe.
   - Do **not** refactor the anchor branch for Contact in this PR (out of scope).

5. **Remove old sections from `HomePage.tsx`**
   - Delete imports `AboutSection` and `ServicesSection`.
   - Remove their JSX. Keep Hero → Projects → Steps → Contact order.
   - If `SECTION_IDS.ABOUT/SERVICES` is no longer referenced anywhere, drop them from `routes.ts`.

6. **Create `src/_pages/About.tsx`** (multi-block)
   - Outer wrapper: matches the `projects/index.tsx` shell (`max-w-350 mx-auto px-6 pt-12 pb-24 mb-24`, `max-w-6xl` inner).
   - Page heading: large `About.` style title (`text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight`) consistent with `ProjectsPage` and `LearnPage`.
   - Block A — **Intro** (port from current `AboutSection`): Logo + tagline + the four intro paragraphs about being a designer/coder at the intersection of web design and dev. Reuse `Logo` from `../_components/ui/Logo`.
   - Block B — **What I value / How I work**: 3–4 short value statements (typography, performance, accessibility, clarity). Render as a small grid or stacked list with the existing heading scale.
   - Block C — **Toolbox**: a compact list of tools/tech (design + dev). Use simple bordered chips/grid, reuse Tailwind primitives already in use.
   - Block D — **CTA**: a `Button` linking back to `/` contact anchor (`/` + `#contact`) with copy like "Let's build something" — reuses `Button` component.
   - Back link to home: small `Link` to `ROUTES.HOME` for symmetry with detail pages.

7. **Create `src/_pages/Services.tsx`** (multi-block)
   - Same outer shell and page heading style as About (`Services.`).
   - Block A — **Intro**: short framing paragraph.
   - Block B — **Services grid**: port the three service entries currently in `ServicesSection` into a richer layout — for each: title, description, optional image (placeholder OK), bullet list of what's included / deliverables, optional "ideal for" line. Reuse `ServiceCard` from `../_components/ui/cards/ServiceCard` if it fits, otherwise inline JSX.
   - Block C — **Process**: reuse the four `stepsData` entries from `StepsSection` (`We start by talking`, `We put the idea in order`, `We give it a shape`, `I then move on to the code`). Extract `stepsData` to a shared module (e.g. `src/data/steps.ts`) and have both `StepsSection` and `Services` import it. This avoids duplication and keeps one source of truth.
   - Block D — **CTA**: same pattern as About — `Button` to `/` + `#contact`.
   - Back link to home.

8. **Verify visual consistency**
   - Reuse existing primitives only: `Logo`, `Button`, `ServiceCard`, Tailwind utility classes already present (`max-w-350`, `max-w-6xl`, `text-foreground`, `border-foreground`, `bg-primary`).
   - No new global CSS, no new tokens, no new fonts.

9. **Lint + typecheck**
   - Run the project's lint and typecheck (check `package.json` scripts; typical Vite + TS template uses `tsc -b` and `eslint`). If scripts not present, run `npx tsc --noEmit` as a minimum.

## Validation

- Manual: from `/`, click About → URL becomes `/about`, page renders, header still shows Header/Footer.
- Click Services → URL `/services`, page renders.
- From `/about`, click Home logo → returns to `/`.
- From a `/projects/:slug` detail page, clicking About in header navigates to `/about` (not `#about`).
- The old `#about` / `#services` anchors should no longer appear in nav (verifies the kind change).
- Header active-state logic still correctly highlights About when `pathname === "/about"`, Services when `pathname === "/services"`.

## Risks

- **Header active-state regression**: `isNavItemActive` for `route` kind uses `pathname === item.to || pathname.startsWith(item.to + "/")`. `/about` and `/services` are leaf paths — safe, but verify on header that they don't accidentally match sibling paths (they won't).
- **Anchor branch in Header** still uses `pathname === "/"` to choose between `<a>` and `<Link to="/#...">`. With About/Services now route items, the anchor branch only handles Contact — still works. Leave untouched.
- **Duplicate `stepsData`**: extracting to `src/data/steps.ts` is a low-risk refactor since it's a pure data array. Confirm `StepsSection` is the only other consumer before extracting.
- **Removed sections**: if any other component (e.g. Footer, Contact) referenced `SECTION_IDS.ABOUT/SERVICES`, behavior breaks. Grep before deleting the export.

## Out of scope

- Markdown authoring for About/Services (user picked JSX).
- Converting Contact to a dedicated page (still anchor).
- New images / assets for service cards (placeholders OK).
- Scroll restoration behavior on route change (not currently used elsewhere — not adding).

## Files touched

- `src/routes.ts` (edit)
- `src/navigation.ts` (edit)
- `src/App.tsx` (edit)
- `src/_components/layout/Header.tsx` (light edit / verify only)
- `src/_pages/HomePage.tsx` (edit)
- `src/_pages/About.tsx` (new)
- `src/_pages/Services.tsx` (new)
- `src/data/steps.ts` (new, optional but recommended)
- `src/_components/sections/StepsSection.tsx` (edit to import shared data)