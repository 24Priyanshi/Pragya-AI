import type { BarChartSpec, HeroSpec, LineChartSpec, ProcessedCard, RawInputTile, StatCard } from "@/types/page";

/** Content of pages/factorjepa.html, verbatim. Remote image URLs are dead — BUG-21. */

export const hero: HeroSpec = {
  src: "/factorjepa_hero_prev.png",
  alt: "FactorJEPA hero visualization",
  mode: "auto",
};

export const stats: readonly StatCard[] = [
  { label: "Latent Accuracy", value: "98.2%", caption: "Validation on Kolkata Traffic Dataset" },
  { label: "Inference Latency", value: "12ms", caption: "Optimized for Edge-TPU Deployment" },
  { label: "Weighted Factors", value: "4.2B", caption: "Scalable Spatial Embeddings" },
  { label: "Training Hours", value: "1.2M", caption: "Cumulative A100 Compute Hours" },
] as const;

export const rawInputs: readonly RawInputTile[] = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhAXhPJWwHYSLvrS9y-KlRtmT5lSVsm1GQpdGkP72sM73qW4-WZwcBn4VNO2_np3Mt1XC4mPeLr2ah7k89JL-cQtM1AesxNMgT_IdyiHd5fJA4CTPPCqvAKXnpihZjwMbZAUEw0nFqGNQHyI6STfhUz42Jy9yco9WlsGlB5n2FtwTC12KB_i3mMYKE2qZjJGQL1J9UE-O1e_H3GrK4Kvbq0BfBYh2Mtm62UkryHBYEhy4HxaZNKsTArnNslTm5qQ5hI4AKC_ARzr8m",
    alt: "Busy urban street in South Asia with rickshaws and markets",
    caption: "Scenario: Dense Urban Occlusion",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr1h4htnkuc0ccQ3-hEqcZoAHusy2fd3nl5pX0Au_p5syJREC27lepKE7oS19KbvqgMBxO9KdNfq6zyFBX1SvyRdgUpYIdhWFKxiZ1N_ljEEARMjkY3XDds60EyWNowIL2EkF5KFONBvrOlRmuYfOKr83-hxSYN7yojOoW-GjnEfsLaoiDJS5JXnBFI8SvLB28NCo-UijpZ3QBaVtMmXIyay9lrz0C97kWZK2Dc-bpA0kQ6kSRKK-m8TGlOSOa5U2-pNhKQFR4c6YS",
    alt: "Dynamic movement in a crowded city square",
    caption: "Scenario: Multi-Agent Interactions",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYHoYo8HAP0fO_Hp9_j_x4p1RaJvrRmbk_SrD7YMoW-kimOgUn6uqer3WHnf0F4r5AYL-5S7psvVaGtmTnahazqQe216v9z3xTznfOCvc9SWYQ1Ybq6Ji7GVjLC-Tb1vOE3gjx4Z7-fjyjcELpZWwtEAhnpF77In2PWAY2fLLAXZA_rQmeYKwQ5Vwx0ma6KkPY5xtlXrOQnl7kbaLcr0-YFn453ssuy848ZWkWKTzHx7zXsSemi_RQ-nF74i3efz1E2e7v6HY6MUgp",
    alt: "Complex spatial interaction in a narrow alleyway",
    caption: "Scenario: Narrow-Path Navigation",
  },
] as const;

export const processed: readonly ProcessedCard[] = [
  {
    lines: [
      "> frame_stack: 12",
      "> latent_factorize: geometry, semantics, flow",
      "> occlusion_mask: enabled",
      "> predictor_state: converged",
      "> confidence: 0.982",
    ],
    task: "Task: Occlusion Recovery",
    description: "Predictive embeddings remain stable in traffic scenes where most objects are partially hidden.",
  },
  {
    lines: [
      "> trajectory_bank: updated",
      "> motion_prior: crowd-aware",
      "> dynamic_agents: 14",
      "> planning_horizon: 3.2s",
      "> collision_risk: low",
    ],
    task: "Task: Crowd Dynamics Forecast",
    description: "Factorized state-space modeling improves multi-agent motion forecasting under chaotic urban conditions.",
  },
  {
    lines: [
      "> semantic_map: refreshed",
      "> lane_width_est: 1.3m",
      "> affordance_scan: active",
      "> route_hypothesis: 4",
      "> selected_path: #3",
    ],
    task: "Task: Lane-Scale Routing",
    description: "The model discovers feasible paths through constrained alleys with fine-grained semantic understanding.",
  },
] as const;

export const lineChart: LineChartSpec = {
  path: "M0,130 Q100,118 200,78 T400,20",
  circles: [
    { cx: 200, cy: 78 },
    { cx: 400, cy: 20 },
  ],
  texts: [
    { x: 5, y: 145, text: "T: 0.0" },
    { x: 180, y: 145, text: "T: 5.0" },
    { x: 360, y: 145, text: "T: 10.0" },
  ],
  badge: "Semantic Drift Stability",
  caption: "Long-range latent predictions remain stable under heavy visual clutter, extending useful forecasting windows for planning.",
  overlayClass: "bg-gradient-to-br",
};

export const barChart: BarChartSpec = {
  bars: [
    { heightClass: "h-[65%]", label: "Baseline" },
    { heightClass: "h-[88%]", label: "FactorJEPA", emphasised: true },
    { heightClass: "h-[72%]", label: "Standard JEPA" },
  ],
  badge: "Density Generalization",
  caption: "Factorized latent decomposition sustains accuracy in high-density scenes without exponential compute growth.",
};
