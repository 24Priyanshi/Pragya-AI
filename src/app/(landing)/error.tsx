"use client";

import { useEffect } from "react";

/**
 * Error boundary for the landing route. Rendered inside the root layout, so
 * the navbar and footer stay in place.
 */
export default function LandingError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-12 gap-8 text-center">
      <span className="inter text-sm font-medium uppercase tracking-widest text-outline">Something went wrong</span>
      <h1 className="plus-jakarta-sans text-4xl md:text-6xl font-extralight tracking-tighter text-on-surface">
        This page failed to load
      </h1>
      <button
        className="bg-on-surface text-inverse-on-surface px-5 py-2.5 text-[10px] tracking-widest hover:opacity-80 transition-all active:scale-95 duration-200 uppercase font-medium"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </main>
  );
}
