export type TimeRange = "short_term" | "medium_term" | "long_term";

export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  short_term: "최근 1개월",
  medium_term: "최근 6개월",
  long_term: "최근 1년",
};

export function getTimeRangeLabel(timeRange: TimeRange) {
  return TIME_RANGE_LABELS[timeRange];
}
