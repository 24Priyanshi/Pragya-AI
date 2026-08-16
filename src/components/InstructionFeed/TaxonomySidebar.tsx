"use client";

import { cn } from "@/lib/cn";
import type { FeedClip, TaxonomyFacet } from "@/types/densewalk-feed";

import { FieldLabel } from "./primitives";

/**
 * Left rail holding the 15-field taxonomy.
 *
 * Each facet is one block from the reference image: a heading, an "All" row
 * carrying the unfiltered total, then one row per value with a colour key and
 * its count. Selecting a value narrows the feed; selecting "All" clears that
 * facet. Facets are independent, so picks across several narrow together.
 *
 * Counts are computed against the clips already passing the *other* facets, so
 * a number on screen is always the size of the set you would get by clicking
 * it — a count that ignored sibling filters would promise results that vanish.
 */

/** Cycled per value index; drawn from the design tokens rather than a second palette. */
const DOT_CLASS = [
  "bg-primary",
  "bg-tertiary",
  "bg-secondary",
  "bg-primary-container",
  "bg-tertiary-fixed-dim",
  "bg-secondary-fixed-dim",
  "bg-outline",
  "bg-primary-fixed-dim",
  "bg-surface-dim",
  "bg-error",
  "bg-on-surface",
  "bg-outline-variant",
  "bg-inverse-surface",
] as const;

export type FacetSelection = Readonly<Record<string, string>>;

interface TaxonomySidebarProps {
  facets: readonly TaxonomyFacet[];
  clips: readonly FeedClip[];
  selection: FacetSelection;
  onSelect: (facetKey: string, value: string | null) => void;
  onClear: () => void;
}

/** Clips passing every facet except `except`, which is what that facet's counts are measured against. */
function matching(clips: readonly FeedClip[], selection: FacetSelection, except: string): readonly FeedClip[] {
  const active = Object.entries(selection).filter(([key]) => key !== except);
  if (active.length === 0) return clips;
  return clips.filter((clip) => active.every(([key, value]) => clip.tags[key] === value));
}

function Row({
  active,
  count,
  dot,
  label,
  onClick,
}: {
  active: boolean;
  count: number;
  dot?: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={cn(
        "inter flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors duration-200",
        active ? "bg-primary-fixed text-on-primary-fixed" : "text-on-surface-variant hover:bg-surface-container-low",
        count === 0 && !active && "opacity-40",
      )}
      onClick={onClick}
      type="button"
    >
      <span aria-hidden className={cn("h-2.5 w-2.5 shrink-0", dot ?? "border border-current")} />
      <span className={cn("grow truncate", active && "font-medium")}>{label}</span>
      <span className={cn("shrink-0 tabular-nums", active ? "font-medium" : "text-outline")}>{count}</span>
    </button>
  );
}

export function TaxonomySidebar({ facets, clips, selection, onSelect, onClear }: TaxonomySidebarProps) {
  const activeCount = Object.keys(selection).length;

  return (
    <aside className="border border-outline-variant/10 bg-surface-container-lowest lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
      <div className="flex items-center justify-between gap-3 border-b border-outline-variant/10 bg-surface-container-low px-5 py-4">
        <FieldLabel>Full taxonomy</FieldLabel>
        {activeCount > 0 ? (
          <button
            className="inter text-[11px] font-medium uppercase tracking-widest text-primary hover:opacity-70"
            onClick={onClear}
            type="button"
          >
            Clear {activeCount}
          </button>
        ) : null}
      </div>

      <div className="divide-y divide-outline-variant/10">
        {facets.map((facet) => {
          const pool = matching(clips, selection, facet.key);
          const selected = selection[facet.key];

          return (
            <div className="px-2 py-4" key={facet.key}>
              <div className="px-3 pb-2">
                <FieldLabel>{facet.name}</FieldLabel>
              </div>

              <Row
                active={selected === undefined}
                count={pool.length}
                label={`All ${facet.name.toLowerCase()}`}
                onClick={() => onSelect(facet.key, null)}
              />

              {facet.values.map((value, i) => (
                <Row
                  active={selected === value}
                  count={pool.filter((clip) => clip.tags[facet.key] === value).length}
                  dot={DOT_CLASS[i % DOT_CLASS.length]}
                  key={value}
                  label={value}
                  onClick={() => onSelect(facet.key, selected === value ? null : value)}
                />
              ))}
            </div>
          );
        })}
      </div>

      <p className="inter border-t border-outline-variant/10 px-5 py-4 text-xs leading-relaxed text-outline">
        The annotation export carries no taxonomy fields yet, so only the placeholder clips are tagged. Counts and filtering
        become real as the tagging pass lands.
      </p>
    </aside>
  );
}
