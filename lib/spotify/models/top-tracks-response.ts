export type TopTracksApiResponse = {
  items: {
    id: string;
    name: string;
    artists: {
      id: string;
      name: string;
    }[];
  }[];
};
