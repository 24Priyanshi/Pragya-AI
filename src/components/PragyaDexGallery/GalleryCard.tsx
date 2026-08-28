import { GALLERY_VIDEO_BASE } from "@/data/pragyadexGallery";
import type { GalleryExample } from "@/types/gallery";

import { GalleryVideo } from "./GalleryVideo";

const DIFFICULTY_CLASS: Record<string, string> = {
  Low: "border-outline-variant/30 text-on-surface-variant",
  Medium: "border-primary/30 text-primary",
  High: "border-primary/60 text-primary",
  "Very High": "border-primary text-on-primary bg-primary",
};

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-container-low p-3">
      <span className="inter block text-[10px] uppercase tracking-widest text-outline mb-1">{label}</span>
      <span className="inter text-xs text-on-surface-variant leading-relaxed">{value}</span>
    </div>
  );
}

export function GalleryCard({ example }: { example: GalleryExample }) {
  const primitiveTags = example.tags.filter((tag) => tag !== example.difficulty);

  return (
    <article className="bg-surface-container-lowest border border-outline-variant/10 p-5 md:p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="plus-jakarta-sans text-lg font-medium text-on-surface leading-snug">{example.title}</h3>
          <p className="inter text-xs text-on-surface-variant mt-1 leading-relaxed">{example.desc}</p>
        </div>
        <span className="inter shrink-0 text-[10px] text-outline tracking-widest">{example.index}</span>
      </div>

      <div className="mb-4">
        <GalleryVideo label="Robot" src={`${GALLERY_VIDEO_BASE}${example.robotVideo}`} />
      </div>

      <p className="inter text-xs text-on-surface-variant leading-relaxed mb-4">
        <span className="font-medium text-on-surface">Robot transfer goal — </span>
        {example.transferGoal}
      </p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <InfoBlock label="Primitive sequence" value={example.primitiveSequence} />
        <InfoBlock label="Objects / materials" value={example.objects} />
        <InfoBlock label="Dexterity signals" value={example.dexteritySignals} />
        <InfoBlock label="Difficulty" value={example.difficulty} />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {primitiveTags.map((tag) => (
          <span className="inter text-[10px] uppercase tracking-wide border border-outline-variant/20 text-on-surface-variant px-2 py-1" key={tag}>
            {tag}
          </span>
        ))}
        <span
          className={`inter text-[10px] uppercase tracking-wide border px-2 py-1 ${DIFFICULTY_CLASS[example.difficulty] ?? "border-outline-variant/30 text-on-surface-variant"}`}
        >
          {example.difficulty}
        </span>
      </div>
    </article>
  );
}
