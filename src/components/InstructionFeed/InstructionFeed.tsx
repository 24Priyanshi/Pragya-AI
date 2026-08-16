"use client";

import { useMemo, useState } from "react";

import { SectionRule } from "@/components/SectionRule";
import type { FeedData, FrameRisk } from "@/types/densewalk-feed";

import { ClipCard } from "./ClipCard";
import { FieldLabel } from "./primitives";

/**
 * "Instruction Feed" — the dataset explorer that follows the DenseWalk hero.
 *
 * Structure follows temp/densewalk_instruction_feed_varied.html: headline
 * metrics, a filter row, then one two-pane card per clip. The mock's synthetic
 * `status`/`priority` filters are replaced by fields the annotation JSON
 * actually carries — action, motion mode and derived risk — because a control
 * that filters on data the pipeline never emits can only ever be decorative.
 */

const RISKS: readonly FrameRisk[] = ["Low", "Medium", "High"];
const PAGE_SIZES = [6, 12, 0] as const; // 0 = show everything

const CONTROL_CLASS =
  "inter w-full border border-outline-variant/20 bg-surface-container-lowest px-4 py-3.5 text-sm text-on-surface " +
  "placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0";

export function InstructionFeed({ data }: { data: FeedData }) {
  const [query, setQuery] = useState("");
  const [action, setAction] = useState("");
  const [mode, setMode] = useState("");
  const [risk, setRisk] = useState("");
  const [limit, setLimit] = useState<number>(PAGE_SIZES[0]);

  // Built once per dataset: search scans every frame's observation text, which
  // is far too much string work to redo on each keystroke.
  const haystacks = useMemo(
    () =>
      new Map(
        data.clips.map((clip) => [
          clip.id,
          [clip.id, clip.location, clip.density, clip.instruction, clip.source]
            .concat(clip.frames.map((f) => `${f.keyframeId} ${f.action} ${f.mode} ${f.observation}`))
            .join(" ")
            .toLowerCase(),
        ]),
      ),
    [data.clips],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.clips.filter((clip) => {
      if (q && !haystacks.get(clip.id)?.includes(q)) return false;
      if (action && !clip.frames.some((f) => f.action === action)) return false;
      if (mode && !clip.frames.some((f) => f.mode === mode)) return false;
      if (risk && clip.risk !== risk) return false;
      return true;
    });
  }, [data.clips, haystacks, query, action, mode, risk]);

  const visible = limit === 0 ? filtered : filtered.slice(0, limit);
  const sampleCount = data.clips.filter((c) => c.source === "sample").length;

  const kpis = [
    { value: String(data.clips.length), label: "clips in feed" },
    { value: String(sampleCount), label: sampleCount === 1 ? "real annotation" : "real annotations" },
    { value: String(data.totalFrames), label: "frame instructions" },
    { value: String(data.actions.length), label: "discrete actions" },
  ];

  return (
    <section className="mb-48">
      <SectionRule label="Instruction Feed" />

      <div className="mb-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <h2 className="plus-jakarta-sans text-5xl font-extralight tracking-tighter text-on-surface md:text-6xl">
            Frame-level instruction explorer
          </h2>
          <p className="inter mt-6 max-w-3xl text-base leading-relaxed text-on-surface-variant">
            Each card is one walk-through clip: the mosaic render on the left, the full instruction reasoning on the
            right. The strip beneath every player is that clip&rsquo;s action timeline — select a frame to read the
            observation the pipeline grounded its instruction in.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {kpis.map((kpi) => (
            <div className="border-l-2 border-primary bg-surface-container-lowest px-5 py-4" key={kpi.label}>
              <b className="plus-jakarta-sans block text-3xl font-light tracking-tighter text-on-surface">{kpi.value}</b>
              <FieldLabel>{kpi.label}</FieldLabel>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_11rem_11rem_11rem_11rem]">
        <input
          aria-label="Search clips, actions and frame instructions"
          className={CONTROL_CLASS}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clip id, instruction, action, keyframe…"
          type="search"
          value={query}
        />
        <select
          aria-label="Filter by action"
          className={CONTROL_CLASS}
          onChange={(e) => setAction(e.target.value)}
          value={action}
        >
          <option value="">All actions</option>
          {data.actions.map((a) => (
            <option key={a} value={a}>
              {a.replaceAll("_", " ")}
            </option>
          ))}
        </select>
        <select
          aria-label="Filter by motion mode"
          className={CONTROL_CLASS}
          onChange={(e) => setMode(e.target.value)}
          value={mode}
        >
          <option value="">All modes</option>
          {data.modes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select aria-label="Filter by risk" className={CONTROL_CLASS} onChange={(e) => setRisk(e.target.value)} value={risk}>
          <option value="">All risk levels</option>
          {RISKS.map((r) => (
            <option key={r} value={r}>
              {r} risk
            </option>
          ))}
        </select>
        <select
          aria-label="Number of clips to show"
          className={CONTROL_CLASS}
          onChange={(e) => setLimit(Number(e.target.value))}
          value={limit}
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size === 0 ? "Show all" : `Show ${size}`}
            </option>
          ))}
        </select>
      </div>

      <p className="inter mb-8 border border-outline-variant/10 bg-surface-container-lowest px-6 py-5 text-sm leading-relaxed text-on-surface-variant">
        {sampleCount} of {data.clips.length} cards is a real annotation export. The rest replay that clip&rsquo;s actual
        frames in a different temporal order so the feed, filters and timeline can be reviewed end to end — they are
        marked <span className="text-on-surface">Placeholder</span>, and no metric on them is fabricated. Video stages
        stay as placeholders until the mosaic renders are uploaded.
      </p>

      <div className="mb-6">
        <FieldLabel>
          Showing {visible.length} of {filtered.length} matching clips
        </FieldLabel>
      </div>

      {visible.length === 0 ? (
        <div className="border border-outline-variant/10 bg-surface-container-lowest px-6 py-20 text-center">
          <p className="inter text-base text-on-surface-variant">No clip matches those filters.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {visible.map((clip, i) => (
            <ClipCard clip={clip} key={clip.id} ordinal={i + 1} />
          ))}
        </div>
      )}
    </section>
  );
}
