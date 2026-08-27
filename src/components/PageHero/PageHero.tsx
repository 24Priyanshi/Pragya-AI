import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/cn";
import type { HeroSpec } from "@/types/page";

/**
 * Full-bleed hero used by all six sub-pages.
 *
 * The `left-1/2 w-screen -translate-x-1/2` trick breaks the image out of the
 * padded <main>. `w-screen` is 100vw, which includes the scrollbar, so on
 * desktop this produces a small horizontal scrollbar (BUG-14) — preserved.
 *
 * Plain <img> rather than next/image: the "fill" variant is sized by
 * `h-[calc(100vh - var(--nav-height))]`, a runtime value next/image cannot be
 * given at build time, and the "auto" variant depends on the file's intrinsic
 * aspect ratio.
 *
 * `hero.overlay` / `hero.actions` are opt-in per page (currently densewalk):
 * a whitish scrim plus centred CTAs layered over the image.
 */
export function PageHero({ hero }: { hero: HeroSpec }) {
  const isFill = hero.mode === "fill";
  const actions = hero.actions ?? [];

  return (
    <header
      className={cn(
        "relative left-1/2 mb-32 w-screen -translate-x-1/2 bg-surface-container-lowest border border-surface-container-high",
        isFill && "h-[calc(100vh-var(--nav-height,84px))] overflow-hidden",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={hero.alt}
        className={cn(isFill ? "h-full w-full object-cover object-center" : "block w-full h-auto object-contain object-center")}
        src={hero.src}
      />

      {hero.overlay ? (
        <div aria-hidden="true" className="absolute inset-0 bg-surface/55 backdrop-blur-[1px]" />
      ) : null}

      {hero.spin ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={hero.spin.alt}
          className="block absolute left-1/2 w-auto"
          src={hero.spin.src}
          style={{
            top: `${hero.spin.topPct}%`,
            height: `${hero.spin.heightPct}%`,
            transform: "translate(-50%, -50%)",
            animation: `hero-spin ${hero.spin.durationS}s linear infinite`,
          }}
        />
      ) : null}

      {actions.length > 0 ? (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {actions.map((action, i) => (
              <a
                className={cn(
                  "inline-flex items-center gap-2 px-7 py-3.5 text-[10px] tracking-widest uppercase font-medium",
                  "transition-all duration-200 hover:opacity-80 active:scale-95",
                  i === 0
                    ? "bg-on-surface text-inverse-on-surface"
                    : "bg-surface-container-lowest/90 text-on-surface border border-on-surface/20 backdrop-blur-sm",
                )}
                href={action.href}
                key={action.label}
              >
                {action.label}
                <MaterialIcon className="text-sm" name="arrow_outward" />
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
