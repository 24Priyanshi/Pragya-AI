/** Site-wide constants carried over from the original markup. */
export const siteConfig = {
  name: "Pragya AI",
  /** Base for resolving OG/Twitter image URLs. Override via NEXT_PUBLIC_SITE_URL in Phase 5. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** The original <title> on pages/landing.html. */
  title: "Pragya AI - Embodied AI Lab",
  favicon: "/logo_srt.png",
  /** Navbar logo. Note: violate_nobg.png, not the unused logo_nobg.png. */
  logo: "/violate_nobg.png",
  logoAlt: "Pragya AI",
  /**
   * Points at an element that exists on no page in the original site — see
   * BUG-12. Preserved so the CTA behaves exactly as it did.
   */
  contactAnchor: "#contact-form",
  footerCopyright: "© 2024 Pragya AI Research Lab. All rights reserved.",
} as const;

/** Footer links. Every href is "#" in the original. */
export const footerLinks = [
  { label: "Publications", href: "#" },
  { label: "Ethics", href: "#" },
  { label: "Team", href: "#" },
  { label: "Contact", href: "#" },
] as const;
