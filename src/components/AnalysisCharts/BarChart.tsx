import { cn } from "@/lib/cn";
import type { BarChartSpec } from "@/types/page";

/**
 * "Analysis 02" — the three-bar comparison chart.
 *
 * Bar heights come through as literal Tailwind classes ("h-[61%]") rather than
 * computed strings, so Tailwind's content scanner can see them in the data
 * files and emit the rules.
 */
export function BarChart({ spec }: { spec: BarChartSpec }) {
  return (
    <div className="relative h-64 w-full bg-surface-container-low p-8 border border-outline-variant/10">
      <div className="flex items-end justify-between h-full gap-4 pb-8">
        {spec.bars.map((bar) => (
          <div className="flex flex-col items-center flex-1" key={bar.label}>
            <div className="w-full bg-primary/20 h-48 relative overflow-hidden">
              <div className={cn("absolute bottom-0 w-full bg-primary", bar.heightClass)} />
            </div>
            <span
              className={cn("inter text-[8px] mt-4", bar.emphasised ? "text-primary font-bold" : "text-on-surface-variant")}
            >
              {bar.label}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute top-4 right-4 text-right">
        <span className="inter text-xs font-semibold text-primary">{spec.badge}</span>
      </div>
    </div>
  );
}
