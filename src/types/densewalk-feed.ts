/**
 * Shapes for the DenseWalk instruction feed.
 *
 * `Raw*` mirrors the on-disk annotation JSON exactly (snake_case, as emitted by
 * the pipeline — see src/data/densewalk-feed/003105_uni.json). The `Feed*`
 * shapes are the flattened, display-ready view model the components consume.
 * Keeping the two apart means a schema change in the pipeline is absorbed in
 * one adapter (src/data/densewalk-feed/index.ts) instead of across the UI.
 */

/* ── on-disk annotation schema ────────────────────────────────────────────── */

export interface RawAction {
  readonly label: string;
  readonly velocity_mps: number;
  readonly direction_deg: number;
  readonly yaw_rate_dps: number;
  readonly lateral_mps: number;
  readonly forward_mps: number;
  readonly mode: string;
  readonly mode_id: number;
  readonly is_stop: boolean;
}

export interface RawCorridor {
  readonly exists: boolean;
  /** 0.0 rather than null when `exists` is false. */
  readonly widest_gap_m: number;
  readonly widest_gap_angle_deg: number;
  /** Fraction in 0..1, not a percentage. */
  readonly total_free_width_pct: number;
}

export interface RawNavigability {
  readonly nearest_obstacle_m: number | null;
  /** null when nothing is on a collision course. */
  readonly min_ttc_s: number | null;
  readonly n_critical: number;
  readonly n_high: number;
  /** Fractions in 0..1 despite the `_pct` suffix. */
  readonly surface_blocked_pct: number;
  readonly torso_blocked_pct: number;
  readonly free_corridor: RawCorridor;
  readonly density: string;
}

export interface RawFrame {
  readonly image: string;
  readonly keyframe_id: string;
  readonly time_sec: number;
  readonly observation_text: string;
  readonly action: RawAction;
  readonly navigability: RawNavigability;
  /** Motion-solve confidence in 0..1; < 1 means a low-confidence or artifact frame. */
  readonly weight: number;
  readonly flags: readonly string[];
}

export interface RawClip {
  readonly video_id: string;
  /** Frame rate of the source video, NOT the keyframe sampling rate. */
  readonly fps: number;
  readonly n_frames: number;
  readonly instruction: {
    readonly text: string;
    readonly evidence: {
      readonly n_frames: number;
      readonly location: string;
      readonly density: string;
      readonly peak_people: number;
      readonly peak_vehicles: number;
    };
  };
  readonly action_space: {
    readonly discrete: readonly string[];
    readonly target: readonly string[];
    readonly label_map: Readonly<Record<string, { readonly direction_deg: number; readonly mode: string }>>;
    readonly convention: string;
  };
  readonly frames: readonly RawFrame[];
}

/* ── display-ready view model ─────────────────────────────────────────────── */

export type FrameRisk = "Low" | "Medium" | "High";

export interface FeedFrame {
  /** Position within this clip's ordering, not within the source file. */
  readonly index: number;
  /** Kept from the source frame, so provenance survives re-ordering. */
  readonly keyframeId: string;
  readonly timeSec: number;
  readonly time: string;
  readonly action: string;
  readonly actionLabel: string;
  readonly mode: string;
  readonly isStop: boolean;
  readonly velocity: number;
  readonly direction: number;
  readonly yawRate: number;
  /** `weight` rendered as a whole percentage. */
  readonly confidence: number;
  readonly density: string;
  readonly nearestObstacle: number | null;
  readonly minTtc: number | null;
  readonly corridorExists: boolean;
  readonly widestGap: number;
  readonly gapAngle: number;
  /** Whole percentages, already scaled from the raw 0..1 fractions. */
  readonly surfaceBlocked: number;
  readonly torsoBlocked: number;
  readonly nav: string;
  readonly risk: FrameRisk;
  readonly flags: readonly string[];
  readonly observation: string;
  readonly image: string;
}

export interface DistributionRow {
  readonly action: string;
  readonly label: string;
  readonly count: number;
  /** Share of the clip's frames, as a whole percentage. */
  readonly share: number;
}

export interface NarrativeLine {
  readonly time: string;
  readonly text: string;
}

export interface TaxonomyFacet {
  /** Slug used as the tag key and the React key, e.g. "scene-type". */
  readonly key: string;
  readonly name: string;
  readonly values: readonly string[];
}

export interface FeedClip {
  readonly id: string;
  /** "sample" is a real annotation export; "placeholder" re-orders one. */
  readonly source: "sample" | "placeholder";
  /** null until a render is dropped into public/densewalk — shows the placeholder stage. */
  readonly video: string | null;
  readonly fps: number;
  readonly keyframes: number;
  /** Wall-clock span of the clip, taken from the frame timestamps. */
  readonly duration: string;
  readonly location: string;
  readonly locationLabel: string;
  readonly density: string;
  readonly densityLabel: string;
  readonly peakPeople: number;
  readonly peakVehicles: number;
  readonly instruction: string;
  /**
   * Facet key → value. Empty for clips the tagging pass has not reached; the
   * annotation export carries no taxonomy fields yet, so only placeholders
   * are tagged today.
   */
  readonly tags: Readonly<Record<string, string>>;
  readonly dominantAction: string;
  readonly dominantLabel: string;
  readonly avgConfidence: number;
  readonly risk: FrameRisk;
  readonly distribution: readonly DistributionRow[];
  readonly narrative: readonly NarrativeLine[];
  readonly reasons: readonly string[];
  readonly frames: readonly FeedFrame[];
}

export interface FeedData {
  readonly clips: readonly FeedClip[];
  readonly actions: readonly string[];
  readonly modes: readonly string[];
  readonly facets: readonly TaxonomyFacet[];
  readonly convention: string;
  readonly totalFrames: number;
}
