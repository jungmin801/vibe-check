import { useQuery } from "@tanstack/react-query";
import { fetchSpotifyApi } from "@/lib/spotify/client";
import { toSpotifyProfile } from "@/lib/spotify/mappers/to-spotify-profile";
import type { SpotifyCurrentUserResponse } from "@/lib/spotify/models/current-user-response";
import type { SpotifyTimeRange } from "@/lib/spotify/models/time-range";

export const spotifyKeys = {
  all: ["spotify"] as const,
  me: () => [...spotifyKeys.all, "me"] as const,
  topArtists: (timeRange: SpotifyTimeRange, limit = 20) =>
    [...spotifyKeys.all, "top-artists", timeRange, limit] as const,
  topTracks: (timeRange: SpotifyTimeRange, limit = 20) =>
    [...spotifyKeys.all, "top-tracks", timeRange, limit] as const,
  recentlyPlayed: (limit = 20) =>
    [...spotifyKeys.all, "recently-played", limit] as const,
  currentlyPlaying: () => [...spotifyKeys.all, "currently-playing"] as const,
};

export const spotifyStaleTimes = {
  profile: 5 * 60 * 1000, // 5분
} as const;

export function useSpotifyMeQuery() {
  return useQuery({
    queryKey: spotifyKeys.me(),
    queryFn: () => fetchSpotifyApi<SpotifyCurrentUserResponse>("/api/me"),
    staleTime: spotifyStaleTimes.profile,
    select: toSpotifyProfile,
  });
}
