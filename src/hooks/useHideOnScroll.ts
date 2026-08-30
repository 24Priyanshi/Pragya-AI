"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Added on request (2026-08-30): hides the nav on scroll-down and reveals it
 * on scroll-up, from any scroll position (no top-of-page threshold).
 */
export function useHideOnScroll(): boolean {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current);
      lastY.current = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}
