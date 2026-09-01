import type { Metadata } from "next";

import { DenseWorldTabs } from "@/components/DenseWorldTabs";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import {
  contrastLabels,
  densityCharts,
  densityEyebrow,
  densityHeading,
  densityLede,
  hero,
  problemNarrative,
  problemQuote,
  stats,
  tier1Cities,
  tier2Cities,
} from "@/data/denseworld";
import {
  agentIcons,
  agentsHeading,
  cityVideoCharts,
  crowdIcons,
  crowdLabel,
  datasetOpening,
  videosPerCityHeading,
} from "@/data/denseworld-dataset";
import { defaultExampleTitle, exampleCount, exampleOutputs, examplesIntro } from "@/data/denseworld-examples";
import { researchFootnote, researchIntro, researchSections } from "@/data/denseworld-research";

export const metadata: Metadata = {
  title: "Dense World",
  description:
    "World models for populous, crowded and chaotic Global South urban environments, built from street-level, pedestrian and aerial data across Tier-1 and Tier-2 cities of India.",
};

/**
 * Page structure mirrors PragyaVLA/PragyaDex/KalariSena's (2026-08-30): a
 * plain hero, then "The Problem" / "Dataset" tabs — replacing the earlier
 * always-visible stats/city-grid/taxonomy/charts layout.
 */
export default function DenseWorldPage() {
  return (
    <PageShell>
      <PageHero hero={hero} />
      <DenseWorldTabs
        agentIcons={agentIcons}
        agentsHeading={agentsHeading}
        cityVideoCharts={cityVideoCharts}
        contrastLabels={contrastLabels}
        crowdIcons={crowdIcons}
        crowdLabel={crowdLabel}
        datasetOpening={datasetOpening}
        densityCharts={densityCharts}
        densityEyebrow={densityEyebrow}
        densityHeading={densityHeading}
        densityLede={densityLede}
        defaultExampleTitle={defaultExampleTitle}
        exampleCount={exampleCount}
        exampleOutputs={exampleOutputs}
        examplesIntro={examplesIntro}
        problemNarrative={problemNarrative}
        problemQuote={problemQuote}
        researchFootnote={researchFootnote}
        researchIntro={researchIntro}
        researchSections={researchSections}
        stats={stats}
        tier1Cities={tier1Cities}
        tier2Cities={tier2Cities}
        videosPerCityHeading={videosPerCityHeading}
      />
    </PageShell>
  );
}
