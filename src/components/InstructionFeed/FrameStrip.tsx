"use client";

import { cn } from "@/lib/cn";
import type { FeedFrame } from "@/types/densewalk-feed";

import { actionClass } from "./primitives";

/**
 * The per-frame instruction strip — one cell per keyframe, coloured by action.
 *
 * Clicking a cell drives the frame reader on the right of the card, which is
 * the interaction the reference mock wires up through `setCurrentFrame`.
 *
 * The column count is inline rather than a Tailwind class because it follows
 * the clip's frame count, which the content scanner cannot know ahead of time.
 * `min-w-0` on the cells keeps a 55-column grid from forcing the card wider
 * than its container — these pages already have a horizontal-overflow problem
 * (BUG-14) and this must not add to it.
 */
interface FrameStripProps {
  frames: readonly FeedFrame[];
  selected: number;
  onSelect: (index: number) => void;
}

export function FrameStrip({ frames, selected, onSelect }: FrameStripProps) {
  return (
    <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${frames.length}, minmax(0, 1fr))` }}>
      {frames.map((frame) => (
        <button
          aria-label={`${frame.time} · ${frame.actionLabel} · ${frame.confidence}% confidence`}
          aria-pressed={frame.index === selected}
          className={cn(
            "h-8 min-w-0 transition-opacity duration-200 hover:opacity-60",
            actionClass(frame.action),
            frame.index === selected && "ring-2 ring-inset ring-on-surface",
          )}
          key={frame.index}
          onClick={() => onSelect(frame.index)}
          title={`${frame.keyframeId} · ${frame.time} · ${frame.actionLabel} · ${frame.confidence}%`}
          type="button"
        />
      ))}
    </div>
  );
}

export function StripLegend({ actions }: { actions: readonly string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
      {actions.map((action) => (
        <span className="inter flex items-center gap-2 text-xs tracking-wide text-on-surface-variant" key={action}>
          <i className={cn("inline-block h-3 w-3", actionClass(action))} />
          {action.replaceAll("_", " ")}
        </span>
      ))}
    </div>
  );
}
