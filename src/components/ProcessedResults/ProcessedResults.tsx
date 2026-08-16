import { Fragment } from "react";

import { SectionRule } from "@/components/SectionRule/SectionRule";
import type { ProcessedCard } from "@/types/page";

/**
 * "02. PROCESSED RESULTS" — three terminal-style cards.
 *
 * `font-mono` resolves to Tailwind's default mono stack, not the JetBrains
 * Mono named in --font-mono, because that font is never loaded (BUG-17).
 */
export function ProcessedResults({ cards }: { cards: readonly ProcessedCard[] }) {
  return (
    <div>
      <SectionRule label="02. PROCESSED RESULTS" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {cards.map((card) => (
          <div className="bg-surface-container-lowest p-8 border border-outline-variant/10" key={card.task}>
            <div className="aspect-video bg-on-surface mb-6 p-4 font-mono text-[10px] text-primary-fixed overflow-hidden leading-tight">
              {card.lines.map((line, i) => (
                <Fragment key={line}>
                  {line}
                  {i < card.lines.length - 1 ? <br /> : null}
                </Fragment>
              ))}
            </div>
            <h4 className="inter text-sm font-semibold mb-2 text-primary">{card.task}</h4>
            <p className="inter text-xs text-on-surface-variant leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
