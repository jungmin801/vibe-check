import type { PlayHistoryItem } from "@/lib/entities/play-history-item";

export type RepeatRateResult = {
  score: number;
  uniqueTrackCount: number;
  totalRecentTracks: number;
};

export function getRepeatRate(items: PlayHistoryItem[]): RepeatRateResult {
  const trackIds = new Set<string>();

  for (const item of items) {
    trackIds.add(item.track.id);
  }

  const totalRecentTracks = items.length;
  const uniqueTrackCount = trackIds.size;

  return {
    score:
      totalRecentTracks === 0 ? 0 : 1 - uniqueTrackCount / totalRecentTracks,
    uniqueTrackCount,
    totalRecentTracks,
  };
}
