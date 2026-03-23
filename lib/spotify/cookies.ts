import { NextResponse } from 'next/server';

const isProd = process.env.NODE_ENV === 'production';

export const COOKIE_NAMES = {
  state: 'spotify_oauth_state',
  verifier: 'spotify_code_verifier',
  accessToken: 'spotify_access_token',
  refreshToken: 'spotify_refresh_token',
  expiresAt: 'spotify_expires_at',
} as const;

export function setTemporaryAuthCookies(
  response: NextResponse,
  state: string,
  verifier: string
) {
  response.cookies.set(COOKIE_NAMES.state, state, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10, // 10분
  });

  response.cookies.set(COOKIE_NAMES.verifier, verifier, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  });
}

export function setTokenCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken: string | undefined,
  expiresIn: number
) {
  response.cookies.set(COOKIE_NAMES.accessToken, accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: expiresIn,
  });

  if (refreshToken) {
    response.cookies.set(COOKIE_NAMES.refreshToken, refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      // refresh token은 오래 쓸 수 있게 넉넉히
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  response.cookies.set(COOKIE_NAMES.expiresAt, String(Date.now() + expiresIn * 1000), {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: expiresIn,
  });
}

export function clearTemporaryAuthCookies(response: NextResponse) {
  response.cookies.set(COOKIE_NAMES.state, '', {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  response.cookies.set(COOKIE_NAMES.verifier, '', {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export function clearAllSpotifyCookies(response: NextResponse) {
  Object.values(COOKIE_NAMES).forEach((name) => {
    response.cookies.set(name, '', {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
  });
}