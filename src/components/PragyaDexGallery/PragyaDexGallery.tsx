"use client";

import { useMemo, useState } from "react";

import type { GalleryDomain } from "@/types/gallery";

import { GalleryCard } from "./GalleryCard";

const PAGE_SIZE = 12;

export function PragyaDexGallery({ domains }: { domains: readonly GalleryDomain[] }) {
  const [activeId, setActiveId] = useState(domains[0]?.id ?? "");
  const [page, setPage] = useState(0);

  const activeDomain = domains.find((d) => d.id === activeId) ?? domains[0];
  const pageCount = activeDomain ? Math.ceil(activeDomain.examples.length / PAGE_SIZE) : 0;
  const visibleExamples = useMemo(
    () => activeDomain?.examples.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE) ?? [],
    [activeDomain, page],
  );

  if (!activeDomain) return null;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-1" role="tablist">
        {domains.map((domain) => {
          const active = domain.id === activeDomain.id;
          return (
            <button
              aria-selected={active}
              className={`inter text-xs md:text-sm px-4 py-2.5 transition-colors duration-200 ${
                active
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant/10 hover:border-outline-variant/30"
              }`}
              key={domain.id}
              onClick={() => {
                setActiveId(domain.id);
                setPage(0);
              }}
              role="tab"
              type="button"
            >
              {domain.label} <span className="opacity-60">{domain.examples.length}</span>
            </button>
          );
        })}
      </div>

      <p className="inter text-sm text-on-surface-variant leading-relaxed max-w-4xl mb-8">{activeDomain.desc}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {visibleExamples.map((example) => (
          <GalleryCard example={example} key={`${activeDomain.id}-${example.index}`} />
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
