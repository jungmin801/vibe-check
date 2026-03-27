import { useQuery } from "@tanstack/react-query";
import type { CurrentlyPlaying } from "@/lib/entities/currently-playing";
import { fetchRouteJson } from "@/lib/spotify/client";
import { toSpotifyProfile } from "@/lib/spotify/mappers/to-spotify-profile";
import type { SpotifyCurrentUserResponse } from "@/lib/spotify/models/current-user-response";
import type { RecentlyPlayedApiResponse } from "@/lib/spotify/models/recently-playing-response";
import type { SpotifyTimeRange } from "@/lib/spotify/models/time-range";
import { TopArtistsApiResponse } from "./models/top-artists-response";
import { TopTracksApiResponse } from "./models/top-tracks-response";

type CurrentlyPlayingApiResponse = {
  data: CurrentlyPlaying | null;
  meta: {
    requestedAt: string;
  };
};

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
  albumMix: (limit = 50) => [...spotifyKeys.all, "album-mix", limit] as const,
};

export const spotifyStaleTimes = {
  profile: 5 * 60 * 1000, // 5분
} as const;

export function useSpotifyMeQuery() {
  return useQuery({
    queryKey: spotifyKeys.me(),
    queryFn: () => fetchRouteJson<SpotifyCurrentUserResponse>("/api/me"),
    staleTime: spotifyStaleTimes.profile,
    select: toSpotifyProfile,
  });
}

export function useCurrentlyPlayingQuery() {
  return useQuery({
    queryKey: spotifyKeys.currentlyPlaying(),
    queryFn: () =>
      fetchRouteJson<CurrentlyPlayingApiResponse>(
        "/api/me/player/currently-playing",
      ),
  });
}

export function useRecentlyPlayedQuery(limit = 20) {
  return useQuery({
    queryKey: spotifyKeys.recentlyPlayed(limit),
    queryFn: () =>
      fetchRouteJson<RecentlyPlayedApiResponse>(
        `/api/me/player/recently-played?limit=${limit}`,
      ),
  });
}

export function useTopArtistsQuery(timeRange: SpotifyTimeRange, limit = 20) {
  return useQuery({
    queryKey: spotifyKeys.topArtists(timeRange, limit),
    queryFn: () =>
      fetchRouteJson<TopArtistsApiResponse>(
        `/api/me/top/artists?time_range=${timeRange}&limit=${limit}`,
      ),
  });
}

export function useTopTracksQuery(timeRange: SpotifyTimeRange, limit = 20) {
  return useQuery({
    queryKey: spotifyKeys.topArtists(timeRange, limit),
    queryFn: () =>
      fetchRouteJson<TopTracksApiResponse>(
        `/api/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
      ),
  });
}
