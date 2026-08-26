import type { EvidenceTile, HeroSegment, ProtocolRow } from "@/types/content";

/**
 * Content of pages/landing.html, transcribed verbatim.
 *
 * The two lh3.googleusercontent.com URLs below are dead (HTTP 404 as of
 * 2026-08-16) — see BUG-21. They are kept exactly as the original had them so
 * the page renders the same broken tiles the original renders today.
 */

const RAW_URBAN =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCIkkfyZ9BFfyRxL5TXj6Rb74fzMmyi0Rzjja6zV2QBAdLuC_3-JzJkmjX650A4NLXPmDETZEwtSaI3bW4_rpC_5H4KpkkJvbSYU3vAawqhcsAItGi4YxGRwJd_vaW-CJlDU6Hqh0eKs4Nd5N2wId-IPzdVXEQ4tJ8m2Q968qDt8VKfhuHSoV69gopSwG_TAU9JLzHXiqZRXv5_FXgg3m_5fycxKoliud3usWXsW0EYYPfZbHaD_adhOnexhDRr8OkWyQAvfVU8_7N9";

const RAW_HUMANOID =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBfn6pJxHvNIyKkbQG1uOo-xtfSzqefbQWKDgkLqBsEu5ruCobypgxnX9eGSyrzT_TKVUxXuiTflo-h63UlbX8fm0nXVIhYKG1KTaBZ-PyFRnbpyp4FvY84KADO8brP0x-L6LzVIPXoAnT4VFmayCc7giOYs57ZkLbcMu5BQcNYUsEBcUzqk_tLi8Nd5GhXYok89h2mszy2BOGVnpHSdMdHWFneGVodo_mrNOkA6hVIA6tSIYFzMs5ifM1CCPXA345HrXgQZ1d53mhq";

const STRONG = "font-semibold text-[--primary]";
const MEDIUM = "text-[--primary] font-medium";

export const heroParagraph: readonly HeroSegment[] = [
  { text: "Building " },
  { text: "Vision-Language-Action (VLA)", className: STRONG },
  { text: " models for " },
  { text: "India", className: STRONG },
  { text: ", grounded in " },
  { text: "Indian-language instruction", className: MEDIUM },
  { text: ", built to navigate " },
  { text: "Indian terrains", className: MEDIUM },
  { text: ", aligned with " },
  { text: "Indian ethical principles", className: MEDIUM },
  { text: " through the " },
  { text: "Kalam Protocol", className: STRONG },
  { text: ", and trained for defense using principles of " },
  { text: "Kalaripayattu", className: STRONG },
  { text: "." },
] as const;

export const protocolRows: readonly ProtocolRow[] = [
  {
    title: "Dense World",
    href: "https://huggingface.co/spaces/Pragya-AI/denseworld",
    image: "/denseWorld_new.png",
    imageAlt: "Dense urban mobility and crowd dynamics",
    imageSide: "right",
    imageCellRelative: true,
    imageCellBg: "bg-slate-50",
    body: [
      { text: "DENSEWORLD", em: true },
      { text: " is our ongoing " },
      { text: "endeavor", em: true },
      { text: " to develop world models for " },
      { text: "populous, crowded urban environments in the Global South", em: true },
      { text: ". Built from " },
      { text: "street-level, pedestrian, and aerial data", em: true },
      { text: " collected across " },
      { text: "Tier-1 and Tier-2 cities of India", em: true },
      { text: ", it learns structured representations of " },
      { text: "scene geometry, motion, hazards, traversability, and crowd dynamics", em: true },
      {
        text: " under diverse lighting, weather, and seasonal conditions. Rather than treating perception as static recognition, ",
      },
      { text: "DENSEWORLD", em: true },
      { text: " models the environment as an " },
      { text: "evolving dynamical system", em: true },
      {
        text: "—capturing what is navigable, what is risky, what is changing, and what is likely to happen next—thereby enabling downstream ",
      },
      { text: "Vision-Language-Action (VLA) systems", em: true },
      { text: " to operate with robustness, prediction, and situational awareness in dense real-world settings." },
    ],
  },
  {
    title: "FactorJEPA",
    href: "https://kapilw25.github.io/factorjepa/",
    image: "/factorjepa_new.png",
    imageAlt: "Neural Architecture",
    imageSide: "left",
    imageCellRelative: true,
    imageCellBg: "bg-surface-container-low",
    body: [
      { text: "FACTORJEPA", em: true },
      { text: " is a " },
      { text: "factorized Joint Embedding Predictive Architecture", em: true },
      {
        text: " designed to learn structured world representations for complex real-world environments. Instead of encoding scenes as a single monolithic latent state, it decomposes perception into disentangled predictive factors capturing ",
      },
      { text: "geometry, motion, agents, objects, and environmental context", em: true },
      { text: ". This factorized design supports stronger " },
      { text: "robustness, compositional generalization, and interpretability", em: true },
      {
        text: ", enabling world models to reason more effectively about interaction, change, and uncertainty in dense urban settings.",
      },
    ],
  },
  {
    title: "PragyaVLA",
    href: "https://pragyaai.github.io/PragyaVLA/",
    image: "/pragyaVla_new.png",
    imageAlt: "Embodied AI",
    imageSide: "right",
    imageCellRelative: false,
    imageCellBg: "bg-surface-container-low",
    body: [
      { text: "PRAGYA-VLA", em: true },
      { text: " is the " },
      { text: "sovereign Vision-Language-Action model", em: true },
      { text: " at the core of our embodied AI stack, designed for grounded decision-making in " },
      { text: "dense, dynamic Indian terrains", em: true },
      { text: ". It unifies " },
      { text: "visual perception, Indian-language instruction understanding, embodied reasoning, and action generation", em: true },
      {
        text: " within a single framework, enabling robots to interpret commands, reason about their surroundings, and execute safe, context-aware behavior. By coupling ",
      },
      { text: "Indian-language grounding", em: true },
      { text: " with " },
      { text: "terrain-aware actionability", em: true },
      { text: ", " },
      { text: "PRAGYA-VLA", em: true },
      { text: " is designed to support robust embodied intelligence for real-world deployment in challenging public settings." },
    ],
  },
  {
    title: "DenseWalk Browser",
    href: "https://densewalk-browser.dramitavadas.chatgpt.site/",
    image: "/denseWalk_new.png",
    imageAlt: "Humanoid navigation in dense urban traffic",
    imageSide: "left",
    imageCellRelative: true,
    imageCellBg: "bg-surface-container-low",
    body: [
      { text: "DENSEWALK BROWSER", em: true },
      { text: " is our " },
      { text: "interactive data-and-benchmark pipeline", em: true },
      { text: " for short-horizon humanoid navigation in " },
      { text: "populous, crowded, and chaotic Global South urban environments", em: true },
      { text: ". From " },
      { text: "200 hours of egocentric walk-through video", em: true },
      { text: ", it combines " },
      { text: "monocular depth, agent detection and tracking, optical flow, and traversability-based gap inference", em: true },
      { text: " to derive navigation decisions such as " },
      { text: "advance, yield, sidestep, slow, and wait", em: true },
      { text: ". We pair these motion-grounded actions with language supervision and evaluate across dense bottlenecks and dynamically narrowing free space." },
    ],
  },
  {
    title: "Pragya-Dex",
    href: "https://pragya-dex.vercel.app/",
    image: "/pragya_dex.png",
    imageAlt: "Pragya-Dex Platform",
    imageSide: "right",
    imageCellRelative: false,
    imageCellBg: "bg-surface-container-low",
    body: [
      { text: "PRAGYA-DEX", em: true },
      { text: " is our " },
      { text: "centralized web interface and benchmarking platform", em: true },
      { text: " built for deploying, testing, and tracking multimodal foundation models and robotic skill policies across diverse test suites." },
    ],
  },
  {
    title: "Kalam Protocol",
    href: "#",
    image: "/kalamProtocol_new.png",
    imageAlt: "Network Mesh",
    imageSide: "left",
    imageCellRelative: false,
    imageCellBg: "bg-surface-container-low",
    body: [
      { text: "KALAM Protocol", em: true },
      { text: " is our " },
      { text: "behavioral alignment and governance framework", em: true },
      { text: " for embodied AI systems operating in sensitive real-world environments. It is designed to align robot perception, reasoning, and action with " },
      { text: "safety, reliability, human oversight, and mission-aware constraints", em: true },
      {
        text: ", especially in dense public settings where errors can have real operational consequences. Rather than treating alignment as a post hoc filter, ",
      },
      { text: "KALAM Protocol", em: true },
      { text: " embeds " },
      { text: "ethical control, deployment discipline, and decision accountability", em: true },
      { text: " into the action loop, enabling sovereign robotic systems to act with restraint, situational awareness, and trustworthiness." },
    ],
  },
  {
    title: "KalariSena",
    href: "#",
    image: "/kalarisena_new.png",
    imageAlt: "Motion Tracking",
    imageSide: "right",
    imageCellRelative: false,
    imageCellBg: "bg-surface-container-low",
    body: [
      { text: "KalariSena", em: true },
      { text: " is our " },
      { text: "movement-intelligence and embodied skills program", em: true },
      { text: " for humanoid robotics, centered on " },
      { text: "teaching Indian martial art—Kalaripayattu—to robots", em: true },
      { text: ". It translates the principles of " },
      { text: "agility, balance, reflexes, defensive movement, rapid response, and whole-body coordination", em: true },
      {
        text: " into machine embodiment, enabling humanoids to move with greater precision, control, and physical discipline in complex real-world environments. By grounding robotic motion in a structured tradition of combat-tested movement, ",
      },
      { text: "KalariSena", em: true },
      { text: " aims to build " },
      { text: "faster, more resilient, and operationally capable", em: true },
      { text: " humanoid systems for deployment in " },
      {
        text: "railways, airports, Kumbh Mela-scale gatherings, crowd-control scenarios, security at Indian monuments, and other dense public settings",
        em: true,
      },
      { text: " where mobility, responsiveness, and embodied reliability are critical." },
    ],
  },
] as const;

export const evidenceTiles: readonly EvidenceTile[] = [
  {
    rawSrc: RAW_URBAN,
    rawAlt: "Raw Sensor Data",
    rawBadge: "Raw Input",
    processedSrc: RAW_URBAN,
    processedAlt: "Spatial Map",
    processedBadge: "FactorJEPA Map",
    heading: "Urban Occlusion Benchmarks",
    caption: "FactorJEPA successfully reconstructing 3D volumes in 98% occlusion scenarios in dense traffic.",
  },
  {
    rawSrc: RAW_HUMANOID,
    rawAlt: "Humanoid Raw",
    rawBadge: "Kinematic Input",
    processedSrc: RAW_HUMANOID,
    processedAlt: "Resilience Map",
    processedBadge: "KalariSena Policy",
    heading: "Zero-Shot Locomotion Transfer",
    caption: "PragyaVLA + KalariSena achieving 100% stability on uneven simulated and real hardware surfaces.",
  },
  {
    rawSrc: RAW_URBAN,
    rawAlt: "Research Talks",
    rawBadge: "Talks & Demos",
    processedSrc: RAW_URBAN,
    processedAlt: "YouTube Series",
    processedBadge: "Video Series",
    heading: "Lab Talks & Video Demonstrations",
    caption: "Watch our comprehensive video playlist covering project walkthroughs, model evaluations, and embodied AI demos.",
  },
] as const;
