import type { LineChartSpec } from "@/types/page";

/**
 * "Analysis 01" — the inline SVG line chart.
 *
 * Two faithfully-reproduced quirks:
 *  - `overlayClass` is null-able because densewalk's overlay class does not
 *    exist in Tailwind v3, so that page renders no gradient (BUG-6).
 *  - `legacyLowercaseViewBox` omits the viewBox entirely, leaving pragyavla's
 *    chart unscaled (BUG-7). See below for why we omit rather than emit.
 */
export function LineChart({ spec }: { spec: LineChartSpec }) {
  // BUG-7: pragyavla.html writes `viewbox` in lower case. SVG attribute names
  // are case-sensitive, so the browser ignores it outright — the element paints
  // exactly as if no viewBox were set. We therefore omit the attribute instead
  // of reproducing the lower-case spelling: the two are pixel-identical (no CSS
  // or script in this project selects on `[viewbox]`), but emitting it makes
  // React log "Invalid DOM property `viewbox`" on every render.
  const viewBoxProps = spec.legacyLowercaseViewBox ? {} : { viewBox: "0 0 400 150" };

  return (
    <div className="relative h-64 w-full bg-surface-container-low p-8 border border-outline-variant/10 overflow-hidden">
      {spec.overlayClass ? <div className={`absolute inset-0 ${spec.overlayClass} from-primary-fixed/20 to-transparent`} /> : null}
      <svg className="w-full h-full" {...viewBoxProps}>
        <path className="stroke-primary" d={spec.path} fill="none" strokeWidth="1" />
        {spec.circles.map((c) => (
          <circle className="fill-primary" cx={c.cx} cy={c.cy} key={`${c.cx}-${c.cy}`} r="3" />
        ))}
        {spec.texts.map((t) => (
          <text className="inter text-[8px] fill-outline font-medium" key={t.text} x={t.x} y={t.y}>
            {t.text}
          </text>
        ))}
      </svg>
      <div className="absolute top-4 right-4 text-right">
        <span className="inter text-xs font-semibold text-primary">{spec.badge}</span>
      </div>
    </div>
  );
}
