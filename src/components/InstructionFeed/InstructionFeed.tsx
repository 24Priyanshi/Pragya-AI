"use client";

import { useMemo, useState } from "react";

import { SectionRule } from "@/components/SectionRule";
import { isLanguageKey, type LanguageKey } from "@/data/densewalk-feed/adapt";
import type { FeedData } from "@/types/densewalk-feed";

import { ClipCard } from "./ClipCard";
import { FieldLabel } from "./primitives";
import { TaxonomySidebar, type FacetSelection } from "./TaxonomySidebar";
import { TrackTabs } from "./TrackTabs";

/**
 * "Instruction Feed" — the dataset explorer that follows the DenseWalk hero.
 *
 * Originally followed temp/densewalk_instruction_feed_varied.html: headline
 * metrics, a search/filter row (search box + action/mode/risk selects), a
 * taxonomy sidebar, then one two-pane card per clip, plus a sourcing
 * disclaimer paragraph. On request (2026-09-01) the heading was retitled to
 * "Frame-level CoT" and the descriptive paragraph, the four metric boxes, the
 * search/filter row, and the disclaimer paragraph were all dropped — the
 * taxonomy sidebar and its facet filtering stayed, since it's still the only
 * way to narrow the feed. `query`/`action`/`mode`/`risk` state and the
 * filters they drove went with the row that set them.
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
  const [selection, setSelection] = useState<FacetSelection>({});
  const [track, setTrack] = useState(data.tracks[0].key);

  const activeTrack = data.tracks.find((t) => t.key === track) ?? data.tracks[0];

  /**
   * Which language the cards read their text in.
   *
   * Every language track's key is a `LANGUAGE_SUFFIX` key, so the tab selection
   * doubles as the field selector the frame adapter needs; the simulation track
   * has no text of its own and never reaches a card, so it falls back to English
   * rather than widening the type.
   */
  const language: LanguageKey = isLanguageKey(activeTrack.key) ? activeTrack.key : "english";

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
   * it — so the text is swapped per track rather than a separate clip set being
   * shipped for each. The scene instruction is swapped here from the summary;
   * the frame observations are swapped inside the card, which reads the same
   * language out of the export it already fetched.
   *
   * `translated` is tracked per clip rather than per track: the whole corpus
   * carries all five languages today, but an export that lands without the
   * multilingual pass having run over it falls back to English, and only a
   * per-clip flag can badge that card without badging the other 137.
   */
  const trackClips = useMemo(() => {
    if (activeTrack.kind !== "language") return [];
    return data.clips.map((clip) => ({
      ...clip,
      instruction: clip.instructions[activeTrack.key] ?? clip.instructions.english,
      translated: activeTrack.key in clip.instructions,
    }));
  }, [data.clips, activeTrack]);

  function selectFacet(facetKey: string, value: string | null) {
    setSelection((current) => {
      const next = { ...current };
      if (value === null) delete next[facetKey];
      else next[facetKey] = value;
      return next;
    });
  }

  const filtered = useMemo(
    () => trackClips.filter((clip) => Object.entries(selection).every(([key, value]) => clip.tags[key] === value)),
    [trackClips, selection],
  );

  /**
   * Cards paged in `PAGE_STEP` at a time, reset whenever the match set changes.
   *
   * Adjusted during render rather than in an effect: a filter change that left
   * `shown` stale for one commit would flash the previous page's worth of cards
   * — each of which mounts a video and fires a frame fetch — before collapsing
   * back to the first page.
   */
  const filterKey = JSON.stringify([track, selection]);
  const [shown, setShown] = useState(PAGE_STEP);
  const [shownFor, setShownFor] = useState(filterKey);
  if (shownFor !== filterKey) {
    setShownFor(filterKey);
    setShown(PAGE_STEP);
  }

  const visible = filtered.slice(0, shown);
  const remaining = filtered.length - visible.length;

  return (
    <section>
      <SectionRule label="Instruction Feed" />

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
        /* The taxonomy rail is the one split on this page; each clip card below
         still runs the full width of the content column. */
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[19rem_minmax(0,1fr)] lg:items-start">
          <TaxonomySidebar
            clips={trackClips}
            facets={data.facets}
            onClear={() => setSelection({})}
            onSelect={selectFacet}
            selection={selection}
          />

          <div>
            {activeTrack.key !== "english" ? (
              <p className="inter mb-8 border-l-2 border-primary bg-surface-container-low px-6 py-5 text-sm leading-relaxed text-on-surface-variant">
                <span className="text-on-surface">{activeTrack.label} track.</span> {activeTrack.note}
              </p>
            ) : null}

            <div className="mb-6">
              <FieldLabel>
                Showing {visible.length} of {filtered.length} matching scenes
              </FieldLabel>
            </div>

            {visible.length === 0 ? (
              <div className="border border-outline-variant/10 bg-surface-container-lowest px-6 py-20 text-center">
                <p className="inter text-base text-on-surface-variant">No scene matches those filters.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-6">
                  {visible.map((clip, i) => (
                    <ClipCard
                      clip={clip}
                      eager={i < EAGER_CARDS}
                      framesBase={data.framesBase}
                      key={clip.id}
                      ordinal={i + 1}
                      language={language}
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
                    <FieldLabel>{remaining} more matching scenes</FieldLabel>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
