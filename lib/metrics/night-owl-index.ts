import type { PlayHistoryItem } from "@/lib/entities/play-history-item";
import { getLocalHour } from "@/lib/metrics/listening-by-hour";

export type NightOwlIndexResult = {
  score: number;
  nightTrackCount: number;
  totalRecentTracks: number;
};

export function getNightOwlIndex(
  items: PlayHistoryItem[],
  timeZone: string,
): NightOwlIndexResult {
  let nightTrackCount = 0;

  for (const item of items) {
    const hour = getLocalHour(item.playedAt, timeZone);
    const isNightHour = hour >= 21 || hour <= 3;

    if (isNightHour) {
      nightTrackCount += 1;
    }
  }

  const totalRecentTracks = items.length;

  return {
    score: totalRecentTracks === 0 ? 0 : nightTrackCount / totalRecentTracks,
    nightTrackCount,
    totalRecentTracks,
  };
}
