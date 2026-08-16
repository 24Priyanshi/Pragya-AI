import { footerLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * The site has two visually different footers (BUG-8), so this takes a variant
 * rather than unifying them:
 *
 *  - "landing"  — hard-coded inline in pages/landing.html.
 *                 border-surface-container-high, gap-10, text-on-surface-variant
 *  - "injected" — built by js/footer.js on the other six pages.
 *                 border-outline-variant/30, space-x-12, text-outline
 *
 * Do not merge these. The difference is in the original and is deliberate here.
 */
export type FooterVariant = "landing" | "injected";

interface FooterProps {
  variant: FooterVariant;
}

export function Footer({ variant }: FooterProps) {
  const isLanding = variant === "landing";

  return (
    <footer className={cn("w-full border-t bg-surface-container-low", isLanding ? "border-surface-container-high" : "border-outline-variant/30")}>
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8 max-w-screen-2xl mx-auto">
        <div
          className={cn(
            "font-['Inter'] text-[11px] uppercase tracking-widest",
            isLanding ? "text-on-surface-variant" : "text-outline",
          )}
        >
          {siteConfig.footerCopyright}
        </div>
        <div
          className={cn("flex font-['Inter'] text-[11px] uppercase tracking-widest", isLanding ? "gap-10" : "space-x-12")}
        >
          {footerLinks.map((link) => (
            <a
              className={cn("transition-colors hover:text-primary", isLanding ? "text-on-surface-variant" : "text-outline")}
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
