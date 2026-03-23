import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { COOKIE_NAMES, setTokenCookies } from '@/lib/spotify/cookies';

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const SPOTIFY_REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

export async function exchangeCodeForToken(code: string, codeVerifier: string) {
  const body = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    grant_type: 'authorization_code',
    code,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    code_verifier: codeVerifier,
  });

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<{
    access_token: string;
    token_type: 'Bearer';
    expires_in: number;
    refresh_token?: string;
    scope: string;
  }>;
}

export async function refreshAccessToken(refreshToken: string) {
  const body = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Refresh failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<{
    access_token: string;
    token_type: 'Bearer';
    expires_in: number;
    refresh_token?: string;
    scope?: string;
  }>;
}

export async function getValidAccessToken() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(COOKIE_NAMES.accessToken)?.value;
  const refreshToken = cookieStore.get(COOKIE_NAMES.refreshToken)?.value;
  const expiresAt = Number(cookieStore.get(COOKIE_NAMES.expiresAt)?.value ?? '0');

  const isExpired = !accessToken || !expiresAt || Date.now() >= expiresAt - 30_000;

  if (!isExpired) {
    return { accessToken, refreshed: false as const, refreshPayload: null };
  }

  if (!refreshToken) {
    throw new Error('No refresh token');
  }

  const refreshPayload = await refreshAccessToken(refreshToken);

  return {
    accessToken: refreshPayload.access_token,
    refreshed: true as const,
    refreshPayload,
  };
}

export function applyRefreshedTokenCookies(
  response: NextResponse,
  payload: {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
  }
) {
  setTokenCookies(
    response,
    payload.access_token,
    payload.refresh_token,
    payload.expires_in
  );
}