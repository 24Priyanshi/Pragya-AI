import { cn } from "@/lib/cn";
import type { BenchmarkChart } from "@/data/denseworld-research";

/** DenseWorld-vs-baselines horizontal bar chart, used throughout the Research tab. */
export function BenchmarkChartCard({ chart }: { chart: BenchmarkChart }) {
  return (
    <div className="border border-outline-variant/10 bg-surface p-6">
      <div className="plus-jakarta-sans text-base font-semibold text-on-surface">{chart.title}</div>
      <div className="inter mb-4 text-xs text-on-surface-variant">{chart.subtitle}</div>

      <div className="space-y-2.5">
        {chart.rows.map((row) => (
          <div className="grid grid-cols-[7.5rem_1fr_3.25rem] items-center gap-2.5" key={row.label}>
            <div className={cn("inter flex items-center gap-1.5 text-xs font-medium", row.isOurs ? "text-primary" : "text-on-surface")}>
              {row.label}
              {row.isOurs ? (
                <span className="inter rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary">
                  ours
                </span>
              ) : null}
            </div>
            <div
              className={cn("h-3.5 min-w-[3%] rounded-sm", row.isOurs ? "bg-primary" : "bg-outline-variant/50")}
              style={{ width: `${row.widthPct}%` }}
            />
            <div className="inter text-right text-xs font-semibold text-on-surface">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
