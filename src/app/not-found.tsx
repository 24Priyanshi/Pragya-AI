import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";

import "@/styles/fonts.css";
import "@/app/globals.css";
import "@/styles/design-system.css";
import "@/styles/overrides.css";

/**
 * Root not-found. Because the app uses two root layouts (see
 * src/components/SiteShell), unmatched routes have no layout to inherit, so
 * this renders its own <html>/<body>.
 *
 * The original site has no 404 page — GitHub Pages served its default. Styled
 * to match the design system rather than invent a new look.
 */
export const metadata: Metadata = {
  title: "Page not found | Pragya AI",
  icons: { icon: [{ url: siteConfig.favicon, type: "image/png" }] },
};

export default function NotFound() {
  return (
    <html className="light" data-scroll-behavior="smooth" lang="en">
      <body
        className="bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed"
        suppressHydrationWarning
      >
        <main className="min-h-screen flex flex-col items-center justify-center px-12 gap-8 text-center">
          <span className="inter text-sm font-medium uppercase tracking-widest text-outline">Error 404</span>
          <h1 className="plus-jakarta-sans text-5xl md:text-7xl font-extralight tracking-tighter text-on-surface">
            Page not found
          </h1>
          <p className="inter text-sm text-on-surface-variant max-w-md leading-relaxed">
            That page does not exist. It may have moved, or the link may be out of date.
          </p>
          <Link
            className="bg-on-surface text-inverse-on-surface px-5 py-2.5 text-[10px] tracking-widest hover:opacity-80 transition-all active:scale-95 duration-200 uppercase font-medium"
            href="/"
          >
            Back to home
          </Link>
        </main>
      </body>
    </html>
  );
}
