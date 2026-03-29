import type { Album } from "@/lib/entities/album";
import type { PlayHistoryItem } from "@/lib/entities/play-history-item";

type TopAlbum = Album | null;

export type AlbumLoyaltyResult = {
  score: number;
  topAlbum: TopAlbum;
  topAlbumPlayCount: number;
  totalRecentTracks: number;
};

export function getAlbumLoyalty(items: PlayHistoryItem[]): AlbumLoyaltyResult {
  const albumCounts = new Map<
    string,
    {
      id: string;
      name: string;
      imageUrl: string | null;
      count: number;
    }
  >();

  for (const item of items) {
    const album = item.track.album;

    if (!album) {
      continue;
    }

    const current = albumCounts.get(album.id);

    albumCounts.set(album.id, {
      id: album.id,
      name: album.name,
      imageUrl: album.imageUrl ?? null,
      count: (current?.count ?? 0) + 1,
    });
  }

  const topAlbumEntry = Array.from(albumCounts.values()).sort(
    (a, b) => b.count - a.count,
  )[0];
  const totalRecentTracks = items.length;
  const topAlbumPlayCount = topAlbumEntry?.count ?? 0;

  return {
    score: totalRecentTracks === 0 ? 0 : topAlbumPlayCount / totalRecentTracks,
    topAlbum: topAlbumEntry
      ? {
          id: topAlbumEntry.id,
          name: topAlbumEntry.name,
          imageUrl: topAlbumEntry.imageUrl,
        }
      : null,
    topAlbumPlayCount,
    totalRecentTracks,
  };
}
