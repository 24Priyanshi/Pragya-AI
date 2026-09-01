/**
 * HF_TOKEN for the dataset scripts, read from the environment or from `.env`.
 *
 * Not `node --env-file`: this repo is on Node 20.15, where the flag exists but
 * `--env-file-if-exists` does not, so pointing it at an absent `.env` fails the
 * whole script — and the token is optional (both datasets are public; it only
 * lifts the anonymous rate limit that 139 back-to-back downloads sit close to).
 * A real env var wins over the file, so CI can set it without a checked-out .env.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function fromDotEnv() {
  const path = join(dirname(fileURLToPath(import.meta.url)), "..", ".env");
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return undefined; // no .env checked out — anonymous access still works
  }

  for (const line of text.split(/\r?\n/)) {
    const match = /^\s*(?:export\s+)?HF_TOKEN\s*=\s*(.*?)\s*$/.exec(line);
    if (match) return match[1].replace(/^(['"])(.*)\1$/, "$2");
  }
  return undefined;
}

export const HF_TOKEN = process.env.HF_TOKEN || fromDotEnv();
export const HF_AUTH = HF_TOKEN ? { Authorization: `Bearer ${HF_TOKEN}` } : undefined;
