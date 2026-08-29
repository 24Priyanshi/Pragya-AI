/**
 * The 7 programme glyphs, copied verbatim (path data included) from the
 * reference site's markup — reused at three sizes: nav emblem (27px), node
 * emblem (70px), and detail-sheet panel emblem (38px). The `emblem-gold`
 * class marks the one accent stroke/path in each glyph.
 */
export function ProgrammeIcon({ id }: { id: string }) {
  switch (id) {
    case "denseworld":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48">
          <circle cx="24" cy="24" fill="none" r="13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.55" />
          <path
            d="M14 29h20M17 29V20h5v9m3 0V16h6v13M12 20c7-7 17-8 25-2"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.55"
          />
          <path
            className="emblem-gold"
            d="M15 34c7 4 16 3 22-3"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.55"
          />
        </svg>
      );
    case "densewalk":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48">
          <path
            d="M25 10l-3 9 5 6-7 12m4-18 7 2 4 6m-13-8-7 5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.55"
          />
          <circle cx="26" cy="8" fill="none" r="3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.55" />
          <path
            className="emblem-gold"
            d="M10 38c8-2 15-1 27-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.55"
          />
        </svg>
      );
    case "pragyavla":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48">
          <path
            d="M10 13h18v13H17l-5 5v-5h-2zM25 23h13v10h-4v5l-5-5h-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.55"
          />
          <path d="M16 18h7m-3-3v7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.55" />
          <path
            className="emblem-gold"
            d="M31 27l4 2-4 2"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.55"
          />
        </svg>
      );
    case "pragyadex":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48">
          <path
            d="M16 37V23c0-2 3-2 3 0v5-11c0-2 3-2 3 0v10-13c0-2 3-2 3 0v13-10c0-2 3-2 3 0v12-7c0-2 3-2 3 0v10c0 7-4 10-9 10"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.55"
          />
          <circle className="emblem-gold" cx="19.5" cy="17" r="1.5" />
          <circle className="emblem-gold" cx="24.5" cy="11" r="1.5" />
          <circle className="emblem-gold" cx="29.5" cy="15" r="1.5" />
        </svg>
      );
    case "kalarisena":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48">
          <circle cx="24" cy="10" fill="none" r="3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.55" />
          <path
            d="M24 13v12m0-7-10 5m10-5 11 4m-11 3-8 12m8-12 10 11"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.55"
          />
          <path
            className="emblem-gold"
            d="M11 39c9 3 19 3 27-1M9 18l5 5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.55"
          />
        </svg>
      );
    case "pragyaspace":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48">
          <circle cx="24" cy="24" fill="none" r="6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.55" />
          <ellipse
            cx="24"
            cy="24"
            fill="none"
            rx="17"
            ry="8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.55"
            transform="rotate(-28 24 24)"
          />
          <path
            d="M22 18l-3-4m3 4 4-2m0 0 4 3m-8 5-4 6m4-6 6 4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.55"
          />
          <circle className="emblem-gold" cx="37" cy="15" r="2" />
        </svg>
      );
    case "kalam-protocol":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48">
          <path
            d="M24 8l14 6v10c0 9-6 14-14 18-8-4-14-9-14-18V14z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.55"
          />
          <path d="M16 24l5 5 11-12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.55" />
          <path
            className="emblem-gold"
            d="M15 34h18M16 14h16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.55"
          />
        </svg>
      );
    default:
      return null;
  }
}
