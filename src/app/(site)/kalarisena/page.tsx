import type { Metadata } from "next";

import { KalariSenaTabs } from "@/components/KalariSenaTabs";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { hero, problemQuote } from "@/data/kalarisena";

export const metadata: Metadata = {
  title: "KalariSena",
  description:
    "A movement-intelligence framework for humanoid robots, inspired by Kalaripayattu and grounded in strategic embodied response.",
};

/**
 * Page structure mirrors PragyaVLA/PragyaDex's (2026-08-30): a plain hero,
 * then "The Problem" / "Dataset" tabs, no bottom Contributors.
 */
export default function KalariSenaPage() {
  return (
    <PageShell>
      <PageHero hero={hero} />
      <KalariSenaTabs problemQuote={problemQuote} />
    </PageShell>
  );
}
