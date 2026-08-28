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
