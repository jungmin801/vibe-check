function base64UrlEncode(buffer: ArrayBuffer | Uint8Array) {
    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    let binary = '';
    for (const byte of bytes) {
      binary += String.fromCharCode(byte);
    }
    return Buffer.from(binary, 'binary')
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  
export function generateRandomString(length = 64) {
const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const randomValues = crypto.getRandomValues(new Uint8Array(length));
return Array.from(randomValues)
    .map((x) => chars[x % chars.length])
    .join('');
}
  
export async function generateCodeChallenge(codeVerifier: string) {
const data = new TextEncoder().encode(codeVerifier);
const digest = await crypto.subtle.digest('SHA-256', data);
return base64UrlEncode(digest);
}