/**
 * Re-encodes the DenseWalk mosaic renders into a format browsers can play.
 *
 * The renders currently in the dataset are MPEG-4 Part 2 (`mp4v`, the old
 * DivX/Xvid codec) with `moov` written after `mdat`. No browser ships an
 * MPEG-4 Part 2 decoder, so `<video>` fails to decode them no matter how they
 * are served — and even once decodable, `moov`-last forces a full download
 * before the first frame, which breaks seeking. This transcodes to H.264 /
 * yuv420p and moves `moov` to the front.
 *
 * Requires ffmpeg on PATH. Output goes to a staging folder; nothing is
 * uploaded — push it yourself once you have checked a few files play:
 *
 *   node scripts/reencode-mosaics.mjs
 *   huggingface-cli upload s-alam/densewalk-public .mosaic-fixed mosaic_videos --repo-type=dataset
 *
 * Usage: node scripts/reencode-mosaics.mjs [--out DIR] [--jobs N]
 */

import { spawn } from "node:child_process";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { listFolder } from "./hf-tree.mjs";

const REPO = "s-alam/densewalk-public";
const FOLDER = "mosaic_videos";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const OUT = flag("out", ".mosaic-fixed");
const SRC = join(OUT, "_original");
// Transcoding is CPU-bound; more than a handful of ffmpeg processes just thrash.
const JOBS = Number(flag("jobs", "4"));

function run(cmd, argv) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, argv, { stdio: ["ignore", "ignore", "pipe"] });
    let err = "";
    p.stderr.on("data", (d) => (err += d));
    p.on("error", reject);
    p.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(err.trim().split(String.fromCharCode(10)).slice(-3).join(" | ")));
    });
  });
}

/**
 * Locates an ffmpeg to drive.
 *
 * PATH first, then the binary `imageio-ffmpeg` vendors — that package is a
 * common transitive dependency of video tooling, so a machine with no ffmpeg
 * installed system-wide often still has a perfectly good one sitting in
 * site-packages, and finding it beats making the caller install a second copy.
 */
async function resolveFfmpeg() {
  const explicit = flag("ffmpeg", process.env.FFMPEG);
  if (explicit) return explicit;

  const candidates = [];
  for (const py of ["python", "python3"]) {
    try {
      const out = await capture(py, ["-c", "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"]);
      // Both names usually resolve to the same interpreter; probe until one answers.
      if (out.trim()) {
        candidates.push(out.trim());
        break;
      }
    } catch {
      /* no python, or the package is absent — try the next name */
    }
  }
  // A bare "ffmpeg" is tried last: spawning a name that is not on PATH is the
  // expensive failure, so an already-located binary should pre-empt it.
  candidates.push("ffmpeg");

  for (const c of candidates) {
    try {
      await run(c, ["-hide_banner", "-version"]);
      return c;
    } catch {
      /* not this one */
    }
  }
  throw new Error(
    "no ffmpeg found — install one (winget install Gyan.FFmpeg), or pass --ffmpeg C:\path\to\ffmpeg.exe",
  );
}

/** ffmpeg writes stream info to stderr and exits non-zero for a bare `-i`, so take both. */
function captureAll(cmd, argv) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, argv, { stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    p.stdout.on("data", (d) => (out += d));
    p.stderr.on("data", (d) => (out += d));
    p.on("error", reject);
    p.on("close", () => resolve(out));
  });
}

function capture(cmd, argv) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, argv, { stdio: ["ignore", "pipe", "ignore"] });
    let out = "";
    p.stdout.on("data", (d) => (out += d));
    p.on("error", reject);
    p.on("close", (code) => (code === 0 ? resolve(out) : reject(new Error(`${cmd} exited ${code}`))));
  });
}

async function sizeOf(path) {
  try {
    return (await stat(path)).size;
  } catch {
    return -1;
  }
}

/**
 * Fetches one render, retrying transient CDN failures.
 *
 * The dataset is fronted by CloudFront, which drops the occasional connection
 * partway through a 200 MB batch. An earlier revision let that reject straight
 * out of `Promise.all`, which tore down every other worker mid-file and left
 * the staging directory half-populated — so failures are retried here, and the
 * caller records the ones that survive all attempts instead of aborting.
 *
 * `expected` is the size from the repo listing: a short read is a truncated
 * download, which would otherwise be cached as complete by the resume check and
 * transcoded into a corrupt output.
 */
async function download(name, expected) {
  const dest = join(SRC, name);
  if ((await sizeOf(dest)) === expected) return dest; // already have it whole

  let last;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const res = await fetch(`https://huggingface.co/datasets/${REPO}/resolve/main/${FOLDER}/${name}`);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const body = Buffer.from(await res.arrayBuffer());
      if (expected > 0 && body.length !== expected) throw new Error(`short read ${body.length}/${expected}`);
      await writeFile(dest, body);
      return dest;
    } catch (e) {
      last = e;
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
  throw new Error(`${name}: download failed after 4 attempts (${last.message})`);
}

/** True when the file is H.264 in a faststart container — i.e. actually fixed. */
async function verify(path, ffmpeg) {
  if ((await sizeOf(path)) <= 0) return false;
  const head = await readFile(path);
  const moov = head.indexOf("moov");
  const mdat = head.indexOf("mdat");
  if (moov < 0 || mdat < 0 || moov > mdat) return false;
  try {
    const info = await captureAll(ffmpeg, ["-hide_banner", "-i", path]);
    return /Video:\s*h264/.test(info);
  } catch {
    return false;
  }
}

async function transcode(ffmpeg, name, expected) {
  const out = join(OUT, name);
  if (await verify(out, ffmpeg)) return "skipped";
  const src = await download(name, expected);

  // Sources that are already H.264 are remuxed, not re-encoded. Some of the
  // repo's renders have been fixed already, and putting those through libx264
  // a second time would spend a whole generation of quality to produce a file
  // that is byte-for-byte no better. `-c copy` only rewrites the container.
  if (await verify(src, ffmpeg)) {
    await run(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", "-i", src, "-c", "copy", "-movflags", "+faststart", out]);
    if (!(await verify(out, ffmpeg))) throw new Error(`${name}: remux failed verification`);
    return "remuxed";
  }

  // -crf 20 keeps the mosaics visually lossless enough for a dataset preview;
  // +faststart is the half that makes them seekable over HTTP.
  await run(ffmpeg, [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", src,
    "-c:v", "libx264", "-preset", "slow", "-crf", "20",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
    out,
  ]);
  if (!(await verify(out, ffmpeg))) throw new Error(`${name}: output failed verification`);
  return "converted";
}

const ffmpeg = await resolveFfmpeg();
console.log(`ffmpeg: ${ffmpeg}`);
await mkdir(SRC, { recursive: true });

const entries = (await listFolder(REPO, FOLDER))
  .filter((e) => e.type === "file" && e.path.endsWith(".mp4"))
  .map((e) => ({ name: e.path.split("/").pop(), size: e.size ?? 0 }));
console.log(`${entries.length} renders to convert -> ${OUT}/`);

let done = 0;
const failures = [];
const queue = [...entries];
await Promise.all(
  Array.from({ length: JOBS }, async () => {
    for (let item = queue.shift(); item; item = queue.shift()) {
      try {
        await transcode(ffmpeg, item.name, item.size);
      } catch (e) {
        // One bad file must not tear down the other workers mid-download.
        failures.push(`${item.name}: ${e.message}`);
      }
      process.stdout.write(`
  processed ${++done}/${entries.length}`);
    }
  }),
);
console.log();

const written = (await readdir(OUT)).filter((f) => f.endsWith(".mp4"));
const bytes = (await Promise.all(written.map((f) => stat(join(OUT, f))))).reduce((n, s) => n + s.size, 0);
console.log(`wrote ${written.length}/${entries.length} files, ${(bytes / 1e6).toFixed(1)} MB`);

if (failures.length > 0) {
  console.error(`${failures.length} failed — re-run to retry just these:`);
  for (const f of failures) console.error(`  ${f}`);
  process.exitCode = 1;
} else {
  console.log(`next: huggingface-cli upload ${REPO} ${OUT} ${FOLDER} --repo-type=dataset`);
}
