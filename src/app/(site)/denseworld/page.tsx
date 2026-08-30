import type { Metadata } from "next";

import { AnalysisPair } from "@/components/AnalysisCharts";
import { CityGrid, TaxonomyGrid } from "@/components/DenseWorldGrid";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { SectionRule } from "@/components/SectionRule/SectionRule";
import { StatStrip } from "@/components/StatStrip";
import { barChart, hero, lineChart, stats, tier1Cities, tier2Cities } from "@/data/denseworld";

const EXPLORER_URL = "https://denseworld.vercel.app/";

export const metadata: Metadata = {
  title: "Dense World",
  description:
    "World models for populous, crowded and chaotic Global South urban environments, built from street-level, pedestrian and aerial data across Tier-1 and Tier-2 cities of India.",
};

export default function DenseWorldPage() {
  return (
    <PageShell>
      <PageHero hero={hero} />
      <StatStrip stats={stats} />

      <section className="space-y-24">
        <CityGrid cities={tier1Cities} heading="Tier 1 Cities" subheading="- 6 metros, 68k+ clips" />
        <CityGrid cities={tier2Cities} heading="Tier 2 Cities" subheading="- 15 cities, 40k+ clips" />
        <TaxonomyGrid />

        <div>
          {/* Live 3D city explorer, deployed from a separate repo to Vercel — embedded via
              iframe the same way as PragyaVLA's and KalariSena's live tools (2026-08-30). */}
          <SectionRule label="Live Explorer" />
          <div className="border border-outline-variant/10 bg-surface">
            <iframe className="w-full h-[720px]" src={EXPLORER_URL} title="DenseWorld live 3D explorer" />
          </div>
        </div>
      </section>

      <AnalysisPair bar={barChart} line={lineChart} />
    </PageShell>
  );
}
