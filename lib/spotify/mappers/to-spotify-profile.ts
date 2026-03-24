import type { SpotifyProfile } from "@/lib/entities/spotify-profile";
import type { SpotifyCurrentUserResponse } from "@/lib/spotify/models/current-user-response";

export function toSpotifyProfile(
  user: SpotifyCurrentUserResponse,
): SpotifyProfile {
  const displayName = user.display_name?.trim() || "Spotify User";

  return {
    id: user.id,
    displayName,
    imageUrl: user.images?.[0]?.url ?? null,
    avatarLabel: displayName.toUpperCase().substring(0, 2),
  };
}
