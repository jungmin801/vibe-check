# Spotify Dashboard API 명세서

## 1. 문서 목적

이 문서는 `spotify_dashboard_planning.md`를 바탕으로 VibeCheck가 제공할
**Spotify 기반 조회 전용 API**를 정의한다.

- 기준: 현재 Spotify Web API에서 조회 가능한 데이터만 사용
- 저장소(DB) 전제 없음
- 모든 인사이트는 **조회 시점에 계산(on-read compute)** 한다
- MVP 범위의 기간 값은 `short_term`, `medium_term`만 공식 지원한다

---

## 2. 설계 원칙

### 2.1 REST 원칙

- 리소스는 동사가 아니라 **명사**로 표현한다
- 현재 로그인 사용자 기준 데이터는 `/api/me/*` 아래에 둔다
- 조회 전용 API는 모두 `GET`을 사용한다
- 필터링, 기간, 개수 제한은 path가 아니라 **query parameter**로 표현한다
- 대시보드/인사이트용 묶음 응답은 **집계 리소스(aggregate resource)** 로 취급한다

### 2.2 데이터 원칙

- Spotify 응답을 그대로 노출하지 않고, UI에 필요한 형태로 정규화해서 반환한다
- 계산식이 있는 값은 `meta` 또는 각 리소스 설명에 산출 기준을 명시한다
- `Recently Played` 기반 지표는 모두 **최근 패턴**으로 해석한다

---

## 3. Base URL

```text
/api
```

예시:

```text
GET /api/me/top-artists?timeRange=short_term&limit=10
```

### 3.1 버저닝 방침

현재 API는 앱 내부 BFF 성격이 강하므로 경로에 `v1`을 두지 않는다.

- 기본 경로는 `/api`
- 사용자 데이터 리소스는 `/api/me/*`
- OAuth 인증 흐름은 `/api/auth/*`

향후 외부 공개 API로 확장되거나 하위 호환 정책이 필요해질 때만
`/api/v2` 같은 명시적 버저닝을 도입한다.

---

## 4. 인증

보호된 엔드포인트는 모두 로그인된 Spotify 사용자 세션이 필요하다.

### 4.1 Spotify 로그인 시작

`GET /api/auth/login`

Spotify OAuth 인증 페이지로 리다이렉트한다.

### 4.2 Spotify OAuth 콜백

`GET /api/auth/callback`

Spotify OAuth redirect URI로 사용되는 엔드포인트다.

- Spotify가 authorization code와 state를 이 경로로 전달한다
- 서버는 code를 access token 또는 refresh token으로 교환한다
- 세션 생성 후 앱 화면으로 리다이렉트한다
- 이 경로는 브라우저 리다이렉트용이므로 일반 JSON 리소스와 성격이 다르다

예시:

```text
GET /api/auth/callback?code=...&state=...
```

### 4.3 세션 조회

`GET /api/session`

현재 로그인 상태와 최소 사용자 정보를 반환한다.

### 4.4 세션 종료

`DELETE /api/session`

현재 세션을 종료한다.

### 4.5 세션 응답 예시

```json
{
  "data": {
    "authenticated": true,
    "user": {
      "id": "spotify-user-id",
      "displayName": "moonie",
      "country": "KR",
      "product": "premium"
    }
  },
  "meta": {
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 5. 공통 규약

### 5.1 Query Parameters

| 이름 | 타입 | 설명 |
|------|------|------|
| `timeRange` | string | `short_term` 또는 `medium_term` |
| `compareRange` | string | 비교 기간. 기본값은 `medium_term` |
| `limit` | number | 반환 개수 |
| `offset` | number | 페이지네이션 오프셋 |
| `timezone` | string | IANA timezone. 예: `Asia/Seoul` |
| `savedTracksLimit` | number | 저장곡 비교 시 가져올 saved track 개수 |

### 5.2 공통 응답 형태

성공 응답:

```json
{
  "data": {},
  "meta": {
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

오류 응답:

```json
{
  "error": {
    "code": "SPOTIFY_RATE_LIMITED",
    "message": "Spotify API rate limit exceeded"
  },
  "meta": {
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

### 5.3 공통 상태 코드

| 상태 코드 | 의미 |
|-----------|------|
| `200` | 성공 |
| `400` | 잘못된 파라미터 |
| `401` | 인증 필요 또는 세션 만료 |
| `429` | Spotify 또는 앱 레벨 rate limit |
| `502` | Spotify upstream 오류 |

---

## 6. 리소스 요약

| 메서드 | 경로 | 설명 |
|--------|------|------|
| `GET` | `/api/auth/login` | Spotify 로그인 시작 |
| `GET` | `/api/auth/callback` | Spotify OAuth 콜백 |
| `GET` | `/api/session` | 현재 세션 정보 |
| `DELETE` | `/api/session` | 세션 종료 |
| `GET` | `/api/me` | 현재 사용자 기본 정보 |
| `GET` | `/api/me/player` | 현재 재생 상태 |
| `GET` | `/api/me/top-artists` | 상위 아티스트 |
| `GET` | `/api/me/top-tracks` | 상위 트랙 |
| `GET` | `/api/me/genre-distribution` | 장르 분포 + 고유 장르 수 |
| `GET` | `/api/me/recent-plays` | 최근 재생 타임라인 |
| `GET` | `/api/me/listening-hours` | 시간대별 청취 분포 |
| `GET` | `/api/me/trend-artists` | 급상승 아티스트 |
| `GET` | `/api/me/trend-tracks` | 급상승 트랙 |
| `GET` | `/api/me/library-overlap` | 저장곡과 취향 곡 겹침 정도 |
| `GET` | `/api/me/insights` | 인사이트 카드 묶음 |
| `GET` | `/api/me/dashboard` | 대시보드 전체 묶음 |

---

## 7. 리소스 상세

## 7.1 현재 사용자

### `GET /api/me`

현재 로그인 사용자의 기본 프로필을 반환한다.

#### Response

```json
{
  "data": {
    "id": "spotify-user-id",
    "displayName": "moonie",
    "country": "KR",
    "product": "premium",
    "imageUrl": "https://..."
  },
  "meta": {
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 7.2 현재 재생 상태

### `GET /api/me/player`

현재 재생 중 카드에 필요한 데이터를 반환한다.

#### Response

```json
{
  "data": {
    "isPlaying": true,
    "progressMs": 91234,
    "durationMs": 204000,
    "track": {
      "id": "track_123",
      "name": "Midnight Drive",
      "artists": [
        { "id": "artist_1", "name": "Neon Waves" }
      ],
      "album": {
        "id": "album_1",
        "name": "Night Shift",
        "imageUrl": "https://..."
      }
    }
  },
  "meta": {
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 7.3 상위 아티스트

### `GET /api/me/top-artists`

기간별 상위 아티스트 목록을 반환한다.

#### Query

| 이름 | 필수 | 기본값 | 설명 |
|------|------|--------|------|
| `timeRange` | 아니오 | `short_term` | `short_term` 또는 `medium_term` |
| `limit` | 아니오 | `10` | 최대 `50` |

#### Response

```json
{
  "data": [
    {
      "rank": 1,
      "id": "artist_1",
      "name": "Neon Waves",
      "imageUrl": "https://...",
      "genres": ["synthwave", "indietronica"],
      "popularity": 72
    }
  ],
  "meta": {
    "timeRange": "short_term",
    "limit": 10,
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 7.4 상위 트랙

### `GET /api/me/top-tracks`

기간별 상위 트랙 목록을 반환한다.

#### Query

| 이름 | 필수 | 기본값 | 설명 |
|------|------|--------|------|
| `timeRange` | 아니오 | `short_term` | `short_term` 또는 `medium_term` |
| `limit` | 아니오 | `10` | 최대 `50` |

#### Response

```json
{
  "data": [
    {
      "rank": 1,
      "id": "track_1",
      "name": "Midnight Drive",
      "artists": [
        { "id": "artist_1", "name": "Neon Waves" }
      ],
      "album": {
        "id": "album_1",
        "name": "Night Shift",
        "imageUrl": "https://..."
      },
      "durationMs": 204000,
      "explicit": false
    }
  ],
  "meta": {
    "timeRange": "short_term",
    "limit": 10,
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 7.5 장르 분포

### `GET /api/me/genre-distribution`

상위 아티스트 기반 장르 분포와 고유 장르 수를 반환한다.

#### Query

| 이름 | 필수 | 기본값 | 설명 |
|------|------|--------|------|
| `timeRange` | 아니오 | `short_term` | `short_term` 또는 `medium_term` |
| `limit` | 아니오 | `50` | Top artists 조회 개수 |

#### 산출 규칙

- Top artists의 `genres[]`를 모두 펼쳐 count
- `genreRatio = genreCount / totalGenreCount`
- 상위 5개 장르만 반환
- `uniqueGenreCount`를 함께 반환

#### Response

```json
{
  "data": {
    "items": [
      { "genre": "synthwave", "count": 12, "ratio": 0.24 },
      { "genre": "indietronica", "count": 8, "ratio": 0.16 }
    ],
    "uniqueGenreCount": 18
  },
  "meta": {
    "timeRange": "short_term",
    "sourceLimit": 50,
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 7.6 최근 재생 기록

### `GET /api/me/recent-plays`

최근 재생 타임라인용 데이터를 반환한다.

#### Query

| 이름 | 필수 | 기본값 | 설명 |
|------|------|--------|------|
| `limit` | 아니오 | `20` | 최대 `50` |
| `timezone` | 아니오 | 사용자 기본값 | `playedAtLocal` 계산용 |

#### Response

```json
{
  "data": [
    {
      "playedAt": "2026-03-22T08:51:00.000Z",
      "playedAtLocal": "2026-03-22T17:51:00+09:00",
      "track": {
        "id": "track_1",
        "name": "Midnight Drive",
        "artists": [
          { "id": "artist_1", "name": "Neon Waves" }
        ],
        "album": {
          "id": "album_1",
          "name": "Night Shift",
          "imageUrl": "https://..."
        }
      }
    }
  ],
  "meta": {
    "limit": 20,
    "timezone": "Asia/Seoul",
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 7.7 시간대별 청취 분포

### `GET /api/me/listening-hours`

최근 재생 기록을 기준으로 시간대별 청취 횟수를 반환한다.

#### Query

| 이름 | 필수 | 기본값 | 설명 |
|------|------|--------|------|
| `limit` | 아니오 | `50` | 최근 재생 샘플 개수 |
| `timezone` | 아니오 | 사용자 기본값 | hour bucket 계산 기준 |

#### 산출 규칙

- `played_at`을 로컬 시간으로 변환
- `0`부터 `23`까지 hour bucket 생성
- 각 bucket count 반환

#### Response

```json
{
  "data": {
    "items": [
      { "hour": 0, "count": 1 },
      { "hour": 1, "count": 3 },
      { "hour": 2, "count": 5 }
    ],
    "peakHour": 2
  },
  "meta": {
    "limit": 50,
    "timezone": "Asia/Seoul",
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 7.8 급상승 아티스트

### `GET /api/me/trend-artists`

`short_term`과 `medium_term` 순위 차이를 이용해 최근 상승 아티스트를 반환한다.

#### Query

| 이름 | 필수 | 기본값 | 설명 |
|------|------|--------|------|
| `timeRange` | 아니오 | `short_term` | 비교 대상 최신 기간 |
| `compareRange` | 아니오 | `medium_term` | 기준 기간 |
| `limit` | 아니오 | `3` | 최대 `50` |

#### 산출 규칙

- `rankDelta = compareRank - currentRank`
- 값이 클수록 최근 상승 폭이 큰 것으로 본다
- 비교 기간에 없고 최신 기간에만 있으면 `isNew = true`

#### Response

```json
{
  "data": [
    {
      "id": "artist_1",
      "name": "Neon Waves",
      "currentRank": 3,
      "compareRank": 15,
      "rankDelta": 12,
      "isNew": false
    }
  ],
  "meta": {
    "timeRange": "short_term",
    "compareRange": "medium_term",
    "limit": 3,
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 7.9 급상승 트랙

### `GET /api/me/trend-tracks`

트랙 기준 순위 변화량을 반환한다.

#### Query

| 이름 | 필수 | 기본값 | 설명 |
|------|------|--------|------|
| `timeRange` | 아니오 | `short_term` | 비교 대상 최신 기간 |
| `compareRange` | 아니오 | `medium_term` | 기준 기간 |
| `limit` | 아니오 | `3` | 최대 `50` |

#### Response

```json
{
  "data": [
    {
      "id": "track_1",
      "name": "Midnight Drive",
      "artists": [
        { "id": "artist_1", "name": "Neon Waves" }
      ],
      "currentRank": 4,
      "compareRank": 18,
      "rankDelta": 14,
      "isNew": false
    }
  ],
  "meta": {
    "timeRange": "short_term",
    "compareRange": "medium_term",
    "limit": 3,
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 7.10 저장곡 취향 겹침도

### `GET /api/me/library-overlap`

사용자의 저장곡과 상위 취향 곡의 겹침 정도를 반환한다.

#### Query

| 이름 | 필수 | 기본값 | 설명 |
|------|------|--------|------|
| `timeRange` | 아니오 | `medium_term` | Top tracks 기간 |
| `topTracksLimit` | 아니오 | `50` | 비교할 top tracks 개수 |
| `savedTracksLimit` | 아니오 | `100` | 비교할 saved tracks 개수 |

#### 산출 규칙

- `overlapCount = intersection(savedTrackIds, topTrackIds).length`
- `overlapRatio = overlapCount / totalTopTracks`

#### Response

```json
{
  "data": {
    "overlapCount": 21,
    "overlapRatio": 0.42,
    "topTracksCount": 50,
    "savedTracksCount": 100
  },
  "meta": {
    "timeRange": "medium_term",
    "topTracksLimit": 50,
    "savedTracksLimit": 100,
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 7.11 인사이트 묶음

### `GET /api/me/insights`

Insight 화면에서 필요한 주요 카드 데이터를 한 번에 반환한다.

#### Query

| 이름 | 필수 | 기본값 | 설명 |
|------|------|--------|------|
| `recentLimit` | 아니오 | `50` | 최근 재생 샘플 개수 |
| `timeRange` | 아니오 | `short_term` | trend 계산용 최신 기간 |
| `compareRange` | 아니오 | `medium_term` | trend 계산용 기준 기간 |
| `savedTracksLimit` | 아니오 | `100` | overlap 계산용 저장곡 개수 |
| `timezone` | 아니오 | 사용자 기본값 | 시간 기반 지표 계산용 |

#### Response

```json
{
  "data": {
    "artistDiversity": {
      "score": 0.68,
      "uniqueArtistCount": 34,
      "totalRecentTracks": 50
    },
    "repeatRate": {
      "score": 0.22,
      "uniqueTrackCount": 39,
      "totalRecentTracks": 50
    },
    "artistLoyalty": {
      "score": 0.18,
      "topArtist": {
        "id": "artist_1",
        "name": "Neon Waves"
      },
      "topArtistPlayCount": 9,
      "totalRecentTracks": 50
    },
    "nightOwlIndex": {
      "score": 0.46,
      "nightTrackCount": 23,
      "totalRecentTracks": 50
    },
    "peakListeningHour": {
      "hour": 2,
      "count": 5
    },
    "trendArtists": [],
    "trendTracks": [],
    "libraryOverlap": {
      "overlapCount": 21,
      "overlapRatio": 0.42
    }
  },
  "meta": {
    "recentLimit": 50,
    "timeRange": "short_term",
    "compareRange": "medium_term",
    "timezone": "Asia/Seoul",
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 7.12 대시보드 묶음

### `GET /api/me/dashboard`

Dashboard 화면에 필요한 주요 데이터를 한 번에 반환한다.

#### Query

| 이름 | 필수 | 기본값 | 설명 |
|------|------|--------|------|
| `artistTimeRange` | 아니오 | `short_term` | top artists 기준 |
| `trackTimeRange` | 아니오 | `short_term` | top tracks 기준 |
| `genreTimeRange` | 아니오 | `short_term` | genre distribution 기준 |
| `recentLimit` | 아니오 | `20` | recent timeline 개수 |
| `hourLimit` | 아니오 | `50` | listening hours 샘플 개수 |
| `timezone` | 아니오 | 사용자 기본값 | 시간 변환 기준 |

#### Response

```json
{
  "data": {
    "player": {
      "isPlaying": true,
      "progressMs": 91234,
      "durationMs": 204000,
      "track": {
        "id": "track_1",
        "name": "Midnight Drive"
      }
    },
    "topArtists": [],
    "topTracks": [],
    "genreDistribution": {
      "items": [],
      "uniqueGenreCount": 18
    },
    "recentPlays": [],
    "listeningHours": {
      "items": [],
      "peakHour": 2
    }
  },
  "meta": {
    "artistTimeRange": "short_term",
    "trackTimeRange": "short_term",
    "genreTimeRange": "short_term",
    "recentLimit": 20,
    "hourLimit": 50,
    "timezone": "Asia/Seoul",
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 8. 인사이트 계산 정의

### 8.1 Artist Diversity

- 리소스: `GET /api/me/insights`
- 공식: `uniqueArtistCount / totalRecentTracks`

### 8.2 Repeat Rate

- 리소스: `GET /api/me/insights`
- 공식: `1 - (uniqueTrackCount / totalRecentTracks)`

### 8.3 Artist Loyalty

- 리소스: `GET /api/me/insights`
- 공식: `maxArtistPlayCount / totalRecentTracks`

### 8.4 Night Owl Index

- 리소스: `GET /api/me/insights`
- 공식: `nightTrackCount / totalRecentTracks`
- 야간 범위: `21:00`부터 `03:59`

### 8.5 Peak Listening Hour

- 리소스: `GET /api/me/insights`, `GET /api/me/listening-hours`
- 공식: `argmax(hourBucketCount)`

---

## 9. 비범위 항목

다음 항목은 본 API 명세 범위에서 제외한다.

- 월별 총 청취 시간
- 연간 총 청취 시간
- 정확한 총 재생 횟수
- 장기 누적 요일 분석
- Wrapped형 연말 리포트

이유:

- Spotify Web API만으로 장기 raw listening history 전체를 안정적으로 확보하기 어렵다
- 현재 명세는 **조회 가능한 데이터 기반 실시간 분석형 대시보드**에 초점을 둔다

---

## 10. 구현 메모

- 내부 구현은 Spotify 원본 응답과 분리된 DTO 또는 entity를 사용하는 것을 권장한다
- aggregate endpoint(`/dashboard`, `/insights`)는 프런트 요청 수를 줄이기 위한 BFF 역할이다
- 세부 endpoint는 재사용성과 디버깅을 위해 유지한다
- 캐싱을 적용한다면 `top-*`, `genre-distribution`, `trend-*`에 짧은 TTL을 두는 방식이 적합하다
