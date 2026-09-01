"use client";

import { useState } from "react";

import { CityGrid } from "@/components/DenseWorldGrid";
import { AgentIconGrid, CityVideoChartCard, ContrastGrid, DensityChartCard, ResearchSectionCard } from "@/components/DenseWorldResearch";
import { SectionRule } from "@/components/SectionRule";
import { StatStrip } from "@/components/StatStrip";
import type { DensityChart } from "@/data/denseworld";
import type { AgentIcon, CityVideoChart } from "@/data/denseworld-dataset";
import type { ResearchSection } from "@/data/denseworld-research";
import type { StatCard } from "@/types/page";

const TABS = ["The Problem", "Dataset", "Research"] as const;
type Tab = (typeof TABS)[number];

const EXPLORER_URL = "https://denseworld.vercel.app/";

interface DenseWorldTabsProps {
  problemQuote: string;
  problemNarrative: readonly string[];
  contrastPairs: readonly { west: string; dense: string }[];
  densityEyebrow: string;
  densityHeading: string;
  densityLede: string;
  densityCharts: readonly DensityChart[];
  stats: readonly StatCard[];
  tier1Cities: readonly string[];
  tier2Cities: readonly string[];
  datasetOpening: string;
  videosPerCityHeading: string;
  cityVideoCharts: readonly CityVideoChart[];
  agentsHeading: string;
  agentIcons: readonly AgentIcon[];
  crowdLabel: string;
  crowdIcons: readonly AgentIcon[];
  researchIntro: { heading: string; lede: string };
  researchSections: readonly ResearchSection[];
  researchFootnote: string;
}

/**
 * Mirrors KalariSenaTabs'/PragyaDexTabs' shape (2026-08-30): tabbed sections
 * under a plain hero. "The Problem" and "Dataset" were joined by a third
 * "Research" tab (2026-09-01).
 *
 * "The Problem" and "Research" now carry the narrative/chart copy ported
 * from the project's own Gradio Space (huggingface.co/spaces/Pragya-AI/
 * denseworld) — see denseworld.ts and denseworld-research.ts. The Space's
 * west/south contrast clips aren't ported (real footage TBD), so that row
 * renders as 8 labelled placeholders (ContrastGrid). The live 3D explorer
 * moved from right under the purple quote to the end of "The Problem" (on
 * request, 2026-09-01), after the new narrative and density-comparison
 * content.
 */
export function DenseWorldTabs({
  problemQuote,
  problemNarrative,
  contrastPairs,
  densityEyebrow,
  densityHeading,
  densityLede,
  densityCharts,
  stats,
  tier1Cities,
  tier2Cities,
  datasetOpening,
  videosPerCityHeading,
  cityVideoCharts,
  agentsHeading,
  agentIcons,
  crowdLabel,
  crowdIcons,
  researchIntro,
  researchSections,
  researchFootnote,
}: DenseWorldTabsProps) {
  const [tab, setTab] = useState<Tab>("The Problem");

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-1 border-b border-outline-variant/10" role="tablist">
        {TABS.map((t) => (
          <button
            aria-selected={tab === t}
            className={`inter text-sm px-6 py-4 -mb-px border-b-2 transition-colors duration-200 ${
              tab === t ? "border-primary text-on-surface font-medium" : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
            key={t}
            onClick={() => setTab(t)}
            role="tab"
            type="button"
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "The Problem" ? (
        <div>
          <div className="bg-primary rounded-2xl shadow-lg px-8 py-10 md:py-14">
            <p className="plus-jakarta-sans text-xl md:text-3xl font-light italic leading-snug text-on-primary text-justify max-w-4xl mx-auto">
              &ldquo;{problemQuote}&rdquo;
            </p>
          </div>

          <section className="mt-16">
            <SectionRule label="The Problem" margin="mb-8" />
            <div className="space-y-6 max-w-4xl">
              {problemNarrative.map((p) => (
                <p className="inter text-sm md:text-base leading-relaxed text-on-surface-variant" key={p.slice(0, 40)}>
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <ContrastGrid pairs={contrastPairs} />
            </div>
          </section>

          <section className="mt-16">
            <SectionRule label={densityEyebrow} margin="mb-8" />
            <h3 className="plus-jakarta-sans text-3xl md:text-4xl font-light tracking-tight text-on-surface">{densityHeading}</h3>
            <p className="inter mt-4 max-w-4xl text-sm md:text-base leading-relaxed text-on-surface-variant">{densityLede}</p>
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {densityCharts.map((chart) => (
                <DensityChartCard chart={chart} key={chart.title} />
              ))}
            </div>
          </section>

          {/* Live 3D city explorer, deployed from a separate repo to Vercel — embedded via
              iframe the same way as PragyaVLA's and KalariSena's live tools. */}
          <div className="mt-16 border border-outline-variant/10 bg-surface">
            <iframe className="w-full h-[720px]" src={EXPLORER_URL} title="DenseWorld live 3D explorer" />
          </div>
        </div>
      ) : null}

      {tab === "Dataset" ? (
        <div>
          <p className="inter max-w-4xl text-sm md:text-base leading-relaxed text-on-surface-variant">{datasetOpening}</p>

          <StatStrip compact stats={stats} />

          <section className="space-y-24">
            <CityGrid cities={tier1Cities} heading="Tier 1 Cities" subheading="- 6 metros, 68k+ clips" />
            <CityGrid cities={tier2Cities} heading="Tier 2 Cities" subheading="- 15 cities, 40k+ clips" />
          </section>

          <section className="mt-24">
            <SectionRule label={videosPerCityHeading} margin="mb-8" />
            <div className="space-y-6">
              {cityVideoCharts.map((chart) => (
                <CityVideoChartCard chart={chart} key={chart.title} />
              ))}
            </div>
          </section>

          <section className="mt-24">
            <SectionRule label={agentsHeading} margin="mb-8" />
            <AgentIconGrid icons={agentIcons} />
            <p className="inter mt-8 mb-4 text-sm italic text-on-surface-variant">{crowdLabel}</p>
            <AgentIconGrid icons={crowdIcons} />
          </section>
        </div>
      ) : null}

      {tab === "Research" ? (
        <div>
          <h3 className="plus-jakarta-sans text-3xl md:text-4xl font-light tracking-tight text-on-surface">{researchIntro.heading}</h3>
          <p className="inter mt-4 max-w-4xl text-sm md:text-base leading-relaxed text-on-surface-variant">{researchIntro.lede}</p>

          <div className="mt-10 space-y-9">
            {researchSections.map((section) => (
              <ResearchSectionCard key={section.number} section={section} />
            ))}
          </div>

          <p className="inter mt-10 max-w-5xl border-t border-outline-variant/10 pt-6 text-xs leading-relaxed text-on-surface-variant">
            {researchFootnote}
          </p>
        </div>
      ) : null}
    </div>
  );
}
