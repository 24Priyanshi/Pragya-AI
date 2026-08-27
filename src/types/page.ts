/** Shared shapes for the six research sub-pages. */

export interface StatCard {
  readonly label: string;
  readonly value: string;
  readonly caption: string;
}

export interface RawInputTile {
  readonly src: string;
  /**
   * pragyavla.html uses `data-alt` instead of `alt`, leaving the images with no
   * accessible name (BUG-4). When `useDataAlt` is true the text is emitted as
   * `data-alt` exactly as the original does. This is preserved rather than
   * fixed because these images are all 404 (BUG-21) and a real `alt` would
   * render as visible fallback text, changing the page.
   */
  readonly alt: string;
  readonly useDataAlt?: true;
  readonly caption: string;
}

export interface ProcessedCard {
  /** Terminal lines, each already including its leading "> ". */
  readonly lines: readonly string[];
  readonly task: string;
  readonly description: string;
}

export interface SvgText {
  readonly x: number;
  readonly y: number;
  readonly text: string;
}

export interface LineChartSpec {
  readonly path: string;
  readonly circles: readonly { readonly cx: number; readonly cy: number }[];
  readonly texts: readonly SvgText[];
  readonly badge: string;
  readonly caption: string;
  /**
   * The overlay class. Every page uses `bg-gradient-to-br` except densewalk,
   * which uses Tailwind v4's `bg-linear-to-br` — a class that does not exist in
   * v3, so that page has no overlay (BUG-6). Stored as a literal so Tailwind's
   * content scanner picks it up.
   */
  readonly overlayClass: string | null;
  /**
   * pragyavla.html writes `viewbox` in lower case. SVG attributes are
   * case-sensitive, so no viewBox applies and that chart renders unscaled
   * (BUG-7). Set true to reproduce it — LineChart omits the attribute
   * altogether, which paints identically to the original's ignored one.
   */
  readonly legacyLowercaseViewBox?: true;
}

export interface BarSpec {
  /** Literal Tailwind class, e.g. "h-[61%]", so the scanner can see it. */
  readonly heightClass: string;
  readonly label: string;
  /** The original bolds exactly one bar per chart. */
  readonly emphasised?: true;
}

export interface BarChartSpec {
  readonly bars: readonly BarSpec[];
  readonly badge: string;
  readonly caption: string;
}

export interface Contributor {
  readonly name: string;
  readonly image: string;
  readonly alt: string;
  readonly bio: string;
}

export interface HeroAction {
  readonly label: string;
  readonly href: string;
}

/**
 * A looping rotation overlaid on top of a "fill" hero image, positioned to sit
 * exactly over a matching static element already baked into that image (e.g.
 * DenseWorld's ring logo). Since the hero is height-locked and object-cover,
 * `topPct`/`heightPct` are percentages of the hero's own height — the
 * dimension object-cover actually scales against on wide viewports — so the
 * overlay tracks the background image's scale reasonably well across desktop
 * widths. It is not exact on viewports where the crop is width-bound (e.g.
 * narrow/tall mobile), so it's hidden below `md`.
 */
export interface HeroSpin {
  readonly src: string;
  readonly alt: string;
  /** Vertical center of the overlay, as a percentage of hero height. */
  readonly topPct: number;
  /** Overlay height, as a percentage of hero height; width follows the image's own aspect ratio. */
  readonly heightPct: number;
  /** Full-rotation duration in seconds. */
  readonly durationS: number;
}

export interface HeroSpec {
  readonly src: string;
  readonly alt: string;
  /**
   * "fill" — full-viewport-height hero, `object-cover` (denseworld, densewalk, pragyavla).
   * "auto" — intrinsic-height hero, `object-contain` (factorjepa, kalamprotocol, kalarisena).
   */
  readonly mode: "fill" | "auto";
  /** Whitish scrim over the image, so overlaid content stays readable. */
  readonly overlay?: boolean;
  /** CTAs rendered centred on top of the image. */
  readonly actions?: readonly HeroAction[];
  /** A rotating image overlaid on the hero, matching a static element already in it. */
  readonly spin?: HeroSpin;
}
