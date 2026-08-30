/**
 * Shapes for the DenseWalk instruction feed.
 *
 * `Raw*` mirrors the on-disk annotation JSON exactly (snake_case, as emitted by
 * the pipeline — see src/data/densewalk-feed/clips/001405_uni.json). The `Feed*`
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
  readonly index: number;
  readonly keyframeId: string;
  /** Seconds into the mosaic render; what a strip click seeks the player to. */
  readonly timeSec: number;
  /** `timeSec` formatted for display, e.g. "12.3s". */
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
 
/**
 * A tab in the feed: the four instruction languages plus the Isaac Sim track.
 *
 * The language tracks all describe the same captures, so they render the same
 * cards over the same measurements — only the instruction text changes. The
 * simulation track is a different corpus entirely and carries no clips yet.
 */
export interface FeedTrack {
  readonly key: string;
  readonly label: string;
  readonly kind: "language" | "simulation";
  /** Shown above the feed for this track, and as the body of an empty track. */
  readonly note: string;
  /** False while frame observations are still served from the English source. */
  readonly observationsTranslated: boolean;
}

export interface TaxonomyFacet {
  /** Slug used as the tag key and the React key, e.g. "scene-type". */
  readonly key: string;
  readonly name: string;
  readonly values: readonly string[];
}

/**
 * The clip-level facts the taxonomy facets are computed from.
 *
 * Split out of `FeedClip` so a facet definition can be written against the
 * fields it actually reads, and so the tags can be derived from a clip that is
 * fully built except for its own `tags` — see `FACET_DEFS` in
 * src/data/densewalk-taxonomy.ts.
 */
export interface ClipFacts {
  readonly keyframes: number;
  readonly locationLabel: string;
  readonly densityLabel: string;
  readonly dominantMode: string;
  readonly risk: FrameRisk;
  readonly peakPeople: number;
  readonly peakVehicles: number;
  /** Frames on which a free corridor was found. */
  readonly corridorFrames: number;
  /** Frames whose action is a full stop. */
  readonly stopFrames: number;
}

export interface FeedClip extends ClipFacts {
  readonly id: string;
  /** Mosaic render, streamed from the public dataset CDN. */
  readonly video: string;
  readonly fps: number;
  readonly keyframes: number;
  /** Wall-clock span of the clip, taken from the frame timestamps. */
  readonly duration: string;
  readonly location: string;
  readonly density: string;
  /** Clip-level instruction for the open track; swapped in by track, not stored per copy. */
  readonly instruction: string;
  /** Track key → clip-level instruction, so one clip set serves every language tab. */
  readonly instructions: Readonly<Record<string, string>>;
  /** Facet key → value, derived from the export by `FACET_DEFS`. */
  readonly tags: Readonly<Record<string, string>>;
  readonly dominantAction: string;
  readonly dominantLabel: string;
  readonly avgConfidence: number;
  readonly distribution: readonly DistributionRow[];
  readonly narrative: readonly NarrativeLine[];
  readonly reasons: readonly string[];
  /**
   * Action label → share of the clip's frames, and motion mode → the same,
   * both as whole percentages.
   *
   * Shares rather than the distinct-label sets these used to be. A ~55-frame
   * walk-through touches nearly every action at least once, so "does any frame
   * do this?" matched almost the whole corpus on almost every value — mode
   * `stand` matched all 220 clips, which read as a filter that did nothing. The
   * feed's action and mode filters ask how much of the clip an action accounts
   * for instead; see `PROMINENCE_PCT` in the feed component.
   *
   * Precomputed because the frames themselves are no longer in the page — see
   * the note on `FeedData`.
   */
  readonly actionShares: Readonly<Record<string, number>>;
  readonly modeShares: Readonly<Record<string, number>>;
  /**
   * Lowercased free-text index for this clip: its id, location, density and
   * instruction, plus the distinct words across all of its frame observations.
   *
   * Shipping the observation text itself would put 26 M characters in the page.
   * The distinct-word reduction costs 14 KB gzipped for the whole corpus and
   * still answers the searches this box is used for; what it cannot do is match
   * a phrase spanning two words.
   */
  readonly search: string;
}

/**
 * The feed as the page ships it.
 *
 * Clips carry their summary only. All 220 exports total 33 MB — a ~31 MB
 * prerendered page — so each card fetches its own frames from the dataset CDN
 * when it scrolls into view (see `useClipFrames`), which brings the page to
 * 26 KB gzipped. `videoBase` and `framesBase` are the two URL prefixes that
 * addressing needs, kept here so the CDN layout is stated once.
 */
export interface FeedData {
  readonly clips: readonly FeedClip[];
  /** Prefix for `${id}_uni.json`, the per-clip frame export. */
  readonly framesBase: string;
  readonly actions: readonly string[];
  readonly modes: readonly string[];
  readonly facets: readonly TaxonomyFacet[];
  readonly tracks: readonly FeedTrack[];
  readonly convention: string;
  readonly totalFrames: number;
}
