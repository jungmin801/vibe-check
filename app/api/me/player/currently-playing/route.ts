import { getValidAccessToken } from "@/lib/spotify/auth";
import { fetchSpotifyOptionalJson } from "@/lib/spotify/client";
import { toCurrentlyPlaying } from "@/lib/spotify/mappers/to-currently-playing";
import type { SpotifyCurrentlyPlayingResponse } from "@/lib/spotify/models/currently-playing-response";
import { NextResponse } from "next/server";

export async function GET() {
  const { accessToken } = await getValidAccessToken();
  const response =
    await fetchSpotifyOptionalJson<SpotifyCurrentlyPlayingResponse>(
      "/v1/me/player/currently-playing",
      accessToken,
    );
  const requestedAt = new Date().toISOString();

  if (!response) {
    return NextResponse.json({
      data: null,
      meta: {
        requestedAt,
      },
    });
  }

  return NextResponse.json({
    data: toCurrentlyPlaying(response),
    meta: {
      requestedAt,
    },
  });
}
