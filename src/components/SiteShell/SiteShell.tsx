import type { ReactNode } from "react";

import { Footer, type FooterVariant } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

import "@/styles/fonts.css";
import "@/app/globals.css";
import "@/styles/design-system.css";
import "@/styles/overrides.css";

/**
 * The <html>/<body> shell shared by both root layouts.
 *
 * Stylesheet import order above mirrors the original <head> exactly:
 *   1. fonts.css         ← the Google Fonts <link>
 *   2. globals.css       ← the Tailwind CDN <script>
 *   3. design-system.css ← the design-system <link> (verbatim, wins on ties)
 *   4. overrides.css     ← NOT in the original: the +7% type scale (see the file)
 *
 * The two variants exist because the original's <body> differs between the
 * landing page and the six sub-pages. `bg-background` and `bg-surface` happen
 * to resolve to the same #FAF8F7, but the selection colours differ, and only
 * the landing page sets `overflow-x-hidden` — which is why the sub-pages show
 * a horizontal scrollbar from their `w-screen` heroes (BUG-14).
 */

const BODY_CLASS: Record<FooterVariant, string> = {
  landing:
    "bg-background text-on-surface font-body selection:bg-surface-container-low selection:text-on-surface overflow-x-hidden",
  injected: "bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed",
};

interface SiteShellProps {
  variant: FooterVariant;
  children: ReactNode;
}

export function SiteShell({ variant, children }: SiteShellProps) {
  return (
    // data-scroll-behavior: design-system.css sets `html { scroll-behavior: smooth }`.
    // This attribute tells Next to force instant scrolling during route
    // transitions, which matches the original — there every navigation was a
    // full document load, so it jumped to the top with no animation. Without
    // it, client-side navigation would smooth-scroll, which the original never did.
    <html className="light" data-scroll-behavior="smooth" lang="en">
      {/* suppressHydrationWarning: browser extensions stamp attributes onto
          <body> before React hydrates. Scoped to this element's own
          attributes; mismatches in children still surface. */}
      <body className={BODY_CLASS[variant]} data-mode="connect" suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer variant={variant} />
      </body>
    </html>
  );
}
