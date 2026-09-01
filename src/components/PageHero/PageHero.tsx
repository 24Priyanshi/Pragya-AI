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

 */
export function PageHero({ hero }: { hero: HeroSpec }) {
  const isFill = hero.mode === "fill";

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

      {hero.centerpiece ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: `${hero.centerpiece.gapVw}vw` }}>
          {hero.centerpiece.kicker ? (
            <p className="plus-jakarta-sans text-center text-white font-bold tracking-[0.05em] text-sm md:text-base">
              {hero.centerpiece.kicker}
            </p>
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={hero.centerpiece.spinAlt}
            src={hero.centerpiece.spinSrc}
            style={{
              width: `${hero.centerpiece.spinWidthVw}vw`,
              animation: `hero-spin ${hero.centerpiece.durationS}s linear infinite`,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={hero.centerpiece.titleAlt} src={hero.centerpiece.titleSrc} style={{ width: `${hero.centerpiece.titleWidthVw}vw` }} />
        </div>
      ) : null}
    </header>
  );
}
