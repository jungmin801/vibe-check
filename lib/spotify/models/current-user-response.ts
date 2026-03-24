export type SpotifyImage = {
  url: string;
  height?: number | null;
  width?: number | null;
};

export type SpotifyCurrentUserResponse = {
  id: string;
  display_name: string | null;
  images?: SpotifyImage[];
};
