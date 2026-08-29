/** Material Symbols ligature names used across the site. */
export type MaterialIconName =
  | "info"
  | "insights"
  | "rocket_launch"
  | "arrow_outward"
  | "visibility"
  | "directions_walk"
  | "forum"
  | "front_hand"
  | "sports_martial_arts"
  | "hub"
  | "shield";

/** One question row in a submenu column. */
export interface SubmenuItem {
  readonly label: string;
  /** The original config hard-codes "#" for every item; preserved verbatim. */
  readonly href: string;
  readonly icon: MaterialIconName;
}

/** The image card on the right-hand side of an open submenu. */
export interface SubmenuFeaturedCard {
  /** Defined in the original config but never rendered — see BUG-13. */
  readonly title: string;
  /** Defined in the original config but never rendered — see BUG-13. */
  readonly description: string;
  readonly href: string;
  /** Falls back to a plain black card (see SubmenuFeaturedCard) when omitted. */
  readonly image?: string;
}

export interface SubmenuConfig {
  readonly title: string;
  readonly columns: { readonly apis: readonly SubmenuItem[] };
  /** Keyed by the matching SubmenuItem.label. */
  readonly answers: Readonly<Record<string, string>>;
  readonly featuredCard: SubmenuFeaturedCard;
}

export interface NavLink {
  readonly label: string;
  readonly href: string;
  /** Stable identity for submenu lookup and active-state matching. */
  readonly key: string;
}
