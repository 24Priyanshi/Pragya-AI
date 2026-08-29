"use client";

import { useState } from "react";

const TABS = ["The Problem", "Dataset"] as const;
type Tab = (typeof TABS)[number];

const REVIEW_TOOL_URL = "https://kalarisena-review.vercel.app/";

interface KalariSenaTabsProps {
  problemQuote: string;
}

/**
 * Mirrors PragyaDexTabs' shape (2026-08-30): "The Problem" (pull-quote) and
 * "Dataset". There's no separate browsable gallery here, so "Dataset"
 * embeds the project's own human-vs-G1 retarget review tool live via
 * iframe — same pattern as PragyaVLA's Mechanism tab — since it's a
 * custom interactive dashboard (synced 4-video playback, physics-correction
 * overlay, rating/export controls over 69 paired motions), not a
 * standalone widget that could be reimplemented natively.
 */
export function KalariSenaTabs({ problemQuote }: KalariSenaTabsProps) {
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
        <div className="bg-primary px-8 py-16 md:py-24 text-center">
          <p className="plus-jakarta-sans text-2xl md:text-4xl font-light italic leading-snug text-on-primary max-w-4xl mx-auto text-balance">
            &ldquo;{problemQuote}&rdquo;
          </p>
        </div>
      ) : null}

      {tab === "Dataset" ? (
        <div className="border border-outline-variant/10 bg-surface">
          <iframe className="w-full" height={1400} src={REVIEW_TOOL_URL} title="KalariSena human vs G1 retarget review" />
        </div>
      ) : null}
    </div>
  );
}
