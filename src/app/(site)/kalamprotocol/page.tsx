import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { hero } from "@/data/kalamprotocol";

export const metadata: Metadata = {
  title: "Kalam Protocol",
  description: "A safety, alignment and governance protocol for robots operating in real-world environments.",
};

export default function KalamProtocolPage() {
  return (
    <PageShell>
      <PageHero hero={hero} />
    </PageShell>
  );
}
