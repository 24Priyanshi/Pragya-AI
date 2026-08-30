import type { Metadata } from "next";

import { HumanoidChallenge } from "@/components/HumanoidChallenge";
import { InstructionFeed } from "@/components/InstructionFeed";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { challenge, hero } from "@/data/densewalk";
import { feedData } from "@/data/densewalk-feed";

export const metadata: Metadata = {
  title: "DenseWalk",
  description:
    "A data-and-benchmark pipeline for short-horizon humanoid navigation in populous, crowded and chaotic Global South urban environments.",
};

export default function DenseWalkPage() {
  return (
    <PageShell>
      <PageHero hero={hero} />

      <HumanoidChallenge challenge={challenge} />

      {/* feedData is built on the server, so only the view model crosses to the
          client — not the raw annotations. */}
      <InstructionFeed data={feedData} />
    </PageShell>
  );
}
