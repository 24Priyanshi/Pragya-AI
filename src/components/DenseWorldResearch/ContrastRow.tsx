/** Placeholder video slot — real footage TBD, mirrors the Space's own "video coming soon" fallback. */
function ContrastSlot({ label }: { label: string }) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center gap-1.5 border border-on-primary/20 bg-on-primary/10 px-3 text-center">
      <b className="inter text-sm font-semibold text-on-primary">{label}</b>
      <span className="inter text-xs text-on-primary/70">video coming soon</span>
    </div>
  );
}

/** 2x2 grid of placeholder slots inside a purple box (2026-09-01: fixed 2 columns instead of 2/4 responsive, so 4 boxes always read as 2 rows x 2 columns, and each box is larger as a result). */
export function ContrastGrid({ labels }: { labels: readonly string[] }) {
  return (
    <div className="bg-primary rounded-2xl shadow-lg p-6 md:p-8">
      <div className="grid grid-cols-2 gap-4">
        {labels.map((label) => (
          <ContrastSlot key={label} label={label} />
        ))}
      </div>
    </div>
  );
}
