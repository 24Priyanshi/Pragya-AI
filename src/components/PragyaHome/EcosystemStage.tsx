import { ProgrammeIcon } from "@/components/TopNav/icons";
import type { Programme } from "@/data/pragyaProgrammes";

interface EcosystemStageProps {
  programmes: readonly Programme[];
  hoveredId: string | null;
  openId: string | null;
  onHover: (id: string | null) => void;
  onOpen: (id: string) => void;
}

/**
 * The hero constellation: a background image, a decorative connecting path,
 * and the 7 programme nodes. Path `d` and viewBox copied verbatim from the
 * reference markup.
 */
export function EcosystemStage({ programmes, hoveredId, openId, onHover, onOpen }: EcosystemStageProps) {
  const activeProgramme = programmes.find((p) => p.id === (hoveredId ?? openId)) ?? null;

  return (
    <section aria-labelledby="hero-title" className="ecosystem-stage">
      <div aria-hidden="true" className="hero-image" />
      <div aria-hidden="true" className="hero-shade" />
      <h1 className="sr-only" id="hero-title">
        Pragya — India&rsquo;s Sovereign Embodied AI
      </h1>
      <svg aria-hidden="true" className="constellation-path" preserveAspectRatio="none" viewBox="0 0 1600 820">
        <path d="M180 160 C80 320 90 610 355 700 C620 790 990 790 1260 690 C1510 595 1535 300 1400 160" />
        <path className="safety-anchor" d="M800 785 L800 720" />
      </svg>
      <div aria-label="Pragya intelligence constellation" className="programme-nodes" id="programmes">
        {programmes.map((p, i) => {
          const isActive = hoveredId === p.id || openId === p.id;
          return (
            <button
              aria-label={`${String(i + 1).padStart(2, "0")} ${p.name}: ${p.statement}`}
              className={`programme-node ${p.nodeClass}${isActive ? " is-active" : ""}`}
              key={p.id}
              onBlur={() => onHover(null)}
              onClick={() => onOpen(p.id)}
              onFocus={() => onHover(p.id)}
              onMouseEnter={() => onHover(p.id)}
              onMouseLeave={() => onHover(null)}
              type="button"
            >
              <span className="node-emblem">
                <ProgrammeIcon id={p.id} />
              </span>
              <span className="node-number">{String(i + 1).padStart(2, "0")}</span>
              <strong>{p.name}</strong>
              <small>{p.functionWord}</small>
            </button>
          );
        })}
      </div>
      <div aria-live="polite" className={`hover-statement${activeProgramme ? " visible" : ""}`}>
        <span>{activeProgramme?.group}</span>
        <p>{activeProgramme?.statement}</p>
      </div>
      <p className="explore-prompt">
        <span /> Explore Pragya
      </p>
    </section>
  );
}
