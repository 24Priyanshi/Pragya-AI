import Link from "next/link";

import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { footerLinks } from "@/config/site";
import { orbitNodes } from "@/data/landing";

/**
 * The seven-project "capability orbit" below the landing hero, on request
 * (2026-08-28), inspired by an external mockup: a dark full-bleed section
 * with one node per project arranged around an ellipse, each tagged with a
 * one-word capability, plus a closing tagline row. Node positions come from
 * `orbitNodes` (percentages of this section), computed for an even
 * seven-point ellipse rather than reproducing the mockup's bespoke artwork.
 */
export function CapabilityOrbit() {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#150c1a] py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#ffffff14_1px,transparent_1px)] [background-size:32px_32px] opacity-40"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#481b4c66,transparent_65%)]" />

      <div className="relative mx-auto aspect-[16/11] w-full max-w-5xl px-8">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[80%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        />

        <div className="absolute left-1/2 top-1/2 w-[min(70%,20rem)] -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="plus-jakarta-sans text-3xl md:text-5xl font-light tracking-tight text-white">Pragya</p>
          <p className="inter mt-3 text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70">
            India&apos;s Sovereign Embodied AI
          </p>
          <p className="inter mt-2 text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-primary-fixed-dim">
            Language &middot; World Models &middot; Embodied Action
          </p>
          <p className="inter mt-4 text-[10px] text-white/40">pragyalab.ai</p>
        </div>

        {orbitNodes.map((node) => (
          <Link
            className="group absolute flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center md:w-32"
            href={node.href}
            key={node.title}
            style={{ left: `${node.left}%`, top: `${node.top}%` }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-[#150c1a] text-white transition-colors duration-300 group-hover:border-primary-fixed-dim group-hover:text-primary-fixed-dim md:h-14 md:w-14">
              <MaterialIcon className="text-xl md:text-2xl" name={node.icon} />
            </span>
            <span className="inter text-[9px] tracking-widest text-white/40">{node.index}</span>
            <span className="plus-jakarta-sans text-xs font-medium text-white md:text-sm">{node.title}</span>
            <span className="inter text-[9px] uppercase tracking-widest text-white/50">{node.capability}</span>
          </Link>
        ))}
      </div>

      <div className="relative mx-auto mt-16 flex max-w-screen-2xl flex-col items-center gap-6 border-t border-white/10 px-8 pt-10 md:flex-row md:justify-between md:px-12">
        <p className="inter text-xs md:text-sm uppercase tracking-widest text-white/70">
          One Sovereign Intelligence. <span className="text-primary-fixed-dim">Multiple Embodied Capabilities.</span>
        </p>
        <div className="flex items-center gap-8">
          {footerLinks.map((link) => (
            <a className="inter text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors" href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
