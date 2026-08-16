import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/cn";
import type { ProtocolRow as ProtocolRowData } from "@/types/content";

interface ProtocolRowProps {
  row: ProtocolRowData;
}

/**
 * One row of the landing page's "Core Protocols" stack.
 *
 * Rows alternate which column holds the image, so the two cells are built
 * separately and ordered by `imageSide`. `min-h-[400px]` on the image cell is
 * what gives the row its height.
 *
 * `text-md` on the paragraph is not a real Tailwind class (BUG-15) — it
 * applies no font size and the text inherits 16px. Kept verbatim.
 *
 * Note the hover split: `hover:scale-105` is on the image itself, while the
 * "Know More" gap animation is driven by `group-hover` on the whole row.
 */
export function ProtocolRow({ row }: ProtocolRowProps) {
  const textCell = (
    <div className="md:col-span-7 p-12 md:p-20 flex flex-col justify-center">
      <h3 className="text-4xl font-light font-headline mb-6">{row.title}</h3>
      <p className="text-md font-light text-on-surface-variant leading-relaxed mb-10 max-w-lg">
        {row.body.map((segment, i) =>
          segment.em ? (
            <b key={i}>
              <i>{segment.text}</i>
            </b>
          ) : (
            <span key={i}>{segment.text}</span>
          ),
        )}
      </p>
      <div className="flex items-center gap-8">
        <a
          className="text-[10px] font-bold uppercase tracking-widest text-on-surface flex items-center gap-2 group-hover:gap-4 transition-all"
          href={row.href}
        >
          Know More
          <MaterialIcon className="text-sm" name="arrow_outward" />
        </a>
      </div>
    </div>
  );

  const imageCell = (
    <div className={cn("md:col-span-5 overflow-hidden min-h-[400px]", row.imageCellBg, row.imageCellRelative && "relative")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={row.imageAlt}
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
        src={row.image}
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 bg-surface-container-lowest group hover:z-10 relative">
      {row.imageSide === "left" ? (
        <>
          {imageCell}
          {textCell}
        </>
      ) : (
        <>
          {textCell}
          {imageCell}
        </>
      )}
    </div>
  );
}
