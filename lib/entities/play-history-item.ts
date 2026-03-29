import type { Track } from "@/lib/entities/track";

export type PlayHistoryItem = {
  playedAt: string;
  track: Track;
};
