import type { BarChartSpec, HeroSpec, LineChartSpec, ProcessedCard, RawInputTile, StatCard } from "@/types/page";

/**
 * Content of pages/kalarisena.html, verbatim.
 *
 * Its Analysis 01 is the odd one out: a straight polyline with a single marker
 * and an inline value label, rather than the quadratic curve with three axis
 * labels used on the other five pages.
 */

export const hero: HeroSpec = {
  src: "/kalarisena_hero.png",
  alt: "KalariSena hero visualization",
  mode: "auto",
};

export const problemQuote =
  "India-facing deployment demands humanoids that can move and respond in crowded public spaces, disaster zones, industrial corridors, high-footfall transit hubs, and security-sensitive environments.";

export const stats: readonly StatCard[] = [
  { label: "Dynamic Stability", value: "94.2%", caption: "Success Rate in High-G Rotations" },
  { label: "Unique Samples", value: "12k+", caption: "Annotated Martial Motion Paths" },
  { label: "Recovery Rate", value: "0.042", caption: "MSE Post-Collision Restoration" },
  { label: "Dataset Volume", value: "4.2TB", caption: "Raw 4K Sync-Multi-View Stream" },
] as const;

export const rawInputs: readonly RawInputTile[] = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9TByTztXEM0r23ZFa1mZ4tosdtiamRrNQzonMIf2jYHE3aZA-n4OomCXi4DrCSE9AhoEbeRGy4XUEPhxEHpWvFHMrH3Sgl-veT1ovy42QQWLRWxvYdylfuggP6_x4OQa4zMgJFBr9lK0bgU9NCQjQu4ZAFIYdDRCt8l3OtbME_EBBSgwdH9o3J1y7RHcabyt6jQtwxKHGm_o_UQbiAKcoV9RTkpiTS0E7aLsBM34uHuEfhPgvWtdeJLd-dSY88kfPgrfcQuoY6dOo",
    alt: "Kalaripayattu master performing high kick motion",
    caption: "Scenario: Dynamic Kick Recovery",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ99HtacF1_593R4k0iXamRmIn7LYkFx4M1xZ7is9aE4M4wi7j7WXhFJqkoJmmN5BZFQUzohTv-hjq5ksbcv67hfp6cEM6LyaXSnBWk73jG2Mb03yasVPVkydQkOik1Mqz8wGSnaLONUEWdLusXfNrhStBi8HsSljjPXqA4KsPSlDapM-u-CP1W3pgukMXtTE8Sp88G3myx_wg90jcmKsfXUzJTznL7A_dDrn1DfNGVBkS2PezKPgYIYBDy3hnxJAtfyI7vdJFCs5s",
    alt: "Ancient martial artist in low defensive stance",
    caption: "Scenario: Low-Posture Balance",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZTFOh26Mdx5k5ck_oiEmVqwcElU2fSzm3A3OrQSN5fhX2VNVbBAKfk9kinWZIjqOmN4GBsg6cLVgsLNYXK07aUKg4e6hCRVZP9EqgQIzzo9g9nim_DCxDe9mCQFKPNwFdQr7wixK0cYquLN-whyDWo3btRGzXoB0qo2TuM_WGVkvchGSn1_9aeX80KMTkymlToxB1DED1wLr06MFcWyiupiKEldBGNYOKLSEvYaRhRychkZzPeK2GeATlv-VTXbdf99CH4yhVuIdy",
    alt: "Traditional Indian martial arts weapon forms",
    caption: "Scenario: Weapon Form Dynamics",
  },
] as const;

export const processed: readonly ProcessedCard[] = [
  {
    lines: [
      "> pose_stream: cam_alpha_01",
      "> keypoints_detected: 124",
      "> joint_confidence: 0.96",
      "> error_compensation: active",
      "> stability_score: high",
    ],
    task: "Task: Skeleton Extraction",
    description: "Multi-view motion capture is fused into stable skeletal tracks for fast retargeting.",
  },
  {
    lines: [
      "> retarget_mode: humanoid_v3",
      "> center_of_mass: corrected",
      "> contact_solver: enabled",
      "> fall_event: blocked",
      "> output_state: recovered",
    ],
    task: "Task: Humanoid Retargeting",
    description: "The pipeline projects martial trajectories onto humanoid rigs with resilient postural correction.",
  },
  {
    lines: [
      "> force_tensor: computed",
      "> support_polygon: tracked",
      "> impact_channel: attenuated",
      "> restore_time: 42ms",
      "> mse: 0.042",
    ],
    task: "Task: Force Distribution Map",
    description: "Dynamics-aware force modeling helps agents recover from abrupt perturbations without collapse.",
  },
] as const;

export const lineChart: LineChartSpec = {
  path: "M0,130 L50,110 L100,125 L150,80 L200,60 L250,75 L300,30 L350,15 L400,10",
  circles: [{ cx: 300, cy: 30 }],
  texts: [{ x: 310, y: 25, text: "0.042 OPT" }],
  badge: "Tracking Error (MSE)",
  caption: "Training converges to low error under aggressive motion transitions, enabling stable real-time recovery.",
  overlayClass: "bg-gradient-to-br",
};

export const barChart: BarChartSpec = {
  bars: [
    { heightClass: "h-[75%]", label: "Control" },
    { heightClass: "h-[82%]", label: "Sena-v1" },
    { heightClass: "h-[95%]", label: "Current", emphasised: true },
  ],
  badge: "Stability Metric",
  caption: "KalariSena achieves stronger balance retention compared to previous baselines across perturbation benchmarks.",
};
