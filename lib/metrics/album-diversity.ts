import type { PlayHistoryItem } from "@/lib/entities/play-history-item";

export type AlbumDiversityResult = {
  score: number;
  uniqueAlbumCount: number;
  totalRecentTracks: number;
};

export function getAlbumDiversity(
  items: PlayHistoryItem[],
): AlbumDiversityResult {
  const albumIds = new Set<string>();

  for (const item of items) {
    const album = item.track.album;

    if (!album) {
      continue;
    }

    albumIds.add(album.id);
  }

  const totalRecentTracks = items.length;

  return {
    score: totalRecentTracks === 0 ? 0 : albumIds.size / totalRecentTracks,
    uniqueAlbumCount: albumIds.size,
    totalRecentTracks,
  };
}
