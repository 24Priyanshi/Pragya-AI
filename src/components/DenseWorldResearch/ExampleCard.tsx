import { LazyVideo } from "@/components/LazyVideo";
import { exampleOutputSrc, originalClipSrc, type ExampleOutput } from "@/data/denseworld-examples";

function VideoTile({ label, src }: { label: string; src: string }) {
  return (
    <div className="space-y-1.5">
      <div className="aspect-video overflow-hidden border border-outline-variant/20 bg-surface-container-lowest">
        <LazyVideo src={src} />
      </div>
      <p className="inter text-center text-[11px] font-medium text-on-surface-variant">{label}</p>
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
        <VideoTile label="the clip" src={originalClipSrc(ordinal)} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {outputs.map((output) => (
            <VideoTile key={output.key} label={output.label} src={exampleOutputSrc(output, ordinal)} />
          ))}
        </div>
      </div>
    </div>
  );
}
