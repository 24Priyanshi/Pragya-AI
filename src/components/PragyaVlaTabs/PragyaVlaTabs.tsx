"use client";

import { useState } from "react";

import { MotionLangGallery } from "@/components/MotionLangGallery";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

const TABS = ["The Problem", "Dataset", "Mechanism"] as const;
type Tab = (typeof TABS)[number];

const MOTION_TOKEN_TOOL_URL = "https://pragyaai.github.io/vla/PragyaVLA_motion_token.html#search";
const SIMULATION_URL = "https://pragyavla.vercel.app";

interface PragyaVlaTabsProps {
  problemQuote: string;
}

/**
 * Tab row on request (2026-08-28), replacing the earlier always-visible
 * sections: "The Problem" (pull-quote), "Dataset" (MotionLang gallery), and a
 * new "Mechanism" tab describing the motion-token search visualized at
 * MOTION_TOKEN_TOOL_URL. The Mechanism copy is grounded in that page's own
 * on-page text (title, formalization, vocabulary groups, search-cardinality
 * figures), not invented.
 *
 * On request (2026-08-29): the Mechanism tab's descriptive copy was dropped
 * in favor of embedding the tool's own "02 · Multi-Step Motion-Token Search"
 * section (the interactive beam-search tree) live via iframe — same pattern
 * as DenseWalk's video iframe. It's a custom JS visualization baked into
 * that page, not a standalone widget, so embedding the page itself (anchored
 * at #search) is the only way to show it without reimplementing it. The
 * page's own "More Info" link lives separately as its own button next to
 * "Mechanism" in the tab row.
 *
 * Further request (2026-08-29): show only the step-toolbar + tree diagram,
 * not the formalization/cardinality boxes or log-likelihood bar that sit
 * above them in that section. The iframe has no way to start scrolled past
 * those, so it's cropped with an overflow:hidden wrapper shorter than the
 * iframe itself, shifted up by a measured pixel offset (the toolbar's own
 * on-screen position right after the #search anchor scroll, at this
 * fixed iframe width) — a negative-margin crop, not a redesign of the tool.
 */
const MECHANISM_CROP_OFFSET = 420;
export function PragyaVlaTabs({ problemQuote }: PragyaVlaTabsProps) {
  const [tab, setTab] = useState<Tab>("The Problem");

  return (
    <div>
      <div className="mb-12 flex flex-wrap items-center gap-1 border-b border-outline-variant/10" role="tablist">
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
        <a
          className="inline-flex shrink-0 items-center gap-2 ml-2 px-6 py-3 text-[10px] tracking-widest uppercase font-medium bg-on-surface text-inverse-on-surface transition-all duration-200 hover:opacity-80 active:scale-95"
          href={MOTION_TOKEN_TOOL_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          More Info
          <MaterialIcon className="text-sm" name="arrow_outward" />
        </a>
      </div>

      {tab === "The Problem" ? (
        <div>
          <div className="bg-primary px-8 py-16 md:py-24 text-center">
            <p className="plus-jakarta-sans text-2xl md:text-4xl font-light italic leading-snug text-on-primary max-w-4xl mx-auto text-balance">
              &ldquo;{problemQuote}&rdquo;
            </p>
          </div>
          {/* Live G1-troupe simulation, deployed from the repo (github.com/prajak002/PragyaVLA) to Vercel — embedded the same way as KalariSena's problem video. */}
          <div className="border border-outline-variant/10 bg-surface">
            <iframe className="w-full h-[720px]" src={SIMULATION_URL} title="PragyaVLA humanoid simulation" />
          </div>
        </div>
      ) : null}

      {tab === "Dataset" ? <MotionLangGallery /> : null}

      {tab === "Mechanism" ? (
        <div className="border border-outline-variant/10 bg-surface overflow-hidden h-[620px]">
          {/* Tailwind can't see dynamic arbitrary-value classes, so the crop uses inline styles. */}
          <iframe
            className="w-full"
            src={MOTION_TOKEN_TOOL_URL}
            style={{ height: 900 + MECHANISM_CROP_OFFSET, marginTop: -MECHANISM_CROP_OFFSET }}
            title="PragyaVLA motion-token search"
          />
        </div>
      ) : null}
    </div>
  );
}
