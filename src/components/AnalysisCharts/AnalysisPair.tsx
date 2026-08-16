import type { BarChartSpec, LineChartSpec } from "@/types/page";

import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";

interface AnalysisPairProps {
  line: LineChartSpec;
  bar: BarChartSpec;
}

/**
 * The "Analysis 01 / Analysis 02" two-up section.
 *
 * The empty <h2> containing only a <br /> is in the original on every page. It
 * contributes real vertical space to the header row, so it is kept.
 */
function AnalysisHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="inter text-sm font-medium uppercase tracking-widest text-outline">{label}</span>
      <h2 className="plus-jakarta-sans text-3xl font-light text-primary">
        <br />
      </h2>
    </div>
  );
}

export function AnalysisPair({ line, bar }: AnalysisPairProps) {
  return (
    <section className="mt-48 grid grid-cols-1 md:grid-cols-2 gap-24">
      <div>
        <AnalysisHeader label="Analysis 01" />
        <LineChart spec={line} />
        <p className="inter text-xs text-on-surface-variant mt-6 leading-relaxed max-w-sm">{line.caption}</p>
      </div>
      <div>
        <AnalysisHeader label="Analysis 02" />
        <BarChart spec={bar} />
        <p className="inter text-xs text-on-surface-variant mt-6 leading-relaxed max-w-sm">{bar.caption}</p>
      </div>
    </section>
  );
}
