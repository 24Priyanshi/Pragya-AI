import { cn } from "@/lib/cn";
import type { StatCard } from "@/types/page";

/**
 * The four-card metric strip that opens every sub-page.
 *
 * The hover state is a group: the card background transitions to `primary`
 * over 500ms while all three text layers switch colour at their own defaults.
 *
 * `compact` shrinks the padding and value size (DenseWorld, on request
 * 2026-08-31) without affecting other pages using the default size.
 */
export function StatStrip({ stats, compact = false }: { stats: readonly StatCard[]; compact?: boolean }) {
  return (
    <section className={compact ? "mb-32" : "mb-48"}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
        {stats.map((stat) => (
          <div
            className={cn(
              "bg-surface-container-lowest border-l-2 border-primary group hover:bg-primary transition-colors duration-500",
              compact ? "p-8" : "p-12",
            )}
            key={stat.label}
          >
            <span className="inter text-sm font-medium uppercase tracking-widest text-outline group-hover:text-primary-fixed mb-4 block">
              {stat.label}
            </span>
            <h3
              className={cn(
                "plus-jakarta-sans font-light tracking-tighter group-hover:text-on-primary",
                compact ? "text-3xl" : "text-5xl",
              )}
            >
              {stat.value}
            </h3>
            {stat.caption ? (
              <p className="inter text-xs text-on-surface-variant mt-2 group-hover:text-on-primary/70">{stat.caption}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
