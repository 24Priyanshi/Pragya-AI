import { programmes } from "@/data/pragyaProgrammes";

import { ProgrammeIcon } from "./icons";

/**
 * href per programme, copied verbatim from the reference markup: every
 * programme links to its own "#id" anchor except PragyaSpace, which links to
 * the real "/pragyaspace" route — kept as-is, not "fixed", per the exact-port
 * request (2026-08-29).
 */
function navHref(id: string): string {
  return id === "pragyaspace" ? "/pragyaspace" : `#${id}`;
}

export function TopNav() {
  return (
    <nav aria-label="Pragya programmes" className="top-nav">
      <a aria-label="Open Pragya home in a new tab" className="nav-mark" href="/" rel="noreferrer" target="_blank">
        <span aria-hidden="true" className="brand-logo" />
      </a>
      <div className="nav-programmes">
        {programmes.map((p) => (
          <a aria-label={`Open ${p.name} in a new tab`} href={navHref(p.id)} key={p.id} rel="noreferrer" target="_blank">
            <span className="nav-emblem">
              <ProgrammeIcon id={p.id} />
            </span>
            <span>{p.navName}</span>
          </a>
        ))}
      </div>
      <a className="bits-button" href="https://www.bits-pilani.ac.in/goa/" rel="noreferrer" target="_blank">
        Pragya@BITS
      </a>
    </nav>
  );
}
