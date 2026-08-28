import type { Metadata } from "next";

import { Contributors } from "@/components/Contributors";
import { PageShell } from "@/components/PageShell";
import { SectionRule } from "@/components/SectionRule";
import { proseBlocks } from "@/data/pragyaspace";

export const metadata: Metadata = {
  title: "PragyaSpace",
  description: "A unified spatial workspace where PragyaAI's embodied-AI projects share one live map of the physical world.",
};

export default function PragyaSpacePage() {
  return (
    <PageShell>
      <header className="mb-32 bg-surface-container-lowest border border-outline-variant/10 px-8 py-24 md:py-32 text-center">
        <h1 className="plus-jakarta-sans text-5xl md:text-6xl font-light tracking-tight text-on-surface">PragyaSpace</h1>
        <p className="inter text-base md:text-lg text-on-surface-variant mt-6 max-w-2xl mx-auto leading-relaxed">
          Unified spatial workspace — a common map of the physical world, shared across every PragyaAI project.
        </p>
      </header>

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

      <Contributors />
    </PageShell>
  );
}
