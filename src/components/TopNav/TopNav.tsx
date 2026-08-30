"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { programmes } from "@/data/pragyaProgrammes";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { useNavHeight } from "@/hooks/useNavHeight";

import { ProgrammeIcon } from "./icons";
import { programmeRoute } from "./routes";
import "./topNav.css";

/**
 * The site-wide nav, on request (2026-08-29) — the landing page's own exact
 * port (see PragyaHome) is now the nav for every page, replacing the
 * original mega-menu Navbar everywhere (Navbar, its submenu system, and
 * config/nav.ts's submenuConfig are now unused; config/nav.ts is kept for
 * its ported Q&A copy in case the mega-menu returns, but nothing renders it).
 *
 * `useNavHeight` publishes this nav's real measured height as `--nav-height`,
 * which PageShell/PageHero already read for top padding/full-height heroes —
 * unchanged from how the old Navbar did it.
 */
export function TopNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  useNavHeight(navRef);
  const hidden = useHideOnScroll();

  return (
    <nav aria-label="Pragya programmes" className={`top-nav${hidden ? " top-nav--hidden" : ""}`} ref={navRef}>
      <Link aria-label="Pragya home" className="nav-mark" href="/">
        <span aria-hidden="true" className="brand-logo" />
      </Link>
      <div className="nav-programmes">
        {programmes.map((p) => {
          const href = programmeRoute(p.id);
          return (
            <Link aria-label={`Open ${p.name}`} className={pathname === href ? "active" : ""} href={href} key={p.id}>
              <span className="nav-emblem">
                <ProgrammeIcon id={p.id} />
              </span>
              <span>{p.navName}</span>
            </Link>
          );
        })}
      </div>
      <a className="bits-button" href="https://www.bits-pilani.ac.in/goa/" rel="noreferrer" target="_blank">
        Pragya@BITS
      </a>
    </nav>
  );
}
