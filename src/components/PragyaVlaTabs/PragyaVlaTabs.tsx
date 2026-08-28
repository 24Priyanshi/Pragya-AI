"use client";

import { useState } from "react";

import { Contributors } from "@/components/Contributors";
import { MotionLangGallery } from "@/components/MotionLangGallery";
import { SectionRule } from "@/components/SectionRule";

import type { ProseBlockData } from "@/data/pragyavla";

const TABS = ["The Problem", "Dataset", "Contributors"] as const;
type Tab = (typeof TABS)[number];

interface PragyaVlaTabsProps {
  problemBlocks: readonly ProseBlockData[];
  problemQuote: string;
}

export function PragyaVlaTabs({ problemBlocks, problemQuote }: PragyaVlaTabsProps) {
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

          <div className="bg-primary p-8 md:p-12">
            <p className="plus-jakarta-sans text-xl md:text-2xl font-light italic leading-relaxed text-on-primary max-w-4xl">
              &ldquo;{problemQuote}&rdquo;
            </p>
          </div>
        </div>
      ) : null}

      {tab === "Dataset" ? <MotionLangGallery /> : null}

      {tab === "Contributors" ? (
        <div>
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 md:p-12 mb-32">
            <SectionRule label="Contact Us" margin="mb-8" />
            <p className="inter text-sm md:text-base text-on-surface-variant leading-relaxed">
              <a className="text-primary hover:opacity-80 transition-opacity" href="mailto:pragya@bits">
                pragya@bits
              </a>
              {" · "}
              <a
                className="text-primary hover:opacity-80 transition-opacity"
                href="https://www.bits-pilani.ac.in/"
                rel="noopener noreferrer"
                target="_blank"
              >
                bits-pilani.ac.in
              </a>
            </p>
          </div>

          <Contributors />
        </div>
      ) : null}
    </div>
  );
}
