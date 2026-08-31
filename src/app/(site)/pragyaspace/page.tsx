import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { SectionRule } from "@/components/SectionRule";
import { hero, proseBlocks } from "@/data/pragyaspace";

const SIMULATION_URL = "https://multigravity.vercel.app/arena.html";

export const metadata: Metadata = {
  title: "PragyaSpace",
  description: "A unified spatial workspace where PragyaAI's embodied-AI projects share one live map of the physical world.",
};

export default function PragyaSpacePage() {
  return (
    <PageShell>
      <PageHero hero={hero} />

      <section className="space-y-8 mb-32">
        {proseBlocks.map((block) => (
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 md:p-12" key={block.label}>
            <SectionRule label={block.label} margin="mb-8" />
            {block.paragraphs.map((p) => (
              <p className="inter text-sm md:text-base text-on-surface-variant leading-relaxed max-w-6xl" key={p.slice(0, 40)}>
                {p}
              </p>
            ))}
          </div>
        ))}
      </section>

      <section className="mb-32">
        {/* Live multi-gravity lab scene, deployed from a separate repo (github.com/prajak002/Multi-gravity-lab-scene)
            to Vercel — embedded via iframe the same way as PragyaVLA's, KalariSena's, and DenseWorld's live tools. */}
        <SectionRule label="Live Simulation" margin="mb-8" />
        <div className="border border-outline-variant/10 bg-surface">
          <iframe className="w-full h-[720px]" src={SIMULATION_URL} title="PragyaSpace multi-gravity lab simulation" />
        </div>
      </section>
    </PageShell>
  );
}
