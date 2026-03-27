export type TopArtistsApiResponse = {
  items: {
    id: string;
    name: string;
    genres: string[];
    images: {
      url: string;
    }[];
  }[];
  total: number;
  limit: number;
  offset: number;
  previous: string | null;
  next: string | null;
};
