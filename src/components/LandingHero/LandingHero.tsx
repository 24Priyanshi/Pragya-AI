import { heroParagraph } from "@/data/landing";

/**
 * Landing hero — port of the first <section> in pages/landing.html.
 *
 * `reveal opacity-0` is in the class list on purpose. Those two classes are in
 * the original markup, and `.reveal`'s `forwards` animation beats `opacity-0`,
 * so the section fades up on load rather than on scroll (BUG-2). Keeping both
 * reproduces that exactly.
 *
 * The background image is a plain <img>, not next/image: it sits in an
 * absolutely-positioned full-bleed layer with `mix-blend-multiply` at
 * `opacity-40`, where next/image's wrapper and intrinsic sizing would change
 * the composite.
 */
export function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-surface-container-lowest reveal opacity-0">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e0db_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
        <div className="absolute inset-0 w-full h-full opacity-40">
          <div className="w-full h-full bg-surface-container-low relative overflow-hidden border-l border-surface-container-high">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Spatial Intelligence Visualization"
              className="w-full h-full object-cover mix-blend-multiply transition-all duration-1000"
              src="/hero.png"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-transparent to-transparent opacity-20" />
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full px-8 md:px-12 max-w-screen-2xl mx-auto">
        <div className="max-w-4xl space-y-10">
          <h1 className="text-[4rem] md:text-[6.5rem] font-extralight font-headline leading-[0.95] tracking-tighter text-on-surface">
            India&apos;s Sovereign
            <br />
            <b>Embodied AI</b>
          </h1>
          <p className="text-lg md:text-xl font-light text-on-surface-variant max-w-3xl leading-relaxed">
            {heroParagraph.map((segment, i) =>
              segment.className ? (
                <span className={segment.className} key={i}>
                  {segment.text}
                </span>
              ) : (
                <span key={i}>{segment.text}</span>
              ),
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
