"use client";

import { useEffect, useRef } from "react";

/**
 * Lazy-play-on-visible, same as MotionLangGallery's video pattern.
 *
 * Needed once real clips replaced most of the placeholder grid: 21 cities x
 * up to 6 slots is up to 126 videos on one page, so every one of them
 * eagerly autoplaying/preloading on mount would mean well over a hundred
 * simultaneous downloads.
 */
export function CityGridVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

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
    return () => observer.disconnect();
  }, [src]);

  return <video className="h-full w-full object-cover" loop muted playsInline preload="none" ref={ref} />;
}
