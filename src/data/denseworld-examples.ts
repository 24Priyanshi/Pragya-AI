/**
 * Content of the "Examples" tab (2026-09-01), ported verbatim from the
 * project's own Gradio Space (huggingface.co/spaces/Pragya-AI/denseworld,
 * denseworld_app.py's build_examples_html) — the team's own existing copy,
 * not written fresh here.
 *
 * The Space's assets/examples/ folder was empty at port time, so all 10
 * examples rendered as "coming soon" placeholders. Real clips landed under
 * public/videos/denseWorld/examples/ (2026-09-03): an Original/<n>.mp4 per
 * example plus, for each of FactorJEPA and V-JEPA, the same clip run through
 * three conditions (Futurestate, Masking1(69), Masking2(90)) — six output
 * tiles per example replacing the original six named-view placeholders.
 */

export const examplesIntro =
  "Short on time? Start with these 10 curated examples for a quick tour of DenseWorld before trying the interactive demo.";

export const exampleCount = 10;
export const defaultExampleTitle = "A street scene, read end to end";

export interface ExampleOutput {
  readonly key: string;
  readonly label: string;
  /** Folder under public/videos/denseWorld/examples/ holding this output's numbered clips. */
  readonly folder: string;
}

// Top row: FactorJEPA across the three conditions. Bottom row: V-JEPA across the same three.
export const exampleOutputs: readonly ExampleOutput[] = [
  { key: "factorjepa-future", label: "FactorJEPA — Future state", folder: "Futurestate/Factorjepa" },
  { key: "factorjepa-mask69", label: "FactorJEPA — 69% masking", folder: "Masking1(69)/Factorjepa" },
  { key: "factorjepa-mask90", label: "FactorJEPA — 90% masking", folder: "Masking2(90)/Factorjepa" },
  { key: "vjepa-future", label: "V-JEPA — Future state", folder: "Futurestate/Vjepa" },
  { key: "vjepa-mask69", label: "V-JEPA — 69% masking", folder: "Masking1(69)/Vjepa" },
  { key: "vjepa-mask90", label: "V-JEPA — 90% masking", folder: "Masking2(90)/Vjepa" },
];

const EXAMPLES_BASE = "/videos/denseWorld/examples";

// Masking1(69)/Vjepa never got its examples 9 and 10 renamed to plain numbers —
// its export kept the source comparison-tool filenames instead. Sequential
// index order (28, 29) is assumed to line up with example order (9, 10).
const FILENAME_OVERRIDES: Readonly<Record<string, Readonly<Record<number, string>>>> = {
  "vjepa-mask69": {
    9: "media_videos_comparison_videos_28_Varanasi4__fa948c37_0_eb56e188f66ba0d0d97c (1).mp4",
    10: "media_videos_comparison_videos_29_Varanasi5__350dea38_0_a15fc0c1dbc6253a41a9 (1).mp4",
  },
};

export function originalClipSrc(ordinal: number): string {
  return encodeURI(`${EXAMPLES_BASE}/Original/${ordinal}.mp4`);
}

export function exampleOutputSrc(output: ExampleOutput, ordinal: number): string {
  const filename = FILENAME_OVERRIDES[output.key]?.[ordinal] ?? `${ordinal}.mp4`;
  return encodeURI(`${EXAMPLES_BASE}/${output.folder}/${filename}`);
}
