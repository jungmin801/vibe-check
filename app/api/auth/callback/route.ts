import { exchangeCodeForToken } from "@/lib/spotify/auth";
import { clearAllSpotifyCookies, clearTemporaryAuthCookies, COOKIE_NAMES, setTokenCookies } from "@/lib/spotify/cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const APP_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get('error');


    if (error) {
        return NextResponse.redirect(`${APP_URL}/login?error=${encodeURIComponent(error)}`);
      }
    
      if (!code || !state) {
        return NextResponse.redirect(`${APP_URL}/login?error=missing_code_or_state`);
      }


      const cookieStore = await cookies();
      const savedState = cookieStore.get(COOKIE_NAMES.state)?.value;
      const codeVerifier = cookieStore.get(COOKIE_NAMES.verifier)?.value;

      if (!savedState || !codeVerifier || savedState !== state) {
        const response = NextResponse.redirect(`${APP_URL}/login?error=invalid_state`);
        clearAllSpotifyCookies(response);
        return response;
      }
      try {
        const token = await exchangeCodeForToken(code, codeVerifier);
    
        const response = NextResponse.redirect(`${APP_URL}/dashboard`);
    
        setTokenCookies(
          response,
          token.access_token,
          token.refresh_token,
          token.expires_in
        );
        clearTemporaryAuthCookies(response);
    
        return response;
      } catch {
        const response = NextResponse.redirect(`${APP_URL}/login?error=token_exchange_failed`);
        clearAllSpotifyCookies(response);
        return response;
      }
}