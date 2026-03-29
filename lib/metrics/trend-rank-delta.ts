import type { TopItem } from "@/lib/entities/top-item";

export type TrendRankDeltaItem<T extends TopItem> = T & {
  currentRank: number;
  compareRank: number | null;
  rankDelta: number | null;
  isNew: boolean;
};

export function getTrendRankDelta<T extends TopItem>(
  currentItems: T[],
  compareItems: T[],
  limit = 3,
): TrendRankDeltaItem<T>[] {
  const compareRanks = new Map(
    compareItems.map((item, index) => [item.id, index + 1]),
  );

  return currentItems
    .map((item, index) => {
      const currentRank = index + 1;
      const compareRank = compareRanks.get(item.id) ?? null;

      return {
        ...item,
        currentRank,
        compareRank,
        rankDelta: compareRank === null ? null : compareRank - currentRank,
        isNew: compareRank === null,
      };
    })
    .sort((a, b) => {
      if (a.isNew !== b.isNew) {
        return a.isNew ? -1 : 1;
      }

      return (b.rankDelta ?? -Infinity) - (a.rankDelta ?? -Infinity);
    })
    .slice(0, limit);
}
