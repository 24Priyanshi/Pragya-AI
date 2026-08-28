"use client";

import { useEffect, useState } from "react";

import { MOTIONLANG_VIDEO_BASE, motionLangCats, motionLangDataset, motionLangLangs } from "@/data/motionlang";

import { MotionLangVideo } from "./MotionLangVideo";
import "./motionlang.css";

interface SelectedClip {
  readonly src: string;
  readonly caption: string;
  readonly categoryTitle: string;
  readonly langName: string;
}

export function MotionLangGallery() {
  const [lang, setLang] = useState(motionLangLangs[0]?.code ?? "en");
  const [selected, setSelected] = useState<SelectedClip | null>(null);
  const activeLang = motionLangLangs.find((l) => l.code === lang) ?? motionLangLangs[0];

  // Escape closes the drawer, matching the source MotionLang browser's own behavior.
  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <div className="ml-root">
      <section className="ml-hero">
        <div>
          <h1>Language-Centric Motion Annotation</h1>
          <p className="ml-subtitle">
            Each language page holds its own unique balanced set — 200 distinct motions (10 categories × 20), 1000 unique
            instruction–motion pairs in total. Switch language to see an entirely different set, captioned in that language.
          </p>
          <div className="ml-summary">
            <span className="ml-pill blue">{activeLang?.name} Page</span>
            <span className="ml-pill">10 categories</span>
            <span className="ml-pill">20 videos / category</span>
            <span className="ml-pill">1000 unique instruction–motion pairs</span>
            <span className="ml-pill">5 languages</span>
          </div>
        </div>
        <div className="ml-lang-tabs">
          {motionLangLangs.map((l) => (
            <button
              className={`ml-lang-tab ${l.code === lang ? "active" : ""}`}
              key={l.code}
              onClick={() => setLang(l.code)}
              type="button"
            >
              {l.name}
            </button>
          ))}
        </div>
      </section>

      <section className="ml-dashboard">
        <aside className="ml-sidebar">
          <div className="ml-side-title">Categories</div>
          {motionLangCats.map((cat) => (
            <a className="ml-side-link" href={`#ml-${cat.id}`} key={cat.id}>
              <span>{cat.title.split(" / ")[0]}</span>
              <span className="ml-count">20</span>
            </a>
          ))}
          <div className="ml-progress-card">
            <div className="ml-progress-row">
              <span>{activeLang?.name} set</span>
              <span>200 / 200</span>
            </div>
            <div className="ml-bar">
              <span />
            </div>
            <div style={{ marginTop: 8, color: "var(--ml-muted)", fontSize: 12, fontWeight: 800 }}>
              Unique motions, fully captioned
            </div>
          </div>
        </aside>

        <section className="ml-content">
          {motionLangCats.map((cat) => {
            const records = motionLangDataset[lang]?.[cat.id] ?? [];
            return (
              <div className="ml-category" id={`ml-${cat.id}`} key={cat.id}>
                <div className="ml-category-header">
                  <div className="ml-category-title">
                    <div className="ml-cat-icon">{cat.icon}</div>
                    <div>
                      <h2>{cat.title}</h2>
                      <div className="ml-cat-meta">
                        20 unique motions · captioned in {activeLang?.name}
                      </div>
                    </div>
                  </div>
                  <span className="ml-status">20 clips</span>
                </div>
                <div className="ml-video-grid">
                  {records.map((r, i) => {
                    const src = `${MOTIONLANG_VIDEO_BASE}${encodeURIComponent(r.v)}.mp4`;
                    return (
                      <button
                        className="ml-video-card"
                        key={`${lang}-${cat.id}-${i}`}
                        onClick={() =>
                          setSelected({ src, caption: r.c, categoryTitle: cat.title, langName: activeLang?.name ?? "" })
                        }
                        type="button"
                      >
                        <div className="ml-thumb">
                          <MotionLangVideo src={src} />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img alt="" className="ml-watermark" src="/motionlang_watermark.png" />
                        </div>
                        <div className="ml-video-info">
                          <div className="ml-video-title">{r.c.length > 44 ? `${r.c.slice(0, 44)}…` : r.c}</div>
                          <div className="ml-video-sub">{cat.title}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </section>

      <div className={`ml-overlay ${selected ? "ml-open" : ""}`} onClick={() => setSelected(null)} />
      <aside className={`ml-drawer ${selected ? "ml-open" : ""}`}>
        <div className="ml-drawer-header">
          <div>
            <strong>{selected ? (selected.caption.length > 50 ? `${selected.caption.slice(0, 50)}…` : selected.caption) : "—"}</strong>
            <div className="ml-drawer-meta">{selected?.categoryTitle}</div>
          </div>
          <button className="ml-drawer-close" onClick={() => setSelected(null)} type="button">
            Close
          </button>
        </div>
        <div className="ml-drawer-body">
          <div className="ml-drawer-video">
            {selected ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video controls key={selected.src} playsInline preload="metadata" src={selected.src} />
            ) : null}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="ml-watermark" src="/motionlang_watermark.png" />
          </div>
          <p className="ml-drawer-caption-label">{selected?.langName} Caption</p>
          <div className="ml-drawer-caption">{selected?.caption}</div>
        </div>
      </aside>
    </div>
  );
}
