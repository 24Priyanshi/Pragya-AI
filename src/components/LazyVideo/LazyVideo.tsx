"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Lazy-play-on-visible video, same pattern as MotionLangGallery's MotionLangVideo.
 * Extracted as a shared component (2026-09-02) after finding that KalariSenaTabs'
 * and PragyaVLA's MotionShowcaseGrid's clips — several externally-hosted MP4s each
 * set to `autoPlay preload="auto"` unconditionally on page load — were showing as
 * flat, empty color blocks. Loading only on scroll-into-view is the right practice
 * regardless (matches this codebase's own established pattern), and this also adds
 * a gold pulsing play-glyph placeholder that only fades out once a frame actually
 * decodes, so a clip that's slow (or fails) to load — some visitors' networks can't
 * reach every external video host — reads as "loading," never as a dead rectangle.
 */
export function LazyVideo({ className, src }: { className?: string; src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const onLoaded = () => setLoaded(true);
    video.addEventListener("loadeddata", onLoaded);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!video.src) video.src = src;
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", onLoaded);
    };
  }, [src]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary via-primary-container to-primary transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100 animate-pulse",
        )}
      >
        <span className="grid h-10 w-10 place-items-center rounded-full border border-tertiary/60">
          <span className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-tertiary" />
        </span>
      </div>
      <video
        className={cn("h-full w-full object-cover transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
        loop
        muted
        playsInline
        preload="none"
        ref={ref}
      />
    </div>
  );
}
