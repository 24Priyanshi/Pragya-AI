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
 * A looping rotation overlaid on a "fill" hero image, above whatever the
 * image's own content (e.g. a title) sits near its bottom edge.
 *
 * The hero's `<img>` is rendered with `object-bottom` whenever `spin` is set
 * (see PageHero), so the image's bottom edge always coincides with the
 * container's bottom edge — any object-cover cropping eats into the *top* of
 * the image instead, which is safe because the important content (title
 * text) lives near the bottom. On typical wide viewports the crop is
 * width-bound, meaning the image is scaled by `containerWidth / imageWidth`
 * — exactly the same factor as `vw` units — so `bottomVw`/`heightVw` (both
 * measured against the hero image's own pixel dimensions, converted to vw)
 * keep the overlay positioned relative to the bottom-anchored image
 * consistently across desktop widths. It is not exact on viewports where the
 * crop is height-bound instead (narrow/tall mobile).
 */
export interface HeroSpin {
  readonly src: string;
  readonly alt: string;
  /** Distance from the hero's bottom edge to the overlay's bottom edge, in vw. */
  readonly bottomVw: number;
  /** Overlay height, in vw; width follows the image's own aspect ratio. */
  readonly heightVw: number;
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
