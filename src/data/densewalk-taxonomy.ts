import { taxonomy as sharedTaxonomy } from "@/data/denseworld";
import type { TaxonomyFacet } from "@/types/densewalk-feed";

/**
 * The 15-field taxonomy for the DenseWalk sidebar.
 *
 * Values come from `taxonomy` in src/data/denseworld.ts rather than a second
 * copy — that list is the v3 tag vocabulary both pages describe, and forking it
 * would guarantee the two drift. Only the field *labels* are restated here,
 * because DenseWalk names two of them differently.
 *
 * Note the shared list preserves BUG-16: "Video Quality" is captioned as three
 * values but enumerates one. The sidebar shows what is actually enumerated, so
 * that facet has a single row until the vocabulary is corrected at the source.
 */

const LABELS: Readonly<Record<string, string>> = {
  "Scene type": "Scene Type",
  Object: "Objects",
  Greenary: "Vegetation",
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const facets: readonly TaxonomyFacet[] = sharedTaxonomy.map((field) => {
  const name = LABELS[field.name] ?? field.name;
  return { key: slugify(name), name, values: field.values };
});

/**
 * Deterministic tags for the placeholder clips, so the sidebar's counts and
 * filtering can be exercised before the tagging pass runs. Real exports must
 * never go through this.
 *
 * The clip stride (7) and the facet offset (13) are both coprime with every
 * value-list length in the vocabulary, which keeps the walk from collapsing:
 * a stride sharing a factor with the length parks every clip on one value, and
 * the two-value facets (Time of Day) are where that shows up first.
 */
export function placeholderTags(seed: number): Readonly<Record<string, string>> {
  return Object.fromEntries(
    facets.map((facet, i) => [facet.key, facet.values[(seed * 7 + i * 13) % facet.values.length]]),
  );
}
