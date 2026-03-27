export type SpotifyCurrentlyPlayingResponse = {
  item: {
    id: string;
    name: string;
    duration_ms: number;
    artists: {
      id: string;
      name: string;
    }[];
    album: {
      id: string;
      name: string;
      images: {
        url: string;
      }[];
    };
  };
  is_playing: boolean;
  progress_ms: number | null;
};
