import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { SectionRule } from "@/components/SectionRule";
import { hero, proseBlocks } from "@/data/pragyaspace";

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
    </PageShell>
  );
}
