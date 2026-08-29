"use client";

import { useState } from "react";

import { programmes } from "@/data/pragyaProgrammes";

import { EcosystemStage } from "./EcosystemStage";
import { PragyaFooter } from "./PragyaFooter";
import "./pragyaHome.css";
import { ProgrammeSheet } from "./ProgrammeSheet";
import { TopNav } from "./TopNav";

/**
 * Exact port of the landing page at
 * https://pragyalab-ai.dramitavadas.chatgpt.site/ (2026-08-29) — its own
 * nav, hero constellation, and footer replace the site's shared Navbar/
 * Footer for "/" only (see SiteShell's `chrome` prop). Content, copy, layout
 * and interaction (hover tooltip + click-to-open detail sheet) are copied
 * from that page's own markup, CSS and compiled JS, not re-derived.
 */
export function PragyaHome() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <main className="pragya-home">
      <a className="skip-link" href="#programmes">
        Skip to programmes
      </a>
      <TopNav />
      <EcosystemStage
        hoveredId={hoveredId}
        onHover={setHoveredId}
        onOpen={setOpenId}
        openId={openId}
        programmes={programmes}
      />
      <PragyaFooter />
      <ProgrammeSheet onClose={() => setOpenId(null)} onSwitch={setOpenId} openId={openId} programmes={programmes} />
    </main>
  );
}
