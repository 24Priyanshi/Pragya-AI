import type { Metadata } from "next";

import { AnalysisPair } from "@/components/AnalysisCharts";
import { Contributors } from "@/components/Contributors";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { ProcessedResults } from "@/components/ProcessedResults";
import { RawInputGrid } from "@/components/RawInputGrid";
import { StatStrip } from "@/components/StatStrip";
import { barChart, hero, lineChart, processed, rawInputs, stats } from "@/data/pragyavla";

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
      <StatStrip stats={stats} />

      <section className="space-y-32">
        <RawInputGrid tiles={rawInputs} />
        <ProcessedResults cards={processed} />
      </section>

      <AnalysisPair bar={barChart} line={lineChart} />
      <Contributors />
    </PageShell>
  );
}
