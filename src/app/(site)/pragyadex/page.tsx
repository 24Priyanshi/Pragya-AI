import type { Metadata } from "next";

import { Contributors } from "@/components/Contributors";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { PragyaDexGallery } from "@/components/PragyaDexGallery";
import { SectionRule } from "@/components/SectionRule";
import { StatStrip } from "@/components/StatStrip";
import { galleryDomains } from "@/data/pragyadexGallery";
import { hero, proseBlocks, stats } from "@/data/pragyadex";

export const metadata: Metadata = {
  title: "PragyaDex",
  description:
    "A paired human-hand-to-robot-hand dexterity skill gallery spanning eight everyday domains, used to benchmark and retarget dexterous manipulation policies.",
};

export default function PragyaDexPage() {
  return (
    <PageShell>
      <PageHero hero={hero} />
      <StatStrip stats={stats} />

      <section className="space-y-32">
        {proseBlocks.map((block) => (
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 md:p-12" key={block.label}>
            <SectionRule label={block.label} margin="mb-8" />
            {block.paragraphs.map((paragraph, i) => (
              <p
                className={`inter text-sm md:text-base text-on-surface-variant leading-relaxed max-w-6xl${
                  i < block.paragraphs.length - 1 ? " mb-6" : ""
                }`}
                key={paragraph.slice(0, 40)}
              >
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </section>

      <section className="mb-32">
        <SectionRule label="04. Skill Gallery" margin="mb-8" />
        <PragyaDexGallery domains={galleryDomains} />
      </section>

      <Contributors />
    </PageShell>
  );
}
