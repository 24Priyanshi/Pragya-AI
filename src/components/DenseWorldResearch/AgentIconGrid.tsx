import type { AgentIcon } from "@/data/denseworld-dataset";

function AgentCard({ icon }: { icon: AgentIcon }) {
  return (
    <figure className="flex flex-col items-center gap-2">
      <div className="flex aspect-square w-full items-center justify-center overflow-hidden border border-outline-variant/20 bg-surface-container-lowest p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={icon.caption} className="max-h-full max-w-full object-contain" loading="lazy" src={icon.src} />
      </div>
      <figcaption className="inter text-xs font-medium text-on-surface-variant">{icon.caption}</figcaption>
    </figure>
  );
}

export function AgentIconGrid({ icons }: { icons: readonly AgentIcon[] }) {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
      {icons.map((icon, i) => (
        <AgentCard icon={icon} key={`${icon.src}-${i}`} />
      ))}
    </div>
  );
}
