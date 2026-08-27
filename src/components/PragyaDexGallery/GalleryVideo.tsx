"use client";

import { useEffect, useRef } from "react";

/**
 * Plays when scrolled into view, pauses when it leaves — same behavior as the
 * source gallery's own `IntersectionObserver` script. `src` is only assigned
 * on first intersection so an inactive domain tab's 100 videos never start
 * downloading.
 */
export function GalleryVideo({ src, label }: { src: string; label: string }) {
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

  return (
    <div className="relative aspect-video overflow-hidden bg-surface-container-high">
      <span className="absolute left-2 top-2 z-10 inter text-[10px] uppercase tracking-widest text-on-surface-variant bg-surface/80 px-1.5 py-0.5">
        {label}
      </span>
      <video className="h-full w-full object-cover" loop muted playsInline preload="none" ref={ref} />
    </div>
  );
}
