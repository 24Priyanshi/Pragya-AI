interface ContrastPair {
  readonly west: string;
  readonly dense: string;
}

/** West/dense placeholder pair — real footage TBD, mirrors the Space's own "video coming soon" fallback. */
function ContrastSlot({ label }: { label: string }) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center gap-1 border border-outline-variant/20 bg-surface-container-lowest px-3 text-center">
      <b className="inter text-xs font-semibold capitalize text-on-surface">{label}</b>
      <span className="inter text-[11px] text-on-surface-variant">video coming soon</span>
    </div>
  );
}

export function ContrastGrid({ pairs }: { pairs: readonly ContrastPair[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {pairs.map((pair) => (
        <div className="space-y-3" key={pair.west}>
          <ContrastSlot label={pair.west} />
          <ContrastSlot label={pair.dense} />
        </div>
      ))}
    </div>
  );
}
