# VibeCheck Design Concept

## 1. Overview

**VibeCheck**는 Spotify 데이터를 기반으로 사용자의 음악 취향과 감상
패턴을 분석하는 **Music Analytics Dashboard**이다.

디자인 컨셉은 다음 키워드를 중심으로 한다.

-   Night music analytics
-   Neon accent
-   Glassmorphism UI
-   Floating dashboard widgets
-   Mood / vibe driven visuals

전체적인 느낌

> 어두운 공간 위에 유리 카드들이 떠 있고 네온 컬러가 은은하게 반사되는
> 대시보드

------------------------------------------------------------------------

# 2. Core Design Principles

## 2.1 Glassmorphism 중심 UI

UI의 핵심 스타일은 **Glassmorphism**이다.

-   유리처럼 보이는 카드 UI
-   background blur
-   semi‑transparent surfaces
-   subtle border
-   soft shadows

Glassmorphism은 **UI의 포인트 요소**로 사용한다.

주의 사항

-   과도한 blur 사용 금지
-   너무 많은 glass 레이어 사용 금지
-   주요 카드 위주로 적용

------------------------------------------------------------------------

## 2.2 Subtle Neon Accent

네온 컬러는 브랜드 아이덴티티이지만 **과하게 사용하지 않는다.**

목적

-   강조 요소
-   hover 효과
-   차트 색상
-   포커스 상태

네온 사용 영역

-   active elements
-   highlight
-   data visualization
-   interaction feedback

**중요 원칙**

> Neon은 UI 전체가 아니라 accent 역할만 한다.

------------------------------------------------------------------------

# 3. Color System

Spotify Green을 사용하지 않고 **VibeCheck만의 컬러 아이덴티티**를
사용한다.

## Brand Palette

Primary: #7C5CFF\
Secondary: #FF4FD8\
Accent: #00E5FF\
Highlight: #FFD166

특징

-   음악 서비스와 잘 어울리는 Neon 계열
-   Dark mode에서 시각적으로 강함
-   데이터 시각화에 적합

------------------------------------------------------------------------

# 4. Theme Support

VibeCheck는 **Light Mode / Dark Mode**를 모두 지원한다.

## 4.1 Dark Mode (Primary Experience)

Dark mode가 기본 경험이다.

Background: #0F0F14\
Surface: rgba(255,255,255,0.05)\
Border: rgba(255,255,255,0.15)

Text Primary: #F5F5F7\
Text Muted: #9CA3AF

특징

-   Night UI
-   Glassmorphism과 자연스럽게 결합
-   Neon accent가 잘 보임

------------------------------------------------------------------------

## 4.2 Light Mode

Light mode에서는 Glass 효과를 줄인다.

Background: #F7F7FB\
Surface: rgba(255,255,255,0.7)\
Border: rgba(0,0,0,0.08)

Text Primary: #111111\
Text Muted: #6B7280

------------------------------------------------------------------------

# 5. Glass Card Style

Glass UI 기본 스타일

background: rgba(255,255,255,0.05)\
backdrop-filter: blur(16px)\
border: 1px solid rgba(255,255,255,0.1)\
border-radius: 16px

Card 특징

-   floating card
-   subtle blur
-   minimal shadow

------------------------------------------------------------------------

# 6. Interaction

Hover 효과

transform: scale(1.02)

box-shadow:\
0 0 20px rgba(124,92,255,0.25)

주의

-   glow는 과하지 않게
-   subtle한 interaction

------------------------------------------------------------------------

# 7. Chart Color Palette

#7C5CFF\
#FF4FD8\
#00E5FF\
#FFD166\
#FF6B6B\
#5EEAD4\
#C084FC

사용 영역

-   genre distribution
-   listening trend
-   artist ranking
-   listening statistics

------------------------------------------------------------------------

# 8. Background Style

추천 배경

radial-gradient(circle at 20% 30%, #1A1A2E, transparent 40%)\
radial-gradient(circle at 80% 70%, #2A1E5C, transparent 40%)

특징

-   depth
-   subtle glow
-   atmospheric mood

------------------------------------------------------------------------

# 9. Typography

추천 폰트

-   Inter
-   Satoshi
-   Plus Jakarta Sans

Font scale

Title: 28px\
Subtitle: 20px\
Body: 14px\
Caption: 12px

------------------------------------------------------------------------

# 10. Dashboard Layout Concept

대시보드는 **floating widget 구조**를 사용한다.

예시 구성

-   Listening Time
-   Top Genre
-   Tracks Played
-   Top Artists
-   Listening Trends
-   Favorite Tracks
-   Genre Breakdown

각 위젯은 **Glass Card** 형태로 구성된다.

------------------------------------------------------------------------

# 11. Design Summary

VibeCheck UI 특징

-   Dark-first dashboard
-   Glassmorphism UI
-   Subtle neon accents
-   Floating analytics widgets
-   Mood-driven visual style

핵심 원칙

Neon은 강조용\
Glassmorphism은 UI 포인트\
전체 UI는 과하지 않고 깔끔하게 유지
