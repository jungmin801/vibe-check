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
- MVP 단계에서는 **재사용 가능한 source endpoint**를 우선 만든다

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
GET /api/me/top/artists?timeRange=short_term&limit=10
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

### 4.3 세션 종료

`POST /api/auth/logout`

현재 세션을 종료한다.

---

## 5. 공통 규약

### 5.1 Query Parameters

| 이름               | 타입   | 설명                                   |
| ------------------ | ------ | -------------------------------------- |
| `timeRange`        | string | `short_term` 또는 `medium_term`        |
| `compareRange`     | string | 비교 기간. 기본값은 `medium_term`      |
| `limit`            | number | 반환 개수                              |
| `offset`           | number | 페이지네이션 오프셋                    |
| `timezone`         | string | IANA timezone. 예: `Asia/Seoul`        |
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

| 상태 코드 | 의미                            |
| --------- | ------------------------------- |
| `200`     | 성공                            |
| `400`     | 잘못된 파라미터                 |
| `401`     | 인증 필요 또는 세션 만료        |
| `429`     | Spotify 또는 앱 레벨 rate limit |
| `502`     | Spotify upstream 오류           |

---

## 6. 리소스 요약

이 문서는 **핵심 재사용 리소스**만 정의한다.  
파생 지표(`album mix`, `listening hours`, `trend-*`, `library overlap`, `album loyalty`, `album diversity`)는 우선 별도 API로 만들지 않고, 프런트 또는 공통 계산 함수에서 조합한다.

| 메서드 | 경로                               | 설명                         |
| ------ | ---------------------------------- | ---------------------------- |
| `GET`  | `/api/auth/login`                  | Spotify 로그인 시작          |
| `GET`  | `/api/auth/callback`               | Spotify OAuth 콜백           |
| `POST` | `/api/auth/logout`                 | 세션 종료                    |
| `GET`  | `/api/me`                          | 현재 사용자 기본 정보        |
| `GET`  | `/api/me/player/currently-playing` | 현재 재생 상태               |
| `GET`  | `/api/me/player/recently-played`   | 최근 재생 원본 목록          |
| `GET`  | `/api/me/top/{type}`               | 상위 아티스트/트랙 원본 목록 |

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

### `GET /api/me/player/currently-playing`

현재 재생 중 카드에 필요한 데이터를 반환한다.  
재생 중인 항목이 없으면 `data`는 `null`이다.

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
      "artists": [{ "id": "artist_1", "name": "Neon Waves" }],
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

## 7.3 최근 재생 원본 목록

### `GET /api/me/player/recently-played`

최근 재생 타임라인과 각종 파생 지표 계산의 공통 원본 데이터를 반환한다.

#### Query

| 이름    | 필수   | 기본값 | 설명      |
| ------- | ------ | ------ | --------- |
| `limit` | 아니오 | `20`   | 최대 `50` |

#### Response

```json
{
  "data": [
    {
      "playedAt": "2026-03-22T08:51:00.000Z",
      "track": {
        "id": "track_1",
        "name": "Midnight Drive",
        "artists": [{ "id": "artist_1", "name": "Neon Waves" }],
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
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 7.4 상위 항목 원본 목록

### `GET /api/me/top/{type}`

기간별 상위 항목 원본 목록을 반환한다. `type`은 `artists` 또는 `tracks` 중 하나다.

#### Path

| 이름   | 필수 | 설명                    |
| ------ | ---- | ----------------------- |
| `type` | 예   | `artists` 또는 `tracks` |

#### Query

| 이름        | 필수   | 기본값       | 설명                            |
| ----------- | ------ | ------------ | ------------------------------- |
| `timeRange` | 아니오 | `short_term` | `short_term` 또는 `medium_term` |
| `limit`     | 아니오 | `10`         | 최대 `50`                       |

#### Response (`type=artists`)

```json
{
  "data": [
    {
      "rank": 1,
      "id": "artist_1",
      "name": "Neon Waves",
      "imageUrl": "https://..."
    }
  ],
  "meta": {
    "type": "artists",
    "timeRange": "short_term",
    "limit": 10,
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

#### Response (`type=tracks`)

```json
{
  "data": [
    {
      "rank": 1,
      "id": "track_1",
      "name": "Midnight Drive",
      "artists": [{ "id": "artist_1", "name": "Neon Waves" }],
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
    "type": "tracks",
    "timeRange": "short_term",
    "limit": 10,
    "requestedAt": "2026-03-22T09:00:00.000Z"
  }
}
```

---

## 7.5 파생 지표 계산 정의

### 8.1 Artist Diversity

- 원본: `GET /api/me/player/recently-played`
- 공식: `uniqueArtistCount / totalRecentTracks`

### 8.2 Repeat Rate

- 원본: `GET /api/me/player/recently-played`
- 공식: `1 - (uniqueTrackCount / totalRecentTracks)`

### 8.3 Artist Loyalty

- 원본: `GET /api/me/player/recently-played`
- 공식: `maxArtistPlayCount / totalRecentTracks`

### 8.4 Album Loyalty

- 원본: `GET /api/me/player/recently-played`
- 공식: `maxAlbumPlayCount / totalRecentTracks`

### 8.5 Album Diversity

- 원본: `GET /api/me/player/recently-played`
- 공식: `uniqueAlbumCount / totalRecentTracks`

### 8.6 Night Owl Index

- 원본: `GET /api/me/player/recently-played`
- 공식: `nightTrackCount / totalRecentTracks`
- 야간 범위: `21:00`부터 `03:59`

### 8.7 Peak Listening Hour

- 원본: `GET /api/me/player/recently-played`
- 공식: `argmax(hourBucketCount)`

---

## 8. 비범위 항목

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

## 9. 구현 메모

- 내부 구현은 Spotify 원본 응답과 분리된 DTO 또는 entity를 사용하는 것을 권장한다
- `recently-played`, `top/{type}` 같은 원본 리소스는 재사용 가능한 공통 데이터 소스로 유지한다
- 화면별 조합 데이터는 우선 프런트와 공통 계산 함수에서 해결하고, aggregate/BFF endpoint는 실제 필요가 생길 때 도입한다
- 캐싱을 적용한다면 `me`, `player/currently-playing`, `player/recently-played`, `top/{type}`에 endpoint 특성에 맞는 TTL을 둔다
