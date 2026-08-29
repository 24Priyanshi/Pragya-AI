import Link from "next/link";

import { programmes } from "@/data/pragyaProgrammes";

import { ProgrammeIcon } from "./icons";
import { programmeRoute } from "./routes";

export function TopNav() {
  return (
    <nav aria-label="Pragya programmes" className="top-nav">
      <Link aria-label="Pragya home" className="nav-mark" href="/">
        <span aria-hidden="true" className="brand-logo" />
      </Link>
      <div className="nav-programmes">
        {programmes.map((p) => (
          <Link aria-label={`Open ${p.name}`} href={programmeRoute(p.id)} key={p.id}>
            <span className="nav-emblem">
              <ProgrammeIcon id={p.id} />
            </span>
            <span>{p.navName}</span>
          </Link>
        ))}
      </div>
      <a className="bits-button" href="https://www.bits-pilani.ac.in/goa/" rel="noreferrer" target="_blank">
        Pragya@BITS
      </a>
    </nav>
  );
}
