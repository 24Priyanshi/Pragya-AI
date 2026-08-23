import type { ClipFacts } from "@/types/densewalk-feed";

/**
 * Facets for the DenseWalk sidebar.
 *
 * These used to be the 15-field v3 tag vocabulary borrowed from
 * src/data/denseworld.ts, tagged onto placeholder clips by a deterministic
 * `placeholderTags` walk. The annotation exports carry none of those fields, so
 * once the feed became 50 real clips every one of them was untagged and the
 * sidebar filtered the feed down to nothing on any click.
 *
 * Every facet below is instead derived from the export itself: `location` and
 * `density` come straight off `instruction.evidence`, the rest are computed
 * over the clip's frames. That keeps the rail honest — no clip carries a tag
 * no pipeline produced — and keeps every row clickable, because the values are
 * read back out of the corpus rather than declared up front.
 */

export interface FacetDef {
  /** Slug used as the tag key and the React key, e.g. "scene-type". */
  readonly key: string;
  readonly name: string;
  /** Canonical display order; values absent from the corpus are dropped. */
  readonly order: readonly string[];
  readonly of: (clip: ClipFacts) => string;
}

function share(count: number, total: number): number {
  return total === 0 ? 0 : count / total;
}

export const FACET_DEFS: readonly FacetDef[] = [
  {
    key: "scene-type",
    name: "Scene Type",
    order: ["Pedestrian Street", "Mixed Street", "Intersection", "Vehicle Road"],
    of: (clip) => clip.locationLabel,
  },
  {
    key: "crowd-density",
    name: "Crowd Density",
    order: ["Empty", "Sparse", "Moderate", "Dense", "Extreme"],
    of: (clip) => clip.densityLabel,
  },
  {
    key: "dominant-motion",
    name: "Dominant Motion",
    order: ["Walk", "Turn", "Sidestep", "Stand"],
    of: (clip) => clip.dominantMode,
  },
  {
    key: "clip-risk",
    name: "Clip Risk",
    order: ["Low", "Medium", "High"],
    of: (clip) => clip.risk,
  },
  {
    key: "peak-people",
    name: "Peak People",
    order: ["None", "1–3", "4–9", "10+"],
    of: (clip) => {
      if (clip.peakPeople === 0) return "None";
      if (clip.peakPeople <= 3) return "1–3";
      if (clip.peakPeople <= 9) return "4–9";
      return "10+";
    },
  },
  {
    key: "peak-vehicles",
    name: "Peak Vehicles",
    order: ["None", "1–2", "3+"],
    of: (clip) => {
      if (clip.peakVehicles === 0) return "None";
      if (clip.peakVehicles <= 2) return "1–2";
      return "3+";
    },
  },
  {
    key: "free-corridor",
    name: "Free Corridor",
    order: ["Open throughout", "Intermittent", "Never found"],
    of: (clip) => {
      const open = share(clip.corridorFrames, clip.keyframes);
      if (open === 1) return "Open throughout";
      return open === 0 ? "Never found" : "Intermittent";
    },
  },
  {
    key: "stops",
    name: "Full Stops",
    order: ["None", "Occasional", "Frequent"],
    of: (clip) => {
      if (clip.stopFrames === 0) return "None";
      return share(clip.stopFrames, clip.keyframes) > 0.25 ? "Frequent" : "Occasional";
    },
  },
];
