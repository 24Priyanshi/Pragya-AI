"use client";

import { useEffect, useMemo, useState } from "react";

import { framesOf, type LanguageKey } from "@/data/densewalk-feed/adapt";
import type { FeedFrame, RawClip } from "@/types/densewalk-feed";

/**
 * Lazy loader for a clip's frames.
 *
 * The page ships clip summaries only — all 250 exports are 38 MB, which is a
 * 35.6 MB prerendered document — so the per-frame detail is fetched from the
 * dataset CDN by the card that renders it. The response is run through the same
 * `framesOf` the build uses, so a lazily-loaded card and a build-time summary
 * can never disagree about what a frame says.
 *
 * Requests are cached at module scope by clip id: paging the feed, switching
 * language tabs and re-running a filter all remount cards, and none of that
 * should re-fetch. The cache holds the promise rather than the result so two
 * cards mounting in the same tick share one request.
 *
 * What is cached is the *export*, not the adapted frames: one file carries every
 * language (see `LANGUAGE_SUFFIX`), so switching tabs re-reads a different field
 * of a response already in memory rather than going back to the network.
 */
const cache = new Map<string, Promise<RawClip>>();

export function loadClip(base: string, clipId: string): Promise<RawClip> {
  const hit = cache.get(clipId);
  if (hit) return hit;

  const request = fetch(`${base}/${clipId}_uni.json`)
    .then(async (res) => {
      if (!res.ok) throw new Error(`${clipId}: ${res.status} ${res.statusText}`);
      return (await res.json()) as RawClip;
    })
    .catch((error: unknown) => {
      // A failed fetch must not be cached as a permanent verdict — the next
      // card to ask (or the same one after a retry) should try the network again.
      cache.delete(clipId);
      throw error;
    });

  cache.set(clipId, request);
  return request;
}

export interface FramesState {
  readonly status: "idle" | "loading" | "ready" | "error";
  readonly frames: readonly FeedFrame[] | null;
  readonly error: string | null;
}

/** What the fetch settled on, tagged with the clip it belongs to. */
interface Settled {
  readonly id: string;
  readonly clip: RawClip | null;
  readonly error: string | null;
}

/**
 * Frames for one clip, fetched once `active` turns true and read in `language`.
 *
 * The caller gates on visibility rather than mount: "show all" renders 250
 * cards, and fetching every clip's export on mount would pull the whole 38 MB
 * corpus — the exact cost this split exists to avoid.
 *
 * Only the settled result is stored; "loading" is derived rather than written,
 * so the effect never sets state synchronously on the way in. The result is
 * tagged with its clip id so a card reused for a different clip cannot show the
 * previous one's frames for a frame or two. `language` is deliberately not a
 * dependency of the fetch — it selects a field of the response, so changing tabs
 * re-adapts what is already held instead of issuing a request.
 */
export function useClipFrames(
  base: string,
  clipId: string,
  active: boolean,
  language: LanguageKey = "english",
): FramesState {
  const [settled, setSettled] = useState<Settled | null>(null);

  useEffect(() => {
    if (!active) return;

    let live = true;
    loadClip(base, clipId).then(
      (clip) => live && setSettled({ id: clipId, clip, error: null }),
      (error: unknown) =>
        live &&
        setSettled({ id: clipId, clip: null, error: error instanceof Error ? error.message : "request failed" }),
    );

    return () => {
      live = false;
    };
  }, [base, clipId, active]);

  const current = settled?.id === clipId ? settled : null;
  const clip = current?.clip ?? null;
  const frames = useMemo(() => (clip ? framesOf(clip, language) : null), [clip, language]);

  if (!current) return { status: active ? "loading" : "idle", frames: null, error: null };
  if (frames) return { status: "ready", frames, error: null };
  return { status: "error", frames: null, error: current.error };
}
