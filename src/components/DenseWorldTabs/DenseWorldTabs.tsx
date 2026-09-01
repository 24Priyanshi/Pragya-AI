"use client";

import { useState } from "react";

import { CityGrid } from "@/components/DenseWorldGrid";
import { StatStrip } from "@/components/StatStrip";
import type { StatCard } from "@/types/page";

const TABS = ["The Problem", "Dataset"] as const;
type Tab = (typeof TABS)[number];

const EXPLORER_URL = "https://denseworld.vercel.app/";

interface DenseWorldTabsProps {
  problemQuote: string;
  stats: readonly StatCard[];
  tier1Cities: readonly string[];
  tier2Cities: readonly string[];
}

/**
 * Mirrors KalariSenaTabs'/PragyaDexTabs' shape (2026-08-30): "The Problem"
 * (pull-quote) and "Dataset". Stats and city grids now live under "Dataset"
 * rather than always being visible.
 *
 * The live explorer sits directly under the purple quote in "The Problem"
 * (on request, 2026-08-31), matching how KalariSena's video and PragyaVLA's
 * simulation sit under their own purple boxes, rather than under "Dataset".
 *
 * Further request (2026-08-31): the taxonomy grid and analysis charts were
 * dropped from "Dataset" entirely, and the stat strip switched to its
 * `compact` size.
 */
export function DenseWorldTabs({ problemQuote, stats, tier1Cities, tier2Cities }: DenseWorldTabsProps) {
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
          {/* Live 3D city explorer, deployed from a separate repo to Vercel — embedded via
              iframe the same way as PragyaVLA's and KalariSena's live tools. */}
          <div className="mt-10 border border-outline-variant/10 bg-surface">
            <iframe className="w-full h-[720px]" src={EXPLORER_URL} title="DenseWorld live 3D explorer" />
          </div>
        </div>
      ) : null}

      {tab === "Dataset" ? (
        <div>
          <StatStrip compact stats={stats} />

          <section className="space-y-24 mt-24">
            <CityGrid cities={tier1Cities} heading="Tier 1 Cities" subheading="- 6 metros, 68k+ clips" />
            <CityGrid cities={tier2Cities} heading="Tier 2 Cities" subheading="- 15 cities, 40k+ clips" />
          </section>
        </div>
      ) : null}
    </div>
  );
}
