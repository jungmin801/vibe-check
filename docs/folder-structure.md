# Spotify Dashboard — 폴더 구조 제안

기획서(`spotify_dashboard_planning.md`)의 **API 범위(Top / Recently / Saved / Currently Playing)**와 **Dashboard vs Insight** 화면을 기준으로, **entity · model · UI**를 분리한다.

## 설계 원칙

1. **Entity**: Spotify JSON을 가공한 **앱이 이해하는 도메인 객체** (트랙, 아티스트, 재생 기록, 순위 항목 등). 화면·API 세부와 무관하게 재사용.
2. **Model (DTO / API shape)**: **Spotify Web API 응답에 가까운 타입**과 요청 파라미터. 외부 계약이 바뀌면 여기만 수정.
3. **Mapper**: `model` → `entity` 변환. 한 방향으로만 두면 추적이 쉽다.
4. **Metrics / Insights**: **순수 함수**로 지표 계산 (장르 분포, diversity, trend rank delta 등). React·fetch에 의존하지 않음.
5. **UI**: 페이지·섹션·차트·카드 컴포넌트. 데이터는 entity 또는 **뷰용 조합 타입(view model)**만 받도록 제한.
6. **App Router (`app/`)**: 라우팅·레이아웃·Server Component에서 데이터 조합만 담당하고, 무거운 계산은 `lib/metrics`로 위임.

현재 레포는 **Next.js 16 App Router**, `app/`이 루트에 있으므로 아래는 **루트 `app/` 유지** 전제다.

---

## 디렉터리 트리 (권장)

```
app/
  layout.tsx
  page.tsx                          # 랜딩 또는 /dashboard 리다이렉트
  dashboard/
    page.tsx                        # Dashboard 화면
  insight/
    page.tsx                        # Insight 화면
  api/                              # (선택) Route Handlers: 토큰 교환, 프록시 등

lib/
  entities/                         # 도메인 엔티티 (정규화된 형태)
    artist.ts
    track.ts
    album.ts
    play-history-item.ts            # recently-played 한 줄
    top-item.ts                     # 순위와 함께 쓰는 공통 래퍼 (선택)
    currently-playing.ts
    saved-track.ts
    index.ts

  spotify/                          # Spotify 전용: 클라이언트 + DTO(model)
    client.ts                       # fetch 래퍼, 공통 헤더/에러
    endpoints.ts                    # URL/쿼리 조립 (time_range, limit)
    models/                         # API 응답/요청에 맞는 TypeScript 타입 (DTO)
      top-artists-response.ts
      top-tracks-response.ts
      recently-played-response.ts
      saved-tracks-response.ts
      currently-playing-response.ts
    mappers/                        # models → entities
      to-artist.ts
      to-track.ts
      to-play-history-item.ts
      ...

  metrics/                          # 기획서 §4·§5 지표: 순수 함수만
    genre-distribution.ts           # §4.4
    listening-by-hour.ts            # §4.6, §5.5와 공유 원데이터 가공
    artist-diversity.ts             # §5.1
    repeat-rate.ts                  # §5.2
    artist-loyalty.ts               # §5.3
    night-owl-index.ts              # §5.4
    peak-listening-hour.ts          # §5.5
    trend-rank-delta.ts             # §5.6, §5.7 공통 로직
    save-taste-overlap.ts           # §5.8
    time-range.ts                   # short/medium 라벨·상수 (§8.1)

  auth/                             # (OAuth 시) 세션·토큰 유틸

components/
  ui/                               # 버튼, 탭, 카드 뼈대 등 디자인 시스템 (추가 시)
  dashboard/                        # Dashboard 전용 블록
    now-playing-card.tsx
    top-artists-section.tsx
    top-tracks-section.tsx
    genre-section.tsx
    recent-timeline.tsx
    listening-by-hour-chart.tsx
  insight/                          # Insight 전용 블록
    metric-card.tsx
    trend-artists.tsx
    trend-tracks.tsx
    save-overlap-card.tsx
  shared/                           # 두 페이지 공통
    spotify-image.tsx
    rank-list.tsx
    time-range-tabs.tsx
```

---

## Entity vs Model 구분 (기획서 매핑)

| 기획 개념 | Model (DTO) 쪽 | Entity 쪽 |
|-----------|----------------|-----------|
| Top artists/tracks 응답 | `spotify/models/*-response` | `Artist`, `Track` + 순위(index) |
| Recently played | paging wrapper + `PlayHistoryObject` 형 | `PlayHistoryItem` (track + `playedAt`) |
| Saved tracks | `SavedTrackObject` | `SavedTrack` (track + `addedAt`) |
| Currently playing | player state + `item` | `CurrentlyPlaying` (progress, `isPlaying`, track) |

지표 입력은 가능하면 **entity 배열**(또는 그에 준하는 최소 필드)만 받게 두면, 테스트와 Storybook이 쉬워진다.

---

## “Model”을 한 층 더 쓰고 싶을 때 (선택)

화면별로 여러 entity를 묶은 **뷰 모델**만 별도로 두고 싶다면 `lib/view-models/` 또는 `features/*/model.ts`에 둔다.

- 예: `DashboardData`, `InsightData` — 서버에서 여러 API를 병렬 호출한 뒤 조합한 결과 타입.
- **주의**: 비즈니스 규칙(장르 count, trend delta)은 여기에 두지 말고 `lib/metrics`에 둔다.

---

## MVP 우선순위와 폴더 작업 순서 (기획 §8.3)

1. `lib/spotify/models` + `mappers` + `entities` 최소 세트 (Track, Artist, PlayHistoryItem).
2. `app/dashboard/page.tsx` + `components/dashboard/*`.
3. `lib/metrics`에서 diversity / repeat / loyalty / night owl.
4. trend + save overlap용 metrics + `components/insight/*`.

---

## 참고

- 기간 라벨(`short_term` → UI `최근 1개월`)은 `lib/metrics/time-range.ts` 또는 `lib/spotify/constants.ts` 한곳에만 정의한다.
- OAuth·토큰은 `app/api/*` + `lib/auth`로 격리하면 UI와 entity 계층이 깨끗해진다.
