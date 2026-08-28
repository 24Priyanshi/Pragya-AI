"use client";

import { useState } from "react";

import { GalleryVideo } from "@/components/PragyaDexGallery/GalleryVideo";
import { MOTIONLANG_VIDEO_BASE, motionLangCats, motionLangDataset, motionLangLangs } from "@/data/motionlang";

const PAGE_SIZE = 10;

export function MotionLangGallery() {
  const [lang, setLang] = useState(motionLangLangs[0]?.code ?? "en");
  const [catId, setCatId] = useState(motionLangCats[0]?.id ?? "");
  const [page, setPage] = useState(0);

  const activeCat = motionLangCats.find((c) => c.id === catId) ?? motionLangCats[0];
  const records = (activeCat && motionLangDataset[lang]?.[activeCat.id]) ?? [];
  const pageCount = Math.ceil(records.length / PAGE_SIZE);
  const visible = records.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  if (!activeCat) return null;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1" role="tablist">
        {motionLangLangs.map((l) => {
          const active = l.code === lang;
          return (
            <button
              aria-selected={active}
              className={`inter text-xs px-3.5 py-2 transition-colors duration-200 ${
                active
                  ? "bg-on-surface text-inverse-on-surface"
                  : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant/10 hover:border-outline-variant/30"
              }`}
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setPage(0);
              }}
              role="tab"
              type="button"
            >
              {l.name}
            </button>
          );
        })}
      </div>

      <div className="mb-8 flex flex-wrap gap-1" role="tablist">
        {motionLangCats.map((cat) => {
          const active = cat.id === activeCat.id;
          return (
            <button
              aria-selected={active}
              className={`inter text-xs md:text-sm px-4 py-2.5 transition-colors duration-200 ${
                active
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant/10 hover:border-outline-variant/30"
              }`}
              key={cat.id}
              onClick={() => {
                setCatId(cat.id);
                setPage(0);
              }}
              role="tab"
              type="button"
            >
              <span className="mr-1.5">{cat.icon}</span>
              {cat.title} <span className="opacity-60">20</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {visible.map((r, i) => (
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-4" key={`${lang}-${activeCat.id}-${i}`}>
            <GalleryVideo label={activeCat.title.split(" / ")[0] ?? activeCat.title} src={`${MOTIONLANG_VIDEO_BASE}${encodeURIComponent(r.v)}.mp4`} />
            <p className="inter text-xs text-on-surface-variant leading-relaxed mt-3">{r.c}</p>
          </div>
        ))}
      </div>

      {pageCount > 1 ? (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              aria-current={i === page}
              className={`inter text-xs w-8 h-8 transition-colors duration-200 ${
                i === page
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant/10 hover:border-outline-variant/30"
              }`}
              key={i}
              onClick={() => setPage(i)}
              type="button"
            >
              {i + 1}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
