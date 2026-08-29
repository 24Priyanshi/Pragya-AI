import { CapabilityOrbit } from "@/components/CapabilityOrbit";
import { LandingHero } from "@/components/LandingHero";

/**
 * The landing page — pages/landing.html.
 *
 * The original's index.html was a pure redirect to this page, so "/" is it.
 * Footer is supplied by the root layout (landing variant).
 *
 * The protocol-row list and evidence grid that used to fill the rest of the
 * page were replaced on request (2026-08-28) with CapabilityOrbit — see that
 * component for the source of the new content.
 */
export default function LandingPage() {
  return (
    <>
      <LandingHero />
      <CapabilityOrbit />
    </>
  );
}
