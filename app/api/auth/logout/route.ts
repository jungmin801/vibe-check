import { NextResponse } from 'next/server';
import { clearAllSpotifyCookies } from '@/lib/spotify/cookies';

export async function POST() {
  const origin = process.env.NEXT_PUBLIC_API_URL;
  const response = NextResponse.redirect(`${origin}`);
  clearAllSpotifyCookies(response);
  return response;
}
