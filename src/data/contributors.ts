import type { Contributor } from "@/types/page";

/**
 * Byte-identical across all six sub-pages in the original.
 *
 * Images originally pointed at `../../assets/img/team/*`, which escapes the
 * pragya_ai folder into the parent Jekyll site (BUG-1) and 404s when the site
 * is served standalone. Per the Q5 decision, the four files were copied into
 * public/assets/img/team/ so they resolve here — a recorded deviation.
 */
export const contributors: readonly Contributor[] = [
  {
    name: "Amitava Das",
    image: "/assets/img/team/amitava.png",
    alt: "Contributor photo: Amitava Das",
    bio: "Professor, BITS Goa | Former Research Associate Professor, AIISC, USA",
  },
  {
    name: "Aman Chadha",
    image: "/assets/img/team/aman.jpeg",
    alt: "Contributor photo: Aman Chadha",
    bio: 'GenAI Leadership @ AWS | Stanford AI | Ex-Amazon Alexa, Nvidia, Qualcomm | EB-1 "Einstein Visa" Recipient | EMNLP 2023 Outstanding Paper Award',
  },
  {
    name: "Vasu Sharma",
    image: "/assets/img/team/vasu.jpeg",
    alt: "Contributor photo: Vasu Sharma",
    bio: "Applied Research Scientist Lead at Facebook AI Research | 6k+ citations | Ex-Citadel | CMU | IIT Kanpur | Startup Advisor & Mentor | Angel Investor | EB1A green card recipient",
  },
  {
    name: "Vinija Jain",
    image: "/assets/img/team/vinija.jpeg",
    alt: "Contributor photo: Vinija Jain",
    bio: "AI @ Meta | Ex-Amazon, Oracle, PANW | Stanford AI | EMNLP Outstanding Paper Award Recipient",
  },
] as const;
