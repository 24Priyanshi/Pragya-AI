import { cityVideos } from "@/data/denseworld";

interface CityGridProps {
  heading: string;
  subheading: string;
  cities: readonly string[];
}

/**
 * Port of `createCityRows` in js/denseworld-grid.js.
 *
 * Six slots per city. A "#" slot renders an empty bordered box; a real source
 * renders an autoplaying, looping, muted video. Only Delhi has footage today,
 * so nearly every box is a placeholder — that is the original's state, not an
 * omission here.
 *
 * <video> needs no "use client": autoplay/loop/muted/playsinline are declarative
 * HTML attributes with no event handlers attached, so this stays a Server
 * Component. `muted` must be set for autoplay to be allowed by browsers.
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
                    <video autoPlay className="h-full w-full object-cover" loop muted playsInline preload="auto" src={src} />
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
