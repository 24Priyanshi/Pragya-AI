import { PragyaHome } from "@/components/PragyaHome";

/**
 * The landing page.
 *
 * Replaced on request (2026-08-29) with an exact port of
 * https://pragyalab-ai.dramitavadas.chatgpt.site/ — see PragyaHome. This
 * page now supplies its own complete nav+footer (see SiteShell's `chrome`
 * prop), so the root layout no longer injects the shared ones here.
 */
export default function LandingPage() {
  return <PragyaHome />;
}
