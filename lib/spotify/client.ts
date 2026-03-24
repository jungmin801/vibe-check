export async function fetchSpotify(path: string, accessToken: string) {
  const response = await fetch(`https://api.spotify.com${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Spotify API error: ${response.status} ${text}`);
  }

  return response.json();
}

export async function fetchSpotifyApi<T>(path: string, init?: RequestInit) {
  const response = await fetch(path, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Spotify route error: ${response.status} ${text}`);
  }

  return (await response.json()) as T;
}
