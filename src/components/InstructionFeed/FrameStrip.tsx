"use client";

import { type RefObject, useEffect, useRef } from "react";

import { cn } from "@/lib/cn";
import type { FeedFrame } from "@/types/densewalk-feed";

import { actionClass } from "./primitives";

/**
 * The per-frame timeline — one cell per keyframe, coloured by the action the
 * pipeline solved for that frame.
 *
 * Clicking a cell seeks the mosaic player to that frame's timestamp and loads
 * it into the reader below, so the strip doubles as the card's scrub bar. A
 * playhead runs the other way, tracking the player across the cells as it
 * plays. The timestamp is not printed on the cell: clips run to 60 keyframes
 * and the strip is one row, which leaves each cell far too narrow for a legible
 * "12.3s". It is carried by the tooltip and the accessible name instead.
 *
 * The column count is inline rather than a Tailwind class because it follows
 * the clip's frame count, which the content scanner cannot know ahead of time.
 * `min-w-0` on the cells keeps a 60-column grid from forcing the card wider
 * than its container — these pages already have a horizontal-overflow problem
 * (BUG-14) and this must not add to it.
 */
interface FrameStripProps {
  frames: readonly FeedFrame[];
  selected: number;
  onSelect: (index: number) => void;
  /** The card's player, tracked by the playhead. */
  videoRef: RefObject<HTMLVideoElement | null>;
}

/**
 * Where the playhead sits, as a percentage across the strip.
 *
 * Position is interpolated in *cell* space rather than straight from
 * `currentTime / duration`: cells are laid out one per keyframe at equal width,
 * but keyframe timestamps are not perfectly evenly spaced, so a purely
 * time-proportional line would drift off the cell it is meant to be over. This
 * walks the timestamps to find the pair bracketing `t` and interpolates between
 * their cell centres, which keeps the line both smooth and aligned.
 *
 * The final cell is extended to the render's duration, since the mosaic runs a
 * little past the last keyframe and the playhead should still reach the end.
 */
function playheadPercent(frames: readonly FeedFrame[], t: number, duration: number): number {
  const n = frames.length;
  if (n === 0) return 0;
  if (t <= frames[0].timeSec) return (0.5 / n) * 100;

  for (let i = 0; i < n - 1; i += 1) {
    const a = frames[i].timeSec;
    const b = frames[i + 1].timeSec;
    if (t < b) {
      const within = b > a ? (t - a) / (b - a) : 0;
      return ((i + 0.5 + within) / n) * 100;
    }
  }

  const last = frames[n - 1].timeSec;
  const end = Number.isFinite(duration) && duration > last ? duration : last;
  const within = end > last ? Math.min((t - last) / (end - last), 1) : 0;
  return ((n - 0.5 + within * 0.5) / n) * 100;
}

export function FrameStrip({ frames, selected, onSelect, videoRef }: FrameStripProps) {
  const playheadRef = useRef<HTMLSpanElement>(null);

  /**
   * The playhead is driven by writing to the node directly rather than through
   * state. It repaints on every animation frame while the clip plays, and a
   * card holds sixty cells plus the frame reader — re-rendering all of that at
   * 60 Hz to move one line would cost far more than the line is worth. React
   * owns the strip's structure; this effect owns one style property on it.
   */
  useEffect(() => {
    const video = videoRef.current;
    const playhead = playheadRef.current;
    if (!video || !playhead) return;

    let raf = 0;

    const paint = () => {
      playhead.style.left = `${playheadPercent(frames, video.currentTime, video.duration)}%`;
      playhead.style.opacity = Number.isFinite(video.duration) ? "1" : "0";
    };
    const tick = () => {
      paint();
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      // One last paint: the frame that ended playback has not been drawn yet.
      paint();
    };

    video.addEventListener("play", start);
    video.addEventListener("playing", start);
    video.addEventListener("pause", stop);
    video.addEventListener("ended", stop);
    video.addEventListener("seeked", paint);
    video.addEventListener("loadedmetadata", paint);

    paint();
    if (!video.paused) start();

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("play", start);
      video.removeEventListener("playing", start);
      video.removeEventListener("pause", stop);
      video.removeEventListener("ended", stop);
      video.removeEventListener("seeked", paint);
      video.removeEventListener("loadedmetadata", paint);
    };
  }, [frames, videoRef]);

  return (
    <div className="relative">
      <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${frames.length}, minmax(0, 1fr))` }}>
        {frames.map((frame) => (
          <button
            aria-label={`Seek to ${frame.time} — ${frame.actionLabel}, ${frame.confidence}% confidence`}
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

      {/* Hidden from the tree: it reports the same position the player's own
          controls already announce, and it is not interactive. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-1 bottom-[-0.25rem] w-px -translate-x-1/2 bg-on-surface opacity-0"
        ref={playheadRef}
      >
        <span className="absolute -left-[3px] -top-1 h-[7px] w-[7px] rotate-45 bg-on-surface" />
      </span>
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
