import type { SavedTrack } from "@/lib/entities/saved-track";
import type { TopItem } from "@/lib/entities/top-item";

export type SaveTasteOverlapResult = {
  overlapCount: number;
  overlapRatio: number;
  topTracksCount: number;
  savedTracksCount: number;
};

export function getSaveTasteOverlap(
  topTracks: TopItem[],
  savedTracks: SavedTrack[],
): SaveTasteOverlapResult {
  const topTrackIds = new Set(topTracks.map((track) => track.id));
  const savedTrackIds = new Set(savedTracks.map((track) => track.track.id));
  let overlapCount = 0;

  for (const trackId of topTrackIds) {
    if (savedTrackIds.has(trackId)) {
      overlapCount += 1;
    }
  }

  return {
    overlapCount,
    overlapRatio: topTrackIds.size === 0 ? 0 : overlapCount / topTrackIds.size,
    topTracksCount: topTrackIds.size,
    savedTracksCount: savedTrackIds.size,
  };
}
