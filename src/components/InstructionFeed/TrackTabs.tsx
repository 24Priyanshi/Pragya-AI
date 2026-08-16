"use client";

import { cn } from "@/lib/cn";
import type { FeedTrack } from "@/types/densewalk-feed";

/**
 * The language / modality tabs above the feed.
 *
 * Empty tracks stay clickable rather than disabled: the point of showing Hindi,
 * Bangla, Telegu and Simulation before they are populated is to say what is
 * coming, and a tab you cannot open communicates less than one that opens onto
 * an explanation. The count beside each label is how many clips it holds now.
 */
interface TrackTabsProps {
  tracks: readonly FeedTrack[];
  counts: Readonly<Record<string, number>>;
  active: string;
  onSelect: (trackKey: string) => void;
}

export function TrackTabs({ tracks, counts, active, onSelect }: TrackTabsProps) {
  return (
    <div className="mb-10 flex flex-wrap gap-x-10 border-b border-outline-variant/20" role="tablist">
      {tracks.map((track) => {
        const isActive = track.key === active;
        const count = counts[track.key] ?? 0;

        return (
          <button
            aria-selected={isActive}
            className={cn(
              "inter -mb-px flex items-center gap-2.5 border-b-2 px-1 py-4 text-sm font-medium uppercase tracking-widest transition-colors duration-200",
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-outline hover:border-outline-variant/40 hover:text-on-surface-variant",
            )}
            key={track.key}
            onClick={() => onSelect(track.key)}
            role="tab"
            type="button"
          >
            {track.label}
            <span
              className={cn(
                "inter px-2 py-0.5 text-[11px] tabular-nums tracking-normal",
                isActive ? "bg-primary-fixed text-on-primary-fixed" : "bg-surface-container text-outline",
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
