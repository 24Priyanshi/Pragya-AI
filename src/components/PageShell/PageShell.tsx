import type { ReactNode } from "react";

/**
 * <main> wrapper for the six sub-pages.
 *
 * `padding-top` is an inline custom-property reference in the original, and it
 * has to stay inline: the value is published at runtime by the navbar
 * measurement (IB-2), and the 84px fallback covers first paint.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="pb-24 px-12 max-w-[1920px] mx-auto" style={{ paddingTop: "var(--nav-height, 84px)" }}>
      {children}
    </main>
  );
}
