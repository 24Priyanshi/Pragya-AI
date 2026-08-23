import type { DistributionRow, FeedFrame, FrameRisk, NarrativeLine, RawClip, RawFrame } from "@/types/densewalk-feed";

/**
 * Pure adapters from the annotation schema to the view model.
 *
 * These run in two places: at build time, to derive each clip's summary from
 * its export, and in the browser, to turn a lazily-fetched export into the
 * frames a card renders. Nothing here may import the clip JSON or touch the
 * DOM — the barrel in ./clips is 38 MB and must never reach a client bundle.
 */

export function titleCase(snake: string): string {
  return snake
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const RISK_ORDER: readonly FrameRisk[] = ["Low", "Medium", "High"];

export function riskOf(raw: RawFrame): FrameRisk {
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
 * `time_sec` is carried through untouched: it is the frame's offset into the
 * mosaic render, which is what a strip click seeks the player to. Rounding it
 * for display must not round it for seeking, so both forms are kept.
 */
export function toFrame(raw: RawFrame, index: number): FeedFrame {
  const nav = raw.navigability;
  return {
    index,
    keyframeId: raw.keyframe_id,
    timeSec: raw.time_sec,
    time: `${raw.time_sec.toFixed(1)}s`,
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

export function framesOf(raw: RawClip): readonly FeedFrame[] {
  return raw.frames.map(toFrame);
}

export function distributionOf(frames: readonly FeedFrame[]): readonly DistributionRow[] {
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
export function narrativeOf(frames: readonly FeedFrame[]): readonly NarrativeLine[] {
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

export function reasonsOf(frames: readonly FeedFrame[]): readonly string[] {
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
