"use client";

import { useState } from "react";

import type { ChallengeClip, ChallengeSpec } from "@/data/densewalk";
import { cn } from "@/lib/cn";

/**
 * The attract section under the DenseWalk hero.
 *
 * A dark band in a page that is otherwise off-white: this is the first thing
 * below the fold, and it has to land the premise before a visitor reaches the
 * dataset explorer. The `on-surface` / `primary-fixed` pairing is the same
 * high-contrast pair the hero CTA and the clip-card ordinals already use, so
 * the band reads as emphasis rather than as a second theme.
 *
 * Contained rather than full-bleed on purpose. PageHero breaks out with
 * `left-1/2 w-screen -translate-x-1/2`, and `w-screen` includes the scrollbar —
 * that is BUG-14, the small horizontal scrollbar on desktop. Repeating the
 * trick here would repeat the bug for no gain the padding does not already give.
 */
export function HumanoidChallenge({ challenge }: { challenge: ChallengeSpec }) {
  return (
    <section aria-labelledby="challenge-label" className="mb-32 bg-on-surface px-6 py-16 md:px-14 md:py-20">
      <div className="mb-14 flex items-center gap-8">
        <h2 className="inter text-sm font-medium uppercase tracking-widest text-primary-fixed" id="challenge-label">
          {challenge.label}
        </h2>
        <div className="h-px grow bg-primary-fixed/20" />
      </div>

      {/* `items-start` so the taller frame does not stretch its neighbour: the
          two clips are shot differently and their panels are honestly different
          heights, both hanging from the same top line. */}
      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-10">
        {challenge.clips.map((clip, i) => (
          <ChallengePanel clip={clip} key={clip.src} ordinal={i + 1} />
        ))}
      </div>
    </section>
  );
}

function ChallengePanel({ clip, ordinal }: { clip: ChallengeClip; ordinal: number }) {
  // The captures are not in the repo yet, so a missing file is the expected
  // state rather than an edge case — it has to look deliberate, not broken.
  const [failed, setFailed] = useState(false);

  return (
    <article className="flex flex-col">
      <div className="flex items-start gap-5">
        <span className="plus-jakarta-sans mt-1 shrink-0 text-sm font-light tabular-nums text-primary-fixed/40">
          {String(ordinal).padStart(2, "0")}
        </span>
        <h3 className="plus-jakarta-sans text-3xl font-extralight leading-[1.15] tracking-tighter text-primary-fixed md:text-4xl">
          {clip.question}
        </h3>
      </div>

      {/* Fixed height, not a fixed frame ratio.
          One clip is a vertical Short and the other is landscape, so any shared
          aspect box would either crop one or strand it inside visible bars.
          Matching their *heights* instead lets each keep its own width — a
          narrow one and a wide one, sitting on the same line — which is what
          makes the pair read as a set. The box is transparent and unbordered
          for the same reason: with `object-contain` the leftover space would
          otherwise show up as an empty panel beside the vertical clip. */}
      <div className="relative mt-8 h-64 sm:h-72 lg:h-80">
        {/* Muted and looping so the band plays itself, but `controls` stays on:
            a clip that runs longer than five seconds with no way to stop it is
            a WCAG 2.2.2 failure. */}
        <video
          autoPlay
          className={cn("h-full w-full object-contain", failed && "invisible")}
          controls
          loop
          muted
          onError={() => setFailed(true)}
          playsInline
          preload="metadata"
          src={clip.src}
        />

        {failed ? (
          <div className="absolute inset-0 grid place-items-center px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <span
                aria-hidden
                className="grid h-14 w-14 place-items-center border border-primary-fixed/25 text-lg text-primary-fixed/60"
              >
                ▶
              </span>
              <span className="inter text-[11px] uppercase tracking-widest text-primary-fixed/50">Clip coming soon</span>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
