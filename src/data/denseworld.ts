import type { HeroSpec, StatCard } from "@/types/page";

/**
 * Content of pages/denseworld.html plus the city tables from js/denseworld-grid.js.
 *
 * Spellings are the original's and are left alone: "Varansi".
 */

export const hero: HeroSpec = {
  src: "/denseworld_bg.png",
  alt: "",
  mode: "fill",
  centerpiece: {
    spinSrc: "/denseworld_spiral.png",
    spinAlt: "Rotating wheel of dense mixed-traffic icons — autos, bikes, carts, and vehicles",
    spinWidthVw: 25,
    durationS: 36,
    titleSrc: "/denseworld_title.png",
    titleAlt: "DenseWorld — World Models for Populous, Crowded, and Chaotic Global South",
    titleWidthVw: 34,
    gapVw: 2,
  },
};

/** Same copy as the navbar's DenseWorld submenu "What's the necessity?" answer. */
export const problemQuote =
  "Current “world model” progress is largely validated on clean, structured, low-density Western environments, and it often breaks down for the chaotic Global South scenes—where dense occlusion, mixed traffic, informal right-of-way negotiation, extreme lighting and weather, and long-tail objects and signage dominate.";

export const stats: readonly StatCard[] = [
  { label: "Total Videos", value: "115k+" },
  { label: "Cities", value: "22", caption: "Coverage across India" },
  { label: "Dataset Scale", value: "1,000 hr+" },
] as const;

/** Each city row has exactly 6 slots; "#" renders an empty placeholder. */
const EMPTY_ROW = ["#", "#", "#", "#", "#", "#"] as const;

export const tier1Cities = ["Kolkata", "Chennai", "Bangalore", "Mumbai", "Delhi", "Hyderabad"] as const;

export const tier2Cities = [
  "Jaipur",
  "Varansi",
  "Lucknow",
  "Ahmedabad",
  "Pune",
  "Kochi",
  "Chandigarh",
  "Indore",
  "Bhopal",
  "Coimbatore",
  "Nagpur",
  "Visakhapatnam",
  "Surat",
  "Trivandrum",
  "Mysuru",
] as const;

/** Only Delhi has real footage; slots 5 and 6 are still placeholders. */
export const cityVideos: Readonly<Record<string, readonly string[]>> = {
  Kolkata: EMPTY_ROW,
  Chennai: EMPTY_ROW,
  Bangalore: EMPTY_ROW,
  Mumbai: EMPTY_ROW,
  Delhi: [
    "/videos/denseWorld/delhi/walk_01.mp4",
    "/videos/denseWorld/delhi/walk_02.mp4",
    "/videos/denseWorld/delhi/walk_03.mp4",
    "/videos/denseWorld/delhi/walk_04.mp4",
    "#",
    "#",
  ],
  Hyderabad: EMPTY_ROW,
  ...Object.fromEntries(tier2Cities.map((city) => [city, EMPTY_ROW])),
};
