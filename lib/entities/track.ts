import type { Album } from "@/lib/entities/album";
import type { Artist } from "@/lib/entities/artist";

export type Track = {
  id: string;
  name: string;
  artists: Artist[];
  album?: Album;
  durationMs?: number;
  explicit?: boolean;
};
