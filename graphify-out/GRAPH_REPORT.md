# Graph Report - rahim-design  (2026-09-07)

## Corpus Check
- 85 files · ~419,977 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 348 nodes · 530 edges · 32 communities (12 shown, 20 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b71348c9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- content.ts
- projects/index.tsx
- routes.ts
- App.tsx
- 4. Modifications proposées par fichier
- index.ts
- compilerOptions
- compilerOptions
- devDependencies
- Header.tsx
- About.tsx
- Lie #1: Everything Matters Equally
- 48-laws-of-power.md
- atomic-habits.md
- dopamine-nation.md
- ego-is-the-enemy.md
- same-as-ever.md
- notes-animation-ui.md
- notes-couleur-accessibilite.md
- tsconfig.json
- README.md
- ahoe.md
- atelier.md
- forma.md
- harbor.md
- kinetic.md
- lovance.md
- nova-studio.md
- orbit.md
- pulse.md
- twocoderz.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `IconProps` - 16 edges
3. `compilerOptions` - 15 edges
4. `react-router-dom` - 10 edges
5. `4. Modifications proposées par fichier` - 10 edges
6. `react` - 8 edges
7. `learnEntries()` - 8 edges
8. `ROUTES` - 8 edges
9. `Plan d'audit et de correction des espacements` - 8 edges
10. `projectEntries()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `ProjectsSection()` --calls--> `getProjectPath()`  [EXTRACTED]
  src/_components/sections/ProjectsSection.tsx → src/routes.ts
- `AllProjectCardProps` --references--> `ProjectCategory`  [EXTRACTED]
  src/_components/ui/cards/AllProjectCard.tsx → src/lib/content.ts
- `LearnArticle()` --calls--> `getLearnArticle()`  [EXTRACTED]
  src/_pages/learn/[slug].tsx → src/lib/content.ts
- `LearnPage()` --calls--> `getLearnPath()`  [EXTRACTED]
  src/_pages/learn/index.tsx → src/routes.ts
- `LearnPage()` --calls--> `isLearnType()`  [EXTRACTED]
  src/_pages/learn/index.tsx → src/routes.ts

## Import Cycles
- None detected.

## Communities (32 total, 20 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.05
Nodes (36): dependencies, gsap, @gsap/react, react, react-dom, react-markdown, react-router-dom, remark-gfm (+28 more)

### Community 1 - "content.ts"
Cohesion: 0.09
Nodes (30): react-markdown, remark-gfm, AsteriskIcon(), OpenLinkIcon(), ContentImages(), ContentImagesProps, Markdown(), MarkdownImpl (+22 more)

### Community 2 - "projects/index.tsx"
Cohesion: 0.10
Nodes (22): react, ChevronRightIcon(), HeroSection(), ProjectsSection(), Button(), ButtonProps, AllProjectCard(), AllProjectCardProps (+14 more)

### Community 3 - "routes.ts"
Cohesion: 0.09
Nodes (24): GithubIcon(), InstagramIcon(), LinkedinIcon(), WhatsappIcon(), ContactSection(), LearnCard(), LearnCardProps, AnchorNavItem (+16 more)

### Community 4 - "App.tsx"
Cohesion: 0.11
Nodes (18): App(), router, ArrowLeftIcon(), MainLayout(), AboutSection(), Service, services, ServicesSection() (+10 more)

### Community 5 - "4. Modifications proposées par fichier"
Cohesion: 0.08
Nodes (23): 1. Contexte et structure du projet, 2.1 Espacement vertical excessif en haut des sections (Hero, About, Contact), 2.2 Écart titre → contenu trop important (Services, Projects, Steps), 2.3 Incohérence du padding horizontal entre sections, 2.4 Absence d'espace explicite entre logo et titre (About), 2.5 Footer trop comprimé, 2.6 Écart numéro → carte un peu large (StepCard), 2. Problèmes de spacing identifiés (+15 more)

### Community 7 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 8 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 9 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, tailwindcss, @tailwindcss/vite (+7 more)

### Community 10 - "Header.tsx"
Cohesion: 0.23
Nodes (10): react-router-dom, ArrowDownIcon(), CloseIcon(), MenuIcon(), Footer(), Header(), isNavItemActive(), Logo() (+2 more)

### Community 11 - "About.tsx"
Cohesion: 0.27
Nodes (6): KnowMeCard(), KnowMeCardProps, PieChart(), KnowMe, knowmeData, AboutPage()

### Community 12 - "Lie #1: Everything Matters Equally"
Cohesion: 0.33
Nodes (5): Core Philosophy: The Power of Going Small, From To-Do Lists to Success Lists, Key Principles, Lie #1: Everything Matters Equally, Taking Pareto to the Extreme (Extreme Pareto)

## Knowledge Gaps
- **144 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+139 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 168 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-router-dom` connect `Header.tsx` to `package.json`, `content.ts`, `projects/index.tsx`, `routes.ts`, `App.tsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `react` connect `projects/index.tsx` to `package.json`, `content.ts`, `App.tsx`, `index.ts`, `Header.tsx`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _144 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05426356589147287 - nodes in this community are weakly interconnected._
- **Should `content.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08658536585365853 - nodes in this community are weakly interconnected._
- **Should `projects/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1032258064516129 - nodes in this community are weakly interconnected._