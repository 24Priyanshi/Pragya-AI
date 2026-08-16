import type { BarChartSpec, HeroSpec, LineChartSpec, ProcessedCard, RawInputTile, StatCard } from "@/types/page";

/** Content of pages/kalamprotocol.html, verbatim. Remote image URLs are dead — BUG-21. */

export const hero: HeroSpec = {
  src: "/kalamprotocol_hero.png",
  alt: "Kalam Protocol hero visualization",
  mode: "auto",
};

export const stats: readonly StatCard[] = [
  { label: "Alignment Convergence", value: "0.99", caption: "Metric stabilized across 10k epochs." },
  { label: "Policy Violation", value: "<0.1%", caption: "Critical boundary breaches inhibited." },
  { label: "Verification Latency", value: "0.4ms", caption: "Real-time overhead per inference cycle." },
  { label: "Reliability Index", value: "99.8%", caption: "Sustained performance in adversarial envs." },
] as const;

export const rawInputs: readonly RawInputTile[] = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9Y2amRxYRuYF_a_jHwwoSC4IJPPoLf5I9eYVN1ddOazYWQqbpfSllX5B-okdNc-d1ZG0eqcx-sKwYkOL-055Sp0Vgp-u5GUghoichMi8svJ7t565kbDdH6eYCIvCh3iFpMhlqn9ktKgLWYb95d0lzq9gap-R8jx_04Np3LD7Kfup7L2X29jzfUq6PMB3RoSNogBGB0z-ra46dTieegUzM8MfPa9_K5u1MCZKMaiFURM7dNNWxxNkwHCsD0DH1P9bmrEmDiambpUBB",
    alt: "Abstract technical background with digital circuit patterns",
    caption: "Stream: Spatial Env Alpha",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBJKF77Ax_qCJhANb8nCIHtQ4E4XYCP6LuQuiCiHQH6-wDS1vK9K-99apYuzmH7YwZXU3L1ySQ7lcF4sqbzMC0rPVRf1lm7vEOU8h26gf3DdW1o327leMVzCBHSK6v__Fc40XGTP5dueXo0lh75Z7TmNl0_3AAJYy8R0ah7yGxfaB-hIGkHkVrcaGjDyE1oHo2UpBaqBiyO0A7b4taz1tPTC40SkhRiseyS9-or8xnmJRRPtmpFiBljhyxBYVyIU4HctT7SlJ4FmuB",
    alt: "Futuristic data stream visualization on dark surface",
    caption: "Stream: Cross-Modal Input",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0QDDhR3pJIipvUYe3Vzh0PcuC529_WONu0bjnfnOXLrISJrxczPa4EnMncZJzT0AZNm2pT3cpFYMtbuzFaOTbiD89YTwG48iut_iIVAU3JUIaYIAwO8LU0z9DGFPnHgcm4tqexipmxJZmhdIyjdS0WsJ5QgiulWHGkAiSaUd0UprReGok7ai14JqzfGMsu6J0qNSft9Lwz_-_TkqDHxihhW1m7C6UPJAuJjzFDA2pHaGyRVtIyYekFay6MKCL2rXWifj3-WO6GJPz",
    alt: "Macro photo of electronic hardware components",
    caption: "Stream: Temporal Sequence 09",
  },
] as const;

export const processed: readonly ProcessedCard[] = [
  {
    lines: [
      "> policy_graph: loaded",
      "> causal_edges: validated",
      "> boundary_check: pass",
      "> deviation_score: 0.01",
      "> verdict: verified",
    ],
    task: "Task: Constraint Verification",
    description: "Rule and policy constraints are evaluated before every action path is executed.",
  },
  {
    lines: [
      "> token_trace: monitored",
      "> threat_model: active",
      "> sandbox_route: isolated",
      "> rollback_guard: ready",
      "> status: stable",
    ],
    task: "Task: Runtime Guardrails",
    description: "Execution-time checks keep autonomous behavior bounded in uncertain environments.",
  },
  {
    lines: [
      "> network_mesh: synchronized",
      "> consensus_rounds: 128",
      "> anomaly_filter: running",
      "> alignment_index: 99.8",
      "> state: aligned",
    ],
    task: "Task: Mesh Alignment Control",
    description: "Distributed systems remain synchronized under policy constraints through deterministic consensus checks.",
  },
] as const;

export const lineChart: LineChartSpec = {
  path: "M0,130 Q100,115 200,76 T400,12",
  circles: [
    { cx: 200, cy: 76 },
    { cx: 400, cy: 12 },
  ],
  texts: [
    { x: 5, y: 145, text: "T-0" },
    { x: 180, y: 145, text: "T-500" },
    { x: 360, y: 145, text: "T-1000" },
  ],
  badge: "Temporal Alignment Convergence",
  caption: "Alignment constraints converge rapidly even under distribution shift, reducing policy drift over long execution windows.",
  overlayClass: "bg-gradient-to-br",
};

export const barChart: BarChartSpec = {
  bars: [
    { heightClass: "h-[98%]", label: "ENV_A" },
    { heightClass: "h-[92%]", label: "ENV_B" },
    { heightClass: "h-[95%]", label: "ENV_C", emphasised: true },
  ],
  badge: "Cross-Env Reliability",
  caption: "Reliability remains above 90% across heterogeneous deployments, validating policy consistency at scale.",
};
