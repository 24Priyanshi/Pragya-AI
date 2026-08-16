import { SectionRule } from "@/components/SectionRule/SectionRule";
import { contributors } from "@/data/contributors";

/** The Contributors grid — identical markup on all six sub-pages. */
export function Contributors() {
  return (
    <section className="mt-48">
      <SectionRule label="Contributors" size="lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
        {contributors.map((person) => (
          <article
            className="bg-surface-container-lowest border border-outline-variant/10 p-6 transition-transform duration-300 ease-out hover:scale-[1.02]"
            key={person.name}
          >
            <div className="aspect-square bg-surface-container-low overflow-hidden mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={person.alt} className="w-full h-full object-cover object-top" src={person.image} />
            </div>
            <h3 className="plus-jakarta-sans text-2xl font-light tracking-tight text-on-surface">{person.name}</h3>
            <p className="inter text-sm text-on-surface-variant mt-2 leading-relaxed">{person.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
