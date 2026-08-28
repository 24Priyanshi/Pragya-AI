import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { PragyaDexGallery } from "@/components/PragyaDexGallery";
import { SectionRule } from "@/components/SectionRule";
import { galleryDomains } from "@/data/pragyadexGallery";
import { hero, problemQuote } from "@/data/pragyadex";

export const metadata: Metadata = {
  title: "PragyaDex",
  description:
    "A paired human-hand-to-robot-hand dexterity skill gallery spanning eight everyday domains, used to benchmark and retarget dexterous manipulation policies.",
};

export default function PragyaDexPage() {
  return (
    <PageShell>
      <PageHero hero={hero} />

      <div className="space-y-32">
        <section>
          <SectionRule label="The Problem" margin="mb-8" />
          <div className="bg-primary px-8 py-16 md:py-24 text-center">
            <p className="plus-jakarta-sans text-2xl md:text-4xl font-light italic leading-snug text-on-primary max-w-4xl mx-auto text-balance">
              &ldquo;{problemQuote}&rdquo;
            </p>
          </div>
        </section>

        <section>
          <SectionRule label="Dataset" margin="mb-8" />
          <PragyaDexGallery domains={galleryDomains} />
        </section>
      </div>
    </PageShell>
  );
}
