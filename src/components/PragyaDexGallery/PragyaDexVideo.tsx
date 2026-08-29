"use client";

import { useEffect, useRef } from "react";

/** Same lazy-play-on-visible behavior as MotionLangVideo — plays once scrolled into view, pauses when it leaves. */
export function PragyaDexVideo({ src }: { src: string }) {
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

  return <video loop muted playsInline preload="none" ref={ref} />;
}
