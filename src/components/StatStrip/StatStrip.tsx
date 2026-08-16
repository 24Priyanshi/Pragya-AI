import type { StatCard } from "@/types/page";

/**
 * The four-card metric strip that opens every sub-page.
 *
 * The hover state is a group: the card background transitions to `primary`
 * over 500ms while all three text layers switch colour at their own defaults.
 */
export function StatStrip({ stats }: { stats: readonly StatCard[] }) {
  return (
    <section className="mb-48">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
        {stats.map((stat) => (
          <div
            className="bg-surface-container-lowest p-12 border-l-2 border-primary group hover:bg-primary transition-colors duration-500"
            key={stat.label}
          >
            <span className="inter text-sm font-medium uppercase tracking-widest text-outline group-hover:text-primary-fixed mb-4 block">
              {stat.label}
            </span>
            <h3 className="plus-jakarta-sans text-5xl font-light tracking-tighter group-hover:text-on-primary">{stat.value}</h3>
            <p className="inter text-xs text-on-surface-variant mt-2 group-hover:text-on-primary/70">{stat.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
