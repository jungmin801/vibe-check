import type { PlayHistoryItem } from "@/lib/entities/play-history-item";
import { getListeningByHour } from "@/lib/metrics/listening-by-hour";

export type PeakListeningHourResult = {
  hour: number | null;
  count: number;
};

export function getPeakListeningHour(
  items: PlayHistoryItem[],
  timeZone: string,
): PeakListeningHourResult {
  const result = getListeningByHour(items, timeZone);

  if (result.peakHour === null) {
    return {
      hour: null,
      count: 0,
    };
  }

  const bucket = result.items.find((item) => item.hour === result.peakHour);

  return {
    hour: result.peakHour,
    count: bucket?.count ?? 0,
  };
}
