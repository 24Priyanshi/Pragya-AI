import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

/**
 * Verbatim port of the original `js/tailwind-config.js`.
 *
 * The original site loaded the Tailwind Play CDN with
 * `?plugins=forms,container-queries` and applied this config at runtime.
 * Every value below is copied exactly — no rounding to nearest scale token,
 * no additions, no removals. Do not "tidy" this file.
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
        surface: "#FAF8F7",
        "surface-bright": "#FAF8F7",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F9F7F6",
        "surface-container": "#F3F0ED",
        "surface-container-high": "#ECE8E5",
        "surface-container-highest": "#E5E0DB",
        "surface-dim": "#D9D4CE",
        "surface-variant": "#E5E0DB",
        "surface-tint": "#481B4C",
        background: "#FAF8F7",

        /* Primary */
        primary: "#481B4C",
        "primary-container": "#6A3A6B",
        "primary-fixed": "#F5E6D3",
        "primary-fixed-dim": "#E6D4BA",
        "inverse-primary": "#F5E6D3",

        /* On-Primary */
        "on-primary": "#F5E6D3",
        "on-primary-container": "#F5E6D3",
        "on-primary-fixed": "#2D1533",
        "on-primary-fixed-variant": "#5A2D5F",

        /* Secondary */
        secondary: "#6A4A5C",
        "secondary-container": "#E6D4C8",
        "secondary-fixed": "#E6D4C8",
        "secondary-fixed-dim": "#D0BEAF",
        "on-secondary": "#F5E6D3",
        "on-secondary-container": "#522D47",
        "on-secondary-fixed": "#1C1B1B",
        "on-secondary-fixed-variant": "#574657",

        /* Tertiary */
        tertiary: "#5A4A6B",
        "tertiary-container": "#7A6A8B",
        "tertiary-fixed": "#EAD5ED",
        "tertiary-fixed-dim": "#D0BDD5",
        "on-tertiary": "#F5E6D3",
        "on-tertiary-container": "#E3D3E8",
        "on-tertiary-fixed": "#1A1C1E",
        "on-tertiary-fixed-variant": "#5A4A6B",

        /* Surface Text */
        "on-surface": "#2D1533",
        "on-surface-variant": "#5A5159",
        "on-background": "#2D1533",

        /* Inverse */
        "inverse-surface": "#3D2844",
        "inverse-on-surface": "#F5E6D3",

        /* Outline */
        outline: "#8A7A92",
        "outline-variant": "#D9CDE5",

        /* Error */
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
