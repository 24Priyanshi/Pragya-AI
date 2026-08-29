"use client";

import { useState } from "react";

import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { footerLinks } from "@/config/site";
import { orbitNodes } from "@/data/landing";

/**
 * The seven-project "capability orbit" below the landing hero. The
 * background (2026-08-29) is the reference mockup's own hero art, fetched
 * from its public host — a clean render with no text or nodes baked in, so
 * `orbitNodes`' overlaid badges are the only DOM layer on top of it, same as
 * the reference's own page. Clicking a node opens a side drawer with that
 * project's summary — same drawer pattern as MotionLangGallery — rather than
 * navigating away immediately.
 */
export function CapabilityOrbit() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeNode = openIndex !== null ? orbitNodes[openIndex] : null;

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#150c1a]">
      <div className="relative mx-auto aspect-[16/9] w-full max-w-6xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="Pragya — India's sovereign embodied AI" className="absolute inset-0 h-full w-full object-cover" src="/orbit_hero.jpg" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#150c1a] via-transparent to-transparent" />

        <div
          aria-hidden="true"
          className="absolute rounded-[9999px] border border-white/15"
          style={{ left: "6%", top: "12%", right: "6%", bottom: "3%" }}
        />

        {orbitNodes.map((node, i) => (
          <button
            className="group absolute flex w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center md:w-28"
            key={node.title}
            onClick={() => setOpenIndex(i)}
            style={{ left: `${node.left}%`, top: `${node.top}%` }}
            type="button"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-[#150c1a]/85 text-white shadow-lg backdrop-blur-sm transition-colors duration-300 group-hover:border-primary-fixed-dim group-hover:text-primary-fixed-dim md:h-12 md:w-12">
              <MaterialIcon className="text-lg md:text-xl" name={node.icon} />
            </span>
            <span className="inter text-[8px] tracking-widest text-white/70">{node.index}</span>
            <span className="plus-jakarta-sans text-[11px] font-medium text-white md:text-xs">{node.title}</span>
            <span className="inter text-[8px] uppercase tracking-widest text-white/70">{node.capability}</span>
          </button>
        ))}
      </div>

      <div className="relative mx-auto flex max-w-screen-2xl flex-col items-center gap-6 border-t border-white/10 px-8 py-10 md:flex-row md:justify-between md:px-12">
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
