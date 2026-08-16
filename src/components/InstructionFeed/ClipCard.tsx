"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";
import type { FeedClip } from "@/types/densewalk-feed";

import { FrameStrip, StripLegend } from "./FrameStrip";
import { Chip, FieldLabel, actionClass, riskTone } from "./primitives";

/**
 * One clip in the feed.
 *
 * Section order follows the reference mock exactly — player, instruction strip,
 * info cells, clip-level instruction, distribution + narrative, frame reader —
 * but stacked full width rather than in the mock's two panes. The player is the
 * one element that does not want the full 1920px: an unconstrained 16:9 stage
 * would stand over a thousand pixels tall and push everything else off screen,
 * so it keeps a readable maximum and the strip below it takes the full width.
 *
 * The selected frame is local state per card, so each keeps its own reader
 * position while you scan down the feed.
 */

function VideoStage({ clip }: { clip: FeedClip }) {
  return (
    <div className="relative aspect-video overflow-hidden bg-on-surface">
      {clip.video ? (
        <video className="h-full w-full object-cover" controls loop muted playsInline src={clip.video} />
      ) : (
        <div className="grid h-full w-full place-items-center">
          {/* Reference grid, echoing the mock's placeholder texture. */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #F5E6D3 1px, transparent 1px), linear-gradient(0deg, #F5E6D3 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative flex flex-col items-center gap-3">
            <span className="grid h-14 w-14 place-items-center border border-primary-fixed/40 text-lg text-primary-fixed">▶</span>
            <span className="inter text-[11px] uppercase tracking-widest text-primary-fixed/60">Awaiting upload</span>
          </div>
        </div>
      )}
      <span className="inter absolute left-3 top-3 bg-on-surface/80 px-2.5 py-1.5 text-[11px] uppercase tracking-widest text-primary-fixed">
        {clip.video ? "Mosaic render" : "Placeholder video"}
      </span>
    </div>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-outline-variant/10 p-4">
      <FieldLabel>{label}</FieldLabel>
      <b className="plus-jakarta-sans mt-2 block text-2xl font-light tracking-tight text-on-surface">{value}</b>
    </div>
  );
}

interface ClipCardProps {
  clip: FeedClip;
  ordinal: number;
  /** Language tab this card is being read under; null on the English tab. */
  trackLabel?: string | null;
  /** False when the track's text is a stand-in rather than annotation output. */
  translated?: boolean;
}

export function ClipCard({ clip, ordinal, trackLabel = null, translated = true }: ClipCardProps) {
  const [selected, setSelected] = useState(0);
  const frame = clip.frames[selected] ?? clip.frames[0];

  return (
    <article className="border border-outline-variant/10 bg-surface-container-lowest">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/10 bg-surface-container-low px-6 py-5">
        <div className="flex items-center gap-4">
          <span className="plus-jakarta-sans grid h-14 w-14 shrink-0 place-items-center bg-on-surface text-base font-light text-primary-fixed">
            {String(ordinal).padStart(3, "0")}
          </span>
          <div>
            <h3 className="plus-jakarta-sans text-3xl font-light tracking-tighter text-on-surface">Clip {clip.id}</h3>
            <small className="inter mt-1 block text-sm text-on-surface-variant">
              {clip.keyframes} keyframes over {clip.duration} · {clip.fps} fps source · frame-level navigation instructions
            </small>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Chip tone={clip.source === "sample" ? "strong" : "muted"}>{clip.source === "sample" ? "Sample" : "Placeholder"}</Chip>
          {trackLabel ? <Chip tone="muted">{trackLabel}</Chip> : null}
          <Chip>{clip.locationLabel}</Chip>
          <Chip>{clip.densityLabel} density</Chip>
          <Chip tone="accent">{clip.dominantLabel}</Chip>
        </div>
      </header>

      <div className="space-y-4 p-6">
        <div className="mx-auto w-full max-w-4xl">
          <VideoStage clip={clip} />
        </div>

        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <FieldLabel>{clip.keyframes}-frame instruction strip</FieldLabel>
            <span className="inter text-xs tracking-wide text-outline">click a frame to load it</span>
          </div>
          <FrameStrip frames={clip.frames} onSelect={setSelected} selected={selected} />
          <StripLegend actions={clip.distribution.map((row) => row.action)} />
        </div>

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <InfoCell label="Dominant action" value={clip.dominantLabel} />
          <InfoCell label="Solve confidence" value={`${clip.avgConfidence}%`} />
          <InfoCell label="Scene density" value={clip.densityLabel} />
          <InfoCell label="Keyframes" value={String(clip.keyframes)} />
        </div>

        <div className="border-l-2 border-primary bg-surface-container-low p-6">
          <div className="flex flex-wrap items-center gap-3">
            <FieldLabel>Clip-level instruction{trackLabel ? ` · ${trackLabel}` : ""}</FieldLabel>
            {trackLabel && !translated ? <Chip tone="muted">Stand-in translation</Chip> : null}
          </div>
          <p className="inter mt-3 max-w-5xl text-base leading-relaxed text-on-surface">{clip.instruction}</p>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {clip.reasons.map((reason) => (
              <div
                className="inter flex gap-2 border border-outline-variant/10 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface-variant"
                key={reason}
              >
                <span className="text-primary">✓</span>
                {reason}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div className="border border-outline-variant/10 p-5">
            <FieldLabel>Action distribution</FieldLabel>
            <div className="mt-4 space-y-3">
              {clip.distribution.map((row) => (
                <div className="grid grid-cols-[9rem_1fr_2.5rem] items-center gap-3" key={row.action}>
                  <span className="inter truncate text-sm text-on-surface-variant">{row.action.replaceAll("_", " ")}</span>
                  <span className="h-2.5 bg-surface-container">
                    <span
                      className={cn("block h-full", actionClass(row.action))}
                      style={{ width: `${Math.max(row.share, 2)}%` }}
                    />
                  </span>
                  <span className="inter text-right text-sm text-outline">{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-outline-variant/10 p-5">
            <FieldLabel>Compressed scene narrative</FieldLabel>
            <div className="mt-3">
              {clip.narrative.map((line) => (
                <div
                  className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-outline-variant/10 py-3 last:border-b-0"
                  key={line.time}
                >
                  <span className="inter text-sm font-medium text-primary">{line.time}</span>
                  <span className="inter text-sm leading-relaxed text-on-surface-variant">{line.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-outline-variant/10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/10 bg-surface-container-low px-5 py-3">
            <div>
              <FieldLabel>Selected frame instruction</FieldLabel>
              <small className="inter mt-1 block text-sm text-on-surface-variant">
                {frame.keyframeId} · {frame.time} · {frame.actionLabel} · {frame.confidence}% confidence
              </small>
            </div>
            <Chip tone={riskTone(frame.risk)}>{frame.risk} risk</Chip>
          </div>

          <div className="p-5">
            <div className="mb-4 flex flex-wrap gap-2">
              <Chip tone="accent">{frame.actionLabel}</Chip>
              <Chip>{frame.density} density</Chip>
              <Chip>{frame.nav}</Chip>
              <Chip>{frame.velocity.toFixed(2)} m/s</Chip>
              <Chip>{frame.yawRate.toFixed(1)}°/s yaw</Chip>
              {frame.flags.map((flag) => (
                <Chip key={flag} tone="muted">
                  {flag.replaceAll("_", " ")}
                </Chip>
              ))}
              {/* Observations have no translation yet, so say which source this text came from. */}
              {trackLabel ? <Chip tone="muted">English source</Chip> : null}
            </div>

            <p className="inter max-w-5xl text-base leading-relaxed text-on-surface-variant">{frame.observation}</p>

            <details className="mt-5">
              <summary className="inter cursor-pointer text-xs font-medium uppercase tracking-widest text-primary">
                Open all {clip.keyframes} frame instructions
              </summary>
              <div className="mt-3 max-h-96 overflow-y-auto border-t border-outline-variant/10">
                {clip.frames.map((row) => (
                  <button
                    className={cn(
                      "grid w-full grid-cols-1 gap-3 border-b border-outline-variant/10 px-1 py-4 text-left sm:grid-cols-[11rem_4.5rem_10rem_1fr]",
                      row.index === selected ? "bg-surface-container-low" : "hover:bg-surface-container-low",
                    )}
                    key={row.index}
                    onClick={() => setSelected(row.index)}
                    type="button"
                  >
                    <b className="inter text-sm font-medium text-on-surface">{row.keyframeId}</b>
                    <span className="inter text-sm text-outline">{row.time}</span>
                    <span className="inter text-sm text-on-surface-variant">{row.actionLabel}</span>
                    <span className="inter text-sm leading-relaxed text-on-surface-variant">{row.observation}</span>
                  </button>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </article>
  );
}
