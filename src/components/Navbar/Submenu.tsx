import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { SubmenuConfig } from "@/types/nav";

import { SubmenuFeaturedCard } from "./SubmenuFeaturedCard";

interface SubmenuProps {
  config: SubmenuConfig;
}

/**
 * Inner content of the mega-submenu — port of `renderSubmenu` in js/navbar.js.
 *
 * The original has a branch for configs without `answers` that renders each
 * item as a link; every one of the six configs defines `answers`, so only the
 * static Q&A branch is reachable and only that branch is ported.
 *
 * Class names are load-bearing: §20 of design-system.css styles this entire
 * tree by `#submenu-content` / `.submenu-*` selectors.
 */
export function Submenu({ config }: SubmenuProps) {
  return (
    <>
      <div className="submenu-column">
        <div className="submenu-items-grid">
          {config.columns.apis.map((item) => (
            <div className="submenu-item-wrapper submenu-item-wrapper-static" key={item.label}>
              <div className="submenu-item submenu-item-static">
                <div className="submenu-item-row">
                  <MaterialIcon className="submenu-item-icon" name={item.icon} />
                  <span className="submenu-item-label submenu-item-question">{item.label}</span>
                </div>
                <div className="submenu-item-answer">{config.answers[item.label] ?? ""}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="submenu-featured">
        <SubmenuFeaturedCard card={config.featuredCard} />
      </div>
    </>
  );
}
