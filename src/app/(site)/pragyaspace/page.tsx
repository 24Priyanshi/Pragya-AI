import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { hero } from "@/data/pragyaspace";

const SIMULATION_URL = "https://multigravity.vercel.app/arena.html";

export const metadata: Metadata = {
  title: "PragyaSpace",
  description: "A unified spatial workspace where PragyaAI's embodied-AI projects share one live map of the physical world.",
};

export default function PragyaSpacePage() {
  return (
    <PageShell>
      <PageHero hero={hero} />

      <section className="mb-32">
        {/* Live multi-gravity lab scene, deployed from a separate repo (github.com/prajak002/Multi-gravity-lab-scene)
            to Vercel — embedded via iframe the same way as PragyaVLA's, KalariSena's, and DenseWorld's live tools.
            No heading (removed on request, 2026-08-31) — the prose blocks above it were removed too. */}
        <div className="border border-outline-variant/10 bg-surface">
          <iframe className="w-full h-[720px]" src={SIMULATION_URL} title="PragyaSpace multi-gravity lab simulation" />
        </div>
      </section>
    </PageShell>
  );
}
