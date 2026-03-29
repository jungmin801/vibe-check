import type { Album } from "@/lib/entities/album";
import type { PlayHistoryItem } from "@/lib/entities/play-history-item";

export type AlbumMixItem = {
  album: Album;
  count: number;
  ratio: number;
};

export type AlbumMixResult = {
  items: AlbumMixItem[];
  uniqueAlbumCount: number;
};

export function getAlbumMix(items: PlayHistoryItem[]): AlbumMixResult {
  const albumCounts = new Map<
    string,
    {
      album: {
        id: string;
        name: string;
        imageUrl: string | null;
      };
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
      album: {
        id: album.id,
        name: album.name,
        imageUrl: album.imageUrl ?? null,
      },
      count: (current?.count ?? 0) + 1,
    });
  }

  const totalRecentTracks = items.length;

  return {
    items: Array.from(albumCounts.values())
      .map((item) => ({
        ...item,
        ratio: totalRecentTracks === 0 ? 0 : item.count / totalRecentTracks,
      }))
      .sort(
        (a, b) => b.count - a.count || a.album.name.localeCompare(b.album.name),
      )
      .slice(0, 5),
    uniqueAlbumCount: albumCounts.size,
  };
}
