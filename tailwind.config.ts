import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

/**
 * Originally a verbatim port of `js/tailwind-config.js` (the original site's
 * runtime Tailwind Play CDN config). The `colors` block below has since been
 * retinted (2026-09-02, on request) to the purple/gold/beige palette that
 * `TopNav`/the landing page (`PragyaHome`) already use — those two were a
 * from-scratch port of a different reference design (2026-08-29) and never
 * matched this file's original Material tokens, which every sub-page's
 * content still read from. Same token names and roles, new hex values,
 * sourced from `PragyaHome/pragyaHome.css`'s `--purple`/`--gold`/`--beige`
 * family. `src/styles/design-system.css`'s `:root` custom properties are the
 * same tokens under different names and must stay in sync with this file.
 * Everything else (fontFamily, borderRadius, plugins) is still the verbatim
 * original — do not "tidy" those.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/config/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* Surface Hierarchy */
        surface: "#F5EFE5",
        "surface-bright": "#F5EFE5",
        "surface-container-lowest": "#FAF6ED",
        "surface-container-low": "#F2EBDF",
        "surface-container": "#ECE1D1",
        "surface-container-high": "#E5D7C2",
        "surface-container-highest": "#DCC9AC",
        "surface-dim": "#D0BFA0",
        "surface-variant": "#E5D7C2",
        "surface-tint": "#3C104E",
        background: "#F5EFE5",

        /* Primary */
        primary: "#3C104E",
        "primary-container": "#5A2E6C",
        "primary-fixed": "#F5EFE5",
        "primary-fixed-dim": "#ECE1D1",
        "inverse-primary": "#F5EFE5",

        /* On-Primary */
        "on-primary": "#F5EFE5",
        "on-primary-container": "#F5EFE5",
        "on-primary-fixed": "#180820",
        "on-primary-fixed-variant": "#5A2E6C",

        /* Secondary */
        secondary: "#7F6C7F",
        "secondary-container": "#ECE1D1",
        "secondary-fixed": "#ECE1D1",
        "secondary-fixed-dim": "#DCCBAF",
        "on-secondary": "#F5EFE5",
        "on-secondary-container": "#361E3E",
        "on-secondary-fixed": "#1C1B1B",
        "on-secondary-fixed-variant": "#4B394E",

        /* Tertiary — the site's gold accent (nav underlines/hover, BITS button border) */
        tertiary: "#C89432",
        "tertiary-container": "#DFBA70",
        "tertiary-fixed": "#F0DDB0",
        "tertiary-fixed-dim": "#DFBA70",
        "on-tertiary": "#180820",
        "on-tertiary-container": "#180820",
        "on-tertiary-fixed": "#1A1C1E",
        "on-tertiary-fixed-variant": "#7F6C7F",

        /* Surface Text */
        "on-surface": "#361E3E",
        "on-surface-variant": "#7F6C7F",
        "on-background": "#361E3E",

        /* Inverse */
        "inverse-surface": "#180820",
        "inverse-on-surface": "#F5EFE5",

        /* Outline */
        outline: "#7F6C7F",
        "outline-variant": "#ECE1D1",

        /* Error — semantic, left as-is */
        error: "#BA1A1A",
        "error-container": "#FFDAD6",
        "on-error": "#FFFFFF",
        "on-error-container": "#93000A",
      },
      fontFamily: {
        headline: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        sm: "0.125rem",
        md: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [forms, containerQueries],
};

export default config;
