interface ContrastItem {
  readonly label: string;
  readonly src: string;
}

/** One clip tile — 4 real 10s clips (2026-09-01), was a "video coming soon" placeholder. */
function ContrastSlot({ label, src }: ContrastItem) {
  return (
    <div className="aspect-video overflow-hidden border border-on-primary/20 bg-on-primary/10">
      <video autoPlay className="h-full w-full object-cover" loop muted playsInline preload="auto" src={src} title={label} />
    </div>
  );
}

/** 2x2 grid inside a purple box (2026-09-01: fixed 2 columns instead of 2/4 responsive, so 4 boxes always read as 2 rows x 2 columns, and each box is larger as a result). */
export function ContrastGrid({ items }: { items: readonly ContrastItem[] }) {
  return (
    <div className="bg-primary rounded-2xl shadow-lg p-6 md:p-8">
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <ContrastSlot key={item.label} label={item.label} src={item.src} />
        ))}
      </div>
    </div>
  );
}
