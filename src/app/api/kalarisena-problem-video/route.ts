import { NextRequest } from "next/server";

/**
 * Proxies KalariSena's problem-overview video off Google Drive's CDN (on
 * request, 2026-08-30). Drive's file-serving origin sends
 * `Cross-Origin-Resource-Policy: same-site`, which makes browsers block a
 * `<video src>` pointed at it directly from this site (ERR_BLOCKED_BY_ORB) —
 * fetching it server-side sidesteps that, and this route forwards the
 * client's Range header so seeking still works.
 */
const DRIVE_FILE_ID = "1PwwrZSubZceDk4JG9klV5jwZ2WvjgRPr";
const DRIVE_URL = `https://drive.usercontent.google.com/download?id=${DRIVE_FILE_ID}&export=download&confirm=t`;

export async function GET(request: NextRequest) {
  const range = request.headers.get("range");
  const driveResponse = await fetch(DRIVE_URL, {
    headers: range ? { Range: range } : undefined,
  });

  const headers = new Headers();
  for (const key of ["content-type", "content-length", "content-range", "accept-ranges"]) {
    const value = driveResponse.headers.get(key);
    if (value) headers.set(key, value);
  }

  return new Response(driveResponse.body, { status: driveResponse.status, headers });
}
