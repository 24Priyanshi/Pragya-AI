import { FACET_DEFS } from "@/data/densewalk-taxonomy";
import type { ClipFacts, FeedClip, FeedData, FeedTrack, FrameRisk, RawClip, TaxonomyFacet } from "@/types/densewalk-feed";

import {
  LANGUAGE_SUFFIX,
  RISK_ORDER,
  distributionOf,
  framesOf,
  narrativeOf,
  reasonsOf,
  titleCase,
  type LanguageKey,
} from "./adapt";
import { rawClips } from "./clips";

/**
 * Build-time adapter for the DenseWalk instruction feed.
 *
 * Every clip on the page is a real annotation export from the public dataset
 * (https://huggingface.co/datasets/s-alam/densewalk-public): the JSON under
 * ./clips is `json_openvla/` verbatim, and each mosaic render is streamed from
 * the same repo by URL.
 *
 * This module runs at build time only — it pulls in all 138 exports, 22 MB of
 * JSON, and must never be imported from a client component. What it emits is
 * the *summary* of each clip: everything the grid, the filters and the taxonomy
 * rail need, and nothing per-frame. Cards fetch their own frames from the CDN
 * (src/lib/densewalk-frames.ts) using the same adapters in ./adapt, so the two
 * paths cannot drift.
 *
 * Refresh the corpus with `npm run sync:densewalk`.
 */

/** Real annotation exports, one per file in the dataset's `json_openvla/`. */
const SOURCES: readonly RawClip[] = rawClips;

const REPO_BASE = "https://huggingface.co/datasets/s-alam/densewalk-public/resolve/main";

/**
 * Mosaic renders, served straight from the dataset's CDN.
 *
 * `/resolve/` answers a cross-origin request with a redirect to a signed CDN
 * URL that honours Range requests, so the player can seek without the video
 * ever being copied into this repo or onto the web host. The file name is a
 * pure function of the clip id — the dataset pairs every `NNNNNN_uni.json`
 * with exactly one `NNNNNN_mosaic.mp4`.
 */
const VIDEO_BASE = `${REPO_BASE}/mosaic_videos`;

/** Per-clip frame exports, fetched by the card that needs them. */
const FRAMES_BASE = `${REPO_BASE}/json_openvla`;

function videoFor(clipId: string): string {
  return `${VIDEO_BASE}/${clipId}_mosaic.mp4`;
}

/**
 * The feed's tabs.
 *
 * The five language tracks describe the same captures, so they share one clip
 * set and swap only the text — geometry, timing, actions and taxonomy are
 * properties of the walk, not of the language describing it. Every one of them
 * is real annotation output since the multilingual pass (2026-09-01): each
 * export carries its instruction and all of its frame observations in all five
 * languages, so the hand-written Hindi/Bangla/Telegu stand-ins that used to
 * live here are gone and Tamil joined the set. Order follows `LANGUAGE_SUFFIX`.
 *
 * Simulation is a separate corpus and holds no clips yet.
 */
const LANGUAGES = Object.keys(LANGUAGE_SUFFIX) as readonly LanguageKey[];

const LANGUAGE_LABELS: Readonly<Record<LanguageKey, string>> = {
  english: "English",
  bangla: "Bangla",
  hindi: "Hindi",
  tamil: "Tamil",
  telegu: "Telegu",
};

const TRACKS: readonly FeedTrack[] = [
  ...LANGUAGES.map((key) => ({
    key,
    label: LANGUAGE_LABELS[key],
    kind: "language" as const,
    note:
      key === "english"
        ? "Instructions and frame observations as they appear in the annotation exports."
        : `Scene instructions and every frame observation in ${LANGUAGE_LABELS[key]}, read from the same annotation exports as the English track.`,
  })),
  {
    key: "simulation",
    label: "Simulation",
    kind: "simulation",
    note: "Isaac Sim rollouts are exported separately from the walk-through captures and have not landed yet.",
  },
];

/**
 * Clip-level instruction per track, straight out of the export.
 *
 * A language the export does not carry is left out rather than filled with the
 * English string: the feed already falls back to English for a missing key, and
 * badges that card as a fallback — a filled-in entry would silently pass English
 * off as a translation. English itself is always present, since it is the
 * unsuffixed `text` the schema requires.
 */
function instructionsFor(raw: RawClip): Readonly<Record<string, string>> {
  const carried = LANGUAGES.map((key) => [key, raw.instruction[`text${LANGUAGE_SUFFIX[key]}`]] as const).filter(
    (entry): entry is readonly [LanguageKey, string] => Boolean(entry[1]),
  );
  return Object.fromEntries(carried);
}

/**
 * Distinct words across a clip's frame observations.
 *
 * The full text is 18 M characters over the corpus and cannot ship. Reducing
 * each clip to its vocabulary keeps the search box working on the words people
 * actually type — actions, objects, densities — for 14 KB gzipped in total.
 */
function observationVocabulary(raw: RawClip): string {
  const words = new Set<string>();
  for (const frame of raw.frames) {
    for (const word of frame.observation_text.toLowerCase().match(/[a-z0-9]+/g) ?? []) words.add(word);
  }
  return [...words].sort().join(" ");
}

function toClip(raw: RawClip): FeedClip {
  const frames = framesOf(raw);

  const distribution = distributionOf(frames);
  const evidence = raw.instruction.evidence;
  const worstRisk = frames.reduce<FrameRisk>(
    (worst, frame) => (RISK_ORDER.indexOf(frame.risk) > RISK_ORDER.indexOf(worst) ? frame.risk : worst),
    "Low",
  );

  // Modes are counted over frames rather than taken from the dominant action,
  // so a clip split across two walk actions still reads as "Walk" overall.
  const modeCounts = new Map<string, number>();
  for (const frame of frames) modeCounts.set(frame.mode, (modeCounts.get(frame.mode) ?? 0) + 1);
  const dominantMode = [...modeCounts.entries()].sort((a, b) => b[1] - a[1])[0][0];

  const facts: ClipFacts = {
    keyframes: frames.length,
    locationLabel: titleCase(evidence.location),
    densityLabel: titleCase(evidence.density),
    dominantMode: titleCase(dominantMode),
    risk: worstRisk,
    peakPeople: evidence.peak_people,
    peakVehicles: evidence.peak_vehicles,
    corridorFrames: frames.filter((f) => f.corridorExists).length,
    stopFrames: frames.filter((f) => f.isStop).length,
  };

  // Shares, not distinct labels: see the note on `actionShares` in the types.
  const actionShares = Object.fromEntries(distribution.map((row) => [row.action, row.share]));
  const modeShares = Object.fromEntries(
    [...modeCounts].map(([mode, count]) => [mode, Math.round((count / frames.length) * 100)]),
  );

  return {
    ...facts,
    id: raw.video_id,
    video: videoFor(raw.video_id),
    fps: raw.fps,
    // Keyframes are sampled sparsely, so the span comes from the timestamps —
    // frames / fps would describe the source video, not the sampled clip.
    duration: `${Math.max(...frames.map((f) => f.timeSec)).toFixed(1)}s`,
    location: evidence.location,
    density: evidence.density,
    instruction: raw.instruction.text,
    instructions: instructionsFor(raw),
    tags: Object.fromEntries(FACET_DEFS.map((facet) => [facet.key, facet.of(facts)])),
    dominantAction: distribution[0].action,
    dominantLabel: distribution[0].label,
    avgConfidence: Math.round((frames.reduce((sum, f) => sum + f.confidence, 0) / frames.length) * 10) / 10,
    distribution,
    narrative: narrativeOf(frames),
    reasons: reasonsOf(frames),
    actionShares,
    modeShares,
    search: [
      raw.video_id,
      evidence.location,
      evidence.density,
      raw.instruction.text,
      ...Object.keys(actionShares),
      ...Object.keys(modeShares),
    ]
      .join(" ")
      .toLowerCase()
      .concat(" ", observationVocabulary(raw)),
  };
}

/**
 * Facet rows, restricted to values the corpus actually contains.
 *
 * A declared-but-absent value would render a permanently-zero row that filters
 * the feed to nothing when clicked, so the vocabulary is read back out of the
 * tagged clips and only ordered by the definition.
 */
function facetsOf(clips: readonly FeedClip[]): readonly TaxonomyFacet[] {
  return FACET_DEFS.map((def) => {
    const present = new Set(clips.map((clip) => clip.tags[def.key]));
    return {
      key: def.key,
      name: def.name,
      values: def.order.filter((value) => present.has(value)),
    };
  }).filter((facet) => facet.values.length > 1);
}

function buildFeed(): FeedData {
  const clips = SOURCES.map(toClip).sort((a, b) => a.id.localeCompare(b.id));

  return {
    clips,
    framesBase: FRAMES_BASE,
    actions: [...new Set(SOURCES.flatMap((s) => s.action_space.discrete))],
    modes: [...new Set(clips.flatMap((c) => Object.keys(c.modeShares)))].sort(),
    facets: facetsOf(clips),
    tracks: TRACKS,
    convention: SOURCES[0].action_space.convention,
    totalFrames: clips.reduce((sum, c) => sum + c.keyframes, 0),
  };
}

export const feedData: FeedData = buildFeed();
