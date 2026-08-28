"use client";

import { useState } from "react";

import { AnalysisPair } from "@/components/AnalysisCharts";
import { MotionLangGallery } from "@/components/MotionLangGallery";
import { ProcessedResults } from "@/components/ProcessedResults";
import { RawInputGrid } from "@/components/RawInputGrid";
import { SectionRule } from "@/components/SectionRule";
import { StatStrip } from "@/components/StatStrip";
import type { BarChartSpec, LineChartSpec, ProcessedCard, RawInputTile, StatCard } from "@/types/page";

import type { ProseBlockData } from "@/data/pragyavla";

const TABS = ["The Problem", "Dataset", "Research", "Examples", "Live Demo"] as const;
type Tab = (typeof TABS)[number];

interface PragyaVlaTabsProps {
  problemBlocks: readonly ProseBlockData[];
  stats: readonly StatCard[];
  rawInputs: readonly RawInputTile[];
  processed: readonly ProcessedCard[];
  barChart: BarChartSpec;
  lineChart: LineChartSpec;
}

export function PragyaVlaTabs({ problemBlocks, stats, rawInputs, processed, barChart, lineChart }: PragyaVlaTabsProps) {
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
        <div className="space-y-8">
          {problemBlocks.map((block) => (
            <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 md:p-12" key={block.label}>
              <SectionRule label={block.label} margin="mb-8" />
              {block.paragraphs.map((p) => (
                <p className="inter text-sm md:text-base text-on-surface-variant leading-relaxed max-w-6xl" key={p.slice(0, 40)}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : null}

      {tab === "Dataset" ? (
        <div>
          <p className="inter text-sm text-on-surface-variant leading-relaxed max-w-4xl mb-8">
            MotionLang: 5 languages × 10 categories × 20 clips — 1000 unique instruction-motion pairs, streamed from the public
            HuggingFace dataset.
          </p>
          <MotionLangGallery />
        </div>
      ) : null}

      {tab === "Research" ? (
        <div className="space-y-32">
          <ProcessedResults cards={processed} />
          <AnalysisPair bar={barChart} line={lineChart} />
        </div>
      ) : null}

      {tab === "Examples" ? <RawInputGrid tiles={rawInputs} /> : null}

      {tab === "Live Demo" ? (
        <div>
          <StatStrip stats={stats} />
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 md:p-12 text-center">
            <p className="inter text-sm md:text-base text-on-surface-variant leading-relaxed">
              An interactive live demo is coming soon. In the meantime, the benchmarks above reflect PragyaVLA&apos;s current
              performance.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
