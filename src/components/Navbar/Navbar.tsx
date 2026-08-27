"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { submenuConfig } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { useNavHeight } from "@/hooks/useNavHeight";
import { useScrolled } from "@/hooks/useScrolled";
import { useSubmenu } from "@/hooks/useSubmenu";
import { cn } from "@/lib/cn";

import { NavLinks } from "./NavLinks";
import { Submenu } from "./Submenu";

/**
 * Port of js/navbar.js — the whole navbar was innerHTML-injected there.
 *
 * Markup, class strings and element ids are reproduced exactly, because
 * design-system.css §20 targets `#submenu-backdrop` / `#submenu-container` /
 * `#submenu-content` by id.
 *
 * The logo uses a plain <img>, not next/image: the original sizes it with
 * `h-9 md:h-10 w-auto object-contain`, so the rendered box depends on the
 * image's own aspect ratio. next/image needs fixed width/height, which would
 * change the navbar's measured height and therefore `--nav-height`.
 */
export function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const { activeKey, isHidden, containerRef, toggle, close, hoverOpen, scheduleHoverClose, cancelHoverClose } = useSubmenu();

  useNavHeight(navRef);
  useScrolled(navRef);

  // IB-10 — a click anywhere outside a nav item or the panel closes it.
  useEffect(() => {
    if (activeKey === null) return;
    const onDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest("[data-nav-item]") && !target?.closest("#submenu-container")) {
        close();
      }
    };
    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, [activeKey, close]);

  const isHomePage = pathname === "/";
  const contactHref = isHomePage ? siteConfig.contactAnchor : `/${siteConfig.contactAnchor}`;
  const openConfig = activeKey ? submenuConfig[activeKey] : undefined;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest/70 backdrop-blur-md" data-nav ref={navRef}>
        <div className="flex justify-between items-center px-12 py-6 max-w-screen-2xl mx-auto">
          <Link aria-label="Pragya AI Home" className="inline-flex items-center" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={siteConfig.logoAlt} className="h-9 md:h-10 w-auto object-contain" src={siteConfig.logo} />
          </Link>

          <NavLinks
            activePath={pathname}
            onHoverLeave={scheduleHoverClose}
            onHoverOpen={hoverOpen}
            onToggle={toggle}
            openKey={activeKey}
          />

          <div className="flex items-center gap-6">
            <a
              className="bg-on-surface text-inverse-on-surface px-5 py-2.5 text-[10px] tracking-widest hover:opacity-80 transition-all active:scale-95 duration-200 uppercase font-medium"
              href={contactHref}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </nav>

      {/* IB-9 — backdrop. The inline `transparent` is overridden by an
          `!important` rule in design-system.css §20; kept for fidelity. */}
      <div
        className={cn("fixed inset-0 z-40", isHidden && "hidden")}
        id="submenu-backdrop"
        onClick={close}
        style={{ background: "transparent" }}
      />

      <div
        className={cn("fixed top-24 left-0 right-0 z-40 px-12", isHidden && "hidden")}
        id="submenu-container"
        onMouseEnter={cancelHoverClose}
        onMouseLeave={scheduleHoverClose}
        ref={containerRef}
      >
        <div className="max-w-screen-2xl mx-auto bg-surface-container-lowest/90 backdrop-blur-xl rounded-lg border border-surface-container-high shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-1" id="submenu-content">
            {openConfig ? <Submenu config={openConfig} /> : null}
          </div>
        </div>
      </div>
    </>
  );
}
