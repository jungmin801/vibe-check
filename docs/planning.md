# Spotify Dashboard 기획서

## 1. 프로젝트 방향

이 프로젝트는 **Wrapped형 연말 스토리**가 아니라, **현재 시점 기준의 데이터 분석형 대시보드**를 목표로 한다. 데이터 저장 없이 **Spotify Web API가 현재 제공하는 조회 결과만으로 계산 가능한 지표**만 사용한다. 따라서 장기 누적 집계(월별 총 청취시간, 연간 총 재생 수, 정확한 재생 횟수 등)는 제외한다. Spotify의 Top Items API는 `short_term`(약 4주), `medium_term`(약 6개월), `long_term`(약 1년) 범위를 지원하고, Recently Played API는 최근 재생 기록을 제공한다. citeturn197558search0turn197558search1

## 2. 페이지 구성

### 2.1 Dashboard
Dashboard는 **사실 기반 요약 화면**이다. 사용자가 지금 어떤 음악을 듣고 있는지, 최근/중기 취향이 무엇인지, 장르 분포가 어떤지 한눈에 보여준다.

구성 원칙:
- 랭킹과 차트 중심
- 현재/최근 취향을 직관적으로 노출
- 해석보다 “무엇을 듣는가”에 초점

### 2.2 Insight
Insight는 **해석 기반 화면**이다. Recently Played와 Top Items를 가공해서 “얼마나 다양하게 듣는지”, “반복해서 듣는지”, “밤에 듣는 편인지”, “최근 급상승한 아티스트가 누구인지” 같은 성향형 지표를 보여준다.

구성 원칙:
- 계산 지표 중심
- 카드형 요약 + 설명 문구
- Dashboard보다 더 개인화된 해석 제공

---

## 3. API 사용 범위

이 기획서에서 사용하는 API는 아래와 같다.

### 3.1 Top Items
- 엔드포인트: `GET /me/top/{type}`
- 타입: `artists`, `tracks`
- 기간: `short_term`, `medium_term`, `long_term`
- 의미: Spotify가 계산한 affinity 기반 상위 아티스트/트랙 조회 citeturn197558search0

### 3.2 Recently Played
- 엔드포인트: `GET /me/player/recently-played`
- 의미: 최근 재생 트랙 기록 조회
- 특징: 최근 재생 로그와 `played_at` 제공 citeturn197558search1

### 3.3 Saved Tracks
- 엔드포인트: `GET /me/tracks`
- 의미: 사용자가 라이브러리에 저장한 곡 조회
- 특징: `added_at` 제공 citeturn197558search2

### 3.4 Currently Playing
- 엔드포인트: `GET /me/player/currently-playing`
- 의미: 현재 재생 중인 곡/재생 상태 조회 citeturn197558search3

---

## 4. Dashboard 지표 설계

## 4.1 현재 재생 중 카드 (Now Playing)

**목적**
- 사용자가 지금 듣고 있는 곡을 즉시 보여주는 실시간 카드

**API**
- `GET /me/player/currently-playing` citeturn197558search3

**기간 기준**
- 실시간, 기간 없음

**사용 데이터**
- `item.id`
- `item.name`
- `item.artists[]`
- `item.album.images`
- `is_playing`
- `progress_ms`
- `item.duration_ms`

**산출 방식**
- 현재 재생 중이면 트랙명, 아티스트명, 앨범 커버, 재생 상태 표시
- 진행률은 `progress_ms / duration_ms`

**UI 예시**
- 앨범 커버 + 곡명 + 아티스트
- 재생 중 / 일시정지 뱃지
- 진행률 바

---

## 4.2 Top Artists 랭킹

**목적**
- 사용자의 대표 취향 아티스트를 기간별로 보여줌

**API**
- `GET /me/top/artists?time_range=short_term&limit=10`
- `GET /me/top/artists?time_range=medium_term&limit=10` citeturn197558search0

**기간 기준**
- `short_term`: 최근 약 4주
- `medium_term`: 최근 약 6개월 citeturn197558search0

**사용 데이터**
- `items[].id`
- `items[].name`
- `items[].images`
- `items[].genres`
- `items[].popularity`

**산출 방식**
- API 응답 순서를 그대로 순위로 사용
- 1~10위 리스트 렌더링
- 탭으로 `최근 1개월`, `최근 6개월` 전환

**UI 예시**
- 아티스트 썸네일 + 이름 + 순위

---

## 4.3 Top Tracks 랭킹

**목적**
- 기간별 상위 곡을 보여줌

**API**
- `GET /me/top/tracks?time_range=short_term&limit=10`
- `GET /me/top/tracks?time_range=medium_term&limit=10` citeturn197558search0

**기간 기준**
- `short_term`: 최근 약 4주
- `medium_term`: 최근 약 6개월 citeturn197558search0

**사용 데이터**
- `items[].id`
- `items[].name`
- `items[].artists[]`
- `items[].album.images`
- `items[].duration_ms`
- `items[].explicit`

**산출 방식**
- API 응답 순서를 그대로 순위로 사용
- 1~10위 리스트 렌더링
- 탭으로 `최근 1개월`, `최근 6개월` 전환

---

## 4.4 Genre Distribution + Genre Diversity

**목적**
- 사용자가 주로 듣는 장르 상위 5개와 그 비율을 보여줌
- 별도 diversity 카드를 분리하지 않고 같은 섹션에서 함께 표현

**API**
- `GET /me/top/artists?time_range=short_term&limit=50`
- `GET /me/top/artists?time_range=medium_term&limit=50` citeturn197558search0

**기간 기준**
- `short_term`: 최근 약 4주
- `medium_term`: 최근 약 6개월 citeturn197558search0

**사용 데이터**
- `items[].genres`
- `items[].name`

**산출 방식**
1. Top artists 응답에서 모든 `genres`를 펼친다.
2. 장르별 등장 횟수를 카운트한다.
3. 전체 장르 등장 횟수 대비 각 장르 비율을 계산한다.
4. 비율이 높은 순으로 정렬한다.
5. 상위 5개 장르만 노출한다.
6. 같은 섹션에서 `고유 장르 수(unique genres)`를 함께 표시한다.

**비율 공식**
- `genreRatio = 특정 장르 count / 전체 genre count`

**변화 비교**
- `short_term`과 `medium_term`을 각각 계산해서 나란히 보여준다.
- 이를 통해 “최근 1개월 vs 최근 6개월 장르 변화”를 시각화한다.

**UI 예시**
- 도넛 차트 또는 가로 바 차트
- 상위 5개 장르 비율
- `최근 1개월 / 최근 6개월` 비교 토글
- 보조 문구: `고유 장르 수 18개`

**비고**
- 요청한 방향에 맞춰 **가중치 없이 단순 count 기반**으로 계산한다.

---

## 4.5 Recently Played Timeline

**목적**
- 사용자가 최근에 어떤 곡을 들었는지 시간순으로 보여줌

**API**
- `GET /me/player/recently-played?limit=20` citeturn197558search1

**기간 기준**
- Spotify의 Recently Played 범위 내 최근 데이터

**사용 데이터**
- `items[].track.id`
- `items[].track.name`
- `items[].track.artists[]`
- `items[].track.album.images`
- `items[].played_at`

**산출 방식**
- 응답 순서대로 최신순 렌더링
- `played_at`을 사용자 로컬 시간대로 변환 후 표시

**UI 예시**
- 리스트 또는 타임라인
- 재생 시각, 곡명, 아티스트, 앨범 커버

---

## 4.6 Listening by Hour

**목적**
- 최근 재생 데이터 기준으로 어느 시간대에 주로 듣는지 보여줌

**API**
- `GET /me/player/recently-played?limit=50` citeturn197558search1

**기간 기준**
- Recently Played가 제공하는 최근 재생 범위 내 최신 최대 50건

**사용 데이터**
- `items[].played_at`

**산출 방식**
1. 각 `played_at`을 사용자 로컬 시간대로 변환한다.
2. 시간(hour)만 추출한다.
3. `0~23` 버킷으로 카운트한다.
4. 시간대별 재생 횟수 차트를 만든다.

**비고**
- 이 지표는 장기 습관 분석이 아니라, **최근 재생 기준 시간 분포**로 해석해야 한다.
- 24시간 기반이라 요일 분석은 제외한다.

**UI 예시**
- 24시간 막대 차트

---

## 5. Insight 지표 설계

## 5.1 Artist Diversity Score

**목적**
- 최근 재생 기준으로 얼마나 다양한 아티스트를 듣는지 보여줌

**API**
- `GET /me/player/recently-played?limit=50` citeturn197558search1

**기간 기준**
- Recently Played 최신 최대 50건

**사용 데이터**
- `items[].track.artists[].id`

**산출 방식**
1. 최근 재생 50건에서 아티스트 id를 수집한다.
2. 중복 제거한 고유 아티스트 수를 센다.
3. `고유 아티스트 수 / 전체 최근 재생 수`로 비율 계산

**공식**
- `artistDiversity = uniqueArtistCount / totalRecentTracks`

**예시 해석**
- 높을수록 넓게 탐색하는 타입
- 낮을수록 적은 수의 아티스트를 반복 청취하는 타입

---

## 5.2 Repeat Rate

**목적**
- 같은 곡을 반복해서 듣는 정도를 보여줌

**API**
- `GET /me/player/recently-played?limit=50` citeturn197558search1

**기간 기준**
- Recently Played 최신 최대 50건

**사용 데이터**
- `items[].track.id`

**산출 방식**
1. 최근 재생의 트랙 id 목록을 만든다.
2. 고유 트랙 수를 센다.
3. `1 - (고유 트랙 수 / 전체 최근 재생 수)` 계산

**공식**
- `repeatRate = 1 - (uniqueTrackCount / totalRecentTracks)`

**예시 해석**
- 높을수록 돌려듣는 성향
- 낮을수록 다양한 곡을 넘겨가며 듣는 성향

---

## 5.3 Artist Loyalty Score

**목적**
- 특정 아티스트에 얼마나 편중되어 있는지 보여줌

**API**
- `GET /me/player/recently-played?limit=50` citeturn197558search1

**기간 기준**
- Recently Played 최신 최대 50건

**사용 데이터**
- `items[].track.artists[].id`
- `items[].track.artists[].name`

**산출 방식**
1. 최근 재생 데이터에서 아티스트별 등장 횟수를 센다.
2. 가장 많이 등장한 아티스트의 등장 횟수를 구한다.
3. `최다 등장 횟수 / 전체 최근 재생 수` 계산

**공식**
- `artistLoyalty = maxArtistPlayCount / totalRecentTracks`

**보조 데이터**
- 최다 등장 아티스트 이름

**예시 해석**
- 높을수록 한 아티스트에 몰입하는 최근 청취 패턴

---

## 5.4 Night Owl Index

**목적**
- 밤 시간대 청취 비중을 보여줌

**API**
- `GET /me/player/recently-played?limit=50` citeturn197558search1

**기간 기준**
- Recently Played 최신 최대 50건

**사용 데이터**
- `items[].played_at`

**산출 방식**
1. `played_at`을 로컬 시간으로 변환한다.
2. 시간(hour)이 `21:00~03:59`에 속하는 항목 수를 센다.
3. `밤 시간대 재생 수 / 전체 최근 재생 수` 계산

**공식**
- `nightOwlIndex = nightTrackCount / totalRecentTracks`

**예시 해석**
- 높을수록 최근 청취가 야간에 집중됨

---

## 5.5 Peak Listening Hour

**목적**
- 가장 많이 듣는 시간을 카드형으로 요약

**API**
- `GET /me/player/recently-played?limit=50` citeturn197558search1

**기간 기준**
- Recently Played 최신 최대 50건

**사용 데이터**
- `items[].played_at`

**산출 방식**
1. `played_at`에서 로컬 시간 hour를 추출한다.
2. 시간대별 카운트를 만든다.
3. count가 가장 큰 hour를 선택한다.

**공식**
- `peakHour = argmax(hourBucketCount)`

**비고**
- Dashboard의 Listening by Hour와 같은 원데이터를 쓰지만, Insight에서는 한 줄 요약 카드로 보여준다.

---

## 5.6 Trend Artists

**목적**
- 최근 1개월 기준으로 급상승한 아티스트를 보여줌

**API**
- `GET /me/top/artists?time_range=short_term&limit=50`
- `GET /me/top/artists?time_range=medium_term&limit=50` citeturn197558search0

**기간 기준**
- `short_term`: 최근 약 4주
- `medium_term`: 최근 약 6개월 citeturn197558search0

**사용 데이터**
- `items[].id`
- `items[].name`
- 각 배열 내 index(순위)

**산출 방식**
1. `medium_term` 리스트와 `short_term` 리스트를 각각 map으로 만든다.
2. 같은 아티스트 id의 순위를 비교한다.
3. `mediumRank - shortRank`가 큰 아티스트를 최근 상승 아티스트로 본다.
4. `short_term`에는 있으나 `medium_term`에 없는 경우는 “new/rising”으로 별도 표기 가능

**공식**
- `rankDelta = mediumRank - shortRank`
- 값이 클수록 최근 선호도가 상승한 것으로 해석

**출력 예시**
- 최근 급상승 아티스트 Top 3
- 상승 폭(예: `+12`)

---

## 5.7 Trend Tracks

**목적**
- 최근 1개월 기준으로 급상승한 곡을 보여줌

**API**
- `GET /me/top/tracks?time_range=short_term&limit=50`
- `GET /me/top/tracks?time_range=medium_term&limit=50` citeturn197558search0

**기간 기준**
- `short_term`: 최근 약 4주
- `medium_term`: 최근 약 6개월 citeturn197558search0

**사용 데이터**
- `items[].id`
- `items[].name`
- `items[].artists[]`
- 각 배열 내 index(순위)

**산출 방식**
- Trend Artists와 동일한 방식으로 순위 차이를 계산

**공식**
- `rankDelta = mediumRank - shortRank`

---

## 5.8 Save-to-Taste Overlap

**목적**
- 많이 듣는 곡과 실제로 저장해 둔 곡이 얼마나 겹치는지 보여줌

**API**
- `GET /me/top/tracks?time_range=medium_term&limit=50`
- `GET /me/tracks?limit=50` 또는 페이지네이션 조회 citeturn197558search0turn197558search2

**기간 기준**
- 청취 취향 기준: 최근 약 6개월(`medium_term`)
- 저장 기준: 현재 라이브러리 보유 곡

**사용 데이터**
- Top Tracks: `items[].id`
- Saved Tracks: `items[].track.id`, `items[].added_at`

**산출 방식**
1. Top track id 집합 생성
2. Saved track id 집합 생성
3. 두 집합의 교집합 수 계산
4. `교집합 수 / Top track 수`

**공식**
- `saveTasteOverlap = overlapCount / totalTopTracks`

**예시 해석**
- 높을수록 좋아하는 곡을 라이브러리에 잘 저장하는 편

**비고**
- Saved Tracks는 페이지네이션 대상이므로 MVP에서는 첫 50~100개만 사용하거나, 전체 수집 전략을 별도로 정의할 수 있다. citeturn197558search2

---

## 6. 최종 페이지별 지표 요약

## 6.1 Dashboard
- 현재 재생 중 카드 (Now Playing)
- Top Artists (`short_term`, `medium_term`)
- Top Tracks (`short_term`, `medium_term`)
- Genre Distribution + Genre Diversity (`short_term`, `medium_term`)
- Recently Played Timeline
- Listening by Hour

## 6.2 Insight
- Artist Diversity Score
- Repeat Rate
- Artist Loyalty Score
- Night Owl Index
- Peak Listening Hour
- Trend Artists
- Trend Tracks
- Save-to-Taste Overlap

---

## 7. 제외하는 지표

아래 지표는 **DB 저장 없이 정확하게 산출하기 어렵기 때문에 이번 범위에서 제외**한다.

- 월별 총 청취 시간
- 연간 총 청취 시간
- 정확한 재생 횟수
- 주간/월간/연간 요일 패턴
- Wrapped형 연말 리포트 지표
- “올해 처음 발견한 아티스트 수” 같은 장기 누적 지표

이유는 Spotify Web API가 장기 raw listening history 전체를 제공하지 않기 때문이다. Top Items는 affinity 기반 순위이고, Recently Played는 최근 재생 로그 조회용이다. citeturn197558search0turn197558search1

---

## 8. 구현 메모

### 8.1 기간 표기
- `short_term` → UI에서는 `최근 1개월`로 표기
- `medium_term` → UI에서는 `최근 6개월`로 표기

공식 문서상 정확한 달력 기간이 아니라 **약 4주 / 약 6개월**이므로, 내부 문서에는 이 점을 명시하는 것이 안전하다. citeturn197558search0

### 8.2 Recently Played 해석
- Recently Played는 **장기 분석 데이터가 아니라 최근 재생 기록**으로 해석해야 한다.
- 따라서 Listening by Hour, Night Owl Index, Repeat Rate 등은 모두 **최근 재생 기준의 최근 패턴**이다. citeturn197558search1

### 8.3 MVP 우선순위 추천
1. Dashboard 기본 구성
2. Insight 카드 4종(Artist Diversity, Repeat Rate, Loyalty, Night Owl)
3. Trend Artists / Trend Tracks
4. Save-to-Taste Overlap

이 순서로 개발하면 초기 완성도가 높고, 추후 저장 구조를 붙여 확장하기도 쉽다.
