import { cityVideos } from "@/data/denseworld";

import { CityGridVideo } from "./CityGridVideo";

interface CityGridProps {
  heading: string;
  subheading: string;
  cities: readonly string[];
}

/**
 * Port of `createCityRows` in js/denseworld-grid.js.
 *
 * Six slots per city. A "#" slot renders an empty bordered box; a real source
 * renders a looping, muted video that plays once it scrolls into view (see
 * CityGridVideo) — every city now has real clips (2026-09-01), sourced from
 * github.com/prajak002/denseworld, so eager-autoplaying all of them at once
 * is no longer an option.
 *
 * <video> needs "use client" for the lazy-play behavior, so that lives in
 * CityGridVideo; this component itself stays a Server Component.
 */
export function CityGrid({ heading, subheading, cities }: CityGridProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/10 p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-baseline gap-3">
        <h2 className="plus-jakarta-sans text-3xl md:text-4xl font-light tracking-tight text-on-surface">{heading}</h2>
        <p className="inter text-sm md:text-base text-on-surface-variant">{subheading}</p>
      </div>
      <div className="space-y-4">
        {cities.map((city) => (
          <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[7rem_1fr]" key={city}>
            <p className="inter text-sm md:text-base font-medium text-on-surface">{city}</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {Array.from({ length: 6 }, (_, i) => {
                const src = cityVideos[city]?.[i] ?? "";
                if (!src || src === "#") {
                  return (
                    <div
                      className="aspect-video rounded-[2px] border border-outline-variant/20 bg-surface-container-low"
                      key={i}
                    />
                  );
                }
                return (
                  <div
                    className="aspect-video overflow-hidden rounded-[2px] border border-outline-variant/20 bg-surface-container-low"
                    key={i}
                  >
                    <CityGridVideo src={src} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
