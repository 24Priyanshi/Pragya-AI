import type { BarChartSpec, HeroSpec, LineChartSpec, ProcessedCard, RawInputTile, StatCard } from "@/types/page";

/**
 * Content of pages/pragyavla.html, verbatim.
 *
 * Two quirks live in this data: every raw-input tile uses `data-alt` rather
 * than `alt` (BUG-4), and the line chart's viewBox is lower-case (BUG-7).
 */

export const hero: HeroSpec = {
  src: "/pragyavla_hero_v2.png",
  alt: "PragyaVLA — India's first multilingual Vision-Language-Action model. See, understand, act.",
  mode: "fill",
};

export interface ProseBlockData {
  readonly label: string;
  readonly paragraphs: readonly string[];
}

/** "The Problem" tab — same copy as the navbar's PragyaVLA submenu Q&A. */
export const problemBlocks: readonly ProseBlockData[] = [
  {
    label: "What is it?",
    paragraphs: [
      "India's first sovereign VLA model for robot navigation—an instruction-finetuned framework that unifies multilingual grounding, locomotion-aware reasoning, and safety-conditioned control.",
    ],
  },
  {
    label: "What's the necessity?",
    paragraphs: [
      "Because current VLA systems are still optimized largely for manipulation-centric, clean indoor benchmarks, leaving locomotion feasibility, partial observability, terrain uncertainty, and safety-aware abstention under-modeled.",
    ],
  },
  {
    label: "What's the Leap?",
    paragraphs: [
      "From direct instruction-to-action policies to structured embodied deliberation, where traversability, body-feasibility, hidden-state inference, and risk-aware abstention become explicit components of navigation control.",
    ],
  },
] as const;

export const problemQuote =
  "We cannot interact with humanoid through text. To share a physical world, we must bridge intent through the warmth of spoken voice, the richness of native tongues, and the living cadence of natural conversation.";

export const stats: readonly StatCard[] = [
  { label: "Model Scale", value: "12.4B", caption: "Dense Parameters" },
  { label: "CoT Reliability", value: "94.2%", caption: "Success on Complex Tasks" },
  { label: "Avg Latency", value: "42ms", caption: "Action Token Generation" },
  { label: "Adaptability", value: "High", caption: "Zero-Shot Capabilities" },
] as const;

export const rawInputs: readonly RawInputTile[] = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAT-5e-mx3ypc3f7l8BrtubisCFnctMK4BchtRqYZium8ZyK6qX6DtshY_5ZNzoYU0IT2iQb75YqpXg2LUWpNZobzZdtZmnAY8Hdb_1AmxOyofJ_b0ykzbXCpHfBfAU0kgQ6JK3so1xF46epXP3oNFJi-aSGRolBhG9NaYEde8aRKjjL5akgKJk8f3oSrOXmfPJpyej6f2HdUF7FVG0kbP9roa1W91qneBVfywVwuEMszHGUhe7-X92-enq5dU9vujqLPECoCmMQNQG",
    alt: "Humanoid robot hand interacting with fragile glass",
    useDataAlt: true,
    caption: "Scenario: Dynamic Manipulation",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6K9jRzSrJIw5bcMN6VKfPnbwCZm-zoBWPDjXaNvMWwywLFfieUqT17tk4T-0qQaXNquFO2HX9sd5yP-i-ASJ58IyuU9-QCjneTXFWeJIW-ou7bx5p7uT-EENSZjQH5Blfu9nzGdqNJh6a1OJ9NEv1KlfF1G2oQ-fgNevVglG0UwLsNfLQqbZ99eycYczYlGXVEy5-Rx8e4S60rkZ6026warTF1braMDOeM5GEhTzSAgWtiuubb92ip02OKemjxndyj4umGpLV0sKw",
    alt: "Robot traversing uneven industrial floor terrain",
    useDataAlt: true,
    caption: "Scenario: Locomotion Terrain",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCc_8kTS3dPyEyJYA52YGC7-oUc2VVC2SiCYgeM7FfstVAXJoBzqKO1zHxVqzJWXchJdZSdwnA6-ZGxNXd5UPAOw7X4thE7BmUT0bM038qmOwKGLN9uFle4eRTvu5SWfU2bJc5fRV2MMyM-kHdeXp9RmbfAnSs8hZ2UX0cELeAVLoaoglBPF2X3ZF6D1poo8HD1VDEtPemrYYJKdEML77wHiV4ES3eznf8_Y7B4prTw9vtZHuI3wdowCg9SP0N0zY_ZanCWQruTEq0N",
    alt: "Laboratory environment with sensors and robot",
    useDataAlt: true,
    caption: "Scenario: Spatial Mapping",
  },
] as const;

export const processed: readonly ProcessedCard[] = [
  {
    lines: [
      "> vision_input: detected_object_sphere",
      "> cot_init: plan_approach_vector",
      "> reasoning: calculate_torque_limits",
      "> action_tokens: [0.12, -0.44, 0.89, 0.0]",
      "> feedback: contact_established",
    ],
    task: "Task: Precise Placement",
    description: "Model decomposes high-level instructions into executable joint-space vectors with continuous feedback loops.",
  },
  {
    lines: [
      "> state: walking_gait_unstable",
      "> loc_aware: adjust_center_of_mass",
      "> reasoning: shift_left_pedal_pressure",
      "> action_tokens: [0.05, 0.22, -0.11, 0.9]",
      "> status: balance_restored",
    ],
    task: "Task: Terrain Recovery",
    description: "Integration of IMU data into the transformer context window allows for immediate postural correction.",
  },
  {
    lines: [
      '> user_input: "fetch the blue beaker"',
      "> visual_search: active_scan",
      "> cot: identify_beaker_depth_map",
      "> reasoning: grasp_point_optimization",
      "> action_tokens: [0.88, 0.12, -0.34, 0.5]",
    ],
    task: "Task: Zero-Shot Fetch",
    description: "Natural language instruction to complex action mapping via internal semantic reasoning chain.",
  },
] as const;

export const lineChart: LineChartSpec = {
  path: "M0,130 Q100,120 200,80 T400,20",
  circles: [
    { cx: 200, cy: 80 },
    { cx: 400, cy: 20 },
  ],
  texts: [
    { x: 5, y: 145, text: "L1: BASIC" },
    { x: 180, y: 145, text: "L5: DYNAMIC" },
    { x: 360, y: 145, text: "L10: ADAPTIVE" },
  ],
  badge: "94.2% Peak Efficiency",
  caption: "Performance remains logarithmic even as spatial complexity increases, demonstrating the robustness of LA-CoT reasoning.",
  overlayClass: "bg-gradient-to-br",
  legacyLowercaseViewBox: true,
};

export const barChart: BarChartSpec = {
  bars: [
    { heightClass: "h-[85%]", label: "SOTA-VLA" },
    { heightClass: "h-[45%]", label: "PRAGYAVLA", emphasised: true },
    { heightClass: "h-[95%]", label: "BASE-TRANSFORMER" },
  ],
  badge: "~42ms Optimized Path",
  caption:
    "PragyaVLA achieves a 2.4x latency reduction compared to existing vision-action architectures by offloading non-critical reasoning to background threads.",
};
