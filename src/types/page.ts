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
 * A rotating wheel image stacked above a title lockup, both centered as one
 * group in the middle of the hero — independent of `hero.src`, which for
 * pages using this is just a flat backdrop colour. Centering a small,
 * fixed-aspect group like this needs no object-cover crop math at all (unlike
 * the earlier approach of overlaying on a specific spot in a large cropped
 * background image), so it stays correctly centered and fully visible on any
 * viewport shape.
 */
export interface HeroCenterpiece {
  readonly spinSrc: string;
  readonly spinAlt: string;
  /** Wheel width, in vw; height follows the image's own aspect ratio. */
  readonly spinWidthVw: number;
  /** Full-rotation duration in seconds. */
  readonly durationS: number;
  readonly titleSrc: string;
  readonly titleAlt: string;
  /** Title-lockup width, in vw; height follows the image's own aspect ratio. */
  readonly titleWidthVw: number;
  /** Gap between the wheel and the title, in vw. */
  readonly gapVw: number;
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
  /** A rotating wheel + title lockup, centered as a group in the hero. */
  readonly centerpiece?: HeroCenterpiece;
}
