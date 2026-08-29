import { GALLERY_VIDEO_BASE } from "@/data/pragyadexGallery";
import type { GalleryExample } from "@/types/gallery";

import { PragyaDexVideo } from "./PragyaDexVideo";

export function GalleryCard({
  domainLabel,
  example,
  onSelect,
}: {
  domainLabel: string;
  example: GalleryExample;
  onSelect: () => void;
}) {
  return (
    <button className="pd-video-card" onClick={onSelect} type="button">
      <div className="pd-thumb">
        <PragyaDexVideo src={`${GALLERY_VIDEO_BASE}${example.robotVideo}`} />
      </div>
      <div className="pd-video-info">
        <div className="pd-video-title">{example.title.length > 40 ? `${example.title.slice(0, 40)}…` : example.title}</div>
        <div className="pd-video-sub">{domainLabel}</div>
      </div>
    </button>
  );
}
