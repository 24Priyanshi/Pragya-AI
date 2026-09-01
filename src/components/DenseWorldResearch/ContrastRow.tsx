interface ContrastColumn {
  readonly heading: string;
  readonly clips: readonly string[];
}

function ContrastSlot({ src }: { src: string }) {
  return (
    <div className="aspect-video overflow-hidden border border-on-primary/20 bg-on-primary/10">
      <video autoPlay className="h-full w-full object-cover" loop muted playsInline preload="auto" src={src} />
    </div>
  );
}

/**
 * Two labeled columns inside a purple box (2026-09-01) — was a flat 2x2 grid
 * of generically-labeled clips. Square corners (no rounding), on request.
 */
export function ContrastGrid({ columns }: { columns: readonly ContrastColumn[] }) {
  return (
    <div className="bg-primary shadow-lg p-6 md:p-8">
      <div className="grid grid-cols-2 gap-6">
        {columns.map((column) => (
          <div key={column.heading}>
            <h4 className="inter mb-3 text-sm font-semibold text-on-primary">{column.heading}</h4>
            <div className="space-y-3">
              {column.clips.map((src) => (
                <ContrastSlot key={src} src={src} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
