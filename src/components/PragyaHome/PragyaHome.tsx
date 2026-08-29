"use client";

import { useState } from "react";

import { programmes } from "@/data/pragyaProgrammes";

import { EcosystemStage } from "./EcosystemStage";
import { PragyaFooter } from "./PragyaFooter";
import "./pragyaHome.css";
import { ProgrammeSheet } from "./ProgrammeSheet";

/**
 * Exact port of the landing page at
 * https://pragyalab-ai.dramitavadas.chatgpt.site/ (2026-08-29) — hero
 * constellation and footer, copied from that page's own markup, CSS and
 * compiled JS, not re-derived. The nav is rendered by SiteShell (TopNav is
 * now shared across every page, not just this one — see its own file).
 */
export function PragyaHome() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <main className="pragya-home">
      <a className="skip-link" href="#programmes">
        Skip to programmes
      </a>
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
