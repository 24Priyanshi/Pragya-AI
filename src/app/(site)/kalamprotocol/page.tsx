import type { Metadata } from "next";

import { AnalysisPair } from "@/components/AnalysisCharts";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { ProcessedResults } from "@/components/ProcessedResults";
import { RawInputGrid } from "@/components/RawInputGrid";
import { StatStrip } from "@/components/StatStrip";
import { barChart, hero, lineChart, processed, rawInputs, stats } from "@/data/kalamprotocol";

export const metadata: Metadata = {
  title: "Kalam Protocol",
  description: "A safety, alignment and governance protocol for robots operating in real-world environments.",
};

export default function KalamProtocolPage() {
  return (
    <PageShell>
      <PageHero hero={hero} />

      {/* Placeholder overview poster under the hero, pending a proper redesign (added 2026-08-31) */}
      <section className="mb-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="Kalam Protocol overview poster" className="w-full h-auto" src="/kalamprotocol_poster.png" />
      </section>

      <StatStrip stats={stats} />

      <section className="space-y-32">
        <RawInputGrid tiles={rawInputs} />
        <ProcessedResults cards={processed} />
      </section>

      <AnalysisPair bar={barChart} line={lineChart} />
    </PageShell>
  );
}
