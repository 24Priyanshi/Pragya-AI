import type { Metadata } from "next";

import { Contributors } from "@/components/Contributors";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { PragyaVlaTabs } from "@/components/PragyaVlaTabs";
import { barChart, hero, lineChart, problemBlocks, processed, rawInputs, stats } from "@/data/pragyavla";

/**
 * The original <title> here is "PragyaVLA | The Spatial Academic", the only
 * page not using the "| Pragya AI" suffix (BUG-9). The layout's title template
 * would produce the consistent form, so the absolute title is set explicitly
 * to preserve the original.
 */
export const metadata: Metadata = {
  title: { absolute: "PragyaVLA | The Spatial Academic" },
  description:
    "India's first sovereign VLA model for robot navigation — an instruction-finetuned framework unifying multilingual grounding, locomotion-aware reasoning and safety-conditioned control.",
};

export default function PragyaVlaPage() {
  return (
    <PageShell>
      <PageHero hero={hero} />

      <PragyaVlaTabs
        barChart={barChart}
        lineChart={lineChart}
        problemBlocks={problemBlocks}
        processed={processed}
        rawInputs={rawInputs}
        stats={stats}
      />

      <Contributors />
    </PageShell>
  );
}
