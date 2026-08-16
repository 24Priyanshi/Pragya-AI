import Link from "next/link";

import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { SubmenuFeaturedCard as FeaturedCard } from "@/types/nav";

interface SubmenuFeaturedCardProps {
  card: FeaturedCard;
}

/**
 * The image card on the right of an open submenu.
 *
 * Note it renders only the "Explore" row: `card.title` and `card.description`
 * exist in the config but the original's card markup never used them, leaving
 * the `.submenu-featured-card h3/p` CSS dead (BUG-13). Preserved as-is.
 *
 * The background is an inline style in the original because the image URL is
 * data-driven; the double-stop black gradient over a black base colour is
 * copied exactly.
 */
export function SubmenuFeaturedCard({ card }: SubmenuFeaturedCardProps) {
  const backgroundImage = card.image
    ? `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url('${card.image}')`
    : undefined;

  return (
    <Link
      className="submenu-featured-card"
      href={card.href}
      style={{
        backgroundColor: "black",
        backgroundImage,
        backgroundSize: card.image ? "cover" : undefined,
        backgroundPosition: card.image ? "center" : undefined,
        backgroundRepeat: card.image ? "no-repeat" : undefined,
      }}
    >
      <div className="flex items-center gap-2 mt-auto">
        <span className="text-xs font-medium uppercase tracking-widest">Explore</span>
        <MaterialIcon name="arrow_outward" />
      </div>
    </Link>
  );
}
