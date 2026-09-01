import type { DensityChart } from "@/data/denseworld";

/** One "Representative West" vs "DenseWorld" comparison chart, from the Problem tab. */
export function DensityChartCard({ chart }: { chart: DensityChart }) {
  return (
    <div className="border border-outline-variant/10 bg-surface p-6 md:p-8">
      <div className="plus-jakarta-sans text-lg font-semibold text-on-surface">{chart.title}</div>
      <div className="inter mb-4 text-xs uppercase tracking-widest text-on-surface-variant">{chart.subtitle}</div>

      <div className="mb-5 flex flex-wrap items-center gap-4 text-xs font-medium text-on-surface-variant">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#c89432]" /> Representative West
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-primary" /> DenseWorld
        </span>
      </div>

      <div className="space-y-3">
        {chart.rows.map((row) => (
          <div
            className="grid grid-cols-[6.5rem_1fr_2.75rem] items-center gap-3 border-t border-outline-variant/10 pt-3 first:border-t-0 first:pt-0"
            key={row.label}
          >
            <div className="inter text-xs font-medium text-on-surface">{row.label}</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="h-2 rounded-sm bg-[#c89432]" style={{ width: `${row.westWidthPct}%` }} />
                <span className="inter text-[11px] text-on-surface-variant">{row.westValue}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 rounded-sm bg-primary" style={{ width: `${row.dwWidthPct}%` }} />
                <span className="inter text-[11px] font-medium text-on-surface">{row.dwValue}</span>
              </div>
            </div>
            <div className="inter text-right text-xs font-semibold text-primary">{row.multiplier}</div>
          </div>
        ))}
      </div>

      <p className="inter mt-6 text-xs leading-relaxed text-on-surface-variant">{chart.caption}</p>
    </div>
  );
}
