/**
 * A run of text, optionally emphasised.
 *
 * The original marks every emphasised run as `<b><i>…</i></b>` — always both
 * tags, never one alone — so a single flag reproduces it exactly.
 */
export interface RichSegment {
  readonly text: string;
  readonly em?: true;
}

export interface ProtocolRow {
  readonly title: string;
  readonly body: readonly RichSegment[];
  readonly href: string;
  readonly image: string;
  readonly imageAlt: string;
  /** Which column the image occupies. Rows alternate down the page. */
  readonly imageSide: "left" | "right";
  /** The original omits `relative` on some image cells; tracked so markup matches. */
  readonly imageCellRelative: boolean;
  /** The original uses bg-slate-50 on the first row and bg-surface-container-low on the rest. */
  readonly imageCellBg: string;
}

export interface EvidenceTile {
  readonly rawSrc: string;
  readonly rawAlt: string;
  readonly rawBadge: string;
  readonly processedSrc: string;
  readonly processedAlt: string;
  readonly processedBadge: string;
  readonly heading: string;
  readonly caption: string;
}

export interface HeroSegment {
  readonly text: string;
  readonly className?: string;
}
