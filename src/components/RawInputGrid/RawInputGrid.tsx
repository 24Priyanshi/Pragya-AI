import { SectionRule } from "@/components/SectionRule/SectionRule";
import type { RawInputTile } from "@/types/page";

/**
 * "01. RAW INPUT DATA" — three image tiles.
 *
 * The caption <div> is inside an `aspect-video overflow-hidden` box, below an
 * `h-full` image, so it is clipped and never visible (BUG-5). Kept exactly.
 *
 * Note the hover asymmetry: only `transition-opacity` is declared, so the
 * opacity change eases while the grayscale removal snaps instantly (IB-22).
 */
export function RawInputGrid({ tiles }: { tiles: readonly RawInputTile[] }) {
  return (
    <div>
      <SectionRule label="01. RAW INPUT DATA" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {tiles.map((tile) => (
          <div className="aspect-video bg-surface-container-low overflow-hidden group" key={tile.caption}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
              src={tile.src}
              {...(tile.useDataAlt ? { "data-alt": tile.alt } : { alt: tile.alt })}
            />
            <div className="p-4 border-t border-outline-variant/10">
              <p className="inter text-sm font-medium uppercase tracking-widest text-on-surface-variant">{tile.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
