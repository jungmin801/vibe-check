import { getValidAccessToken } from "@/lib/spotify/auth";
import { fetchSpotify } from "@/lib/spotify/client";
import { NextResponse } from "next/server";

export async function GET() {
  const { accessToken } = await getValidAccessToken();
  const response = await fetchSpotify("/v1/me", accessToken);
  return NextResponse.json(response);
}
