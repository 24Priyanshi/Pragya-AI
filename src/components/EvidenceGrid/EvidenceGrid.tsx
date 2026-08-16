import { evidenceTiles } from "@/data/landing";
import type { EvidenceTile } from "@/types/content";

/**
 * "The Evidence" section of the landing page.
 *
 * Each panel shows the *same* source photo twice — once "raw" (grayscale) and
 * once "processed" (blown out over a dark backing) — which is how the original
 * fakes a before/after. Both src values are intentionally identical.
 *
 * These images are remote and currently 404 (BUG-21), so both tiles render as
 * broken images, exactly as the original does today.
 */
function EvidencePanel({ tile }: { tile: EvidenceTile }) {
  return (
    <div className="bg-surface-container-lowest p-8 space-y-8">
      <div className="flex gap-4">
        <div className="flex-1 aspect-[4/3] bg-surface-container relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={tile.rawAlt} className="w-full h-full object-cover grayscale opacity-80" src={tile.rawSrc} />
          <span className="absolute top-4 left-4 text-[9px] uppercase tracking-widest bg-on-surface text-primary-fixed px-2 py-1">
            {tile.rawBadge}
          </span>
        </div>
        <div className="flex-1 aspect-[4/3] bg-on-surface relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={tile.processedAlt}
            className="w-full h-full object-cover brightness-150 contrast-125 saturate-0 opacity-40"
            src={tile.processedSrc}
          />
          <span className="absolute top-4 left-4 text-[9px] uppercase tracking-widest bg-primary-fixed text-on-surface px-2 py-1">
            {tile.processedBadge}
          </span>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-widest mb-2">{tile.heading}</h4>
        <p className="text-xs text-on-surface-variant font-light leading-relaxed">{tile.caption}</p>
      </div>
    </div>
  );
}

export function EvidenceGrid() {
  return (
    <section className="py-32 bg-surface-container-low reveal opacity-0">
      <div className="px-8 md:px-12 max-w-screen-2xl mx-auto">
        <div className="mb-20">
          <label className="text-[10px] font-semibold uppercase tracking-[0.4em] text-on-surface-variant mb-6 block">
            Visual Validation
          </label>
          <h2 className="text-5xl font-extralight font-headline tracking-tight text-on-surface">The Evidence</h2>
          <p className="text-on-surface-variant mt-6 max-w-xl font-light">
            Cross-ecosystem preview of raw sensory input versus processed spatial understanding.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-surface-container-high border border-surface-container-high">
          {evidenceTiles.map((tile) => (
            <EvidencePanel key={tile.heading} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  );
}
