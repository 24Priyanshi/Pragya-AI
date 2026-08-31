"use client";

import { useEffect, useMemo, useState } from "react";

import { GALLERY_VIDEO_BASE } from "@/data/pragyadexGallery";
import type { GalleryDomain, GalleryExample } from "@/types/gallery";

import { GalleryCard } from "./GalleryCard";
import "./pragyadexGallery.css";

const DOMAIN_ICONS: Readonly<Record<string, string>> = {
  Kitchen: "🍳",
  Street_Food: "🍢",
  Tailoring__Textile: "🧵",
  Repair__Maintenance: "🔧",
  Handicrafts: "🎨",
  Agriculture: "🌾",
  Religious__Cultural: "🪔",
  Small_Manufacturing: "🏭",
};

interface SelectedExample {
  readonly example: GalleryExample;
  readonly domainLabel: string;
}

export function PragyaDexGallery({ domains }: { domains: readonly GalleryDomain[] }) {
  const [selected, setSelected] = useState<SelectedExample | null>(null);

  const totalExamples = useMemo(() => domains.reduce((sum, d) => sum + d.examples.length, 0), [domains]);

  // Escape closes the drawer, matching MotionLangGallery's own behavior.
  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <div className="pd-root">
      <section className="pd-hero">
        <h1>PragyaDex</h1>
        <p className="pd-subtitle">
          Paired human-hand-to-robot-hand dexterity examples across everyday domains — each annotated with a primitive
          sequence, objects, materials, and a robot transfer goal.
        </p>
        <div className="pd-summary">
          <span className="pd-pill blue">{domains.length} domains</span>
          <span className="pd-pill">{totalExamples} paired examples</span>
        </div>
      </section>

      <section className="pd-dashboard">
        <aside className="pd-sidebar">
          <div className="pd-side-title">Domains</div>
          {domains.map((domain) => (
            <a className="pd-side-link" href={`#pd-${domain.id}`} key={domain.id}>
              <span>{domain.label}</span>
              <span className="pd-count">{domain.examples.length}</span>
            </a>
          ))}
        </aside>

        <section className="pd-content">
          {domains.map((domain) => (
            <div className="pd-category" id={`pd-${domain.id}`} key={domain.id}>
              <div className="pd-category-header">
                <div className="pd-category-title">
                  <div className="pd-cat-icon">{DOMAIN_ICONS[domain.id] ?? "🤖"}</div>
                  <div>
                    <h2>{domain.label}</h2>
                    <p className="pd-cat-desc">{domain.desc}</p>
                  </div>
                </div>
                <span className="pd-status">{domain.examples.length} examples</span>
              </div>
              <div className="pd-video-grid">
                {domain.examples.map((example, i) => (
                  <GalleryCard
                    domainLabel={domain.label}
                    example={example}
                    key={`${domain.id}-${i}`}
                    onSelect={() => setSelected({ example, domainLabel: domain.label })}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </section>

      <div className={`pd-overlay ${selected ? "pd-open" : ""}`} onClick={() => setSelected(null)} />
      <aside className={`pd-drawer ${selected ? "pd-open" : ""}`}>
        <div className="pd-drawer-header">
          <div>
            <strong>{selected?.example.title ?? "—"}</strong>
            <div className="pd-drawer-meta">{selected?.domainLabel}</div>
          </div>
          <button className="pd-drawer-close" onClick={() => setSelected(null)} type="button">
            Close
          </button>
        </div>
        <div className="pd-drawer-body">
          <div className="pd-drawer-video">
            {selected ? (
              <video controls key={selected.example.robotVideo} playsInline preload="metadata" src={`${GALLERY_VIDEO_BASE}${selected.example.robotVideo}`} />
            ) : null}
          </div>

          {selected ? (
            <>
              <div className="pd-drawer-goal">
                <b>Text instruction</b>
                {selected.example.desc}
              </div>

              <div className="pd-detail-grid">
                <div className="pd-info">
                  <b>Primitive sequence</b>
                  {selected.example.primitiveSequence}
                </div>
                <div className="pd-info">
                  <b>Objects / materials</b>
                  {selected.example.objects}
                </div>
                <div className="pd-info">
                  <b>Dexterity signals</b>
                  {selected.example.dexteritySignals}
                </div>
                <div className="pd-info">
                  <b>Difficulty</b>
                  {selected.example.difficulty}
                </div>
              </div>

              <div className="pd-tags">
                {selected.example.tags.map((tag) => (
                  <span className={`pd-tag ${tag === selected.example.difficulty ? "pd-diff" : ""}`} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
