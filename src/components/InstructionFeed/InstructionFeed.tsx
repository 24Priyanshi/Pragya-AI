"use client";

import { useMemo, useState } from "react";

import type { FeedData } from "@/types/densewalk-feed";

import { ClipCard } from "./ClipCard";
import { FieldLabel } from "./primitives";
import { TrackTabs } from "./TrackTabs";

/**
 * "Instruction Feed" — the dataset explorer that follows the DenseWalk hero.
 *
 * Originally followed temp/densewalk_instruction_feed_varied.html: a labeled
 * section header, headline metrics, a taxonomy sidebar, a search/filter row,
 * and a sourcing disclaimer, on top of the per-clip cards. All of that was
 * removed on request (2026-08-31) — heading retitled to "Frame-level CoT",
 * the metrics strip, taxonomy sidebar, search/filter controls, and sourcing
 * note dropped — leaving just the language tabs and the paginated clip cards.
 * The filtering/faceting logic those controls drove went with them, since a
 * filter with nothing to set it can only ever be dead code.
 */

/**
 * How many cards the feed opens with, and how many each "Show more" adds.
 *
 * The corpus is 138 clips and every card mounts a video element plus its own
 * frame fetch, so the feed pages in rather than rendering the whole match set.
 */
const PAGE_STEP = 5;

/** Cards at the top of a page fetch their frames immediately rather than on scroll. */
const EAGER_CARDS = 3;

export function InstructionFeed({ data }: { data: FeedData }) {
  const [track, setTrack] = useState(data.tracks[0].key);

  const activeTrack = data.tracks.find((t) => t.key === track) ?? data.tracks[0];

  const trackCounts = useMemo(
    () =>
      Object.fromEntries(data.tracks.map((t) => [t.key, t.kind === "language" ? data.clips.length : 0])) as Record<
        string,
        number
      >,
    [data.clips.length, data.tracks],
  );

  /**
   * Every language tab renders the same clips over the same measurements — the
   * geometry and timing of a walk do not change with the language describing
   * it — so the instruction text is swapped per track rather than a separate
   * clip set being shipped for each.
   *
   * `translated` is tracked per clip rather than per track: only one export
   * carries non-English text today, so a track-wide flag would badge 49 cards
   * of plain English as a stand-in translation.
   */
  const trackClips = useMemo(() => {
    if (activeTrack.kind !== "language") return [];
    return data.clips.map((clip) => ({
      ...clip,
      instruction: clip.instructions[activeTrack.key] ?? clip.instructions.english,
      translated: activeTrack.key in clip.instructions,
    }));
  }, [data.clips, activeTrack]);

  /** Cards paged in `PAGE_STEP` at a time, reset whenever the track changes. */
  const [shown, setShown] = useState(PAGE_STEP);
  const [shownFor, setShownFor] = useState(track);
  if (shownFor !== track) {
    setShownFor(track);
    setShown(PAGE_STEP);
  }

  const visible = trackClips.slice(0, shown);
  const remaining = trackClips.length - visible.length;

  return (
    <section>
      <h2 className="plus-jakarta-sans mb-10 text-5xl font-extralight tracking-tighter text-on-surface md:text-6xl">
        Frame-level CoT
      </h2>

      <TrackTabs active={track} counts={trackCounts} onSelect={setTrack} tracks={data.tracks} />

      {trackClips.length === 0 ? (
        <div className="border border-outline-variant/10 bg-surface-container-lowest px-6 py-24 text-center">
          <FieldLabel>{activeTrack.label} track</FieldLabel>
          <p className="inter mx-auto mt-4 max-w-md text-base leading-relaxed text-on-surface-variant">{activeTrack.note}</p>
        </div>
      ) : (
        <div>
          {activeTrack.key !== "english" ? (
            <p className="inter mb-8 border-l-2 border-primary bg-surface-container-low px-6 py-5 text-sm leading-relaxed text-on-surface-variant">
              <span className="text-on-surface">{activeTrack.label} track.</span> {activeTrack.note}
            </p>
          ) : null}

          <div className="mb-6">
            <FieldLabel>
              Showing {visible.length} of {trackClips.length} scenes
            </FieldLabel>
          </div>

          <div className="grid gap-6">
            {visible.map((clip, i) => (
              <ClipCard
                clip={clip}
                eager={i < EAGER_CARDS}
                framesBase={data.framesBase}
                key={clip.id}
                ordinal={i + 1}
                trackLabel={activeTrack.key === "english" ? null : activeTrack.label}
                translated={clip.translated}
              />
            ))}
          </div>

          {remaining > 0 ? (
            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                className="inter w-full border border-outline-variant/20 bg-surface-container-lowest px-8 py-4 text-[11px] font-medium uppercase tracking-widest text-on-surface transition-colors duration-200 hover:bg-surface-container-low sm:w-auto"
                onClick={() => setShown((n) => n + PAGE_STEP)}
                type="button"
              >
                Show {Math.min(PAGE_STEP, remaining)} more
              </button>
              <FieldLabel>{remaining} more scenes</FieldLabel>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
