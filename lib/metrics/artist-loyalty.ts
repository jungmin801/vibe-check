import type { Artist } from "@/lib/entities/artist";
import type { PlayHistoryItem } from "@/lib/entities/play-history-item";

type TopArtist = Artist | null;

export type ArtistLoyaltyResult = {
  score: number;
  topArtist: TopArtist;
  topArtistPlayCount: number;
  totalRecentTracks: number;
};

export function getArtistLoyalty(
  items: PlayHistoryItem[],
): ArtistLoyaltyResult {
  const artistCounts = new Map<
    string,
    { id: string; name: string; count: number }
  >();

  for (const item of items) {
    for (const artist of item.track.artists) {
      const current = artistCounts.get(artist.id);

      artistCounts.set(artist.id, {
        id: artist.id,
        name: artist.name,
        count: (current?.count ?? 0) + 1,
      });
    }
  }

  const topArtistEntry = Array.from(artistCounts.values()).sort(
    (a, b) => b.count - a.count,
  )[0];
  const totalRecentTracks = items.length;
  const topArtistPlayCount = topArtistEntry?.count ?? 0;

  return {
    score: totalRecentTracks === 0 ? 0 : topArtistPlayCount / totalRecentTracks,
    topArtist: topArtistEntry
      ? {
          id: topArtistEntry.id,
          name: topArtistEntry.name,
        }
      : null,
    topArtistPlayCount,
    totalRecentTracks,
  };
}
