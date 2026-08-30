import type { BarChartSpec, HeroSpec, LineChartSpec, StatCard } from "@/types/page";

/**
 * Content of pages/densewalk.html, verbatim.
 *
 * Unlike the other sub-pages this one has no image/terminal grids — it has
 * three numbered prose blocks instead. It is also the only page whose chart
 * overlay class is `bg-linear-to-br` (Tailwind v4 syntax), which v3 does not
 * generate, so it renders with no gradient (BUG-6).
 */

export const hero: HeroSpec = {
  src: "/denseWalk_hero.png",
  alt: "DenseWalk humanoid navigation visualization",
  mode: "fill",
};

export interface ChallengeClip {
  /** The question posed above the clip; the hook, so it carries the section. */
  readonly question: string;
  /** Under public/. The files land here once the captures come back from the lab. */
  readonly src: string;
}

export interface ChallengeSpec {
  readonly label: string;
  readonly clips: readonly ChallengeClip[];
}

/**
 * The attract section directly below the hero.
 *
 * Two walk-throughs a person would clear without thinking, each posed as a
 * question. It is the first thing a visitor reads on the page, so it states the
 * problem DenseWalk exists for before any of the dataset machinery appears.
 */
export const challenge: ChallengeSpec = {
  label: "The DenseWalk Question",
  clips: [
    { question: "If humans can cross it effortlessly, can a humanoid?", src: "/videos/denseWalk/densewalk_02.mp4" },
    { question: "A human can navigate easily, can a humanoid?", src: "/videos/denseWalk/densewalk_01.mov" },
  ],
};

export const stats: readonly StatCard[] = [
  { label: "Source Video Hours", value: "200h", caption: "Egocentric walk-through data" },
  { label: "Navigation Decisions", value: "5+", caption: "Advance, slow, sidestep, yield, wait" },
  { label: "Benchmark Regimes", value: "5", caption: "Bottleneck, crossing, occlusion, gaps, narrowing lanes" },
  { label: "Reported Gains", value: "X / Y / Z", caption: "Success up, collisions and near-misses down" },
] as const;

export interface ProseBlockData {
  readonly label: string;
  readonly paragraphs: readonly string[];
}

export const proseBlocks: readonly ProseBlockData[] = [
  {
    label: "01. Problem Regime",
    paragraphs: [
      "Humanoid navigation has advanced in structured indoor spaces and relatively orderly outdoor scenes, but remains weakly studied in India and other populous, crowded, and chaotic Global South urban environments, where pedestrians, carts, auto-rickshaws, cars, buses, and roadside activity interact within narrow, shifting corridors under persistent occlusion and weak lane structure. In these settings, safe traversal requires continual local decision-making about when to advance, slow, sidestep, yield, or wait.",
    ],
  },
  {
    label: "02. Data + Supervision Pipeline",
    paragraphs: [
      "DENSEWALK is a data-and-benchmark pipeline for this regime. Starting from 200 hours of egocentric walk-through videos, we first estimate monocular depth to recover local geometry, detect and track nearby pedestrians and vehicles, use optical flow to capture short-horizon motion, and infer feasible gaps and walking corridors through traversability analysis.",
      "We then use these structured cues to derive short-horizon navigation decisions with a VLA model and generate motion-grounded textual descriptions with an LLM, yielding paired action-and-language supervision for dense urban humanoid navigation.",
    ],
  },
  {
    label: "03. Benchmark + Evaluation",
    paragraphs: [
      "Using this data, we train OpenVLA for short-horizon humanoid navigation and evaluate it in DENSEWALK, a benchmark spanning mixed-agent bottlenecks, crossing events, blind occlusion, temporary gap openings, and dynamically narrowing free space.",
      "In Isaac Sim, we instantiate human agents and add carts, cars, buses, and roadside obstacles as dynamic or static artifacts to recreate dense mixed-agent flow, bottlenecks, occlusion, and weakly structured right-of-way.",
      "We measure task success rate, collision rate, near-miss rate, fall rate, minimum clearance, deadlock time, and social compliance. Our framework improves success by X%, reduces collisions by Y%, lowers near-misses by Z%, and yields safer clearance and more stable locomotion than geometry-only, action-only, and non-language baselines.",
    ],
  },
] as const;

/** Lab talks & demo playlist, embedded below the narrative blocks. */
export const videoPlaylist = {
  embedSrc: "https://www.youtube.com/embed/videoseries?list=PLaE3N7Ax00P_fC4DX9vWXhYKJEinSbEtz",
  title: "DenseWalk video demonstrations",
} as const;

export const lineChart: LineChartSpec = {
  path: "M0,130 Q100,122 200,84 T400,24",
  circles: [
    { cx: 200, cy: 84 },
    { cx: 400, cy: 24 },
  ],
  texts: [
    { x: 5, y: 145, text: "BASELINE" },
    { x: 180, y: 145, text: "DENSEWALK" },
    { x: 346, y: 145, text: "OPENVLA+" },
  ],
  badge: "Safety-Weighted Task Success",
  caption: "Navigation policy quality improves when local geometry, motion, traversability, and language supervision are jointly used.",
  // BUG-6: v4 syntax under a v3 build — deliberately produces no gradient.
  overlayClass: "bg-linear-to-br",
};

export const barChart: BarChartSpec = {
  bars: [
    { heightClass: "h-[72%]", label: "Success" },
    { heightClass: "h-[36%]", label: "Collisions" },
    { heightClass: "h-[44%]", label: "Near-Miss", emphasised: true },
  ],
  badge: "Benchmark Axes (Illustrative)",
  caption: "Evaluation tracks success, collision, near-miss, fall, clearance, deadlock, and social compliance in dense mixed-agent flow.",
};
