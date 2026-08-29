import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteShell } from "@/components/SiteShell";
import { siteConfig } from "@/config/site";

/**
 * Root layout for the landing page.
 *
 * This is one of two root layouts (see src/app/(site)/layout.tsx). The split
 * exists because the original's <body> class differs between landing and the
 * six sub-pages — see SiteShell for the details.
 *
 * footer={false} on request (2026-08-29): the landing page is an exact port
 * of an external reference design (https://pragyalab-ai.dramitavadas.chatgpt.site/)
 * with its own footer, so the shared Footer is omitted here to avoid
 * doubling up. Its nav is now the same shared TopNav every page uses.
 */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description:
    "Building Vision-Language-Action (VLA) models for India, grounded in Indian-language instruction, built to navigate Indian terrains, aligned with Indian ethical principles through the Kalam Protocol, and trained for defense using principles of Kalaripayattu.",
  // Matches the original's <link rel="icon" type="image/png" href="./public/logo_srt.png" />.
  // Note: src/app/favicon.ico must NOT exist — Next's file convention takes
  // priority over this and would win in the browser.
  icons: { icon: [{ url: siteConfig.favicon, type: "image/png" }] },
  openGraph: {
    title: siteConfig.title,
    description: "India's Sovereign Embodied AI.",
    type: "website",
    images: [{ url: "/hero.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: "India's Sovereign Embodied AI.",
    images: ["/hero.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function LandingRootLayout({ children }: { children: ReactNode }) {
  return (
    <SiteShell footer={false} variant="landing">
      {children}
    </SiteShell>
  );
}
