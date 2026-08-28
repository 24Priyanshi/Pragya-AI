import type { HeroSpec, StatCard } from "@/types/page";

/**
 * PragyaDex — the paired dexterity skill gallery at https://pragya-dex.vercel.app/.
 *
 * Page structure mirrors PragyaVLA's (2026-08-28): a plain full-bleed hero,
 * then "The Problem" (pull-quote only) and "Dataset" (the gallery) as
 * always-visible sections, no tabs, no bottom Contributors (that lives on its
 * own /contributors page now).
 */

export const hero: HeroSpec = {
  src: "/pragyadex_hero_v2.png",
  alt: "PragyaDex — India's first culturally grounded, language-instructed dexterous model. Understand, touch, manipulate.",
  mode: "fill",
};

export const problemQuote =
  "Dexterous manipulation policies need dense, richly annotated human-to-robot retargeting examples across everyday domains — not just isolated single-task demonstrations.";

export const stats: readonly StatCard[] = [
  { label: "Domains", value: "8", caption: "Everyday skill categories, e.g. Kitchen" },
  { label: "Paired Examples", value: "400", caption: "Human hand video + robot retargeting" },
  { label: "Video Panels", value: "800", caption: "Human-hand and robot-hand pairs" },
  { label: "Per Domain", value: "50", caption: "Paired examples per domain" },
] as const;

export interface ProseBlockData {
  readonly label: string;
  readonly paragraphs: readonly string[];
}

export const proseBlocks: readonly ProseBlockData[] = [
  {
    label: "01. What It Is",
    paragraphs: [
      "PragyaDex is a paired dexterity skill gallery: 400 examples across eight everyday domains, each placing a real human-hand video alongside the retargeted dexterous robot-hand execution of the same skill.",
    ],
  },
  {
    label: "02. Annotation",
    paragraphs: [
      "Every example is annotated with a primitive sequence (e.g. grasp → stabilize → roll → rotate → press), the objects and materials involved, dexterity signals such as deformable-object handling or bimanual coordination, a difficulty rating, and an explicit robot transfer goal describing how the skill should be retargeted onto a robot hand.",
    ],
  },
  {
    label: "03. Coverage",
    paragraphs: [
      "Domains span contact-rich, everyday manipulation — starting with Kitchen tasks like dough rolling and vegetable chopping — with 50 paired examples per domain and 800 video panels in total, giving dexterous-manipulation policies a dense, richly annotated source of human-to-robot transfer examples rather than isolated demo clips.",
    ],
  },
] as const;
