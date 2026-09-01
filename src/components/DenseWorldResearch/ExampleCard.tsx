import type { ExampleOutput } from "@/data/denseworld-examples";

function Placeholder({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center gap-1 border border-outline-variant/20 bg-surface-container-lowest px-3 text-center">
      <b className="inter text-xs font-semibold text-on-surface">{label}</b>
      <span className="inter text-[11px] text-on-surface-variant">{sub}</span>
    </div>
  );
}

interface ExampleCardProps {
  readonly ordinal: number;
  readonly title: string;
  readonly outputs: readonly ExampleOutput[];
}

export function ExampleCard({ ordinal, title, outputs }: ExampleCardProps) {
  return (
    <div className="border border-outline-variant/10 bg-surface p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-baseline gap-3">
        <span className="inter text-[11px] font-semibold uppercase tracking-widest text-primary">
          Example {String(ordinal).padStart(2, "0")}
        </span>
        <h3 className="plus-jakarta-sans text-xl font-light tracking-tight text-on-surface">{title}</h3>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_2fr]">
        <div className="space-y-2">
          <Placeholder label="the clip" sub="coming soon" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {outputs.map((output) => (
            <div className="space-y-1.5" key={output.key}>
              <Placeholder label={output.label} sub="coming soon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
