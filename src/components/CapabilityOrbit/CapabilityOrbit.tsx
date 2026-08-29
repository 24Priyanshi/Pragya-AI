"use client";

import { useState } from "react";

import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { footerLinks } from "@/config/site";
import { orbitNodes } from "@/data/landing";

/**
 * The seven-project "capability orbit" below the landing hero, on request
 * (2026-08-28), inspired by an external mockup: a full-bleed section over
 * PragyaVLA's own hero art (the two share the same robots/temple/Sanskrit
 * render, so no new asset was needed) with one node per project arranged
 * around an ellipse, each tagged with a one-word capability. Clicking a node
 * opens a side drawer with that project's summary — same drawer pattern as
 * MotionLangGallery — rather than navigating away immediately.
 */
export function CapabilityOrbit() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeNode = openIndex !== null ? orbitNodes[openIndex] : null;

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#150c1a] py-24 md:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-bottom opacity-25"
        src="/pragyavla_hero_v2.png"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#150c1a]/75" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#150c1acc_45%,#150c1a_85%)]" />

      <div className="relative mx-auto aspect-[16/11] w-full max-w-5xl px-8">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[80%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
        />

        <div className="absolute left-1/2 top-1/2 w-[min(70%,20rem)] -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="plus-jakarta-sans text-3xl md:text-5xl font-light tracking-tight text-white">Pragya</p>
          <p className="inter mt-3 text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/80">
            India&apos;s Sovereign Embodied AI
          </p>
          <p className="inter mt-2 text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-primary-fixed-dim">
            Language &middot; World Models &middot; Embodied Action
          </p>
          <p className="inter mt-4 text-[10px] text-white/50">pragyalab.ai</p>
        </div>

        {orbitNodes.map((node, i) => (
          <button
            className="group absolute flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center md:w-32"
            key={node.title}
            onClick={() => setOpenIndex(i)}
            style={{ left: `${node.left}%`, top: `${node.top}%` }}
            type="button"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-[#150c1a]/80 text-white shadow-lg backdrop-blur-sm transition-colors duration-300 group-hover:border-primary-fixed-dim group-hover:text-primary-fixed-dim md:h-14 md:w-14">
              <MaterialIcon className="text-xl md:text-2xl" name={node.icon} />
            </span>
            <span className="inter text-[9px] tracking-widest text-white/60">{node.index}</span>
            <span className="plus-jakarta-sans text-xs font-medium text-white md:text-sm">{node.title}</span>
            <span className="inter text-[9px] uppercase tracking-widest text-white/60">{node.capability}</span>
          </button>
        ))}
      </div>

      <div className="relative mx-auto mt-16 flex max-w-screen-2xl flex-col items-center gap-6 border-t border-white/10 px-8 pt-10 md:flex-row md:justify-between md:px-12">
        <p className="inter text-xs md:text-sm uppercase tracking-widest text-white/80">
          One Sovereign Intelligence. <span className="text-primary-fixed-dim">Multiple Embodied Capabilities.</span>
        </p>
        <div className="flex items-center gap-8">
          {footerLinks.map((link) => (
            <a className="inter text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors" href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div
        aria-hidden={!activeNode}
        className={`fixed inset-0 z-[70] bg-black/50 transition-opacity duration-200 ${activeNode ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpenIndex(null)}
      />
      <aside
        className={`fixed right-0 top-0 z-[71] h-full w-full max-w-md -translate-x-0 overflow-y-auto bg-surface-container-lowest text-on-surface shadow-2xl transition-transform duration-300 ${
          activeNode ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {activeNode ? (
          <div className="p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <span className="inter text-[10px] uppercase tracking-widest text-primary">
                  {activeNode.capability} &middot; {activeNode.index} / {String(orbitNodes.length).padStart(2, "0")}
                </span>
                <h3 className="plus-jakarta-sans text-3xl font-light tracking-tight text-on-surface mt-1">{activeNode.title}</h3>
              </div>
              <button
                aria-label="Close"
                className="shrink-0 rounded-full border border-outline-variant/30 p-2 text-on-surface-variant hover:text-on-surface transition-colors"
                onClick={() => setOpenIndex(null)}
                type="button"
              >
                <MaterialIcon name="arrow_outward" />
              </button>
            </div>

            <div className="aspect-video bg-surface-container-low overflow-hidden mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="w-full h-full object-cover" src={activeNode.previewImage} />
            </div>

            <p className="inter text-sm text-on-surface-variant leading-relaxed mb-8">{activeNode.summary}</p>

            <a
              className="inline-flex items-center gap-2 px-6 py-3 text-[10px] tracking-widest uppercase font-medium bg-on-surface text-inverse-on-surface transition-all duration-200 hover:opacity-80 active:scale-95"
              href={activeNode.href}
            >
              Explore {activeNode.title}
              <MaterialIcon className="text-sm" name="arrow_outward" />
            </a>
          </div>
        ) : null}
      </aside>
    </section>
  );
}
