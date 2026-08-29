"use client";

import Link from "next/link";
import { useEffect } from "react";

import { ProgrammeIcon } from "@/components/TopNav/icons";
import { programmeRoute } from "@/components/TopNav/routes";
import type { Programme } from "@/data/pragyaProgrammes";

interface ProgrammeSheetProps {
  programmes: readonly Programme[];
  openId: string | null;
  onClose: () => void;
  onSwitch: (id: string) => void;
}

/**
 * The right-side detail panel opened by clicking a programme node — banner
 * image, "THE INDIA PROBLEM" challenge copy, a 3-capability grid, a proof
 * stat, and a numbered rail (left edge) plus prev/next actions to cycle
 * through all 7 programmes without closing the panel. Custom overlay+panel
 * implementation (no Radix dependency), same pattern as the click-to-open
 * drawers already used in MotionLangGallery/PragyaDexGallery.
 */
export function ProgrammeSheet({ programmes, openId, onClose, onSwitch }: ProgrammeSheetProps) {
  const index = programmes.findIndex((p) => p.id === openId);
  const active = index === -1 ? null : programmes[index];
  const prev = active ? programmes[(index - 1 + programmes.length) % programmes.length] : null;
  const next = active ? programmes[(index + 1) % programmes.length] : null;

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, onClose]);

  return (
    <>
      <div className={`sheet-overlay${active ? " open" : ""}`} onClick={onClose} />
      <aside aria-describedby={active ? `${active.id}-description` : undefined} className={`programme-sheet${active ? " open" : ""}`}>
        <button aria-label="Close" className="sheet-close" onClick={onClose} type="button">
          ×
        </button>

        {active ? (
          <>
            <div aria-label="Switch programme" className="panel-rail">
              {programmes.map((p, i) => (
                <button
                  aria-label={`Show ${p.name}`}
                  className={active.id === p.id ? "active" : ""}
                  key={p.id}
                  onClick={() => onSwitch(p.id)}
                  title={p.name}
                  type="button"
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            <div className="sheet-scroll">
              <div className="programme-header">
                <div className="programme-kicker">
                  <span>{active.group}</span>
                  <span>{String(index + 1).padStart(2, "0")} / 07</span>
                </div>
                <div className="panel-title-row">
                  <span className="panel-emblem">
                    <ProgrammeIcon id={active.id} />
                  </span>
                  <h2 className="programme-title">{active.name}</h2>
                </div>
                <p className="programme-description" id={`${active.id}-description`}>
                  {active.statement}
                </p>
              </div>

              <div className={`programme-banner ${active.imageClass ?? ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={`${active.name} programme banner`} src={active.image} />
              </div>

              <section className="panel-section">
                <div className="section-heading">
                  <span />
                  THE INDIA PROBLEM
                  <span />
                </div>
                <p className="challenge-copy">{active.challenge}</p>
              </section>

              <section aria-label={`${active.name} capabilities`} className="capability-grid">
                {active.capabilities.map((c, i) => (
                  <article key={c.title}>
                    <span>0{i + 1}</span>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </article>
                ))}
              </section>

              <div className="proof-strip">
                <span aria-hidden="true">✦</span>
                {active.proof}
              </div>

              <Link className="programme-cta" href={programmeRoute(active.id)}>
                Explore {active.name} <span>→</span>
              </Link>

              <div className="panel-actions">
                <button onClick={() => prev && onSwitch(prev.id)} type="button">
                  <b>{String(index === 0 ? programmes.length : index).padStart(2, "0")}</b> {prev?.name}
                  <span>←</span>
                </button>
                <i />
                <button onClick={() => next && onSwitch(next.id)} type="button">
                  <b>{String(index + 2 > programmes.length ? 1 : index + 2).padStart(2, "0")}</b> {next?.name}
                  <span>→</span>
                </button>
              </div>
            </div>
          </>
        ) : null}
      </aside>
    </>
  );
}
