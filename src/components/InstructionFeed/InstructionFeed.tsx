"use client";

import { useMemo, useState } from "react";

import { SectionRule } from "@/components/SectionRule";
import type { FeedData, FrameRisk } from "@/types/densewalk-feed";

import { ClipCard } from "./ClipCard";
import { FieldLabel } from "./primitives";
import { TaxonomySidebar, type FacetSelection } from "./TaxonomySidebar";
import { TrackTabs } from "./TrackTabs";

/**
 * "Instruction Feed" — the dataset explorer that follows the DenseWalk hero.
 *
 * Structure follows temp/densewalk_instruction_feed_varied.html: headline
 * metrics, a filter row, then one two-pane card per clip. The mock's synthetic
 * `status`/`priority` filters are replaced by fields the annotation JSON
 * actually carries — action, motion mode and derived risk — because a control
 * that filters on data the pipeline never emits can only ever be decorative.
 */

const RISKS: readonly FrameRisk[] = ["Low", "Medium", "High"];

/**
 * How many cards the feed opens with, and how many each "Show more" adds.
 *
 * The corpus is 138 clips and every card mounts a video element plus its own
 * frame fetch, so the feed pages in rather than rendering the whole match set.
 */
const PAGE_STEP = 5;

/** Cards at the top of a page fetch their frames immediately rather than on scroll. */
const EAGER_CARDS = 3;

/**
 * Headline totals for the full DenseWalk corpus.
 *
 * Stated rather than counted, because they describe the whole dataset while the
 * feed below is served from the public release — currently a 138-clip sample of
 * it. Anything derived from `data` would report the sample and understate the
 * corpus, so these two are held here and updated by hand as it grows.
 */
const CORPUS_CLIPS = "5k+";
const CORPUS_FRAMES = "260k+";

/**
 * How much of a clip an action or mode must account for to match its filter.
 *
 * These filters used to ask "does any frame do this?". Over a ~50-frame
 * walk-through that is true of nearly everything: mode `stand` matched every
 * clip in the corpus and `walk` nearly as many, so choosing one changed nothing
 * on screen. A share floor asks the question people mean — "is this clip
 * actually about this?" — and splits the corpus (at 15%, over the 138-clip
 * release: stand 18, sidestep 25, turn 51, walk 123).
 */
const PROMINENCE_PCT = 15;

/** Whole-percentage shares, so a value absent from the clip reads as zero. */
function prominent(shares: Readonly<Record<string, number>>, key: string): boolean {
  return (shares[key] ?? 0) >= PROMINENCE_PCT;
}


const CONTROL_CLASS =
  "inter w-full border border-outline-variant/20 bg-surface-container-lowest px-4 py-3.5 text-sm text-on-surface " +
  "placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0";

export function InstructionFeed({ data }: { data: FeedData }) {
  const [query, setQuery] = useState("");
  const [action, setAction] = useState("");
  const [mode, setMode] = useState("");
  const [risk, setRisk] = useState("");
  const [selection, setSelection] = useState<FacetSelection>({});
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

  function selectFacet(facetKey: string, value: string | null) {
    setSelection((current) => {
      const next = { ...current };
      if (value === null) delete next[facetKey];
      else next[facetKey] = value;
      return next;
    });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return trackClips.filter((clip) => {
      // `search` and the share maps are precomputed per clip: the frames they
      // were derived from no longer live in the page.
      if (q && !clip.search.includes(q)) return false;
      if (action && !prominent(clip.actionShares, action)) return false;
      if (mode && !prominent(clip.modeShares, mode)) return false;
      if (risk && clip.risk !== risk) return false;
      return Object.entries(selection).every(([key, value]) => clip.tags[key] === value);
    });
  }, [trackClips, query, action, mode, risk, selection]);

  /**
   * Cards paged in `PAGE_STEP` at a time, reset whenever the match set changes.
   *
   * Adjusted during render rather than in an effect: a filter change that left
   * `shown` stale for one commit would flash the previous page's worth of cards
   * — each of which mounts a video and fires a frame fetch — before collapsing
   * back to the first page.
   */
  const filterKey = JSON.stringify([track, query, action, mode, risk, selection]);
  const [shown, setShown] = useState(PAGE_STEP);
  const [shownFor, setShownFor] = useState(filterKey);
  if (shownFor !== filterKey) {
    setShownFor(filterKey);
    setShown(PAGE_STEP);
  }

  const visible = filtered.slice(0, shown);
  const remaining = filtered.length - visible.length;
  const kpis = [
    { value: CORPUS_CLIPS, label: "annotated scenes" },
    { value: CORPUS_FRAMES, label: "frame instructions" },
    // These two stay measured: they describe the vocabulary the exports below
    // actually use, which is the same whatever the corpus size.
    { value: String(data.actions.length), label: "discrete actions" },
    { value: String(new Set(data.clips.map((c) => c.location)).size), label: "scene types" },
  ];

  return (
    <section>
      <SectionRule label="Instruction Feed" />

      <div className="mb-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <h2 className="plus-jakarta-sans text-5xl font-extralight tracking-tighter text-on-surface md:text-6xl">
            Frame-level instruction explorer
          </h2>
          <p className="inter mt-6 max-w-3xl text-base leading-relaxed text-on-surface-variant">
            Each card is one walk-through scene: the mosaic render on the left, the full instruction reasoning on the right.
            The strip beneath every player is that scene&rsquo;s keyframe timeline — click a frame to scrub the render to its
            timestamp and read the observation the pipeline grounded its instruction in, and the playhead tracks the scene as
            it plays.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {kpis.map((kpi) => (
            <div className="border-l-2 border-primary bg-surface-container-lowest px-5 py-4" key={kpi.label}>
              <b className="plus-jakarta-sans block text-3xl font-light tracking-tighter text-on-surface">{kpi.value}</b>
              <FieldLabel>{kpi.label}</FieldLabel>
            </div>
          ))}
        </div>
      </div>

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
            <div className="mb-6 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_11rem_11rem_11rem]">
              <input
                aria-label="Search scenes, actions and frame instructions"
                className={CONTROL_CLASS}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search scene id, instruction, action, keyframe…"
                type="search"
                value={query}
              />
              <select
                aria-label="Filter by action"
                className={CONTROL_CLASS}
                onChange={(e) => setAction(e.target.value)}
                value={action}
              >
                <option value="">All actions</option>
                {data.actions.map((a) => (
                  <option key={a} value={a}>
                    {a.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
              <select
                aria-label="Filter by motion mode"
                className={CONTROL_CLASS}
                onChange={(e) => setMode(e.target.value)}
                value={mode}
              >
                <option value="">All modes</option>
                {data.modes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                aria-label="Filter by risk"
                className={CONTROL_CLASS}
                onChange={(e) => setRisk(e.target.value)}
                value={risk}
              >
                <option value="">All risk levels</option>
                {RISKS.map((r) => (
                  <option key={r} value={r}>
                    {r} risk
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-8 space-y-2">
              {activeTrack.key !== "english" ? (
                <p className="inter border-l-2 border-primary bg-surface-container-low px-6 py-5 text-sm leading-relaxed text-on-surface-variant">
                  <span className="text-on-surface">{activeTrack.label} track.</span> {activeTrack.note}
                </p>
              ) : null}
              <p className="inter border border-outline-variant/10 bg-surface-container-lowest px-6 py-5 text-sm leading-relaxed text-on-surface-variant">
                All {data.clips.length} cards are annotation exports from the{" "}
                <a
                  className="text-primary underline underline-offset-4 hover:opacity-70"
                  href="https://huggingface.co/datasets/s-alam/densewalk-public"
                  rel="noreferrer"
                  target="_blank"
                >
                  public DenseWalk release
                </a>
                . Every measurement on screen is read from that export, and both the mosaic renders and the per-frame
                detail stream from the same dataset as you scroll — nothing here is reconstructed.
              </p>
            </div>

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
