"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Matches the 300ms used by both the JS transition and the close timeout in js/navbar.js. */
const TRANSITION_MS = 300;

/** Grace period between leaving a nav item/panel and the submenu actually closing, so moving the cursor from the tab down into the panel doesn't flicker it shut. */
const HOVER_CLOSE_DELAY_MS = 200;

export interface SubmenuController {
  /** Which nav key is open, or null. Drives what gets rendered. */
  readonly activeKey: string | null;
  /** True while the container carries the `hidden` class. */
  readonly isHidden: boolean;
  readonly containerRef: React.RefObject<HTMLDivElement | null>;
  readonly toggle: (key: string) => void;
  readonly close: () => void;
  /** Opens on hover; cancels any pending hover-close. */
  readonly hoverOpen: (key: string) => void;
  /** Schedules a close after `HOVER_CLOSE_DELAY_MS`, cancelled by a subsequent `hoverOpen`/`cancelHoverClose`. */
  readonly scheduleHoverClose: () => void;
  /** Cancels a pending hover-close, e.g. when the cursor enters the panel itself. */
  readonly cancelHoverClose: () => void;
}

/**
 * IB-7 … IB-13 — the mega-submenu open/close state machine.
 *
 * Ported from js/navbar.js with the original timing preserved exactly:
 *  - open:  setTimeout(0) → set opacity:0 / translateY(-10px)
 *           → requestAnimationFrame → transition "all 300ms ease-out" → opacity:1 / translateY(0)
 *  - close: transition "all 300ms ease-out" → opacity:0 / translateY(-10px)
 *           → setTimeout(300) → add `hidden`
 *  - clicking the already-open item closes it (toggle)
 *
 * `hoverOpen` / `scheduleHoverClose` / `cancelHoverClose` are a deliberate
 * addition on top of the original, on request (2026-08-27): the submenu now
 * also opens on hover and auto-closes `HOVER_CLOSE_DELAY_MS` after the cursor
 * leaves both the nav item and the panel, instead of requiring an explicit
 * outside click. `toggle`/`close` (click-based) are left in place too.
 */
export function useSubmenu(): SubmenuController {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafId = useRef<number | null>(null);
  const hoverCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);
    if (rafId.current) cancelAnimationFrame(rafId.current);
    closeTimer.current = null;
    openTimer.current = null;
    rafId.current = null;
  }, []);

  const close = useCallback(() => {
    setActiveKey((current) => {
      if (current === null) return null;

      const el = containerRef.current;
      if (el) {
        el.style.transition = `all ${TRANSITION_MS}ms ease-out`;
        el.style.opacity = "0";
        el.style.transform = "translateY(-10px)";
      }

      clearTimers();
      closeTimer.current = setTimeout(() => {
        setIsHidden(true);
        setActiveKey(null);
      }, TRANSITION_MS);

      return current;
    });
  }, [clearTimers]);

  const toggle = useCallback(
    (key: string) => {
      if (activeKey === key) {
        close();
        return;
      }
      clearTimers();
      setActiveKey(key);
      setIsHidden(false);
    },
    [activeKey, close, clearTimers],
  );

  const cancelHoverClose = useCallback(() => {
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  }, []);

  const hoverOpen = useCallback(
    (key: string) => {
      cancelHoverClose();
      if (activeKey === key) return;
      clearTimers();
      setActiveKey(key);
      setIsHidden(false);
    },
    [activeKey, clearTimers, cancelHoverClose],
  );

  const scheduleHoverClose = useCallback(() => {
    cancelHoverClose();
    hoverCloseTimer.current = setTimeout(() => {
      hoverCloseTimer.current = null;
      close();
    }, HOVER_CLOSE_DELAY_MS);
  }, [close, cancelHoverClose]);

  // The open animation, run after the new content has been committed —
  // mirroring the original's renderSubmenu() → unhide → setTimeout(0) order.
  useEffect(() => {
    if (activeKey === null || isHidden) return;
    const el = containerRef.current;
    if (!el) return;

    openTimer.current = setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateY(-10px)";
      rafId.current = requestAnimationFrame(() => {
        el.style.transition = `all ${TRANSITION_MS}ms ease-out`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }, 0);

    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [activeKey, isHidden]);

  // IB-11 — Escape closes.
  useEffect(() => {
    if (activeKey === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeKey, close]);

  useEffect(() => {
    return () => {
      clearTimers();
      cancelHoverClose();
    };
  }, [clearTimers, cancelHoverClose]);

  return { activeKey, isHidden, containerRef, toggle, close, hoverOpen, scheduleHoverClose, cancelHoverClose };
}
