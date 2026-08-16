import { cn } from "@/lib/cn";
import type { MaterialIconName } from "@/types/nav";

interface MaterialIconProps {
  name: MaterialIconName;
  className?: string;
}

/**
 * Material Symbols ligature icon.
 *
 * The glyph is selected by the element's text content, so `name` is rendered
 * as-is. `aria-hidden` is an addition on top of the original: every icon in
 * this site sits beside a visible text label, so exposing the ligature string
 * to screen readers only produced noise ("arrow_outward"). No visual change.
 */
export function MaterialIcon({ name, className }: MaterialIconProps) {
  return (
    <span aria-hidden="true" className={cn("material-symbols-outlined", className)}>
      {name}
    </span>
  );
}
