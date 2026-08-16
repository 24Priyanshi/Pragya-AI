import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteShell } from "@/components/SiteShell";
import { siteConfig } from "@/config/site";

/**
 * Root layout for the six research sub-pages.
 *
 * Sibling of src/app/(landing)/layout.tsx — see SiteShell for why the shell is
 * duplicated across two root layouts rather than shared as one.
 */

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: "%s | Pragya AI" },
  // Matches the original's <link rel="icon" type="image/png" href="./public/logo_srt.png" />.
  // Note: src/app/favicon.ico must NOT exist — Next's file convention takes
  // priority over this and would win in the browser.
  icons: { icon: [{ url: siteConfig.favicon, type: "image/png" }] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function SiteRootLayout({ children }: { children: ReactNode }) {
  return <SiteShell variant="injected">{children}</SiteShell>;
}
