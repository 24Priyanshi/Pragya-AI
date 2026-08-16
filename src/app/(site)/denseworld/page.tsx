import type { Metadata } from "next";

import { AnalysisPair } from "@/components/AnalysisCharts";
import { Contributors } from "@/components/Contributors";
import { CityGrid, TaxonomyGrid } from "@/components/DenseWorldGrid";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { StatStrip } from "@/components/StatStrip";
import { barChart, hero, lineChart, stats, tier1Cities, tier2Cities } from "@/data/denseworld";

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
      </section>

      <AnalysisPair bar={barChart} line={lineChart} />
      <Contributors />
    </PageShell>
  );
}
