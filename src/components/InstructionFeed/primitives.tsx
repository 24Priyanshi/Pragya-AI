import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Shared bits of the instruction feed.
 *
 * The reference mock leans on rounded pastel pills, gradients and drop shadows.
 * This site has none of that: squared corners, hairline `outline-variant/10`
 * borders and the purple ramp already used by StatStrip and ProcessedResults.
 * Everything below is that translation — same information, same layout roles,
 * this application's surface language.
 */

export type ChipTone = "default" | "accent" | "strong" | "alert" | "muted";

const CHIP_TONE: Record<ChipTone, string> = {
  default: "bg-surface-container text-on-surface-variant",
  accent: "bg-primary-fixed text-on-primary-fixed",
  strong: "bg-on-surface text-primary-fixed",
  alert: "bg-error-container text-on-error-container",
  muted: "border border-outline-variant/30 text-outline",
};

export function Chip({ tone = "default", children }: { tone?: ChipTone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inter inline-flex items-center whitespace-nowrap px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-widest",
        CHIP_TONE[tone],
      )}
    >
      {children}
    </span>
  );
}

/**
 * One swatch per discrete action, ordered stop → walk → turn → sidestep so the
 * strip reads as a motion ramp. Written as literal class strings because
 * Tailwind's content scanner cannot see computed names.
 */
const ACTION_CLASS: Readonly<Record<string, string>> = {
  standing_still: "bg-surface-dim",
  walking_slow: "bg-primary-fixed-dim",
  walking_normal: "bg-primary-container",
  walking_fast: "bg-primary",
  turning_left: "bg-tertiary-fixed-dim",
  turning_right: "bg-tertiary",
  stepping_left: "bg-secondary-fixed-dim",
  stepping_right: "bg-secondary",
};

export function actionClass(action: string): string {
  return ACTION_CLASS[action] ?? "bg-outline-variant";
}


/** Risk maps onto the one semantic colour the design system defines, plus neutrals. */
export function riskTone(risk: string): ChipTone {
  if (risk === "High") return "alert";
  if (risk === "Medium") return "accent";
  return "default";
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="inter block text-[11px] font-medium uppercase tracking-widest text-outline">{children}</span>;
}
