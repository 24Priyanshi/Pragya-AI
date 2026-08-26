import type { HeroSpec, StatCard } from "@/types/page";

/**
 * PragyaDex — the paired dexterity skill gallery at https://pragya-dex.vercel.app/.
 *
 * Stats and the description below are taken directly from the live tool
 * (checked 2026-08-26): it pairs real human-hand video with retargeted
 * dexterous robot-hand execution across everyday domains (kitchen, etc.),
 * each annotated with primitive sequences, objects/materials, dexterity
 * signals, and a robot transfer goal. This page is a static summary — the
 * hero CTA and the landing page's "Pragya-Dex" protocol row link out to the
 * live gallery itself.
 *
 * `/pragya_dex.png` is referenced (same path landing.ts already points at)
 * but not yet present in public/ — needs a real screenshot of the gallery.
 */

export const hero: HeroSpec = {
  src: "/pragya_dex.png",
  alt: "PragyaDex skill gallery preview",
  mode: "auto",
  overlay: true,
  actions: [{ label: "Open Skill Gallery", href: "https://pragya-dex.vercel.app/" }],
};

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
