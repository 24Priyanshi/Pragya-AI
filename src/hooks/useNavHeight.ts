"use client";

import { useEffect, type RefObject } from "react";

/**
 * IB-2 — publishes the measured navbar height as `--nav-height` on <html>.
 *
 * Port of the `updateNavHeight` block in js/main.js. Every sub-page's
 * `padding-top` and full-height hero derives from this, so the rounding
 * (`Math.ceil`) and the resize listener's passive flag are kept as-is.
 */
export function useNavHeight(navRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const updateNavHeight = () => {
      const navHeight = Math.ceil(nav.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--nav-height", `${navHeight}px`);
    };

    window.addEventListener("resize", updateNavHeight, { passive: true });
    updateNavHeight();

    return () => window.removeEventListener("resize", updateNavHeight);
  }, [navRef]);
}
