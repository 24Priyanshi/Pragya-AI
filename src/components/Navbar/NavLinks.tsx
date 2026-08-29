"use client";

import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { contributorsLink, NAV_LINK_ACTIVE_CLASS, NAV_LINK_INACTIVE_CLASS, navIcons, navLinks, submenuConfig } from "@/config/nav";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/types/nav";

interface NavLinksProps {
  activePath: string;
  openKey: string | null;
  onToggle: (key: string) => void;
  onHoverOpen: (key: string) => void;
  onHoverLeave: () => void;
}

/**
 * The desktop nav items.
 *
 * These are <button>s, not links — in the original they only open the submenu
 * and never navigate (BUG-11). That behaviour is preserved. What is added on
 * top: `aria-expanded` and `aria-controls`, which the original omitted, so the
 * disclosure is announced; and, on request (2026-08-27), hover handlers so the
 * submenu also opens on hover and auto-closes when the cursor leaves (see
 * useSubmenu's hoverOpen/scheduleHoverClose). Neither original attribute
 * changes rendering, and click-to-toggle is left in place alongside hover.
 *
 * `contributorsLink` is rendered separately from the project tabs, on
 * request (2026-08-28), with a pill outline so it reads as a different kind
 * of item rather than another project.
 */
export function NavLinks({ activePath, openKey, onToggle, onHoverOpen, onHoverLeave }: NavLinksProps) {
  function renderItem(link: NavLink, variant: "project" | "contributors") {
    const isActive = activePath === link.key;
    const hasSubmenu = Boolean(submenuConfig[link.key]);

    return (
      <button
        aria-controls={hasSubmenu ? "submenu-container" : undefined}
        aria-expanded={hasSubmenu ? openKey === link.key : undefined}
        className={cn(
          "relative flex items-center gap-1",
          hasSubmenu && "cursor-pointer group",
          variant === "contributors"
            ? cn(
                "px-4 py-1.5 border rounded-full text-sm",
                isActive
                  ? "border-primary text-primary font-medium"
                  : "border-outline-variant/40 text-on-surface-variant hover:border-primary/60 hover:text-on-surface transition-colors duration-300",
              )
            : isActive
              ? NAV_LINK_ACTIVE_CLASS
              : NAV_LINK_INACTIVE_CLASS,
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
        {variant === "project" && navIcons[link.key] ? (
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current/25 text-[9px]">
            <MaterialIcon name={navIcons[link.key]} />
          </span>
        ) : null}
        {link.label}
      </button>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-5 font-['Plus_Jakarta_Sans'] font-light tracking-tight text-sm">
      {navLinks.map((link) => renderItem(link, "project"))}
      {renderItem(contributorsLink, "contributors")}
    </div>
  );
}
