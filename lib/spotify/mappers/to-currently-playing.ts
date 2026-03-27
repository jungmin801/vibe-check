import type { CurrentlyPlaying } from "@/lib/entities/currently-playing";
import type { SpotifyCurrentlyPlayingResponse } from "@/lib/spotify/models/currently-playing-response";

export function toCurrentlyPlaying(
  response: SpotifyCurrentlyPlayingResponse,
): CurrentlyPlaying {
  return {
    isPlaying: response.is_playing,
    progressMs: response.progress_ms,
    durationMs: response.item.duration_ms,
    track: {
      id: response.item.id,
      name: response.item.name,
      artists: response.item.artists,
      album: {
        id: response.item.album.id,
        name: response.item.album.name,
        imageUrl: response.item.album.images?.[0]?.url ?? null,
      },
    },
  };
}
