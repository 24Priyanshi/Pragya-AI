/**
 * Content of the "Examples" tab (2026-09-01), ported verbatim from the
 * project's own Gradio Space (huggingface.co/spaces/Pragya-AI/denseworld,
 * denseworld_app.py's build_examples_html) — the team's own existing copy,
 * not written fresh here.
 *
 * The Space's assets/examples/ folder is currently empty (0 files), so all
 * 10 examples render exactly as they do live: a "coming soon" clip slot plus
 * six "coming soon" output tiles each, under the same default title every
 * example falls back to when it has no ex<i>_title.txt of its own.
 */

export const examplesIntro =
  "Short on time? Start with these 10 curated examples for a quick tour of DenseWorld before trying the interactive demo.";

export const exampleCount = 10;
export const defaultExampleTitle = "A street scene, read end to end";

export interface ExampleOutput {
  readonly key: string;
  readonly label: string;
}

export const exampleOutputs: readonly ExampleOutput[] = [
  { key: "dl", label: "Layout view" },
  { key: "da", label: "Agents view" },
  { key: "di", label: "Interaction crop" },
  { key: "flow", label: "Motion field" },
  { key: "pred", label: "Future prediction" },
  { key: "occ", label: "Occlusion map" },
];
