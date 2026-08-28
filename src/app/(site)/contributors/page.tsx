import type { Metadata } from "next";

import { Contributors } from "@/components/Contributors";
import { PageShell } from "@/components/PageShell";
import { SectionRule } from "@/components/SectionRule";

export const metadata: Metadata = {
  title: "Contributors",
  description: "The researchers and engineers behind PragyaAI.",
};

export default function ContributorsPage() {
  return (
    <PageShell>
      <header className="mb-32 bg-surface-container-lowest border border-outline-variant/10 px-8 py-24 md:py-32 text-center">
        <h1 className="plus-jakarta-sans text-5xl md:text-6xl font-light tracking-tight text-on-surface">Contributors</h1>
        <p className="inter text-base md:text-lg text-on-surface-variant mt-6 max-w-2xl mx-auto leading-relaxed">
          The team behind PragyaAI.
        </p>
      </header>

      <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 md:p-12 mb-32">
        <SectionRule label="Contact Us" margin="mb-8" />
        <p className="inter text-sm md:text-base text-on-surface-variant leading-relaxed">
          <a className="text-primary hover:opacity-80 transition-opacity" href="mailto:pragya@bits">
            pragya@bits
          </a>
          {" · "}
          <a
            className="text-primary hover:opacity-80 transition-opacity"
            href="https://www.bits-pilani.ac.in/"
            rel="noopener noreferrer"
            target="_blank"
          >
            bits-pilani.ac.in
          </a>
        </p>
      </div>

      <Contributors />
    </PageShell>
  );
}
