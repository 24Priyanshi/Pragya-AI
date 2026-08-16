import { EvidenceGrid } from "@/components/EvidenceGrid";
import { LandingHero } from "@/components/LandingHero";
import { ProtocolRow } from "@/components/ProtocolRow";
import { protocolRows } from "@/data/landing";

/**
 * The landing page — pages/landing.html.
 *
 * The original's index.html was a pure redirect to this page, so "/" is it.
 * Footer is supplied by the root layout (landing variant).
 */
export default function LandingPage() {
  return (
    <>
      <LandingHero />

      <section className="py-32 bg-surface-container-lowest reveal opacity-0" id="protocols">
        <div className="px-8 md:px-12 max-w-screen-2xl mx-auto">
          <div className="space-y-px bg-surface-container border border-surface-container-high">
            {protocolRows.map((row) => (
              <ProtocolRow key={row.title} row={row} />
            ))}
          </div>
        </div>
      </section>

      <EvidenceGrid />
    </>
  );
}
