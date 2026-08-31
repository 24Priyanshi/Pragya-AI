import type { HeroSpec } from "@/types/page";

export const hero: HeroSpec = {
  src: "/pragyaspace_hero.png",
  alt: "PragyaSpace — India's sovereign embodied AI for space. Robots working on the Moon, Mars, the ISS, and a data center.",
  // "fill" (object-cover to full viewport height) crops this image's title and bottom
  // labels, which sit close to the edges unlike the other hero images — use "auto" so
  // the full image displays uncropped (changed on request, 2026-08-31).
  mode: "auto",
};
