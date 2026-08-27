"use client";

import { NAV_LINK_ACTIVE_CLASS, NAV_LINK_INACTIVE_CLASS, navLinks, submenuConfig } from "@/config/nav";
import { cn } from "@/lib/cn";

interface NavLinksProps {
  activePath: string;
  openKey: string | null;
  onToggle: (key: string) => void;
  onHoverOpen: (key: string) => void;
  onHoverLeave: () => void;
}

/**
 * The six desktop nav items.
 *
 * These are <button>s, not links — in the original they only open the submenu
 * and never navigate (BUG-11). That behaviour is preserved. What is added on
 * top: `aria-expanded` and `aria-controls`, which the original omitted, so the
 * disclosure is announced; and, on request (2026-08-27), hover handlers so the
 * submenu also opens on hover and auto-closes when the cursor leaves (see
 * useSubmenu's hoverOpen/scheduleHoverClose). Neither original attribute
 * changes rendering, and click-to-toggle is left in place alongside hover.
 */
export function NavLinks({ activePath, openKey, onToggle, onHoverOpen, onHoverLeave }: NavLinksProps) {
  return (
    <div className="hidden md:flex items-center gap-10 font-['Plus_Jakarta_Sans'] font-light tracking-tight text-base">
      {navLinks.map((link) => {
        const isActive = activePath === link.key;
        const hasSubmenu = Boolean(submenuConfig[link.key]);

        return (
          <button
            aria-controls={hasSubmenu ? "submenu-container" : undefined}
            aria-expanded={hasSubmenu ? openKey === link.key : undefined}
            className={cn(
              "relative",
              hasSubmenu && "cursor-pointer group",
              isActive ? NAV_LINK_ACTIVE_CLASS : NAV_LINK_INACTIVE_CLASS,
            )}
            data-nav-item={link.key}
            key={link.key}
            onClick={
              hasSubmenu
                ? (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggle(link.key);
                  }
                : undefined
            }
            onMouseEnter={hasSubmenu ? () => onHoverOpen(link.key) : undefined}
            onMouseLeave={hasSubmenu ? onHoverLeave : undefined}
            style={hasSubmenu ? { cursor: "pointer" } : undefined}
            type="button"
          >
            {link.label}
          </button>
        );
      })}
    </div>
  );
}
