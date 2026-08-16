import { cn } from "@/lib/cn";

interface SectionRuleProps {
  label: string;
  /** "sm" for numbered section headers, "lg" for the Contributors heading. */
  size?: "sm" | "lg";
  /** densewalk's prose blocks use mb-8; everything else uses mb-12. */
  margin?: "mb-8" | "mb-12";
}

/** Label followed by a hairline rule — the section divider used across all sub-pages. */
export function SectionRule({ label, size = "sm", margin = "mb-12" }: SectionRuleProps) {
  return (
    <div className={cn("flex items-center gap-8", margin)}>
      <span
        className={cn(
          "inter uppercase tracking-widest text-primary",
          size === "lg" ? "text-lg font-semibold" : "text-sm font-medium",
        )}
      >
        {label}
      </span>
      <div className="h-px grow bg-outline-variant/10" />
    </div>
  );
}
