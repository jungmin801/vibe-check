export async function requestSpotify(path: string, accessToken: string) {
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

  return response;
}

export async function fetchSpotifyJson<T>(path: string, accessToken: string) {
  const response = await requestSpotify(path, accessToken);
  return (await response.json()) as T;
}

export async function fetchSpotifyOptionalJson<T>(
  path: string,
  accessToken: string,
) {
  const response = await requestSpotify(path, accessToken);

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text) as T;
}

export async function fetchRouteJson<T>(path: string, init?: RequestInit) {
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
