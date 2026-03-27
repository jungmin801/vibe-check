import { getValidAccessToken } from "@/lib/spotify/auth";
import { fetchSpotifyJson } from "@/lib/spotify/client";
import type { SpotifyCurrentUserResponse } from "@/lib/spotify/models/current-user-response";
import { NextResponse } from "next/server";

export async function GET() {
  const { accessToken } = await getValidAccessToken();
  const response = await fetchSpotifyJson<SpotifyCurrentUserResponse>(
    "/v1/me",
    accessToken,
  );
  return NextResponse.json(response);
}
