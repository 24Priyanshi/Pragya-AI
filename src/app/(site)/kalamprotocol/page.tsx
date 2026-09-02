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

      {/* Placeholder overview poster under the hero, pending a proper redesign (added 2026-08-31).
          The source image is a tall 1055x1491 portrait poster, so it's capped at max-w-2xl (bumped
          up from max-w-xl on request, 2026-09-02) and centered rather than stretched to the page's
          full content width. */}
      <section className="mb-16 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="Kalam Protocol overview poster" className="w-full max-w-2xl h-auto" src="/kalamprotocol_poster.png" />
      </section>

      {/* Demo GIF, added under the poster on request (2026-09-02). */}
      <section className="mb-32 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Kalam Protocol demonstration"
          className="w-full max-w-3xl h-auto border border-outline-variant/10"
          src="/kalamprotocol_demo.gif"
        />
      </section>
    </PageShell>
  );
}
