import type { NavLink, SubmenuConfig, SubmenuItem } from "@/types/nav";

/**
 * Verbatim port of the `submenuConfig` and `links` objects in js/navbar.js.
 *
 * Every string — including the typographic quotes in the DENSEWORLD and
 * PragyaVLA answers — is copied exactly. Keys changed from "denseworld.html"
 * to the new clean route; nothing else.
 */

/** The same three questions appear under every product. */
const QUESTION_ITEMS: readonly SubmenuItem[] = [
  { label: "What is it?", href: "#", icon: "info" },
  { label: "What's the necessity?", href: "#", icon: "insights" },
  { label: "What's the Leap?", href: "#", icon: "rocket_launch" },
] as const;

export const submenuConfig: Readonly<Record<string, SubmenuConfig>> = {
  "/denseworld": {
    title: "Dense World",
    columns: { apis: QUESTION_ITEMS },
    answers: {
      "What is it?": "World Models for Populous, Crowded, and Chaotic Global South",
      "What's the necessity?":
        "Current “world model” progress is largely validated on clean, structured, low-density Western environments, and it often breaks down for the chaotic Global South scenes—where dense occlusion, mixed traffic, informal right-of-way negotiation, extreme lighting and weather, and long-tail objects and signage dominate.",
      "What's the Leap?":
        "Because current world-model progress is built on clean, low-density settings and often breaks in the DENSEWORLD regime; this demands systematic, large-scale study rather than incremental benchmark gains.",
    },
    featuredCard: {
      title: "DENSEWORLD",
      description: "Real-time crowd dynamics",
      href: "/denseworld",
      image: "/denseWorld_new.png",
    },
  },
  "/densewalk": {
    title: "DenseWalk",
    columns: { apis: QUESTION_ITEMS },
    answers: {
      "What is it?":
        "A data-and-benchmark pipeline for short-horizon humanoid navigation in populous, crowded, and chaotic Global South urban environments.",
      "What's the necessity?":
        "Because navigation progress is still under-studied in India-like mixed-agent streets where weak lane structure, persistent occlusion, and shifting right-of-way demand continuous local decisions.",
      "What's the Leap?":
        "From 200 hours of egocentric walk-through video to motion-grounded action-and-language supervision, then benchmarked in dense mixed-agent Isaac Sim scenarios with safety and social-compliance metrics.",
    },
    featuredCard: {
      title: "DENSEWALK",
      description: "Humanoid navigation benchmark",
      href: "/densewalk",
      image: "/denseWalk_new.png",
    },
  },
  "/factorjepa": {
    title: "FactorJEPA",
    columns: { apis: QUESTION_ITEMS },
    answers: {
      "What is it?":
        "A factorized Joint-Embedding Predictive Architecture that decomposes predictive embeddings into layout, entities, interactions, and visibility-aware reliability.",
      "What's the necessity?":
        "Because standard JEPA objectives can achieve strong predictive performance while leaving the latent world structure implicitly entangled, especially under dense occlusion, heterogeneous agents, and partial observability.",
      "What's the Leap?":
        "From monolithic embedding prediction to structured, factorized world modeling—where compositionality, interaction structure, and observability are treated as first-class modeling primitives.",
    },
    featuredCard: {
      title: "FactorJEPA",
      description: "Joint-Embedding Predictive Architecture",
      href: "/factorjepa",
      image: "/factorjepa_new.png",
    },
  },
  "/pragyavla": {
    title: "PragyaVLA",
    columns: { apis: QUESTION_ITEMS },
    answers: {
      "What is it?":
        "India’s first sovereign VLA model for robot navigation—an instruction-finetuned framework that unifies multilingual grounding, locomotion-aware reasoning, and safety-conditioned control.",
      "What's the necessity?":
        "Because current VLA systems are still optimized largely for manipulation-centric, clean indoor benchmarks, leaving locomotion feasibility, partial observability, terrain uncertainty, and safety-aware abstention under-modeled.",
      "What's the Leap?":
        "From direct instruction-to-action policies to structured embodied deliberation, where traversability, body-feasibility, hidden-state inference, and risk-aware abstention become explicit components of navigation control.",
    },
    featuredCard: {
      title: "PragyaVLA",
      description: "Embodied AI for Robotics",
      href: "/pragyavla",
      image: "/pragyavla_hero_v2.png",
    },
  },
  "/kalamprotocol": {
    title: "Kalam Protocol",
    columns: { apis: QUESTION_ITEMS },
    answers: {
      "What is it?": "A safety, alignment, and governance protocol for robots operating in real-world environments.",
      "What's the necessity?":
        "Because deployment in public infrastructure, industry, defense, and high-footfall civilian spaces demands robotic systems that are not only capable, but also safe, interpretable, and protocol-governed.",
      "What's the Leap?":
        "From model-level capability to deployment-ready assurance—where alignment, safety constraints, and operational conduct are built into the robotic stack.",
    },
    featuredCard: {
      title: "KalamProtocol",
      description: "Open communication standard",
      href: "/kalamprotocol",
      image: "/kalamProtocol_new.png",
    },
  },
  "/kalarisena": {
    title: "KalariSena",
    columns: { apis: QUESTION_ITEMS },
    answers: {
      "What is it?":
        "A movement-intelligence framework for humanoid robots, inspired by Kalaripayattu and grounded in strategic embodied response.",
      "What's the necessity?":
        "Because India-facing deployment demands humanoids that can move and respond in crowded public spaces, disaster zones, industrial corridors, high-footfall transit hubs, and security-sensitive environments.",
      "What's the Leap?":
        "From generic humanoid control to Kalaripayattu-inspired movement intelligence for strategic, context-aware real-world deployment.",
    },
    featuredCard: {
      title: "KalariSena",
      description: "Strategic response generation",
      href: "/kalarisena",
      image: "/kalarisena_new.png",
    },
  },
  "/pragyadex": {
    title: "PragyaDex",
    columns: { apis: QUESTION_ITEMS },
    answers: {
      "What is it?":
        "A paired human-hand-to-robot-hand dexterity skill gallery — 400 examples across 8 everyday domains, each annotated with primitive sequences, objects, materials, and a robot transfer goal.",
      "What's the necessity?":
        "Because dexterous manipulation policies need dense, richly annotated human-to-robot retargeting examples across everyday domains like cooking and object handling, not just isolated single-task demonstrations.",
      "What's the Leap?":
        "From isolated demo clips to a structured, browsable gallery pairing real human-hand video with retargeted dexterous robot execution, annotated end-to-end for skill transfer.",
    },
    featuredCard: {
      title: "PragyaDex",
      description: "Dexterity skill gallery",
      href: "/pragyadex",
      image: "/pragyadex_hero_v2.png",
    },
  },
  "/pragyaspace": {
    title: "PragyaSpace",
    columns: { apis: QUESTION_ITEMS },
    answers: {
      "What is it?":
        "A shared spatial workspace where PragyaAI's embodied-AI projects — world models, navigation, manipulation, and dialogue — come together around a common map of the physical environment.",
      "What's the necessity?":
        "Because a robot that perceives, walks, talks, and manipulates through separate, disconnected systems can't reason about one consistent physical space — its models of the world drift apart from each other.",
      "What's the Leap?":
        "From siloed models to a unified spatial substrate, where every PragyaAI capability reads from and writes to the same live representation of the world.",
    },
    featuredCard: {
      title: "PragyaSpace",
      description: "Unified spatial workspace",
      href: "/pragyaspace",
    },
  },
  "/contributors": {
    title: "Contributors",
    columns: { apis: QUESTION_ITEMS },
    answers: {
      "What is it?": "The people behind PragyaAI — researchers and engineers building every project in the lab.",
      "What's the necessity?":
        "Because none of this work happens in isolation; it's the product of a small team working across models, data, and deployment.",
      "What's the Leap?": "From individual expertise to a shared lab, working together across every PragyaAI project.",
    },
    featuredCard: {
      title: "Contributors",
      description: "The team behind PragyaAI",
      href: "/contributors",
    },
  },
} as const;

/**
 * Navbar order — changed on request (2026-08-16), a deliberate deviation from
 * the original. See MIGRATION.md D-9.
 *
 * Original order was:
 *   DENSEWORLD, FactorJEPA, PragyaVLA, DENSEWALK, KalamProtocol, KalariSena
 */
export const navLinks: readonly NavLink[] = [
  { label: "DENSEWORLD", href: "/denseworld", key: "/denseworld" },
  { label: "DENSEWALK", href: "/densewalk", key: "/densewalk" },
  { label: "PragyaVLA", href: "/pragyavla", key: "/pragyavla" },
  { label: "PragyaDex", href: "/pragyadex", key: "/pragyadex" },
  { label: "KalariSena", href: "/kalarisena", key: "/kalarisena" },
  { label: "PragyaSpace", href: "/pragyaspace", key: "/pragyaspace" },
  { label: "KalamProtocol", href: "/kalamprotocol", key: "/kalamprotocol" },
] as const;

/** Styled distinctly from the project tabs — see NavLinks. */
export const contributorsLink: NavLink = { label: "Contributors", href: "/contributors", key: "/contributors" };

/**
 * Hidden from the navbar for now — "keep FactorJEPA silent, we may present it
 * later" (2026-08-16).
 *
 * Nothing else about FactorJEPA was removed: the /factorjepa route and page
 * still build and are directly reachable, its `submenuConfig` entry is intact,
 * and the landing page still has its "Core Protocols" row linking out to
 * kapilw25.github.io. Only the navbar item is gone.
 *
 * To bring it back, move this entry into `navLinks` at the desired position.
 */
export const hiddenNavLinks: readonly NavLink[] = [
  { label: "FactorJEPA", href: "/factorjepa", key: "/factorjepa" },
] as const;

/** Exact class strings from js/navbar.js. */
export const NAV_LINK_ACTIVE_CLASS = "text-on-surface font-medium border-b border-outline-variant/20";
export const NAV_LINK_INACTIVE_CLASS = "text-on-surface-variant hover:text-on-surface transition-opacity duration-300";
