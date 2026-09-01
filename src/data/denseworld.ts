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
    kicker: "India's First World Model",
  },
};

/** Same copy as the navbar's DenseWorld submenu "What's the necessity?" answer. */
export const problemQuote =
  "Current “world model” progress is largely validated on clean, structured, low-density Western environments, and it often breaks down for the chaotic Global South scenes—where dense occlusion, mixed traffic, informal right-of-way negotiation, extreme lighting and weather, and long-tail objects and signage dominate.";

/**
 * The Problem tab's narrative copy and density comparison, ported verbatim
 * (2026-09-01) from the "The Problem" tab of the project's own Gradio Space
 * (huggingface.co/spaces/Pragya-AI/denseworld, tab1_problem.html) — the
 * team's own existing copy for this same project, not written fresh here.
 */
export const problemNarrative = [
  "World models have rapidly emerged as a key paradigm for enabling intelligent systems to understand, predict, and reason about the physical world. However, existing models are overwhelmingly developed and evaluated on clean, low-density, and highly structured Western environments, overlooking the complexity of urban scenes across the Global South. These environments are characterized by dense and heterogeneous agents—pedestrians, vehicles, two-wheelers, rickshaws, carts, vendors, and animals—together with soft spatial boundaries, persistent occlusions, and continuous social negotiation, posing fundamentally different challenges for perception, prediction, and decision making. To bridge this gap, we introduce DENSEWORLD V1, the first world model specifically designed for the complex urban environments of the Global South.",
  "On the left are the clean, structured urban streets that dominate today's world model training data. On the right are the dense, heterogeneous, and socially negotiated streets that DENSEWORLD was built for. Same planet. Fundamentally different worlds.",
] as const;

/** The Space's contrast section pairs a "low-density" (West) clip against a "dense" (Global South) clip, 4 times over — real footage TBD, so these render as labelled placeholders for now. */
export const contrastPairs = Array.from({ length: 4 }, (_, i) => ({
  west: `low-density street ${i + 1}`,
  dense: `dense street ${i + 1}`,
}));

export interface DensityChartRow {
  readonly label: string;
  readonly westValue: string;
  readonly westWidthPct: number;
  readonly dwValue: string;
  readonly dwWidthPct: number;
  readonly multiplier: string;
}

export interface DensityChart {
  readonly title: string;
  readonly subtitle: string;
  readonly rows: readonly DensityChartRow[];
  readonly caption: string;
}

export const densityEyebrow = "Measured, not asserted";
export const densityHeading = "How much denser is the Global South?";
export const densityLede =
  "DENSEWORLD asks a simple question: Do the streets of the Global South represent a fundamentally different operating regime for world models? We answer this by quantifying every scene along five complementary dimensions—agent density, agent occupancy, occlusion pressure, interaction pressure, and agent heterogeneity—capturing the complexity, congestion, visibility, interactions, and diversity of real-world urban environments.";

export const densityCharts: readonly DensityChart[] = [
  {
    title: "Count density",
    subtitle: "Mean moving agents per scene",
    rows: [
      { label: "Residential lane", westValue: "1.8", westWidthPct: 14.4, dwValue: "3.2", dwWidthPct: 25.6, multiplier: "1.8×" },
      { label: "Promenade", westValue: "1.4", westWidthPct: 11.2, dwValue: "2.5", dwWidthPct: 20.0, multiplier: "1.8×" },
      { label: "Market", westValue: "4.6", westWidthPct: 36.8, dwValue: "12.5", dwWidthPct: 100.0, multiplier: "2.7×" },
      { label: "Heritage / tourist", westValue: "1.7", westWidthPct: 13.6, dwValue: "3", dwWidthPct: 24.0, multiplier: "1.8×" },
      { label: "Flyover / underpass", westValue: "2.6", westWidthPct: 20.8, dwValue: "5", dwWidthPct: 40.0, multiplier: "1.9×" },
      { label: "Commercial", westValue: "4.1", westWidthPct: 32.8, dwValue: "11", dwWidthPct: 88.0, multiplier: "2.7×" },
    ],
    caption:
      "Mean moving agents per scene. In markets and commercial streets, our footage holds roughly 3× the agents of representative western footage.",
  },
  {
    title: "Agent occupancy",
    subtitle: "Share of each frame covered by moving agents",
    rows: [
      { label: "Residential lane", westValue: "1.9%", westWidthPct: 9.1, dwValue: "3.4%", dwWidthPct: 16.3, multiplier: "1.8×" },
      { label: "Promenade", westValue: "1.5%", westWidthPct: 7.2, dwValue: "2.7%", dwWidthPct: 12.9, multiplier: "1.8×" },
      { label: "Market", westValue: "4.2%", westWidthPct: 20.1, dwValue: "11.1%", dwWidthPct: 53.1, multiplier: "2.6×" },
      { label: "Heritage / tourist", westValue: "0.8%", westWidthPct: 3.8, dwValue: "1.4%", dwWidthPct: 6.7, multiplier: "1.7×" },
      { label: "Flyover / underpass", westValue: "8.7%", westWidthPct: 41.6, dwValue: "20.9%", dwWidthPct: 100.0, multiplier: "2.4×" },
      { label: "Commercial", westValue: "3.8%", westWidthPct: 18.2, dwValue: "9%", dwWidthPct: 43.1, multiplier: "2.4×" },
    ],
    caption:
      "How much of each frame is covered by moving agents. Under flyovers and in markets, agents fill 2–3× more of the image — there is simply more world in motion.",
  },
];

export const stats: readonly StatCard[] = [
  { label: "Total Videos", value: "115k+" },
  { label: "Cities", value: "22", caption: "Coverage across India" },
  { label: "Dataset Scale", value: "1,000 hr+" },
] as const;

/**
 * Real street-level clips pulled from prajak002/denseworld's public/clips
 * folder (github.com/prajak002/denseworld/tree/main/public/clips), streamed
 * directly from raw.githubusercontent.com rather than committed to this repo
 * — same external-hosting pattern as PragyaDex's and MotionLang's galleries.
 *
 * Two site city names differ from that repo's folder names: "Varansi" (this
 * site's preserved original-copy spelling) maps to the repo's correctly
 * spelled "varanasi", and "Trivandrum" maps to the repo's "thiruvananthapuram".
 * Every city has 5-10 source clips; each row here takes the first 6
 * (alphabetically by filename), padding with "#" for the one city
 * (Chandigarh) that only has 5.
 */
const DENSEWORLD_VIDEO_BASE = "https://raw.githubusercontent.com/prajak002/denseworld/main/public/clips/";

const CITY_CLIP_FOLDERS: Readonly<Record<string, string>> = {
  Kolkata: "kolkata",
  Chennai: "chennai",
  Bangalore: "bangalore",
  Mumbai: "mumbai",
  Delhi: "delhi",
  Hyderabad: "hyderabad",
  Jaipur: "jaipur",
  Varansi: "varanasi",
  Lucknow: "lucknow",
  Ahmedabad: "ahmedabad",
  Pune: "pune",
  Kochi: "kochi",
  Chandigarh: "chandigarh",
  Indore: "indore",
  Bhopal: "bhopal",
  Coimbatore: "coimbatore",
  Nagpur: "nagpur",
  Visakhapatnam: "visakhapatnam",
  Surat: "surat",
  Trivandrum: "thiruvananthapuram",
  Mysuru: "mysuru",
};

const CITY_CLIP_FILES: Readonly<Record<string, readonly string[]>> = {
  ahmedabad: ["7NZ5fzDGUAM.mp4", "DIYHkv1_J8I.mp4", "UD8cPd7yFg8.mp4", "i6wXWfBuSWk.mp4", "jwe1URLwSj0.mp4", "ux_J2Zn2OOQ.mp4"],
  bangalore: ["1422DkT5c9g.mp4", "DZYCzvWqeiY.mp4", "FoDu_Bhak4E.mp4", "J9O6iFn2cjQ.mp4", "MUjW0WOIT6Q.mp4", "f-52ntfv_Ns.mp4"],
  bhopal: ["5MgZboVRiq8.mp4", "IejnakJbdDQ.mp4", "O3_8Gw96IBc.mp4", "S9yMXzD2VVs.mp4", "T6V3pZxJHDc.mp4", "duBd_MnV8-o.mp4"],
  chandigarh: ["O193ALoa_9s.mp4", "Qtu_0FMDJCA.mp4", "VO9K-Ve4gN4.mp4", "ij24C9hyP5A.mp4", "nyEuBYNGVNw.mp4"],
  chennai: ["4GfX-OtaKsk.mp4", "C0xqFIjtu70.mp4", "GKRyZW_4mUE.mp4", "HzjU1NYa_Vw.mp4", "JQdxw90XUjE.mp4", "a5lXuHER0to.mp4"],
  coimbatore: ["Dz6A-jaRaxo.mp4", "FOG7_qbA7dA.mp4", "Ovi5rdcl19g.mp4", "TB99NLLXrR8.mp4", "gNefSx8wyEc.mp4", "kHFUEr_KzSM.mp4"],
  delhi: ["-Xlzej8RTTU.mp4", "5Voa7WduPtw.mp4", "9tFAMnOQATY.mp4", "JBT_Lff7hN0.mp4", "dx3kd42tQOE.mp4", "jTrd9cXjTMg.mp4"],
  hyderabad: ["DHF9Ds_lF3s.mp4", "NlBH2AcNv10.mp4", "_ja87Kg_usc.mp4", "ielt9IBVHr0.mp4", "nmYcWZ_4ZO4.mp4", "qI0DtmauUNQ.mp4"],
  indore: ["0T7g-ZR6Pyk.mp4", "27zT5WZMtJo.mp4", "NoNkB2nOW4M.mp4", "RTaz55aqfDg.mp4", "YRTHHNqU4DI.mp4", "bVRSWU3x3jA.mp4"],
  jaipur: ["-MoRGHs81zw.mp4", "4YqtHjPgE5o.mp4", "6vF8Uxr9uD8.mp4", "R0wbglRfi5c.mp4", "S7GB7ZZOr9o.mp4", "XmYuH0OXUfc.mp4"],
  kochi: ["-65OxoMJcGQ.mp4", "6EEo3FgRils.mp4", "ATXuwKWy9XU.mp4", "DxJxfSnRvWU.mp4", "KqD5_Ri_6wg.mp4", "dB1Sv2hrFLE.mp4"],
  kolkata: ["-RaG6pedYQ8.mp4", "3c4Li82qH4Y.mp4", "4pI3dd4N3a8.mp4", "IyouoqVpaSU.mp4", "JDhjlSW6dLk.mp4", "TG5KTeyEgE0.mp4"],
  lucknow: ["0yz8-gvg2FU.mp4", "DQOjBJ9tlCg.mp4", "IcaJ0bu-j8Q.mp4", "Q2oOJ_1r3E0.mp4", "WeWniEOgib4.mp4", "ltTpsH9Gws8.mp4"],
  mumbai: ["0tCU8Ysn_nM.mp4", "ArHgX2N8drQ.mp4", "DFQO7Zn-KM4.mp4", "LVguK9bqj4Y.mp4", "_NofLLZazeA.mp4", "_Wb1ASZ4rBA.mp4"],
  mysuru: ["KJUb0-_sMCA.mp4", "bcLN0GkAvW0.mp4", "f2Ta7bHwNgI.mp4", "nqWCOcnPvTg.mp4", "yxAUbTFDhfY.mp4", "zYP0uQaoQTA.mp4"],
  nagpur: ["2swRYp8mXuE.mp4", "Affky9995mk.mp4", "RZj7mTbPWh8.mp4", "ULRpmpw1jTo.mp4", "cpvNE5YHerU.mp4", "gsqLqJlR--g.mp4"],
  pune: ["CIBZUjPKzR0.mp4", "MNw9Z5h82Ko.mp4", "O7PEJY7a10o.mp4", "X5dJDC8fOvI.mp4", "fbRPw9OJjRM.mp4", "k7SceJVTImY.mp4"],
  surat: ["A_IAMoOk55A.mp4", "IghguLjGH3U.mp4", "JbfKh1tt5Bs.mp4", "c_ha17zm1Cw.mp4", "hvjvHn6y3n4.mp4", "uMpH7BVO45U.mp4"],
  thiruvananthapuram: ["01eKackXXdg.mp4", "5hdIp9A8gk8.mp4", "E1yU7lO9v5o.mp4", "Ly8OkwIgles.mp4", "sFi0w4b33Z8.mp4", "z3yEXIyHiHo.mp4"],
  varanasi: ["9WdcpudKmkQ.mp4", "NNFDoi_ZJ9U.mp4", "Odh_7dQwzYQ.mp4", "RsyY0_0l1G8.mp4", "Ugn-uqKFMJY.mp4", "_NQtEHy_AHE.mp4"],
  visakhapatnam: ["158XlnnekGY.mp4", "ZHL9aA3y-so.mp4", "krr2uAN0iDk.mp4", "mb7uBbTUwx8.mp4", "v1YIc8t2rbA.mp4", "vlGCUe-lh3g.mp4"],
};

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

/** Each city row has exactly 6 slots; "#" renders an empty placeholder (only Chandigarh, which has 5 source clips). */
export const cityVideos: Readonly<Record<string, readonly string[]>> = Object.fromEntries(
  Object.entries(CITY_CLIP_FOLDERS).map(([city, folder]) => {
    const files = CITY_CLIP_FILES[folder] ?? [];
    const slots = Array.from({ length: 6 }, (_, i) => (files[i] ? `${DENSEWORLD_VIDEO_BASE}${folder}/${files[i]}` : "#"));
    return [city, slots];
  }),
);
