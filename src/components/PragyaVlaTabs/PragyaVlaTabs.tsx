import { MotionLangGallery } from "@/components/MotionLangGallery";
import { SectionRule } from "@/components/SectionRule";

interface PragyaVlaTabsProps {
  problemQuote: string;
}

/**
 * Simplified on request (2026-08-28): no more tab-switching between sections
 * — "The Problem" (just the pull-quote, centered) and "Dataset" (the full
 * MotionLang gallery) are both always visible, one after another. The Q&A
 * blocks and the Contributors tab that used to live here were removed;
 * Contributors moved to its own page, linked from the main nav.
 */
export function PragyaVlaTabs({ problemQuote }: PragyaVlaTabsProps) {
  return (
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
        <MotionLangGallery />
      </section>
    </div>
  );
}
