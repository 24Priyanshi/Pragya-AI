/** Joins class names, dropping falsy values. No merge logic — order is preserved verbatim. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
