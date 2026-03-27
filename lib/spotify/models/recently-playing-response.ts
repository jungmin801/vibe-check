export type RecentlyPlayedApiResponse = {
  items: {
    track: {
      album: {
        id: string;
        name: string;
        images: {
          url: string;
        }[];
      };
    };
  }[];
};
