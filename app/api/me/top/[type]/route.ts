import { getValidAccessToken } from "@/lib/spotify/auth";
import { fetchSpotifyJson } from "@/lib/spotify/client";
import { TopArtistsApiResponse } from "@/lib/spotify/models/top-artists-response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.pathname.split("/").pop();
  const timeRange = request.nextUrl.searchParams.get("time_range");
  const limit = request.nextUrl.searchParams.get("limit");
  const { accessToken } = await getValidAccessToken();
  const response = await fetchSpotifyJson<TopArtistsApiResponse>(
    `/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}`,
    accessToken,
  );
  return NextResponse.json(response);
}
