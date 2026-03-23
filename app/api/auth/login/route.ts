import { setTemporaryAuthCookies } from "@/lib/spotify/cookies";
import { generateCodeChallenge, generateRandomString } from "@/lib/spotify/pkce";
import { NextResponse } from "next/server";

const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-top-read",
  "user-read-recently-played",
  "user-library-read",
].join(" ");

export async function GET() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const state = generateRandomString(16);
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  if (!clientId) {
    return NextResponse.json(
      { message: "Missing SPOTIFY_CLIENT_ID environment variable." },
      { status: 500 },
    );
  }

  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri!,
    scope: SPOTIFY_SCOPES,
    state: state,
    show_dialog: "true",
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  const authUrl = `${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`;

  const response = NextResponse.redirect(authUrl);
  setTemporaryAuthCookies(response, state, codeVerifier);

  return response;
}