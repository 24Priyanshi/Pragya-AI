# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (Turbopack, port 3000; falls back to the next free port if taken).
- `npm run build` / `npm run start` — production build / serve.
- `npm run lint` — ESLint (flat config, `eslint-config-next`). Run on specific paths with `npx eslint <path>`.
- `npx tsc --noEmit` — typecheck (no separate `typecheck` script exists). On a large batch of changes this needs a bigger heap: `NODE_OPTIONS="--max-old-space-size=4096" npx tsc --noEmit`.
- `npm run sync:densewalk` — regenerates DenseWalk feed data from source clips (`scripts/sync-densewalk.mjs`).
- `npm run fix:mosaics` — re-encodes mosaic assets (`scripts/reencode-mosaics.mjs`).
- There is no test suite/framework in this repo (no Jest/Vitest/Playwright config or script) — don't assume one exists.
- Prettier is configured (`.prettierrc`) but not wired to a script; formatting is otherwise enforced through ESLint.

## Architecture

**This is a pixel-faithful Next.js/React/Tailwind port of an original static HTML/JS/CSS site**, not a from-scratch build. The original lived as `pages/*.html` + `js/*.js` + hand-written CSS; every page here is a line-by-line translation of one of those files into a React component plus a typed data file. This is the single most important thing to know before touching any file:

- **Bugs and quirks from the original are deliberately preserved**, not accidental. They're tagged inline as `BUG-N` (a rendering/content bug) or `IB-N` (an interaction bug) in comments at the point they're reproduced — e.g. BUG-11 (the six nav buttons only open their submenu and never navigate), BUG-4 (`data-alt` instead of `alt` on some images), BUG-7 (lowercase `viewbox` breaking SVG scaling), BUG-14 (a `w-screen` hero trick that introduces a horizontal scrollbar on sub-pages only), BUG-21 (dead `lh3.googleusercontent.com` image URLs). **Do not "fix" one of these unless explicitly asked** — grep the codebase for the `BUG-`/`IB-` prefix before assuming something is broken.
- Where a page *has* been deliberately changed from the original, that's called out in a comment with the date and reason (e.g. "changed on request (2026-08-28)"). New intentional deviations should follow the same convention: comment + date + why, so the line between "ported bug" and "later redesign" stays legible.
- `tailwind.config.ts` is a verbatim port of the original's runtime Tailwind config (custom Material-esque color tokens like `surface`, `primary`, `on-surface-variant`, etc.) — don't round these to the nearest default Tailwind color/spacing scale.
- The global CSS cascade order is load-bearing and mirrors the original `<head>` exactly (see `SiteShell`): `styles/fonts.css` → `app/globals.css` (Tailwind) → `styles/design-system.css` (verbatim original stylesheet, wins ties) → `styles/overrides.css` (the one intentional addition, a +7% type scale).

**Two independent root layouts, no shared top-level `app/layout.tsx`.** `src/app/(landing)/layout.tsx` (route `/`) and `src/app/(site)/layout.tsx` (the six/seven sub-pages) each render their own `<html>`/`<body>` via the shared `SiteShell` component, because the original's `<body>` class differed between the landing page and sub-pages (different selection colors, and only the landing page sets `overflow-x-hidden`). `SiteShell` also mounts `Navbar` and `Footer` around `children`.

**Data-driven page pattern.** Nearly every sub-page follows the same shape: a typed content file in `src/data/<page>.ts` (hero spec, stats, prose blocks, chart specs, etc., all `as const`) is imported by `src/app/(site)/<page>/page.tsx` and rendered through shared presentational components — `PageShell` (main wrapper, reads `--nav-height` for top padding), `PageHero` (image hero; `mode: "fill"` vs `"auto"`, optional scrim/CTA overlay), `SectionRule` (label + hairline divider), `StatStrip`, `RawInputGrid`, `ProcessedResults`, `AnalysisCharts` (bar/line), `Contributors`. New pages should extend an existing data-file shape (`src/types/page.ts`) rather than inventing a one-off layout, unless the page is intentionally departing from the ported-site pattern (as PragyaVLA and PragyaDex now do — see below).

**PragyaVLA and PragyaDex have diverged from the ported-page pattern** into their own bespoke layouts (`PragyaVlaTabs`, hero → "The Problem" pull-quote → "Dataset" gallery, no bottom `Contributors`). Treat these two as living, actively-redesigned pages rather than frozen ports — check their current `page.tsx` rather than assuming they still match the StatStrip/RawInputGrid/ProcessedResults shape every other sub-page uses.

**Navbar is entirely config-driven** from `src/config/nav.ts`: `navLinks` (the project tabs), `submenuConfig` (per-project mega-menu: three Q&A rows + a featured card with an image), `navIcons`, and `contributorsLink` (styled separately from the project tabs). The submenu open/close state machine lives in `useSubmenu` — it supports both click-to-toggle (the original behavior) and hover-open/hover-close-with-grace-period (added later), so a submenu can be triggered either way; don't remove one path when touching the other.

**Some galleries stream media from an external host instead of storing it in the repo.** `PragyaDexGallery` and `MotionLangGallery` pull video files directly from public dataset URLs (e.g. a HuggingFace `resolve/main/...` path) rather than checking media into `public/`, and lazy-load with an `IntersectionObserver` that sets `src` and calls `.play()` only once a card scrolls into view (see `GalleryVideo` / `MotionLangVideo`). Follow this pattern for any new large media gallery rather than committing video assets.

**Path alias:** `@/*` → `src/*` (see `tsconfig.json`).
