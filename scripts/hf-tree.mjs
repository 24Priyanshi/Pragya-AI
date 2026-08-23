/**
 * Paginated file listing for a Hugging Face dataset folder.
 *
 * The tree endpoint caps a page at 50 entries and hands back the next cursor in
 * a `Link: <...>; rel="next"` header. A caller that reads the first response and
 * stops looks exactly like a caller that listed a small folder — which is how
 * the DenseWalk sync quietly processed 50 of the repo's 250 clips and reported
 * success. Every listing goes through here so that cannot recur.
 */

const PAGE = 100;

export async function listFolder(repo, folder, { token, repoType = "datasets" } = {}) {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  let url = `https://huggingface.co/api/${repoType}/${repo}/tree/main/${folder}?recursive=1&expand=1&limit=${PAGE}`;
  const files = [];

  while (url) {
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`tree listing failed for ${repo}/${folder}: ${res.status} ${res.statusText}`);
    for (const entry of await res.json()) if (entry.type === "file") files.push(entry);
    url = nextLink(res.headers.get("link"));
  }

  return files;
}

function nextLink(header) {
  const match = /<([^>]+)>;\s*rel="next"/.exec(header ?? "");
  return match ? match[1] : null;
}
