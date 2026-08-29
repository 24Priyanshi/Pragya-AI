/**
 * Maps each programme id to its real page on this site. Added on request
 * (2026-08-29) — the reference design's own hrefs were placeholder anchors
 * ("#denseworld" etc., copied nowhere on its single exported page) for
 * everything except PragyaSpace, since it was built without the rest of the
 * site's routing.
 */
const ROUTES: Readonly<Record<string, string>> = {
  denseworld: "/denseworld",
  densewalk: "/densewalk",
  pragyavla: "/pragyavla",
  pragyadex: "/pragyadex",
  kalarisena: "/kalarisena",
  pragyaspace: "/pragyaspace",
  "kalam-protocol": "/kalamprotocol",
};

export function programmeRoute(id: string): string {
  return ROUTES[id] ?? "/";
}
