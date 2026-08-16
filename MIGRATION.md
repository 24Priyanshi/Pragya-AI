# MIGRATION.md — Pragya AI static site → Next.js App Router

**Source (READ-ONLY):** `../pragyaai.github.io/pragya_ai`
**Target:** `pragya_ai-next` (this folder)

> This project was moved out of `pragyaai.github.io/` on 2026-08-16 so it can be
> versioned and modified independently of that Jekyll repo. Paths below that mention
> `pragyaai.github.io/...` refer to the source repo, now a sibling directory.
**Status:** Phase 1 — inventory complete, awaiting your confirmation before any conversion.

> The source folder has been read only. A SHA-256 baseline of all 40 source files was taken
> before any work began and is stored at `verification/original-baseline.sha256`; it will be
> re-verified at the end of Phase 6.

---

## 1. Source file inventory (40 files)

| Path | Type | Role |
|---|---|---|
| `index.html` | page | Root redirect → `pages/landing.html` (meta refresh + JS `location.replace`) |
| `pages/landing.html` | page | Home / marketing landing |
| `pages/denseworld.html` | page | DENSEWORLD research page |
| `pages/densewalk.html` | page | DENSEWALK research page |
| `pages/factorjepa.html` | page | FactorJEPA research page |
| `pages/pragyavla.html` | page | PragyaVLA research page |
| `pages/kalamprotocol.html` | page | Kalam Protocol research page |
| `pages/kalarisena.html` | page | KalariSena research page |
| `css/design-system.css` | style | The **only** stylesheet. 1301 lines, 20 numbered sections |
| `js/tailwind-config.js` | script | `tailwind.config` object consumed by the Tailwind **CDN** at runtime |
| `js/main.js` | script | Scroll reveal, nav height var, scroll state, anchor scroll, (dead) mobile menu |
| `js/navbar.js` | script | Injects entire navbar + mega-submenu system into `#site-navbar` |
| `js/footer.js` | script | Injects footer into `#site-footer` |
| `js/denseworld-grid.js` | script | Builds the city-video grids + taxonomy grid on the DENSEWORLD page |
| `DESIGN.md` | doc | Design-system prose ("The Spatial Academic"). Not shipped to the browser |
| `public/*.png`, `*.jpg`, `*.svg` | asset | 20 images (see §9) |
| `public/videos/denseWorld/delhi/walk_0{1..4}.mp4` | asset | 4 videos |

---

## 2. Routes

The original is served as a sub-folder of a Jekyll site. Every page lives under `/pages/*.html`
and `index.html` only exists to redirect.

| Original URL | Proposed Next route | Notes |
|---|---|---|
| `/index.html` | `/` | Redirect collapses: `/` **is** the landing page |
| `/pages/landing.html` | `/` | |
| `/pages/denseworld.html` | `/denseworld` | |
| `/pages/densewalk.html` | `/densewalk` | |
| `/pages/factorjepa.html` | `/factorjepa` | |
| `/pages/pragyavla.html` | `/pragyavla` | |
| `/pages/kalamprotocol.html` | `/kalamprotocol` | |
| `/pages/kalarisena.html` | `/kalarisena` | |

**Decision needed — see §11 Q2.** Alternative: keep literal `/pages/<name>` paths for URL parity.

---

## 3. Global styles

Everything comes from **two** sources, in this cascade order:

1. **Tailwind Play CDN** `https://cdn.tailwindcss.com?plugins=forms,container-queries`
   — includes Preflight, JIT-compiles classes found in the DOM at runtime (including markup
   injected later by `navbar.js` / `footer.js` / `denseworld-grid.js` via a MutationObserver).
2. **`js/tailwind-config.js`** — `darkMode: "class"`, custom `colors` (44 tokens), `fontFamily`
   (`headline`/`body`/`label`), and an **overridden `borderRadius` scale**
   (`DEFAULT/sm: .125rem`, `md: .25rem`, `lg: .5rem`, `xl: .75rem`, `full: 9999px`).
3. **`css/design-system.css`** — CSS custom properties + hand-written component classes.

### 3.1 Design tokens (`:root` in design-system.css)

Colours (all also mirrored into the Tailwind config):

```
surface #FAF8F7   surface-bright #FAF8F7   surface-container-lowest #FFFFFF
surface-container-low #F9F7F6   surface-container #F3F0ED
surface-container-high #ECE8E5  surface-container-highest #E5E0DB
surface-dim #D9D4CE   surface-variant #E5E0DB   surface-tint #481B4C
background #FAF8F7
primary #481B4C   primary-container #6A3A6B   primary-fixed #F5E6D3
primary-fixed-dim #E6D4BA   inverse-primary #F5E6D3
on-primary #F5E6D3   on-primary-container #F5E6D3
on-primary-fixed #2D1533   on-primary-fixed-variant #5A2D5F
secondary #6A4A5C   secondary-container #E6D4C8   secondary-fixed #E6D4C8
secondary-fixed-dim #D0BEAF   on-secondary #F5E6D3   on-secondary-container #522D47
on-secondary-fixed #1C1B1B   on-secondary-fixed-variant #574657
tertiary #5A4A6B   tertiary-container #7A6A8B   tertiary-fixed #EAD5ED
tertiary-fixed-dim #D0BDD5   on-tertiary #F5E6D3   on-tertiary-container #E3D3E8
on-tertiary-fixed #1A1C1E    on-tertiary-fixed-variant #5A4A6B
on-surface #2D1533   on-surface-variant #5A5159   on-background #2D1533
inverse-surface #3D2844   inverse-on-surface #F5E6D3
outline #8A7A92   outline-variant #D9CDE5
error #BA1A1A  error-container #FFDAD6  on-error #FFFFFF  on-error-container #93000A
```

Type scale: `display-lg 3.5rem`, `display-md 2.75rem`, `display-sm 2.25rem`,
`headline-lg 1.75rem`, `headline-md 1.375rem`, `headline-sm 1.125rem`,
`body-lg 1rem`, `body-md .875rem`, `body-sm .75rem`, `label-lg .75rem`, `label-sm .6875rem`.

Spacing: `1 .25rem`, `2 .5rem`, `3 .75rem`, `4 1rem`, `6 1.5rem`, **`8 2.75rem`**,
`10 3.5rem`, `12 4.5rem`, `16 6rem`, `20 8rem`, `24 10rem` (note: **not** the Tailwind scale —
these are only used by the `ds-*` classes).

Radius: `xs .125rem`, `sm .25rem`, `md .375rem`, `lg .5rem`, `full 9999px`.
Shadow: `--shadow-ambient: 0 0 40px 0 rgba(45,21,51,.08)`; `--ghost-border: rgba(72,27,76,.15)`.
Glass: `--glass-bg: rgba(245,230,211,.7)`, `--glass-blur: 20px`.
Transitions: `--transition-base: all .2s ease`, `--transition-slow: all .4s ease`,
`--transition-color: color .2s ease, background-color .2s ease, border-color .2s ease`.

### 3.2 Base / body

```css
html { -webkit-text-size-adjust:100%; scroll-behavior: smooth; }
body { margin:0; background: var(--surface); color: var(--on-surface);
       font-family: var(--font-body); font-weight:300; line-height:1.6;
       cursor: crosshair;                      /* ← site-wide crosshair cursor */
       -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
```

### 3.3 Sections of `design-system.css` and whether they are actually used

| § | Contents | Used? |
|---|---|---|
| 1 | Tokens | ✅ |
| 2 | Reset/base | ✅ |
| 3 | `.ds-display-*`, `.ds-headline-*`, `.ds-body-*`, `.ds-label-*`, `.ds-text-gradient` | ❌ unused |
| 4 | `.material-symbols-outlined` (FILL 0, wght 200, GRAD 0, opsz 24) | ✅ |
| 5 | `.ds-glass-nav`, `.ds-glass-panel` | ❌ |
| 6 | `.ds-btn-*` (primary/secondary/tertiary/dark) | ❌ |
| 7 | `.ds-card*` | ❌ |
| 8 | `.ds-input*` | ❌ |
| 9 | Keyframes `ds-fadeUp`/`ds-fadeIn`/`ds-slideRight`, `.ds-reveal`, `.ds-stagger`, legacy `fadeUp` + `.reveal` | `.reveal` + `fadeUp` ✅ (landing only); rest ❌ |
| 10 | `.ds-nav`, `.site-navbar*` | ❌ — the injected navbar does **not** use these class names (see BUG-3) |
| 11 | `.ds-data-veil` | ❌ |
| 12 | `.ds-divider`, `.ds-section-*` | ❌ |
| 13 | `.ds-accent-bar`, `.ds-section-index`, `.ds-badge*`, `.ds-dot*`, `ds-pulse` | ❌ |
| 14 | `.ds-container`, `.ds-asymmetric` | ❌ |
| 15 | `.ds-footer`, `.site-footer*` | ❌ — injected footer uses Tailwind classes instead |
| 16 | `.ds-no-scrollbar`, `.ds-scale-active`, `.ds-ghost-border`, `.ds-tonal-hover` | ❌ |
| 17 | `a { color:inherit; text-decoration:none; transition:var(--transition-color) }`, `.ds-link` | `a{}` ✅ |
| 18 | Legacy `.glass-nav`, `.glass-panel`, `.tonal-transition`, `.no-border`, `.scale-98`, `.text-spectral-gradient`, `.protocol-border`, `.no-scrollbar` | ❌ |
| 19 | `.plus-jakarta-sans`, `.inter` | ✅ heavily |
| 20 | Full submenu system (`#submenu-backdrop`, `#submenu-container`, `#submenu-content`, `.submenu-*`) incl. 1024px & 640px media queries | ✅ |

**Roughly 70% of `design-system.css` is dead code.** It will be ported **verbatim** anyway so
that nothing that *is* live changes by accident — see §11 Q3 if you would rather prune it.

### 3.4 Breakpoints

Tailwind defaults: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.
`max-w-screen-2xl` = 1536px. Page shells use `max-w-[1920px]`.
Hand-written media queries in `design-system.css`: `max-width:768`, `max-width:1024`,
`max-width:640`, `min-width:768`.

---

## 4. Fonts & icons

All three come from one Google Fonts `<link>` (with `preconnect` to `fonts.googleapis.com`
and `fonts.gstatic.com`), `display=swap`:

| Family | Weights / axes | Usage |
|---|---|---|
| **Plus Jakarta Sans** | 200, 300, 400, 500, 600, 700 + italic 300 | headings (`font-headline`, `.plus-jakarta-sans`) |
| **Inter** | 300, 400, 500, 600, 700 | body/labels (`font-body`, `font-label`, `.inter`) |
| **Material Symbols Outlined** | variable `wght 100..700`, `FILL 0..1` | icons |

Icon glyphs actually used (ligature names): `arrow_outward`, `info`, `insights`, `rocket_launch`.

`--font-mono: "JetBrains Mono","Fira Code", monospace` is declared but **never loaded** — the
`font-mono` Tailwind utility used on the FactorJEPA/PragyaVLA/Kalam/Kalari terminal blocks
resolves to Tailwind's default mono stack (`ui-monospace, SFMono-Regular, …`), not JetBrains.

---

## 5. External CDN / third-party

| Resource | Where | Migration plan |
|---|---|---|
| `cdn.tailwindcss.com?plugins=forms,container-queries` | all 7 pages | Replace with a **build-time** Tailwind v3.4 + `@tailwindcss/forms` + `@tailwindcss/container-queries`, same config → **needs your confirmation, §11 Q1** |
| `fonts.googleapis.com` / `fonts.gstatic.com` | all 7 pages | `next/font/google` (self-hosted, identical files) |
| `lh3.googleusercontent.com` (**14** distinct images) | landing (2), factorjepa (3), pragyavla (3), kalamprotocol (3), kalarisena (3) | **All 14 are dead — HTTP 404.** See BUG-21 and §11.2 |
| `kapilw25.github.io/factorjepa/` | landing, "FactorJEPA → Know More" | Plain outbound link, no `target="_blank"` |

There are **no** other third-party scripts, no analytics, no forms, no API calls.

---

## 6. Shared UI blocks

### 6.1 Navbar (`js/navbar.js`, mounted into `#site-navbar` on all 7 pages)

- `<nav class="fixed top-0 w-full z-50 bg-surface-container-lowest/70 backdrop-blur-md">`
- Inner: `flex justify-between items-center px-12 py-6 max-w-screen-2xl mx-auto`
- **Left:** logo link → landing; `<img class="h-9 md:h-10 w-auto object-contain" src="public/violate_nobg.png" alt="Pragya AI">`, `aria-label="Pragya AI Home"`
- **Centre (`hidden md:flex`, `gap-10`, Plus Jakarta Sans, `font-light tracking-tight text-base`):**
  six `<button>` elements — DENSEWORLD, FactorJEPA, PragyaVLA, DENSEWALK, KalamProtocol, KalariSena
  - active: `text-on-surface font-medium border-b border-outline-variant/20`
  - inactive: `text-on-surface-variant hover:text-on-surface transition-opacity duration-300`
- **Right:** "Get in Touch" `<a>` → `bg-on-surface text-inverse-on-surface px-5 py-2.5 text-[10px] tracking-widest hover:opacity-80 transition-all active:scale-95 duration-200 uppercase font-medium`
- Measured height: **84px** mobile, **88px** ≥768px (published as `--nav-height`)

### 6.2 Mega-submenu (part of `navbar.js` + §20 of the CSS)

Per-page config for all six products, each with `title`, three Q&A rows
("What is it?" / "What's the necessity?" / "What's the Leap?" with icons `info` / `insights` /
`rocket_launch`), and a `featuredCard` (`title`, `description`, `href`, `image`).

Rendered layout: `#submenu-content` is `grid-template-columns: 2fr 1fr; gap:1.25rem;
padding:1.5rem; min-height:340px; border-radius:1rem; box-shadow: var(--shadow-ambient);
background: #FFF`. Left = the three static Q&A cards; right = the featured card
(`min-height:350px`, background image with a `rgba(0,0,0,.35)` double-stop overlay on black).

### 6.3 Footer — **two different footers exist**

| | Landing | The other 6 pages |
|---|---|---|
| Source | inline in `landing.html` | injected by `js/footer.js` |
| Top border | `border-surface-container-high` | `border-outline-variant/30` |
| Background | `bg-surface-container-low` | `bg-surface-container-low` |
| Link gap | `gap-10` | `space-x-12` |
| Text colour | `text-on-surface-variant` | `text-outline` |
| Copy | `© 2024 Pragya AI Research Lab. All rights reserved.` | identical |
| Links | Publications / Ethics / Team / Contact, all `href="#"` | identical |

This divergence is preserved exactly. See BUG-8.

### 6.4 Repeated section blocks (identical markup across pages)

| Block | Appears on | Notes |
|---|---|---|
| **Stat strip** — `grid md:grid-cols-4 gap-1`, four cards `bg-surface-container-lowest p-12 border-l-2 border-primary group hover:bg-primary transition-colors duration-500` | denseworld, densewalk, factorjepa, pragyavla, kalamprotocol, kalarisena | label / big number (`text-5xl font-light tracking-tighter`) / caption |
| **"01. RAW INPUT DATA"** — 3 × `aspect-video` image cards | factorjepa, pragyavla, kalamprotocol, kalarisena | see BUG-5 |
| **"02. PROCESSED RESULTS"** — 3 × terminal-style cards (`bg-on-surface`, `font-mono text-[10px] text-primary-fixed`) | factorjepa, pragyavla, kalamprotocol, kalarisena | 5 `> key: value` lines each |
| **Analysis 01 / 02** — `mt-48 grid md:grid-cols-2 gap-24`; left = inline SVG line chart, right = 3-bar chart | all 6 sub-pages | per-page paths/labels/heights |
| **Contributors** — 4 × `article` cards, `hover:scale-[1.02]` | all 6 sub-pages | byte-identical markup on all six |
| **Section rule** — `<span>` label + `<div class="h-px grow bg-outline-variant/10">` | all 6 sub-pages | `grow` on some, `flex-grow` on others (equivalent) |

Contributors data (identical everywhere):

1. **Amitava Das** — `../../assets/img/team/amitava.png` — "Professor, BITS Goa | Former Research Associate Professor, AIISC, USA"
2. **Aman Chadha** — `aman.jpeg` — "GenAI Leadership @ AWS | Stanford AI | Ex-Amazon Alexa, Nvidia, Qualcomm | EB-1 "Einstein Visa" Recipient | EMNLP 2023 Outstanding Paper Award"
3. **Vasu Sharma** — `vasu.jpeg` — "Applied Research Scientist Lead at Facebook AI Research | 6k+ citations | Ex-Citadel | CMU | IIT Kanpur | Startup Advisor & Mentor | Angel Investor | EB1A green card recipient"
4. **Vinija Jain** — `vinija.jpeg` — "AI @ Meta | Ex-Amazon, Oracle, PANW | Stanford AI | EMNLP Outstanding Paper Award Recipient"

⚠️ These four images live **outside** the read-only folder, at
`pragyaai.github.io/assets/img/team/`. See BUG-1 and §11 Q5.

---

## 7. Per-page section inventory

### 7.0 `index.html`
Head-only redirect: `<meta http-equiv="refresh" content="0; url=./pages/landing.html">` **and**
an inline script doing `window.location.replace(basePath + "pages/landing.html")`.
Body: `<p>Redirecting to <a>landing page</a>...</p>`. Title `Pragya AI`.

### 7.1 `landing.html` — title `Pragya AI - Embodied AI Lab`
`<body class="bg-background text-on-surface font-body selection:bg-surface-container-low selection:text-on-surface overflow-x-hidden" data-mode="connect">`

1. **Hero** — `relative min-h-screen flex items-center pt-24 overflow-hidden bg-surface-container-lowest reveal opacity-0`
   - Layer A: dot grid — `bg-[radial-gradient(#e5e0db_1px,transparent_1px)] [background-size:40px_40px] opacity-20`
   - Layer B: `opacity-40` wrapper → `bg-surface-container-low border-l border-surface-container-high` → `hero.png` (`object-cover mix-blend-multiply transition-all duration-1000`) → left-to-right gradient overlay at `opacity-20`
   - `<h1 class="text-[4rem] md:text-[6.5rem] font-extralight font-headline leading-[0.95] tracking-tighter">India's Sovereign<br><b>Embodied AI</b></h1>`
   - Lead paragraph `text-lg md:text-xl font-light text-on-surface-variant max-w-3xl leading-relaxed` with 7 inline `<span class="… text-[--primary]">` highlights
2. **Core Protocols** `#protocols` — `py-32 reveal opacity-0`; a 6-row `space-y-px bg-surface-container border border-surface-container-high` stack. Each row `grid md:grid-cols-12`, alternating text(7)/image(5) then image(5)/text(7):
   Dense World → `denseworld.html`; FactorJEPA → external; PragyaVLA → `#`; DenseWalk → `densewalk.html`; Kalam Protocol → `#`; KalariSena → `#`.
   Images `min-h-[400px] object-cover transition-transform duration-500 ease-out hover:scale-105`.
   Copy is dense `<b><i>…</i></b>`-marked prose; "Know More" link is `text-[10px] font-bold uppercase tracking-widest … gap-2 group-hover:gap-4 transition-all` + `arrow_outward`.
3. **The Evidence** — `py-32 bg-surface-container-low reveal opacity-0`; label + `text-5xl font-extralight` heading + intro; then a 2-up `gap-px` grid. Each half shows two `aspect-[4/3]` tiles (raw `grayscale opacity-80` / processed `brightness-150 contrast-125 saturate-0 opacity-40` on `bg-on-surface`) with absolute-positioned corner badges, plus a caption pair.
   - Left: "Urban Occlusion Benchmarks" / Right: "Zero-Shot Locomotion Transfer"
4. **Footer** — inline variant (§6.3). **No `#site-footer`, `footer.js` is not loaded here.**

Scripts: `navbar.js`, `main.js`.

### 7.2 `denseworld.html` — title `Dense World | Pragya AI`
Shell: `<main class="pb-24 px-12 max-w-[1920px] mx-auto" style="padding-top: var(--nav-height, 84px)">`

1. **Hero** — full-bleed (`left-1/2 w-screen -translate-x-1/2`), `h-[calc(100vh-var(--nav-height,84px))]`, `denseworld_hero.png` `object-cover object-center`, `mb-32`
2. **Stat strip** — 115k+ / 22 / 300 hr+ / 15 Fields
3. **Tier 1 Cities** — "- 6 metros, 68k+ clips", `#tier1-city-grid`
4. **Tier 2 Cities** — "- 15 cities, 40k+ clips", `#tier2-city-grid`
5. **Full Taxonomy Coverage** — "- 15 fields, 65+ values, v3 structured tags", `#taxonomy-grid`
6. **Analysis 01** — SVG `M0,130 Q95,122 200,86 T400,28`, labels `T: 0 / T: 8 / T: 16`, badge "Congestion Recovery Curve"
7. **Analysis 02** — bars 61% / 89% / 74% — Baseline / **Dense World** / UrbanNet, badge "Density Adaptation Index"
8. **Contributors**

Scripts: `navbar.js`, `footer.js`, `denseworld-grid.js`, `main.js`.

### 7.3 `densewalk.html` — title `DenseWalk | Pragya AI`
1. Full-bleed 100vh hero — `denseWalk_hero.png`
2. Stat strip — 200h / 5+ / 5 / X / Y / Z
3. **Three prose blocks** (`space-y-32`, each `bg-surface-container-lowest border border-outline-variant/10 p-8 md:p-12`):
   `01. Problem Regime` (1 ¶), `02. Data + Supervision Pipeline` (2 ¶), `03. Benchmark + Evaluation` (3 ¶)
4. Analysis 01 — `M0,130 Q100,122 200,84 T400,24`, labels BASELINE / DENSEWALK / OPENVLA+, badge "Safety-Weighted Task Success". **Overlay uses `bg-linear-to-br` → see BUG-6**
5. Analysis 02 — bars 72% / 36% / 44% — Success / Collisions / **Near-Miss**, badge "Benchmark Axes (Illustrative)"
6. Contributors

### 7.4 `factorjepa.html` — title `FactorJEPA | Pragya AI`
1. **Auto-height** full-bleed hero (no `h-[calc…]`, no `overflow-hidden`) — `factorjepa_hero_prev.png`, `block w-full h-auto object-contain`
2. Stat strip — 98.2% / 12ms / 4.2B / 1.2M
3. `01. RAW INPUT DATA` — 3 remote images, captions "Dense Urban Occlusion" / "Multi-Agent Interactions" / "Narrow-Path Navigation" (**invisible — BUG-5**)
4. `02. PROCESSED RESULTS` — Occlusion Recovery / Crowd Dynamics Forecast / Lane-Scale Routing
5. Analysis 01 — `M0,130 Q100,118 200,78 T400,20`, `T: 0.0 / 5.0 / 10.0`, "Semantic Drift Stability"
6. Analysis 02 — bars 65% / 88% / 72% — Baseline / **FactorJEPA** / Standard JEPA, "Density Generalization"
7. Contributors

### 7.5 `pragyavla.html` — title `PragyaVLA | The Spatial Academic` *(inconsistent suffix — BUG-9)*
1. Full-bleed 100vh hero — `pragyavla_hero.png`
2. Stat strip — 12.4B / 94.2% / 42ms / High
3. `01. RAW INPUT DATA` — 3 remote images, **`data-alt` instead of `alt` — BUG-4**
4. `02. PROCESSED RESULTS` — Precise Placement / Terrain Recovery / Zero-Shot Fetch
5. Analysis 01 — `M0,130 Q100,120 200,80 T400,20`, `L1: BASIC / L5: DYNAMIC / L10: ADAPTIVE`, "94.2% Peak Efficiency". **`viewbox` lower-case — BUG-7**
6. Analysis 02 — bars 85% / 45% / 95% — SOTA-VLA / **PRAGYAVLA** / BASE-TRANSFORMER, "~42ms Optimized Path"
7. Contributors

### 7.6 `kalamprotocol.html` — title `Kalam Protocol | Pragya AI`
1. Auto-height full-bleed hero — `kalamprotocol_hero.png`
2. Stat strip — 0.99 / &lt;0.1% / 0.4ms / 99.8%
3. `01. RAW INPUT DATA` — Spatial Env Alpha / Cross-Modal Input / Temporal Sequence 09
4. `02. PROCESSED RESULTS` — Constraint Verification / Runtime Guardrails / Mesh Alignment Control
5. Analysis 01 — `M0,130 Q100,115 200,76 T400,12`, `T-0 / T-500 / T-1000`, "Temporal Alignment Convergence"
6. Analysis 02 — bars 98% / 92% / 95% — ENV_A / ENV_B / **ENV_C**, "Cross-Env Reliability"
7. Contributors

### 7.7 `kalarisena.html` — title `KalariSena | Pragya AI`
1. Auto-height full-bleed hero — `kalarisena_hero.png`
2. Stat strip — 94.2% / 12k+ / 0.042 / 4.2TB
3. `01. RAW INPUT DATA` — Dynamic Kick Recovery / Low-Posture Balance / Weapon Form Dynamics
4. `02. PROCESSED RESULTS` — Skeleton Extraction / Humanoid Retargeting / Force Distribution Map
5. Analysis 01 — **polyline** `M0,130 L50,110 … L400,10` (only page not using a quadratic curve), single circle at (300,30) with inline `0.042 OPT` label, badge "Tracking Error (MSE)"
6. Analysis 02 — bars 75% / 82% / 95% — Control / Sena-v1 / **Current**, "Stability Metric"
7. Contributors

---

## 8. Interactive behaviour inventory

Every behaviour below must survive the port with **identical timing, easing and duration**.

| # | Behaviour | Source | Detail |
|---|---|---|---|
| IB-1 | Scroll reveal | `main.js` | `IntersectionObserver`, `threshold: 0.08`, `rootMargin: "0px 0px -40px 0px"`; targets `.ds-reveal, .opacity-0`; adds `is-visible` **and** `reveal`; `unobserve` after first hit. **In practice a no-op — BUG-2** |
| IB-2 | `--nav-height` publication | `main.js` | `Math.ceil(nav.getBoundingClientRect().height)` → `document.documentElement.style` `--nav-height`; recomputed on `resize` (passive). Drives every sub-page's `padding-top` and hero height |
| IB-3 | Nav scrolled state | `main.js` | `scrollY > 24` toggles `is-scrolled` on the nav; runs once on load. **No visual effect — BUG-3** |
| IB-4 | Smooth anchor scroll | `main.js` | For every `a[href^="#"]`: `scrollIntoView({behavior:"smooth", block:"start"})`, `preventDefault()` **only** when a target is found. Throws on bare `href="#"` — BUG-10 |
| IB-5 | Mobile menu toggle | `main.js` | `[data-menu-toggle]` / `[data-mobile-menu]` — **neither element exists anywhere.** Dead code |
| IB-6 | App-root/active-link derivation | `navbar.js` | Parses `location.pathname` for `/pages/`; marks the nav item whose key the path ends with as active |
| IB-7 | Submenu toggle | `navbar.js` | Click on a nav `<button>` → open; click the **same** button again → close |
| IB-8 | Submenu render | `navbar.js` | Rebuilds `#submenu-content` from `submenuConfig[pageKey]` on every open |
| IB-9 | Backdrop click → close | `navbar.js` | |
| IB-10 | Outside click → close | `navbar.js` | `document` click where target is not inside `[data-nav-item]` or `#submenu-container` |
| IB-11 | Escape → close | `navbar.js` | `keydown`, `e.key === "Escape"` |
| IB-12 | Submenu open animation | `navbar.js` | `setTimeout(…, 0)` → set `opacity:0; transform:translateY(-10px)` → `requestAnimationFrame` → `transition: all 300ms ease-out; opacity:1; transform:translateY(0)` |
| IB-13 | Submenu close animation | `navbar.js` | `transition: all 300ms ease-out` → `opacity:0; translateY(-10px)`; `setTimeout(…, 300)` → add `hidden` to container **and** backdrop, clear `activeSubmenu` |
| IB-14 | Submenu CSS entry keyframe | CSS §20 | `@keyframes submenu-fade-in` `.3s ease-out forwards` on `#submenu-container` — fires at page load, layered under IB-12 |
| IB-15 | Footer injection | `footer.js` | Into `#site-footer`; 6 pages only |
| IB-16 | City video grids | `denseworld-grid.js` | 6 slots per city; `#` → empty `aspect-video` placeholder div; real src → `<video autoplay loop muted playsinline preload="auto" class="h-full w-full object-cover">` |
| IB-17 | Taxonomy grid | `denseworld-grid.js` | 15 fields; every value currently `#` → `bg-surface-container-low` placeholder + label |
| IB-18 | Video autoplay | markup | All 4 Delhi clips autoplay muted in a loop, simultaneously |
| IB-19 | Protocol image zoom | CSS/Tailwind | `transition-transform duration-500 ease-out hover:scale-105` — note the hover is on the **image**, while `group-hover` drives the "Know More" gap |
| IB-20 | "Know More" gap grow | Tailwind | `gap-2 group-hover:gap-4 transition-all` (default 150ms) |
| IB-21 | Stat card hover | Tailwind | `hover:bg-primary transition-colors duration-500`; `group-hover:text-primary-fixed`, `group-hover:text-on-primary`, `group-hover:text-on-primary/70` |
| IB-22 | Raw-input image hover | Tailwind | `opacity-80 → group-hover:opacity-100` **transitioned**; `grayscale → group-hover:grayscale-0` **not transitioned** (only `transition-opacity` is set) — snaps instantly. Preserve |
| IB-23 | Contributor card hover | Tailwind | `transition-transform duration-300 ease-out hover:scale-[1.02]` |
| IB-24 | Nav CTA | Tailwind | `hover:opacity-80 active:scale-95 transition-all duration-200` |
| IB-25 | Nav link hover | Tailwind | `hover:text-on-surface transition-opacity duration-300` (transitions *opacity*, not colour → the colour change is instant). Preserve |
| IB-26 | Footer link hover | Tailwind | `hover:text-primary transition-colors` |
| IB-27 | Submenu item hover | CSS §20 | `all .3s ease`; bg → `--surface-container-high`, border → `--primary`, colour → `--primary`; icon `scale(1.15)` — **but** `.submenu-item-static:hover` overrides bg/border/colour back and cancels the icon scale, and every rendered item is static. Net visible effect: background shifts to `--surface-container` |
| IB-28 | Featured card hover | CSS §20 | `translateY(-4px)`, `box-shadow: 0 20px 48px rgba(72,27,76,.2)`, inner row `gap .5rem → 1rem` (`gap .3s ease`), icon `translateX(2px)` |
| IB-29 | Landing hero image | Tailwind | `transition-all duration-1000` declared, but nothing ever changes it |
| IB-30 | Native smooth scroll | CSS | `html { scroll-behavior: smooth }` |
| IB-31 | Crosshair cursor | CSS | `body { cursor: crosshair }` site-wide |
| IB-32 | Text selection colours | Tailwind | landing: `selection:bg-surface-container-low selection:text-on-surface`; other 6: `selection:bg-primary-fixed selection:text-on-primary-fixed` |

**Script load order** (all `defer`, so execution order = document order):
`navbar.js` → `footer.js` → `denseworld-grid.js` → `main.js`.
This matters: `main.js` measures the navbar that `navbar.js` has already injected.

---

## 9. Assets

All of `pragya_ai/public/**` will be **copied** (never moved) into `pragya_ai-next/public/`,
preserving relative paths, so `public/hero.png` → `/hero.png`.

| File | Size | Used by |
|---|---|---|
| `logo_srt.png` | 208K | favicon, all 7 pages |
| `violate_nobg.png` | 124K | navbar logo |
| `hero.png` | 1.9M | landing hero |
| `denseWorld_new.png` | 860K | landing card + DENSEWORLD submenu |
| `factorjepa_new.png` | 2.5M | landing card + FactorJEPA submenu |
| `pragyaVla_new.png` | 672K | landing card + PragyaVLA submenu |
| `denseWalk_new.png` | 2.4M | landing card + DENSEWALK submenu |
| `kalamProtocol_new.png` | 2.0M | landing card + Kalam submenu |
| `kalarisena_new.png` | 1.7M | landing card + KalariSena submenu |
| `denseworld_hero.png` | 704K | denseworld hero |
| `denseWalk_hero.png` | 1.2M | densewalk hero |
| `pragyavla_hero.png` | 476K | pragyavla hero |
| `factorjepa_hero_prev.png` | 1.7M | factorjepa hero |
| `kalamprotocol_hero.png` | 880K | kalamprotocol hero |
| `kalarisena_hero.png` | 808K | kalarisena hero |
| `videos/denseWorld/delhi/walk_01–04.mp4` | 1.4M/1.4M/688K/1.5M | DENSEWORLD Delhi row (slots 1–4; slots 5–6 empty) |
| **`factorjepa_hero.png`** | 3.0M | **unused** |
| **`denseworld_text.png`** | 60K | **unused** |
| **`logo.jpg`** | 16K | **unused** |
| **`logo_nobg.png`** | 100K | **unused** |
| **`pragya-logo.svg`** | 1.0K | **unused** |
| **`violate_logo.png`** | 1.4M | **unused** |

Total ≈ 25 MB. The 6 unused files will still be copied (fidelity first); say the word if you'd
rather leave them out.

Remote images (7 distinct `lh3.googleusercontent.com` URLs): 2 on landing (each used twice —
raw + processed variant of the same photo), 3 each on factorjepa / pragyavla / kalamprotocol /
kalarisena.

---

## 10. Bugs & quirks in the original — **found, not fixed**

| ID | Severity | Description |
|---|---|---|
| **BUG-1** | high | Contributor photos are `../../assets/img/team/*.{png,jpeg}` — that escapes `pragya_ai/` into the parent Jekyll site. Serving `pragya_ai/` standalone gives **4 broken images on all 6 sub-pages**. The files do exist at `pragyaai.github.io/assets/img/team/`. |
| **BUG-2** | med | The scroll-reveal system never actually reveals on scroll. Landing sections carry `class="reveal opacity-0"` *in the HTML*, so `.reveal { animation: fadeUp .8s ease-out forwards }` runs immediately at page load and its `forwards` fill beats `opacity-0`. All three sections therefore fade up **simultaneously on load**, and the `IntersectionObserver` only re-adds classes that are already present. On the other 6 pages there is no `.ds-reveal`/`.opacity-0` element at all, so IB-1 does nothing. |
| **BUG-3** | low | `main.js` toggles `is-scrolled`, but the only rule for it is `.site-navbar.is-scrolled`, and the injected nav has no `site-navbar` class. The scrolled border never appears. |
| **BUG-4** | med (a11y) | `pragyavla.html` uses `data-alt="…"` instead of `alt="…"` on its three RAW INPUT images → **no accessible name**. |
| **BUG-5** | med | On factorjepa / pragyavla / kalamprotocol / kalarisena, the RAW INPUT tiles are `aspect-video … overflow-hidden` containing an `h-full` image *plus* a caption `<div>`. The caption is pushed past the fixed box and clipped — **the "Scenario:" / "Stream:" captions are invisible.** |
| **BUG-6** | low | `densewalk.html` Analysis 01 uses `bg-linear-to-br` (Tailwind **v4** syntax) under the v3 CDN → class does not exist → **no gradient overlay**, unlike the other five pages which use `bg-gradient-to-br`. |
| **BUG-7** | low | `pragyavla.html` Analysis 01 `<svg viewbox="0 0 400 150">` — lower-case. SVG attributes are case-sensitive, so **no viewBox is applied** and that chart renders unscaled, visibly different from the identically-authored charts on the other pages. |
| **BUG-8** | low | Landing has its own hard-coded footer with different border colour, link gap and text colour than the `footer.js` footer used on the other six pages. |
| **BUG-9** | low | `pragyavla.html` `<title>` is `PragyaVLA | The Spatial Academic`; every other page uses `… | Pragya AI`. |
| **BUG-10** | med | `main.js` anchor handler calls `document.querySelector("#")` for any bare `href="#"` link. That throws `SyntaxError`, so `preventDefault()` never runs → console error **and** the browser jumps to the top of the page. Triggered by "Know More" on PragyaVLA / Kalam Protocol / KalariSena landing cards and by all 4 footer links. |
| **BUG-11** | med | Navbar items are `<button>`s that only open the submenu — they **never navigate**. The only way to reach a product page from the nav is the "Explore" featured card inside the submenu. Also: buttons carry no `aria-expanded`/`aria-controls`, and the submenu is not focus-trapped or keyboard-reachable beyond `Escape`. |
| **BUG-12** | low | "Get in Touch" points at `#contact-form`, which **does not exist on any page**. On the landing page it is an inert `#` jump; elsewhere it navigates to landing and lands nowhere. |
| **BUG-13** | low | `featuredCard.title` and `.description` are defined for all six products but the rendered card markup contains **only** the "Explore" row — the CSS for `.submenu-featured-card h3/p` is dead. |
| **BUG-14** | low | Sub-page heroes use `w-screen` (100vw) while `<body>` has no `overflow-x-hidden` (only the landing page sets it) → on desktop with a classic scrollbar this produces a small **horizontal scrollbar**. |
| **BUG-15** | low | `text-md` (landing protocol paragraphs) is not a Tailwind class → no font-size is applied; the text inherits the browser default 16px. |
| **BUG-16** | low | Taxonomy field "Video Quality" is labelled **"3 values"** but has exactly one (`Clean`). Also spelling in the data: `Varansi` (Varanasi), `Padestrian`, `Steet Vendor`, `Greenary`. |
| **BUG-17** | low | `--font-mono` names JetBrains Mono / Fira Code, but neither font is ever loaded; the `font-mono` blocks fall back to Tailwind's default mono stack. |
| **BUG-18** | low | The nav's mobile breakpoint hides all six links (`hidden md:flex`) and **no hamburger exists** (`data-menu-toggle` is never rendered). Below 768px the nav is logo + "Get in Touch" only. |
| **BUG-19** | info | `<html class="light">` + `darkMode: "class"` are configured but there is not a single `dark:` utility in the codebase. |
| **BUG-20** | info | ~70% of `design-system.css` (§3.3) is never referenced by any markup. |
| **BUG-21** | **high** | **All 14 `lh3.googleusercontent.com/aida-public/…` images are dead.** Every URL returns a genuine Google `404 Not Found` (verified with a browser User-Agent and a `pragyaai.github.io` referer). These are expired generated-asset URLs. The original therefore renders **14 broken images today**: 4 tiles on the landing page's "The Evidence" (2 URLs × 2 uses) and 3 each on factorjepa / pragyavla / kalamprotocol / kalarisena. Q4's "download them" answer is moot — there is nothing to download. See §11.2. |

**None of these will be silently fixed.** Anything you want repaired, tell me and I'll do it as
an explicit, listed change.

---

## 11. Decisions

### 11.0 Answered (2026-08-16)

| Q | Decision |
|---|---|
| **Q1 Tailwind** | ✅ **Tailwind v3.4 pinned**, `@tailwindcss/forms` + `@tailwindcss/container-queries`, `js/tailwind-config.js` ported verbatim to `tailwind.config.ts` |
| **Q2 Routes** | ✅ **Clean** — `/`, `/denseworld`, `/densewalk`, `/factorjepa`, `/pragyavla`, `/kalamprotocol`, `/kalarisena` |
| **Q4 Remote images** | ✅ **Download** the 7 `lh3.googleusercontent.com` images into `/public`; no `remotePatterns` entry, CSP stays strict |
| **Q5 Contributor photos** | ✅ **Copy in** from `pragyaai.github.io/assets/img/team/` → `public/assets/img/team/`. **Recorded deviation:** the new app shows 4 *working* contributor photos where the standalone original shows 4 broken ones (BUG-1) |
| **Q3 Dead CSS** | ⬜ default assumed: ship `design-system.css` **verbatim**, dead sections included |
| **Q6 Forms/env** | ⬜ default assumed: **(a) + (c)** — no invented contact form; scaffold zod env validation + a rate-limit utility, unused |
| **Q7 CSP** | ⬜ default assumed: strict CSP with `frame-ancestors 'none'` |

Q3/Q6/Q7 defaults stand unless you say otherwise; say the word and I'll change them in Phase 2/5.

### 11.2 New decisions raised during Phase 2

**Q8 — the 14 dead remote images (BUG-21).** Your Q4 answer was "download into
`/public`", but every URL 404s, so there is nothing to download. Current state: the original
URLs are kept verbatim in the data files, so the new app renders the same broken tiles the
original renders today. Options:

- **(a) Leave broken** *(current)* — maximum fidelity; the new app matches the original exactly.
- **(b) Neutral placeholders** — swap in a `surface-container` block so the layout reads cleanly
  without inventing imagery. Changes appearance vs. the original.
- **(c) Supply replacements** — you provide 14 images and I wire them in.

**Q9 — fonts: `next/font` was not used, deliberately.** `next/font` generates *scoped* family
names (`__Inter_abc123`). The original references the literal names `"Plus Jakarta Sans"` and
`"Inter"` in three places that all must keep working: `tailwind.config.ts` `fontFamily`,
`design-system.css` (`--font-headline`, `--font-body`, `.plus-jakarta-sans`, `.inter` — used on
~50 elements), and `font-['Plus_Jakarta_Sans']` arbitrary classes in the navbar/footer. Using
`next/font` would have silently broken all of them, or forced edits to the verbatim files.

Instead `src/styles/fonts.css` is the **exact Google Fonts stylesheet the original loaded**,
fetched verbatim, with the 16 `fonts.gstatic.com` woff2 URLs rewritten to `/fonts/*`. Same
families, same weights, same `unicode-range` subsets, same `font-display: swap`. This is also
required for Material Symbols: Google's stylesheet carries a `.material-symbols-outlined` base
rule (font-family + `font-feature-settings: 'liga'`) that `design-system.css` only *augments* —
without it the icons render as the literal text "arrow_outward". Self-hosted, so no external
requests and the CSP stays strict. Regenerate with `scratchpad/fetch-fonts.mjs`.

Tell me if you'd rather have `next/font` and accept editing `design-system.css`.

### 11.1 Original question text

**Q1 — Tailwind.** The original is ~95% Tailwind utility classes generated by the Play CDN.
My strong recommendation: install **Tailwind v3.4** (pinned) with `@tailwindcss/forms` and
`@tailwindcss/container-queries`, and port `js/tailwind-config.js` **verbatim** into
`tailwind.config.ts`. Hand-translating ~1,400 utility classes into CSS Modules is where pixel
drift would come from, not where it would be avoided. `design-system.css` still ships verbatim
as the global stylesheet, and CSS Modules get used for the genuinely bespoke parts (submenu,
charts). Alternative if you say no: pure CSS Modules, which I estimate is 3–4× the work with
materially higher visual-drift risk.

**Q2 — Routes.** `/denseworld` (clean) vs `/pages/denseworld` (URL parity with the original)?

**Q3 — Dead CSS.** Ship `design-system.css` verbatim including the ~70% dead sections
(safest), or prune to what's live (smaller, tiny risk)?

**Q4 — Remote images.** The 7 `lh3.googleusercontent.com` images: allow the host via
`images.remotePatterns` (keeps behaviour identical, adds a runtime dependency on Google's CDN),
or download them into `/public` (more robust, and they're generic stock imagery)?

**Q5 — Contributor photos (BUG-1).** Copy the 4 files from
`pragyaai.github.io/assets/img/team/` into this project's `public/assets/img/team/` so the
cards actually render? That makes the new site *look different from the original as currently
served standalone* (4 broken images → 4 working images) — but identical to how it looks served
from the Jekyll root. **My recommendation: copy them**, and I'll note it as an intentional
deviation. Note `amitava.png` is 8 MB.

**Q6 — Forms / env / rate limiting.** The original has **no forms, no inputs, no API calls, no
env vars, and no secrets.** Your spec asks for Server Actions + zod validation + rate limiting.
Options: (a) skip — nothing to validate, keep the security work to headers + CSP; (b) build the
missing `#contact-form` that `BUG-12` implies was intended, as a real Server Action with zod
and rate limiting; (c) scaffold the zod env-validation + rate-limit utilities so they're ready
but unused. Default if you don't pick: **(a) + (c)**.

**Q7 — CSP.** A strict `Content-Security-Policy` will block `lh3.googleusercontent.com` unless
Q4 = download. Tailwind at build time means no inline-script/CDN allowances are needed, so a
strict policy is achievable — confirm you want `frame-ancestors 'none'`.

---

## 11.3 Deliberate deviations from the original

Everything else in this document is about *matching* the original. These are the
places where the new app knowingly differs, each because you asked for it.

| # | Deviation | Why |
|---|---|---|
| D-1 | **Type scale +7%** — every text size is base × 1.07. Layout spacing (padding, margins, gaps, max-widths) is unchanged, so hierarchy is preserved and only text grows; some blocks are slightly taller. Lives in `src/styles/overrides.css`, loaded last. | Requested 2026-08-16. **This voids pixel-identity** — the Phase 6 diff must treat text size and block height as expected differences. Delete the file and its two imports to revert exactly. |
| D-2 | Contributor photos copied into `public/assets/img/team/` | Q5. Standalone original shows 4 broken images (BUG-1); the new app shows them working |
| D-3 | `aria-hidden` on Material Symbols icons | Every icon sits beside a visible label; no visual change |
| D-4 | `aria-expanded` / `aria-controls` on the six nav buttons | The original had neither; no visual change |
| D-5 | `data-scroll-behavior="smooth"` on `<html>` | Makes Next force instant scroll on route transitions, matching the original's full-page-load navigation. Without it, client-side nav would smooth-scroll, which the original never did |
| D-6 | `suppressHydrationWarning` on `<body>` | Browser extensions stamp attributes on `<body>` pre-hydration. Scoped to that element's own attributes |
| D-7 | Fonts self-hosted via `@font-face` rather than `next/font` | See §11.2 Q9 — `next/font`'s scoped family names would break the verbatim config and stylesheet |
| D-8 | `not-found.tsx` / `error.tsx` added | The original had no 404 or error page; GitHub Pages served its default |
| D-9 | **Navbar reordered to DENSEWORLD · PragyaVLA · DENSEWALK · KalariSena · KalamProtocol, and FactorJEPA removed from the nav.** Original order: DENSEWORLD · FactorJEPA · PragyaVLA · DENSEWALK · KalamProtocol · KalariSena | Requested 2026-08-16. FactorJEPA is only hidden from the navbar — `/factorjepa` still builds and is reachable, its submenu config is intact, and the landing page still links to it. Kept in `hiddenNavLinks` in `src/config/nav.ts`; move it back into `navLinks` to restore |

Not deviations — these reproduce the original faithfully and are *expected* to look
"wrong": BUG-4 (missing alt), BUG-5 (clipped captions), BUG-6 (missing gradient on
densewalk), BUG-7 (unscaled pragyavla chart, which also emits a React console warning
about `viewbox` casing), BUG-13, BUG-14, BUG-15, BUG-16, BUG-21 (14 broken images).

## 12. Proposed folder tree

```
pragya_ai-next/
├─ MIGRATION.md
├─ next.config.ts                    # security headers, CSP, image config
├─ tailwind.config.ts                # verbatim port of js/tailwind-config.js  (pending Q1)
├─ postcss.config.mjs
├─ eslint.config.mjs
├─ .prettierrc
├─ tsconfig.json                     # strict: true
├─ public/
│  ├─ hero.png … (all 20 images, paths preserved)
│  ├─ videos/denseWorld/delhi/walk_0{1..4}.mp4
│  └─ assets/img/team/*.{png,jpeg}   # pending Q5
├─ verification/
│  ├─ original-baseline.sha256       # taken before any work
│  └─ visual-diff-checklist.md       # Phase 6
└─ src/
   ├─ app/
   │  ├─ layout.tsx                  # <html class="light">, fonts, navbar, footer slot
   │  ├─ globals.css                 # design-system.css verbatim + tailwind directives
   │  ├─ page.tsx                    # landing
   │  ├─ error.tsx
   │  ├─ not-found.tsx
   │  ├─ denseworld/page.tsx
   │  ├─ densewalk/page.tsx
   │  ├─ factorjepa/page.tsx
   │  ├─ pragyavla/page.tsx
   │  ├─ kalamprotocol/page.tsx
   │  └─ kalarisena/page.tsx
   ├─ components/
   │  ├─ ui/
   │  │  ├─ MaterialIcon/            # <span class="material-symbols-outlined">
   │  │  ├─ SectionRule/             # label + h-px grow divider
   │  │  └─ KnowMoreLink/
   │  ├─ Navbar/                     # "use client" — submenu state lives here
   │  │  ├─ Navbar.tsx
   │  │  ├─ NavLinks.tsx
   │  │  ├─ Submenu.tsx
   │  │  ├─ SubmenuFeaturedCard.tsx
   │  │  ├─ Navbar.module.css
   │  │  └─ index.ts
   │  ├─ Footer/                     # server component; `variant="landing" | "injected"`
   │  ├─ Hero/                       # full-bleed, fixed-height vs auto-height variants
   │  ├─ StatStrip/                  # the 4-card metric grid
   │  ├─ ProtocolRow/                # landing's alternating 12-col rows
   │  ├─ EvidenceGrid/               # landing "The Evidence"
   │  ├─ RawInputGrid/               # "01. RAW INPUT DATA"
   │  ├─ ProcessedResults/           # "02. PROCESSED RESULTS" terminal cards
   │  ├─ AnalysisCharts/
   │  │  ├─ LineChart.tsx            # per-page path/labels via props
   │  │  ├─ BarChart.tsx
   │  │  └─ AnalysisPair.tsx
   │  ├─ ProseBlock/                 # densewalk's 01/02/03 blocks
   │  ├─ Contributors/
   │  └─ DenseWorldGrid/             # "use client" only for <video>; city + taxonomy grids
   ├─ config/
   │  ├─ site.ts                     # title/description/favicon
   │  ├─ nav.ts                      # 6 nav links + submenu config (from navbar.js)
   │  └─ metadata.ts                 # per-route metadata factory
   ├─ data/
   │  ├─ contributors.ts
   │  ├─ landing.ts                  # hero copy, 6 protocol rows, evidence tiles
   │  ├─ denseworld.ts               # stats, tier1/tier2 cities, taxonomy, video sources
   │  ├─ densewalk.ts
   │  ├─ factorjepa.ts
   │  ├─ pragyavla.ts
   │  ├─ kalamprotocol.ts
   │  └─ kalarisena.ts
   ├─ hooks/
   │  ├─ useNavHeight.ts             # IB-2
   │  ├─ useSubmenu.ts               # IB-7…IB-13
   │  └─ useScrolled.ts              # IB-3
   ├─ lib/
   │  ├─ env.ts                      # zod env validation (pending Q6)
   │  └─ cn.ts
   └─ types/
      ├─ nav.ts
      ├─ content.ts
      └─ index.ts
```

`"use client"` is needed **only** in: `Navbar` (submenu + nav height + scroll state) and
`DenseWorldGrid`'s video tiles. Everything else is a Server Component.

---

## 13. Fidelity plan — how "pixel-identical" gets verified

1. Same Tailwind major + same config + same plugins ⇒ same generated utilities (pending Q1).
2. `design-system.css` shipped byte-for-byte (pending Q3), loaded **after** Tailwind's base
   layer, matching the original `<link>` order.
3. `next/font/google` self-hosts the *same* font files Google's CDN serves; `display: swap`
   preserved. Material Symbols keeps its variable axes (`wght 100..700`, `FILL 0..1`) and the
   `font-variation-settings` rule in §4 of the CSS.
4. `next/image` only where it cannot shift layout; heroes and the `object-cover`/`h-full`
   tiles will use `fill` + explicit `sizes` so intrinsic dimensions don't change spacing.
   Any tile where `next/image` alters layout falls back to a plain `<img>` — recorded here.
5. Phase 6 side-by-side at **375 / 768 / 1280 / 1920**, both apps running simultaneously,
   checklist in `verification/visual-diff-checklist.md`.

---

## 14. Phase plan

- [x] **1 — Scaffold + inventory + folder tree**
- [x] **2 — Global styles, fonts, layout shell (navbar + footer)**
      Tailwind v3.4 + verbatim config; `design-system.css` copied byte-identical (SHA-256
      verified); 16 self-hosted font files; two root layouts; Navbar + submenu + Footer;
      `not-found.tsx`; `error.tsx`
- [x] **3 — Page/section conversion** — all 7 routes build and prerender static
- [ ] 4 — Interactivity port (IB-1 … IB-32) ← **mostly done; see below**
      Done: IB-2, IB-3, IB-6…IB-14 (navbar + submenu), IB-15…IB-18 (footer, grids, video),
      IB-19…IB-32 (all CSS/Tailwind hover, transition and cursor behaviour).
      **Remaining:** IB-4 (smooth anchor scroll for `a[href^="#"]`, including the
      `querySelector("#")` throw in BUG-10) and a decision on IB-1 (the reveal
      `IntersectionObserver` — currently omitted because it is provably a no-op, see below).
      IB-5 is dead code in the original and is intentionally not ported.
- [ ] 5 — Security headers, env validation, forms
- [ ] 6 — build / lint / typecheck + visual diff at 4 widths + original-folder integrity proof
