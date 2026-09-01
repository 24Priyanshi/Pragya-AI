/** Placeholder video slot — real footage TBD, mirrors the Space's own "video coming soon" fallback. */
function ContrastSlot({ label }: { label: string }) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center gap-1 border border-on-primary/20 bg-on-primary/10 px-3 text-center">
      <b className="inter text-xs font-semibold text-on-primary">{label}</b>
      <span className="inter text-[11px] text-on-primary/70">video coming soon</span>
    </div>
  );
}

/** Four placeholder slots inside a purple box, on request (2026-09-01) — was 8 boxes (4 west/dense pairs) in a plain grid. */
export function ContrastGrid({ labels }: { labels: readonly string[] }) {
  return (
    <div className="bg-primary rounded-2xl shadow-lg p-6 md:p-8">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {labels.map((label) => (
          <ContrastSlot key={label} label={label} />
        ))}
      </div>
    </div>
  );
}
