# Plan — About & Services detail pages

## Goal

Add dedicated, multi-block detail pages at `/about` and `/services` while keeping `AboutSection` and `ServicesSection` on the home page. Header nav links for About and Services become real routes. Contact nav item and CTAs in `ContactSection` link to WhatsApp.

## Decisions (locked)

- **Routing**: dedicated routes `/about` and `/services`.
- **Content source**: JSX authored in page components (no new markdown, no `src/content/` changes).
- **Scope**: pages are multi-block expansions of the current sections (intro + body blocks + CTA).
- **Home page**: `AboutSection` and `ServicesSection` **stay** on `HomePage`. No removals.
- **Contact**: nav item + CTAs ("So what are we building?", "Start a conversation", email link) all point to WhatsApp. Placeholder URL: `https://wa.me/PLACEHOLDER` — user must replace `PLACEHOLDER` with their number.
- **Navigation types**: add `external` kind for WhatsApp link. Anchor kind stays for any future in-page scrolls.

## Affected boundaries

- `src/routes.ts` — add `ROUTES.ABOUT`, `ROUTES.SERVICES`, `getAboutPath()`, `getServicesPath()`.
- `src/navigation.ts` — About/Services → `route` kind. Contact → `external` kind with WhatsApp href. Add `ExternalNavItem` type.
- `src/App.tsx` — register `/about` and `/services` routes.
- `src/_components/layout/Header.tsx` — handle new `external` kind (renders `<a>`). Existing `route`/`anchor` branches stay.
- `src/_pages/HomePage.tsx` — no change (sections stay).
- New: `src/_pages/About.tsx`, `src/_pages/Services.tsx`.
- New: `src/data/steps.ts` — extract `stepsData` from `StepsSection` for reuse in `Services` page.
- Edit: `src/_components/sections/ContactSection.tsx` — replace email link + "Start a Conversation" button href/target with WhatsApp. Add WhatsApp href to icon link.
- Edit: `src/_components/sections/StepsSection.tsx` — import `stepsData` from shared module.

## Plan file location

`/home/rahimdev/projects/rahim-design/.kilo/plans/1788362168250-about-services-pages.md`

## Ordered tasks

1. **Add routes + helpers in `src/routes.ts`**
   - `ROUTES.ABOUT = "/about"`, `ROUTES.SERVICES = "/services"`.
   - Add `getAboutPath()` and `getServicesPath()` helpers.
   - Keep `SECTION_IDS` as-is (still used by `AboutSection`, `ServicesSection`, `ContactSection` on home page).

2. **Update `src/navigation.ts`**
   - Add `ExternalNavItem` type: `{ label: string; kind: "external"; href: string }`.
   - Update `NavItem` union to include `ExternalNavItem`.
   - Change About: `{ label: "About", kind: "route", to: ROUTES.ABOUT }`.
   - Change Services: `{ label: "Services", kind: "route", to: ROUTES.SERVICES }`.
   - Change Contact: `{ label: "Contact", kind: "external", href: "https://wa.me/PLACEHOLDER" }`.

3. **Wire routes in `src/App.tsx`**
   - Import `About` and `Services`.
   - Add `{ path: ROUTES.ABOUT, element: <About /> }` and `{ path: ROUTES.SERVICES, element: <Services /> }` under `MainLayout`.

4. **Update `Header.tsx` for external links**
   - Add an `external` branch: renders `<a href={link.href} target="_blank" rel="noopener noreferrer">`.
   - Existing `route` and `anchor` branches unchanged.
   - `isNavItemActive` does not apply to `external` kind.

5. **Create `src/data/steps.ts`**
   - Extract `stepsData` array (type `Step` included) from `StepsSection.tsx`.
   - Export `stepsData` and `Step` type.

6. **Update `StepsSection.tsx`**
   - Import `stepsData` and `Step` from `../../data/steps`.
   - Remove inline `stepsData` and `Step` definitions.

7. **Update `ContactSection.tsx`**
   - Replace email `<a href="#">` with WhatsApp `<a href="https://wa.me/PLACEHOLDER" target="_blank" rel="noopener noreferrer">`.
   - Wrap "Start a Conversation" `Button` in `<a>` (or add `onClick` that opens WhatsApp) — recommended: render `<a href="https://wa.me/PLACEHOLDER" target="_blank" rel="noopener noreferrer">` wrapping the `Button`, with `relative inline-block` wrapper.
   - Make `WhatsappIcon` a link to WhatsApp.

8. **Create `src/_pages/About.tsx`** (multi-block, home sections stay)
   - Outer shell: `max-w-350 mx-auto px-6 pt-12 pb-24 mb-24`, inner `max-w-6xl`.
   - Heading: `text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight` — "About." (matches Projects/Learn style).
   - Block A — **Intro**: port from current `AboutSection` (Logo + tagline + 4 paragraphs).
   - Block B — **Values**: 3–4 short value statements (typography, performance, accessibility, clarity).
   - Block C — **Toolbox**: compact list of tools/tech as bordered chips/grid.
   - Block D — **CTA**: `Button` linking to `/` + `#contact` with copy like "Let's build something".
   - Back link: small `Link` to `ROUTES.HOME`.

9. **Create `src/_pages/Services.tsx`** (multi-block)
   - Same shell + heading style ("Services.").
   - Block A — **Intro**: short framing paragraph.
   - Block B — **Services grid**: three service entries with title, description, bullets/deliverables, "ideal for" line. Reuse `ServiceCard`.
   - Block C — **Process**: import `stepsData` from `../../data/steps`, render 4 steps (reuse `StepCard`).
   - Block D — **CTA**: `Button` to `/` + `#contact`.
   - Back link to home.

10. **Lint + typecheck**
    - Run project lint/typecheck (`npx tsc --noEmit`, `npm run lint` or equivalent).

## Validation

- `/about` renders multi-block page, `/services` renders multi-block page.
- Home page still shows `AboutSection` and `ServicesSection` (not removed).
- Header About/Services are `<Link>` to `/about` and `/services`.
- Header Contact is `<a>` opening WhatsApp in new tab.
- From `/about` or `/services`, clicking Home logo returns to `/`.
- `ContactSection` "Start a Conversation" button and email link open WhatsApp.
- Header active-state highlights About on `/about`, Services on `/services`.

## Risks

- **Header active-state for `external`**: `isNavItemActive` currently only handles `route` and `anchor`. Contact is `external`, so it should never match `isActive`. Verify it doesn't get `bg-primary` unexpectedly. If it does, extend `isNavItemActive` to return `false` for `external`.
- **WhatsApp placeholder**: developer must replace `PLACEHOLDER` in `navigation.ts` and `ContactSection.tsx` with actual phone number before deploy.
- **StepsSection refactor**: pure data extraction, low risk. Only consumer is `StepsSection` (and new `Services` page).

## Out of scope

- Markdown authoring for About/Services.
- Converting Projects/Learn/Contact to dedicated pages.
- New images/assets for service cards (placeholders OK).
- Scroll restoration on route change.

## Files touched

- `src/routes.ts` (edit)
- `src/navigation.ts` (edit)
- `src/App.tsx` (edit)
- `src/_components/layout/Header.tsx` (edit — add `external` branch)
- `src/_pages/HomePage.tsx` (no change — sections stay)
- `src/_pages/About.tsx` (new)
- `src/_pages/Services.tsx` (new)
- `src/data/steps.ts` (new)
- `src/_components/sections/StepsSection.tsx` (edit to import shared data)
- `src/_components/sections/ContactSection.tsx` (edit — WhatsApp links)
