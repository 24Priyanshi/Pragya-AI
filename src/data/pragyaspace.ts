import type { HeroSpec } from "@/types/page";

export const hero: HeroSpec = {
  src: "/pragyaspace_hero.png",
  alt: "PragyaSpace — India's sovereign embodied AI for space. Robots working on the Moon, Mars, the ISS, and a data center.",
  // "fill" (object-cover to full viewport height) crops this image's title and bottom
  // labels, which sit close to the edges unlike the other hero images — use "auto" so
  // the full image displays uncropped (changed on request, 2026-08-31).
  mode: "auto",
};

export interface ProseBlockData {
  readonly label: string;
  readonly paragraphs: readonly string[];
}

/** Same copy as the navbar's PragyaSpace submenu Q&A. */
export const proseBlocks: readonly ProseBlockData[] = [
  {
    label: "What is it?",
    paragraphs: [
      "A shared spatial workspace where PragyaAI's embodied-AI projects — world models, navigation, manipulation, and dialogue — come together around a common map of the physical environment.",
    ],
  },
  {
    label: "What's the necessity?",
    paragraphs: [
      "Because a robot that perceives, walks, talks, and manipulates through separate, disconnected systems can't reason about one consistent physical space — its models of the world drift apart from each other.",
    ],
  },
  {
    label: "What's the Leap?",
    paragraphs: [
      "From siloed models to a unified spatial substrate, where every PragyaAI capability reads from and writes to the same live representation of the world.",
    ],
  },
] as const;
