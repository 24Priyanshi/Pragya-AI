import { facets, placeholderTags } from "@/data/densewalk-taxonomy";
import type {
  DistributionRow,
  FeedClip,
  FeedData,
  FeedFrame,
  FrameRisk,
  NarrativeLine,
  RawClip,
  RawFrame,
} from "@/types/densewalk-feed";

import sample from "./003105_uni.json";

/**
 * Adapter for the DenseWalk instruction feed.
 *
 * One real annotation file ships today (003105_uni.json). Every number the feed
 * shows is derived from it — nothing is invented — so when the rest of the
 * exports land, dropping their JSON in this folder and extending SOURCES is the
 * whole change.
 *
 * The extra cards are explicit re-orderings of that clip, labelled as such in
 * the UI. A feed seeded with one clip repeated verbatim would make the filters
 * and the timeline look broken, and fabricating annotations would put numbers
 * on screen that no pipeline produced. A re-ordering moves real frames and
 * nothing else.
 */

/** Real annotation exports. Add an entry per clip as they arrive. */
const SOURCES: readonly RawClip[] = [sample as RawClip];

/** Re-orderings generated per real clip while only one export exists. Set to 0 once enough ship. */
const REORDERINGS_PER_SOURCE = 11;

/**
 * Clip id → mp4 under public/. Empty for now, so every stage renders the
 * placeholder tile. Drop the render in public/densewalk/ and uncomment its
 * line to attach it; ids not listed stay placeholders.
 */
const VIDEOS: Readonly<Record<string, string>> = {
  // "003105": "/densewalk/003105_mosaic.mp4",
};

function videoFor(clipId: string): string | null {
  return VIDEOS[clipId] ?? null;
}

function titleCase(snake: string): string {
  return snake
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const RISK_ORDER: readonly FrameRisk[] = ["Low", "Medium", "High"];

function riskOf(raw: RawFrame): FrameRisk {
  const nav = raw.navigability;
  if (nav.n_critical > 0) return "High";
  if (nav.min_ttc_s !== null && nav.min_ttc_s < 1.5) return "High";
  if (nav.n_high > 0 || !nav.free_corridor.exists || nav.surface_blocked_pct > 0.5) return "Medium";
  return "Low";
}

function navSummary(raw: RawFrame): string {
  const corridor = raw.navigability.free_corridor;
  if (!corridor.exists) return "No free corridor";
  const bearing = corridor.widest_gap_angle_deg === 0 ? "ahead" : `${corridor.widest_gap_angle_deg}°`;
  return `${corridor.widest_gap_m.toFixed(1)} m gap ${bearing}`;
}

/**
 * `timeSec` is passed in rather than read off `raw`, because a re-ordered clip
 * takes its timeline from the slot a frame lands in, not from the frame's
 * original timestamp — otherwise the axis would run backwards mid-clip.
 */
function toFrame(raw: RawFrame, index: number, timeSec: number): FeedFrame {
  const nav = raw.navigability;
  return {
    index,
    keyframeId: raw.keyframe_id,
    timeSec,
    time: `${timeSec.toFixed(1)}s`,
    action: raw.action.label,
    actionLabel: titleCase(raw.action.label),
    mode: raw.action.mode,
    isStop: raw.action.is_stop,
    velocity: raw.action.velocity_mps,
    direction: raw.action.direction_deg,
    yawRate: raw.action.yaw_rate_dps,
    confidence: Math.round(raw.weight * 100),
    density: nav.density,
    nearestObstacle: nav.nearest_obstacle_m,
    minTtc: nav.min_ttc_s,
    corridorExists: nav.free_corridor.exists,
    widestGap: nav.free_corridor.widest_gap_m,
    gapAngle: nav.free_corridor.widest_gap_angle_deg,
    // The raw fields are 0..1 fractions despite their `_pct` suffix.
    surfaceBlocked: Math.round(nav.surface_blocked_pct * 100),
    torsoBlocked: Math.round(nav.torso_blocked_pct * 100),
    nav: navSummary(raw),
    risk: riskOf(raw),
    flags: raw.flags,
    observation: raw.observation_text,
    image: raw.image,
  };
}

function distributionOf(frames: readonly FeedFrame[]): readonly DistributionRow[] {
  const counts = new Map<string, number>();
  for (const frame of frames) counts.set(frame.action, (counts.get(frame.action) ?? 0) + 1);

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([action, count]) => ({
      action,
      label: titleCase(action),
      count,
      share: Math.round((count / frames.length) * 100),
    }));
}

/** Splits the clip into four spans and describes what each one actually contains. */
function narrativeOf(frames: readonly FeedFrame[]): readonly NarrativeLine[] {
  const SPANS = 4;
  const size = Math.ceil(frames.length / SPANS);
  const lines: NarrativeLine[] = [];

  for (let start = 0; start < frames.length; start += size) {
    const span = frames.slice(start, start + size);
    const dominant = distributionOf(span)[0];
    const blocked = span.filter((f) => !f.corridorExists).length;
    const stopped = span.filter((f) => f.isStop).length;

    const corridor =
      blocked === 0
        ? "a free corridor holds throughout"
        : blocked === span.length
          ? "no free corridor is found"
          : `the corridor closes on ${blocked} of ${span.length} frames`;

    lines.push({
      time: `${span[0].timeSec.toFixed(1)}–${span[span.length - 1].timeSec.toFixed(1)}s`,
      text:
        `${dominant.label} leads on ${dominant.count} of ${span.length} frames and ${corridor}` +
        (stopped > 0 ? `, with ${stopped} full stop${stopped === 1 ? "" : "s"}.` : "."),
    });
  }

  return lines;
}

function reasonsOf(frames: readonly FeedFrame[]): readonly string[] {
  const open = frames.filter((f) => f.corridorExists).length;
  const widest = Math.max(...frames.map((f) => f.widestGap));
  const ranges = frames.map((f) => f.nearestObstacle).filter((m): m is number => m !== null);
  const flagged = frames.filter((f) => f.flags.length > 0).length;

  const modes = new Map<string, number>();
  for (const frame of frames) modes.set(frame.mode, (modes.get(frame.mode) ?? 0) + 1);
  const [topMode, topModeCount] = [...modes.entries()].sort((a, b) => b[1] - a[1])[0];

  return [
    `Free corridor on ${open} of ${frames.length} frames`,
    `Widest measured gap ${widest.toFixed(1)} m`,
    ranges.length > 0 ? `Nearest obstacle ${Math.min(...ranges).toFixed(2)} m` : "No obstacle range recovered",
    flagged > 0
      ? `${flagged} frame${flagged === 1 ? "" : "s"} flagged low-confidence`
      : `Dominant mode ${topMode} on ${topModeCount} frames`,
  ];
}

function rotate(frames: readonly RawFrame[], offset: number): readonly RawFrame[] {
  const shift = ((offset % frames.length) + frames.length) % frames.length;
  return [...frames.slice(shift), ...frames.slice(0, shift)];
}

function toClip(
  raw: RawClip,
  id: string,
  source: FeedClip["source"],
  offset: number,
  tags: Readonly<Record<string, string>>,
): FeedClip {
  const ordered = offset === 0 ? raw.frames : rotate(raw.frames, offset);
  // Keyframes are sampled sparsely, so the span comes from the timestamps —
  // frames / fps would describe the source video, not this clip.
  const timeline = raw.frames.map((f) => f.time_sec);
  const frames = ordered.map((frame, i) => toFrame(frame, i, timeline[i]));

  const distribution = distributionOf(frames);
  const evidence = raw.instruction.evidence;
  const worstRisk = frames.reduce<FrameRisk>(
    (worst, frame) => (RISK_ORDER.indexOf(frame.risk) > RISK_ORDER.indexOf(worst) ? frame.risk : worst),
    "Low",
  );

  return {
    id,
    source,
    video: videoFor(id),
    fps: raw.fps,
    keyframes: frames.length,
    duration: `${Math.max(...timeline).toFixed(1)}s`,
    location: evidence.location,
    locationLabel: titleCase(evidence.location),
    density: evidence.density,
    densityLabel: titleCase(evidence.density),
    peakPeople: evidence.peak_people,
    peakVehicles: evidence.peak_vehicles,
    instruction: raw.instruction.text,
    tags,
    dominantAction: distribution[0].action,
    dominantLabel: distribution[0].label,
    avgConfidence: Math.round((frames.reduce((sum, f) => sum + f.confidence, 0) / frames.length) * 10) / 10,
    risk: worstRisk,
    distribution,
    narrative: narrativeOf(frames),
    reasons: reasonsOf(frames),
    frames,
  };
}

function buildFeed(): FeedData {
  const clips: FeedClip[] = [];

  for (const raw of SOURCES) {
    // The real export carries no taxonomy fields, so the sample stays untagged
    // rather than being given values no tagger assigned.
    clips.push(toClip(raw, raw.video_id, "sample", 0, {}));
    for (let n = 1; n <= REORDERINGS_PER_SOURCE; n += 1) {
      // A prime step keeps successive re-orderings from landing on similar sequences.
      const offset = (n * 7) % raw.frames.length;
      clips.push(toClip(raw, `${raw.video_id}-R${String(n).padStart(2, "0")}`, "placeholder", offset, placeholderTags(n)));
    }
  }

  return {
    clips,
    actions: [...new Set(SOURCES.flatMap((s) => s.action_space.discrete))],
    modes: [...new Set(clips.flatMap((c) => c.frames.map((f) => f.mode)))].sort(),
    facets,
    convention: SOURCES[0].action_space.convention,
    totalFrames: clips.reduce((sum, c) => sum + c.frames.length, 0),
  };
}

export const feedData: FeedData = buildFeed();
