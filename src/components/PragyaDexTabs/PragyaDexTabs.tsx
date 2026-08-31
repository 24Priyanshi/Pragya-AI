"use client";

import { useState } from "react";

import { PragyaDexGallery } from "@/components/PragyaDexGallery";
import type { GalleryDomain } from "@/types/gallery";

const TABS = ["The Problem", "Dataset"] as const;
type Tab = (typeof TABS)[number];

interface PragyaDexTabsProps {
  problemQuote: string;
  domains: readonly GalleryDomain[];
}

/**
 * Mirrors PragyaVlaTabs' tab-row layout (2026-08-29), minus its "Mechanism"
 * tab — PragyaDex has no equivalent content for one.
 */
export function PragyaDexTabs({ problemQuote, domains }: PragyaDexTabsProps) {
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
        <div className="bg-primary rounded-2xl shadow-lg px-8 py-10 md:py-14">
          <p className="plus-jakarta-sans text-xl md:text-3xl font-light italic leading-snug text-on-primary text-justify max-w-4xl mx-auto">
            &ldquo;{problemQuote}&rdquo;
          </p>
        </div>
      ) : null}

      {tab === "Dataset" ? <PragyaDexGallery domains={domains} /> : null}
    </div>
  );
}
