"use client";

import { useState } from "react";

import { MotionLangGallery } from "@/components/MotionLangGallery";
import { SectionRule } from "@/components/SectionRule";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

const TABS = ["The Problem", "Dataset", "Mechanism"] as const;
type Tab = (typeof TABS)[number];

const MOTION_TOKEN_TOOL_URL = "https://pragyaai.github.io/vla/PragyaVLA_motion_token.html#search";

interface PragyaVlaTabsProps {
  problemQuote: string;
}

/**
 * Tab row on request (2026-08-28), replacing the earlier always-visible
 * sections: "The Problem" (pull-quote), "Dataset" (MotionLang gallery), and a
 * new "Mechanism" tab describing the motion-token search visualized at
 * MOTION_TOKEN_TOOL_URL, linked via its own "More Info" button. The
 * Mechanism copy is grounded in that page's own on-page text (title,
 * formalization, vocabulary groups, search-cardinality figures), not
 * invented.
 */
export function PragyaVlaTabs({ problemQuote }: PragyaVlaTabsProps) {
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

      {tab === "Dataset" ? <MotionLangGallery /> : null}

      {tab === "Mechanism" ? (
        <div className="space-y-8">
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 md:p-12">
            <SectionRule label="Mechanism" margin="mb-8" />

            <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
              <h3 className="plus-jakarta-sans text-2xl md:text-3xl font-light tracking-tight text-on-surface">
                Motion-Token Inference
              </h3>
              <a
                className="inline-flex shrink-0 items-center gap-2 px-6 py-3 text-[10px] tracking-widest uppercase font-medium bg-on-surface text-inverse-on-surface transition-all duration-200 hover:opacity-80 active:scale-95"
                href={MOTION_TOKEN_TOOL_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                More Info
                <MaterialIcon className="text-sm" name="arrow_outward" />
              </a>
            </div>

            <p className="inter text-sm md:text-base text-on-surface-variant leading-relaxed max-w-6xl mb-6">
              PragyaVLA plans motion one discrete <em>motion token</em> at a time from a small vocabulary — grouped into
              Forward, Lateral, Rotation, and Recovery motions — conditioned on the instruction, the current state, and a
              short window of recently emitted tokens.
            </p>
            <p className="inter text-sm md:text-base text-on-surface-variant leading-relaxed max-w-6xl mb-6">
              At each step, every surviving prefix is expanded with candidate next-tokens, scored by proposal probability
              and prefix admissibility, and pruned down to the strongest survivors — growing the search from 5 candidates
              at step one to 3,125 by step five (5 → 25 → 125 → 625 → 3,125, 3,905 states explored in total). The
              pipeline runs in six stages: Encode → Propose → Expand → Validate → Score → Select.
            </p>
            <p className="inter text-sm md:text-base text-on-surface-variant leading-relaxed max-w-6xl">
              A token only becomes an embodied action after this search finishes — its physical realization, as a
              continuous whole-body motion trace, is decoded from the surviving 5-token trajectory at the end.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
