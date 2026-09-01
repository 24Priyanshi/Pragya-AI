import { cn } from "@/lib/cn";
import type { ResearchMetric } from "@/data/denseworld-research";

import { BenchmarkChartCard } from "./BenchmarkChartCard";

export function ResearchMetricRow({ metric }: { metric: ResearchMetric }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 border-t border-outline-variant/10 pt-6 first:mt-0 first:border-t-0 first:pt-0 lg:grid-cols-2">
      <div className={cn(metric.flip ? "lg:order-2" : "lg:order-1")}>
        <BenchmarkChartCard chart={metric.chart} />
      </div>

      <div className={cn(metric.flip ? "lg:order-1" : "lg:order-2")}>
        <div className="mb-2 flex flex-wrap items-center gap-2.5">
          <h4 className="plus-jakarta-sans text-base font-semibold text-on-surface md:text-lg">{metric.name}</h4>
          <span className="inter rounded-full border border-outline-variant/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-on-surface-variant">
            {metric.chart.direction === "up" ? "↑ higher is better" : "↓ lower is better"}
          </span>
        </div>
        <code className="inter mb-3 block w-fit rounded border border-outline-variant/10 bg-surface-container-lowest px-3 py-2 text-xs text-on-surface">
          {metric.formula}
        </code>
        <p className="inter mb-3 text-sm leading-relaxed text-on-surface-variant">{metric.definition}</p>
        <ul className="mb-3 list-disc space-y-1.5 pl-5 marker:text-primary">
          {metric.bullets.map((bullet) => (
            <li className="inter text-[13px] leading-relaxed text-on-surface-variant" key={bullet.slice(0, 40)}>
              {bullet}
            </li>
          ))}
        </ul>
        <p className="inter text-xs italic text-outline">{metric.citation}</p>
      </div>
    </div>
  );
}
