"use client";

import { useState } from "react";

import { SectionRule } from "@/components/SectionRule";

const TABS = ["The Problem", "Dataset"] as const;
type Tab = (typeof TABS)[number];

const REVIEW_TOOL_URL = "https://kalarisena-review.vercel.app/";
// Switched from a self-hosted 101MB file (proxied off Google Drive) to a YouTube embed on
// request (2026-08-30) — the raw file was heavy enough to make the page stutter; YouTube
// handles adaptive streaming instead of shipping the whole file to every visitor.
const PROBLEM_VIDEO_URL = "https://www.youtube.com/embed/9B7wuifzrss";

// Two specific moves' clips, streamed directly from the review tool's own deployment
// (on request, 2026-09-01) — its DATA array's `human` and `mjc` fields for
// kt_warrior_pose and iv_squat_salute_l, resolved against the review tool's own
// origin since that's how the tool itself references them (relative <video src>).
const REVIEW_TOOL_ORIGIN = "https://kalarisena-review.vercel.app";
const MOVE_CLIPS = [
  { label: "Warrior Stance Sequence — Original", src: `${REVIEW_TOOL_ORIGIN}/human/kt_warrior_pose.mp4` },
  { label: "Warrior Stance Sequence — Pragya Physics Corrected", src: `${REVIEW_TOOL_ORIGIN}/mjc_kt_warrior_pose.mp4` },
  { label: "Squat Salutation — Original", src: `${REVIEW_TOOL_ORIGIN}/human/iv_squat_salute_l.mp4` },
  { label: "Squat Salutation — Pragya Physics Corrected", src: `${REVIEW_TOOL_ORIGIN}/mjc_iv_squat_salute_l.mp4` },
] as const;

interface KalariSenaTabsProps {
  intro: string;
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
export function KalariSenaTabs({ intro, problemQuote }: KalariSenaTabsProps) {
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

          <div className="mt-10 bg-primary rounded-2xl shadow-lg p-6 md:p-8">
            <div className="grid grid-cols-2 gap-4">
              {MOVE_CLIPS.map((clip) => (
                <div className="space-y-2" key={clip.src}>
                  <div className="aspect-video overflow-hidden border border-on-primary/20 bg-on-primary/10">
                    <video autoPlay className="h-full w-full object-cover" loop muted playsInline preload="auto" src={clip.src} />
                  </div>
                  <p className="inter text-xs font-medium text-on-primary">{clip.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 mb-8">
            <SectionRule label="What is KalariSena?" margin="mb-8" />
            <p className="inter text-sm md:text-base text-on-surface-variant leading-relaxed max-w-4xl">{intro}</p>
          </div>

          <div className="border border-outline-variant/10 bg-surface">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full aspect-video"
              src={PROBLEM_VIDEO_URL}
              title="KalariSena problem overview"
            />
          </div>
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
