import { SITE } from './site';

// My-Monkey network footer — fetched at BUILD time and rendered statically (SEO-native).
// Graceful: returns null if the API is unreachable so the footer never breaks.
// Memoised per build process (single CloudLinux worker → one fetch for the whole build).
let cache;

export async function getNetworkFooter() {
  if (cache !== undefined) return cache;
  const host = new URL(SITE).host;
  try {
    const res = await fetch(`https://git.my-monkey.fr/api/footer?site=${encodeURIComponent(host)}`, {
      next: { revalidate: 86400 },
    });
    cache = res.ok ? await res.json() : null;
  } catch {
    cache = null;
  }
  return cache;
}
