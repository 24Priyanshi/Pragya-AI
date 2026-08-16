import type { Metadata } from "next";

import { AnalysisPair } from "@/components/AnalysisCharts";
import { Contributors } from "@/components/Contributors";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { ProcessedResults } from "@/components/ProcessedResults";
import { RawInputGrid } from "@/components/RawInputGrid";
import { StatStrip } from "@/components/StatStrip";
import { barChart, hero, lineChart, processed, rawInputs, stats } from "@/data/factorjepa";

export const metadata: Metadata = {
  title: "FactorJEPA",
  description:
    "A factorized Joint-Embedding Predictive Architecture that decomposes predictive embeddings into layout, entities, interactions and visibility-aware reliability.",
};

export default function FactorJepaPage() {
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
