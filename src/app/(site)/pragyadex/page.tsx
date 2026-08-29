import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { PragyaDexTabs } from "@/components/PragyaDexTabs";
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

      <PragyaDexTabs domains={galleryDomains} problemQuote={problemQuote} />
    </PageShell>
  );
}
