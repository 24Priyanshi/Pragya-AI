"use client";

import { type RefObject, useEffect, useState } from "react";

/**
 * True once the element has come within `margin` of the viewport.
 *
 * The default margin is deliberately generous — a clip card is ~1600px tall, so
 * a small margin only starts the fetch once the card is already on screen and
 * the reader visibly fills in late. Two viewports of lead time hides the
 * request behind the scroll.
 *
 * Latches: once a card has been seen it stays "near", so scrolling back and
 * forth does not thrash the work it triggered. Without IntersectionObserver
 * (or before it resolves) the answer is true, which degrades to eager loading
 * rather than a card that never fills in.
 */
export function useNearViewport(ref: RefObject<Element | null>, margin = "2000px"): boolean {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // Deferred rather than set inline: the initial value cannot be computed
      // during render without diverging from the server, where the constructor
      // is always absent and every card would hydrate as already-visible.
      const id = setTimeout(() => setNear(true), 0);
      return () => clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, margin]);

  return near;
}
