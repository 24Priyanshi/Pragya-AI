import type { BarChartSpec, HeroSpec, LineChartSpec, StatCard } from "@/types/page";

/**
 * Content of pages/denseworld.html plus the data tables from js/denseworld-grid.js.
 *
 * Spellings are the original's and are left alone: "Varansi", "Padestrian",
 * "Steet Vendor", "Greenary". So is the "Video Quality" field claiming
 * "3 values" while listing one (BUG-16).
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
  { label: "Total Clips", value: "115k+", caption: "From 714 source videos" },
  { label: "City Scenes", value: "22", caption: "Coverage across India" },
  { label: "Dataset Scale", value: "300 hr+", caption: "121 GB total data volume" },
  { label: "Taxonomy Coverage", value: "15 Fields", caption: "65+ values, v3 structured tags" },
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

export interface TaxonomyField {
  readonly name: string;
  readonly count: string;
  readonly values: readonly string[];
}

export const taxonomy: readonly TaxonomyField[] = [
  {
    name: "Scene type",
    count: "13 values",
    values: [
      "Market",
      "Residential",
      "Commercial",
      "Promenade",
      "Transit",
      "Highway",
      "Heritage",
      "Junction",
      "Flyover",
      "Beach",
      "Ghat",
      "Bazar",
      "Skyline",
    ],
  },
  { name: "Time of Day", count: "2 values", values: ["Day", "Night"] },
  { name: "Weather", count: "5 values", values: ["Clear", "Cloud", "Rain", "Fog", "Overcast"] },
  { name: "Crowd", count: "3 values", values: ["High", "Medium", "Low"] },
  { name: "Traffic", count: "3 values", values: ["High", "Medium", "Low"] },
  { name: "Traffic Mix", count: "4 values", values: ["Mixed Motor", "Padestrian", "Motorized", "Mixed All"] },
  { name: "Ped-Veh Sep.", count: "3 values", values: ["Separated", "Partial", "Shared Space"] },
  { name: "Road Layout", count: "5 values", values: ["Intersection", "Narrow Lane", "Wide Road", "Sidewalk", "Bridge"] },
  {
    name: "Road Surface",
    count: "8 values",
    values: ["Asphalt", "Paved", "Wet", "Dirt", "Concrete", "Cobblestone", "Mixed", "Unpaved"],
  },
  { name: "Infrastructure", count: "3 values", values: ["Good", "Moderate", "Poor"] },
  { name: "Encroachment", count: "3 values", values: ["Clean", "Partial", "Heavy"] },
  { name: "Object", count: "5 values", values: ["Auto Rickshaw", "Animal", "Steet Vendor", "Bus", "Cycle Rickshaw"] },
  { name: "Greenary", count: "4 values", values: ["Dense", "Moderate", "Sparse", "None"] },
  { name: "Lighting", count: "3 values", values: ["Natural", "Artificial", "Mixed"] },
  // BUG-16: says 3, lists 1.
  { name: "Video Quality", count: "3 values", values: ["Clean"] },
] as const;

export const lineChart: LineChartSpec = {
  path: "M0,130 Q95,122 200,86 T400,28",
  circles: [
    { cx: 200, cy: 86 },
    { cx: 400, cy: 28 },
  ],
  texts: [
    { x: 5, y: 145, text: "T: 0" },
    { x: 182, y: 145, text: "T: 8" },
    { x: 360, y: 145, text: "T: 16" },
  ],
  badge: "Congestion Recovery Curve",
  caption: "Predictive state quality improves as temporal context accumulates, even under highly variable street-level density.",
  overlayClass: "bg-gradient-to-br",
};

export const barChart: BarChartSpec = {
  bars: [
    { heightClass: "h-[61%]", label: "Baseline" },
    { heightClass: "h-[89%]", label: "Dense World", emphasised: true },
    { heightClass: "h-[74%]", label: "UrbanNet" },
  ],
  badge: "Density Adaptation Index",
  caption: "Dummy comparative results indicate stronger adaptation in mixed-density environments with minimal planner delay.",
};
