import { taxonomy } from "@/data/denseworld";

/**
 * Port of `createTaxonomyRows` in js/denseworld-grid.js.
 *
 * Every taxonomy value maps to "#" in the original data, so every tile is a
 * placeholder block with a caption. The video branch is kept for when real
 * clips land, matching the original's structure.
 */
export function TaxonomyGrid() {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/10 p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-baseline gap-3">
        <h2 className="plus-jakarta-sans text-3xl md:text-4xl font-light tracking-tight text-on-surface">
          Full Taxonomy Coverage
        </h2>
        <p className="inter text-sm md:text-base text-on-surface-variant">- 15 fields, 65+ values, v3 structured tags</p>
      </div>
      <div className="space-y-6">
        {taxonomy.map((field) => (
          <div className="space-y-3 border-t border-outline-variant/10 pt-6 first:border-t-0 first:pt-0" key={field.name}>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="inter text-[0.6875rem] font-semibold uppercase tracking-widest text-primary">{field.name}</h3>
              <span className="inter text-xs text-on-surface-variant">{field.count}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {field.values.map((value) => (
                <div
                  className="block overflow-hidden rounded-[2px] border border-outline-variant/20 bg-surface-container-lowest"
                  key={value}
                >
                  <div className="aspect-video overflow-hidden bg-surface-container-low">
                    <div className="h-full w-full bg-surface-container-low" />
                  </div>
                  <p className="inter px-2 py-2 text-[11px] font-medium text-on-surface-variant">{value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
