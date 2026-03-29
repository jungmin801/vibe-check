import type { PlayHistoryItem } from "@/lib/entities/play-history-item";

export type ListeningHourBucket = {
  hour: number;
  count: number;
};

export type ListeningByHourResult = {
  items: ListeningHourBucket[];
  peakHour: number | null;
};

export function getLocalHour(playedAt: string, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    hour12: false,
    hourCycle: "h23",
    timeZone,
  });

  return Number(formatter.format(new Date(playedAt)));
}

export function getListeningByHour(
  items: PlayHistoryItem[],
  timeZone: string,
): ListeningByHourResult {
  const counts = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    count: 0,
  }));

  for (const item of items) {
    const hour = getLocalHour(item.playedAt, timeZone);

    if (hour >= 0 && hour <= 23) {
      counts[hour].count += 1;
    }
  }

  let peakHour: number | null = null;
  let peakCount = 0;

  for (const item of counts) {
    if (item.count > peakCount) {
      peakHour = item.hour;
      peakCount = item.count;
    }
  }

  return {
    items: counts,
    peakHour,
  };
}
