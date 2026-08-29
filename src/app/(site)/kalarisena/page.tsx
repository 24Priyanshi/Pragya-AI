import type { Metadata } from "next";

import { AnalysisPair } from "@/components/AnalysisCharts";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { ProcessedResults } from "@/components/ProcessedResults";
import { RawInputGrid } from "@/components/RawInputGrid";
import { StatStrip } from "@/components/StatStrip";
import { barChart, hero, lineChart, processed, rawInputs, stats } from "@/data/kalarisena";

export const metadata: Metadata = {
  title: "KalariSena",
  description:
    "A movement-intelligence framework for humanoid robots, inspired by Kalaripayattu and grounded in strategic embodied response.",
};

export default function KalariSenaPage() {
  return (
    <PageShell>
      <PageHero hero={hero} />
      <StatStrip stats={stats} />

      <section className="space-y-32">
        <RawInputGrid tiles={rawInputs} />
        <ProcessedResults cards={processed} />
      </section>

      <AnalysisPair bar={barChart} line={lineChart} />
    </PageShell>
  );
}
