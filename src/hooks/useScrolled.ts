"use client";

import { useEffect, type RefObject } from "react";

/**
 * IB-3 — toggles `is-scrolled` on the nav once the page scrolls past 24px.
 *
 * Port of the `onScroll` block in js/main.js. This has no visual effect in the
 * original: the only rule for it is `.site-navbar.is-scrolled`, and the
 * injected nav never carried a `site-navbar` class (BUG-3). Ported anyway so
 * the DOM matches; do not "fix" it by adding the class.
 */
export function useScrolled(navRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      if (window.scrollY > 24) {
        nav.classList.add("is-scrolled");
      } else {
        nav.classList.remove("is-scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [navRef]);
}
