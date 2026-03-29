import type { PlayHistoryItem } from "@/lib/entities/play-history-item";

export type ArtistDiversityResult = {
  score: number;
  uniqueArtistCount: number;
  totalRecentTracks: number;
};

export function getArtistDiversity(
  items: PlayHistoryItem[],
): ArtistDiversityResult {
  const artistIds = new Set<string>();

  for (const item of items) {
    for (const artist of item.track.artists) {
      artistIds.add(artist.id);
    }
  }

  const totalRecentTracks = items.length;

  return {
    score: totalRecentTracks === 0 ? 0 : artistIds.size / totalRecentTracks,
    uniqueArtistCount: artistIds.size,
    totalRecentTracks,
  };
}
