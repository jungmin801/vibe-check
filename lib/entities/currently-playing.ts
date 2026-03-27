export type CurrentlyPlayingTrack = {
  id: string;
  name: string;
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
    imageUrl: string | null;
  };
};

export type CurrentlyPlaying = {
  isPlaying: boolean;
  progressMs: number | null;
  durationMs: number;
  track: CurrentlyPlayingTrack;
};
