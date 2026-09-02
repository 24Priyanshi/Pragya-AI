import { LazyVideo } from "@/components/LazyVideo";
import { MOTIONLANG_VIDEO_BASE } from "@/data/motionlang";
import type { MotionShowcaseClip, MotionShowcaseRow } from "@/data/pragyavla";

function MotionClip({ clip }: { clip: MotionShowcaseClip }) {
  const src = `${MOTIONLANG_VIDEO_BASE}${encodeURIComponent(clip.video)}.mp4`;
  return (
    <div>
      <div className="aspect-video overflow-hidden border border-on-primary/20 bg-on-primary/10">
        <LazyVideo className="h-full w-full object-cover" src={src} />
      </div>
      <p className="inter mt-2 text-xs leading-snug text-on-primary/80">{clip.caption}</p>
    </div>
  );
}

/**
 * Purple motion-showcase box for PragyaVLA's "The Problem" tab, matching
 * DenseWorld's ContrastGrid look (bg-primary block, square-corner video
 * tiles) but organized by language row rather than by column, per the
 * language-instruction framing of the MotionLang dataset it draws from.
 * Added 2026-09-02, sitting between the pull-quote and the live simulation.
 * Clips load lazily via LazyVideo (2026-09-02 fix) rather than eagerly with
 * `autoPlay preload="auto"` — with 9 clips across languages, all preloading
 * at once on page load overwhelmed the browser's per-host connection limit
 * to the huggingface CDN and every clip stalled with zero bytes received.
 */
export function MotionShowcaseGrid({ rows }: { rows: readonly MotionShowcaseRow[] }) {
  return (
    <div className="bg-primary shadow-lg p-6 md:p-8">
      <div className="space-y-8">
        {rows.map((row) => (
          <div key={row.language}>
            <h4 className="inter mb-3 text-sm font-semibold text-on-primary">{row.language}</h4>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {row.clips.map((clip) => (
                <MotionClip clip={clip} key={clip.video} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
