import { getValidAccessToken } from "@/lib/spotify/auth";
import { fetchSpotifyJson } from "@/lib/spotify/client";
import type { RecentlyPlayedApiResponse } from "@/lib/spotify/models/recently-playing-response";
import { getLimitParam } from "@/lib/spotify/query-params";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { accessToken } = await getValidAccessToken();
  const limit = getLimitParam(request.nextUrl.searchParams, {
    defaultValue: 20,
    max: 50,
  });
  const response = await fetchSpotifyJson<RecentlyPlayedApiResponse>(
    `/v1/me/player/recently-played?limit=${limit}`,
    accessToken,
  );

  return NextResponse.json(response);
}
