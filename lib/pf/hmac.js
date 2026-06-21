// Cryptographic primitives, browser-native (Web Crypto / SubtleCrypto).
// Same code runs in Node 20+ (globalThis.crypto.subtle) — used by the test script.
// Everything is async because SubtleCrypto is async; a verifier never needs to be sync.

const enc = new TextEncoder();

/** HMAC-SHA256(key, message) -> Uint8Array(32). Key + message are UTF-8 strings. */
export async function hmacSha256(keyStr, msgStr) {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(keyStr),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(msgStr));
  return new Uint8Array(sig);
}

/** SHA-256(message) -> lowercase hex string. Used to confirm a revealed server seed
 *  matches the hashed seed the casino committed to BEFORE the bet. */
export async function sha256Hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(str));
  return toHex(new Uint8Array(buf));
}

/** Uint8Array / byte array -> lowercase hex string. */
export function toHex(bytes) {
  let out = '';
  for (let i = 0; i < bytes.length; i++) out += bytes[i].toString(16).padStart(2, '0');
  return out;
}
