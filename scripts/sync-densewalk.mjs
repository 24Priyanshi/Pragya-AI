/**
 * Pulls the DenseWalk annotation exports from the public dataset and rewrites
 * src/data/densewalk-feed/clips/.
 *
 * The JSON is committed rather than fetched at runtime: the whole corpus is
 * ~6.7 MB raw but ~0.35 MB gzipped (the observation text is templated and
 * compresses ~19:1), so baking it into the prerendered page costs less than the
 * 50 round trips a runtime fetch would need — and the site then has no runtime
 * dependency on huggingface.co. The mosaic videos are NOT downloaded; they are
 * streamed from the dataset CDN by URL (see VIDEO_BASE in ../index.ts).
 *
 * Usage: npm run sync:densewalk
 *
 * The dataset is public, so the listing and the downloads work unauthenticated;
 * HF_TOKEN is picked up when present only to lift the anonymous rate limit,
 * which 139 back-to-back downloads sit close to. Put it in `.env` or the
 * environment — see ./hf-token.mjs.
 */

import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { HF_AUTH, HF_TOKEN } from "./hf-token.mjs";
import { listFolder } from "./hf-tree.mjs";

const REPO = "s-alam/densewalk-public";
const FOLDER = "json_openvla";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "densewalk-feed", "clips");

/** Fields the feed adapter reads; a missing one means the export schema moved. */
const REQUIRED = ["video_id", "fps", "n_frames", "instruction", "action_space", "frames"];

async function fetchClip(path) {
  const res = await fetch(`https://huggingface.co/datasets/${REPO}/resolve/main/${path}`, { headers: HF_AUTH });
  if (!res.ok) throw new Error(`${path}: ${res.status} ${res.statusText}`);
  const text = await res.text();
  const clip = JSON.parse(text); // throws on a truncated download rather than committing it
  const missing = REQUIRED.filter((k) => !(k in clip));
  if (missing.length > 0) throw new Error(`${path}: missing ${missing.join(", ")}`);
  return { name: path.split("/").pop(), text, clip };
}

const entries = (await listFolder(REPO, FOLDER, { token: HF_TOKEN })).filter((e) => e.path.endsWith(".json"));
console.log(`${entries.length} exports in ${REPO}/${FOLDER}`);

const clips = [];
// Ten at a time: enough to saturate the link without tripping HF's rate limiter.
for (let i = 0; i < entries.length; i += 10) {
  clips.push(...(await Promise.all(entries.slice(i, i + 10).map((e) => fetchClip(e.path)))));
  process.stdout.write(`\r  fetched ${clips.length}/${entries.length}`);
}
console.log();

clips.sort((a, b) => a.name.localeCompare(b.name));

await rm(OUT, { force: true, recursive: true });
await mkdir(OUT, { recursive: true });
await Promise.all(clips.map((c) => writeFile(join(OUT, c.name), c.text)));

const ids = clips.map((c) => c.name.replace(/_uni\.json$/, ""));
const barrel = [
  "/**",
  " * Generated barrel for the DenseWalk annotation exports.",
  " *",
  " * One entry per file in `json_openvla/` of the public dataset",
  ` * (https://huggingface.co/datasets/${REPO}). Regenerate with`,
  " * `npm run sync:densewalk` after adding or replacing an export — do not hand-edit.",
  " */",
  "",
  'import type { RawClip } from "@/types/densewalk-feed";',
  "",
  ...ids.map((id, i) => `import c${id} from "./${clips[i].name}";`),
  "",
  "export const rawClips: readonly RawClip[] = [",
  ...ids.map((id) => `  c${id} as RawClip,`),
  "];",
  "",
].join("\n");
await writeFile(join(OUT, "index.ts"), barrel);

const onDisk = (await readdir(OUT)).filter((f) => f.endsWith(".json")).length;
const frames = clips.reduce((n, c) => n + c.clip.frames.length, 0);
console.log(`wrote ${onDisk} clips / ${frames} frames to src/data/densewalk-feed/clips/`);
