import { cn } from "@/lib/cn";
import type { ResearchSection } from "@/data/denseworld-research";

import { ResearchMetricRow } from "./ResearchMetricRow";

export function ResearchSectionCard({ section }: { section: ResearchSection }) {
  return (
    <div
      className={cn(
        "border p-6 md:p-10",
        section.hero ? "border-primary/40 bg-primary/5" : "border-outline-variant/10 bg-surface",
      )}
    >
      <span
        className={cn(
          "inter inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest",
          section.hero ? "bg-primary/15 text-primary" : "bg-surface-container-lowest text-primary",
        )}
      >
        {section.number}
      </span>
      <h3 className="plus-jakarta-sans mt-3 text-2xl font-light tracking-tight text-on-surface md:text-3xl">{section.heading}</h3>

      <div
        className={cn(
          "inter mt-3 text-sm leading-relaxed",
          section.pinned
            ? "border border-dashed border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-on-surface"
            : "text-on-surface-variant",
        )}
      >
        {section.tldr}
        {section.tldrStat ? (
          <span className="inter ml-2 inline-block rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
            {section.tldrStat}
          </span>
        ) : null}
      </div>

      {section.metrics.map((metric) => (
        <ResearchMetricRow key={metric.name} metric={metric} />
      ))}

      {section.takeaway ? (
        <div className="inter mt-6 border-t border-outline-variant/10 pt-4 text-sm text-on-surface-variant">
          <b className="text-primary">{section.takeawayLabel}</b> — {section.takeaway}
        </div>
      ) : null}
    </div>
  );
}
