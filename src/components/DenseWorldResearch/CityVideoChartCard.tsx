import type { CityVideoChart } from "@/data/denseworld-dataset";

/** Stacked drive/walk/drone bar per city, sorted by total, scaled to this chart's own largest bar. */
export function CityVideoChartCard({ chart }: { chart: CityVideoChart }) {
  const rows = [...chart.rows].sort(
    (a, b) => b.drive + b.walk + b.drone - (a.drive + a.walk + a.drone),
  );
  const max = Math.max(...rows.map((r) => r.drive + r.walk + r.drone));

  return (
    <div className="border border-outline-variant/10 bg-surface p-6 md:p-8">
      <div className="plus-jakarta-sans text-lg font-semibold text-on-surface">{chart.title}</div>
      <div className="inter mb-4 text-xs uppercase tracking-widest text-on-surface-variant">{chart.subtitle}</div>

      <div className="mb-5 flex flex-wrap items-center gap-4 text-xs font-medium text-on-surface-variant">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-primary" /> Drive
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-secondary" /> Walk
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-tertiary" /> Drone
        </span>
      </div>

      <div className="space-y-2.5">
        {rows.map((row) => {
          const total = row.drive + row.walk + row.drone;
          return (
            <div className="grid grid-cols-[7rem_1fr_3.5rem] items-center gap-3" key={row.city}>
              <div className="inter truncate text-xs font-medium text-on-surface">{row.city}</div>
              <div className="flex h-3.5 w-full overflow-hidden rounded-sm bg-surface-container-lowest">
                {row.drive ? <div className="h-full bg-primary" style={{ width: `${(row.drive / max) * 100}%` }} /> : null}
                {row.walk ? <div className="h-full bg-secondary" style={{ width: `${(row.walk / max) * 100}%` }} /> : null}
                {row.drone ? <div className="h-full bg-tertiary" style={{ width: `${(row.drone / max) * 100}%` }} /> : null}
              </div>
              <div className="inter text-right text-xs font-semibold text-on-surface">{total.toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
