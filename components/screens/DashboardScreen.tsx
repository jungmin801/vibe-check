"use client";

import type { ButtonHTMLAttributes, ReactNode, SVGProps } from "react";
import { useState } from "react";

const genres = [
  { label: "Synthpop", pct: 38, color: "bg-chart-1" },
  { label: "Indie Rock", pct: 28, color: "bg-chart-3" },
  { label: "Electronic", pct: 22, color: "bg-chart-7" },
  { label: "Jazz Fusion", pct: 12, color: "bg-chart-2" },
];

const hourBars = [
  { label: "12am", h: 25 },
  { label: "4am", h: 12 },
  { label: "8am", h: 35 },
  { label: "12pm", h: 45 },
  { label: "4pm", h: 55 },
  { label: "8pm", h: 78 },
  { label: "11pm", h: 100 },
];

type Theme = "light" | "dark";

export function MusicInsightsDashboardScreen() {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <div data-theme={theme} className="app-backdrop min-h-screen text-ink antialiased">
      <header className="sticky top-0 z-10 border-b border-primary-faint bg-panel backdrop-blur-md">
        <div className="mx-auto flex h-[65px] max-w-[1280px] items-center justify-between px-5 md:px-20">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-control bg-primary-soft">
              <span className="text-sm font-black text-primary">V</span>
            </div>
            <span className="text-xl font-black tracking-tight text-ink">VibeCheck Insight</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <HeaderLink active label="Insights" />
            <HeaderLink label="Library" />
            <HeaderLink label="Social" />
          </nav>
          <div className="flex items-center gap-2">
            <IconButton
              label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
            >
              {theme === "light" ? <MoonIcon className="size-4" /> : <SunIcon className="size-4" />}
            </IconButton>
            <IconButton label="Search">
              <SearchIcon className="size-4" />
            </IconButton>
            <IconButton label="Notifications">
              <BellIcon className="size-4" />
            </IconButton>
            <div className="ml-1 rounded-full border-2 border-primary-faint p-0.5">
              <div className="size-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-700" />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-5 pb-16 pt-8 md:px-20">
        <section className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1">
              <span className="size-2 rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Dashboard
              </span>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight text-ink md:text-5xl md:leading-none">
                VibeCheck Dashboard
              </h1>
              <p className="text-base leading-6 text-muted">
                Welcome back, exploring your latest listening trends.
              </p>
            </div>
          </div>
          <div className="glass-card flex w-full max-w-sm flex-col gap-3 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">Syncing your library...</p>
                <p className="text-xs text-muted">Latest activity from your Spotify profile</p>
              </div>
              <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
                Active
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-elevated">
              <div className="h-full w-2/3 rounded-full bg-primary" />
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <section className="glass-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold text-ink">Now Playing</h2>
                <span className="rounded-md bg-primary-soft px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
                  Live
                </span>
              </div>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="size-28 shrink-0 rounded-card bg-gradient-to-br from-violet-600 to-indigo-900 shadow-glow-sm" />
                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <p className="text-xl font-bold text-ink">Midnight City</p>
                    <p className="text-sm text-muted">M83 • Hurry Up, We&apos;re Dreaming</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-elevated">
                      <div className="h-full w-[68%] rounded-full bg-primary" />
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-subtle">
                      <span>2:45</span>
                      <span>4:03</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <RoundCtrl aria-label="Previous" />
                    <RoundCtrl aria-label="Play" primary />
                    <RoundCtrl aria-label="Next" />
                  </div>
                </div>
              </div>
            </section>

            <section className="glass-card p-6">
              <div className="mb-6 flex items-start justify-between">
                <h2 className="text-sm font-bold text-ink">Genre Distribution</h2>
                <div className="text-right">
                  <p className="text-2xl font-black text-primary">12</p>
                  <p className="text-xs font-semibold text-muted">Genres</p>
                </div>
              </div>
              <ul className="space-y-4">
                {genres.map((g) => (
                  <li key={g.label}>
                    <div className="mb-1 flex justify-between text-xs font-semibold">
                      <span className="text-muted">{g.label}</span>
                      <span className="text-ink">{g.pct}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-surface-elevated">
                      <div className={`h-full rounded-full ${g.color}`} style={{ width: `${g.pct}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="glass-card p-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-bold text-ink">Top Artists</h2>
                <div className="flex rounded-control bg-surface-elevated/60 p-1">
                  <button
                    type="button"
                    className="rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-white"
                  >
                    1 Month
                  </button>
                  <button
                    type="button"
                    className="rounded-md px-3 py-1.5 text-xs font-bold text-muted hover:text-ink"
                  >
                    6 Months
                  </button>
                </div>
              </div>
              <ul className="space-y-4">
                <TopArtist rank="01" name="Tame Impala" meta="Psych Rock • 124 listens" tone="violet" />
                <TopArtist rank="02" name="Lana Del Rey" meta="Art Pop • 98 listens" tone="rose" />
                <TopArtist rank="03" name="Miles Davis" meta="Jazz • 82 listens" tone="amber" />
              </ul>
            </section>

            <section className="glass-card p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-bold text-ink">Top Tracks</h2>
                <button
                  type="button"
                  className="text-xs font-bold uppercase tracking-wide text-primary hover:underline"
                >
                  View all
                </button>
              </div>
              <ul className="divide-y divide-primary-faint">
                <TrackRow title="Borderline" artist="Tame Impala" plays={42} />
                <TrackRow title="Stargirl Interlude" artist="The Weeknd, Lana Del Rey" plays={38} />
                <TrackRow title="After Dark" artist="Mr.Kitty" plays={35} />
              </ul>
            </section>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="glass-card p-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-md bg-primary-soft px-2 py-1 text-[10px] font-bold text-primary">
                  Chart
                </span>
                <h2 className="text-sm font-bold text-ink">Listening by Hour</h2>
              </div>
              <p className="mb-6 text-xs text-muted">Your peak activity is at 10:00 PM</p>
              <div className="flex h-40 items-end justify-between gap-2 border-b border-primary-faint pb-1">
                {hourBars.map((b) => (
                  <div key={b.label} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full max-w-[2rem] rounded-t-md bg-gradient-to-t from-primary to-violet-400"
                      style={{ height: `${b.h}%` }}
                    />
                    <span className="text-[10px] font-bold text-subtle">{b.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-card p-6">
              <h2 className="mb-6 text-sm font-bold text-ink">Recent History</h2>
              <ul className="space-y-0">
                <HistoryRow title="Selfless" artist="The Strokes" time="2m ago" />
                <HistoryRow title="Sweater Weather" artist="The Neighbourhood" time="14m ago" />
                <HistoryRow title="Starboy" artist="The Weeknd" time="28m ago" />
                <HistoryRow title="Nightcall" artist="Kavinsky" time="45m ago" />
                <HistoryRow title="Blinding Lights" artist="The Weeknd" time="1h ago" isLast />
              </ul>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-primary-faint px-6 py-4 text-center text-xs text-subtle">
        <p className="font-semibold text-muted">VibeCheck Engine v2.4.0</p>
        <p className="mt-1">© 2024 VibeCheck Insight. Data refreshed every 6 hours.</p>
      </footer>
    </div>
  );
}

function HeaderLink({ label, active }: { label: string; active?: boolean }) {
  return (
    <a
      href="#"
      className={`border-b-2 pb-0.5 text-sm font-semibold transition ${
        active ? "border-primary text-primary" : "border-transparent text-muted hover:text-ink"
      }`}
    >
      {label}
    </a>
  );
}

function IconButton({
  label,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-control bg-primary-faint text-primary transition hover:bg-primary-soft"
      {...props}
    >
      {children}
    </button>
  );
}

function RoundCtrl({
  primary,
  ...props
}: { primary?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`flex size-10 items-center justify-center rounded-full border transition ${
        primary
          ? "border-primary bg-primary text-white shadow-glow-sm"
          : "border-line bg-surface-elevated text-muted hover:border-line-strong hover:text-ink"
      }`}
      {...props}
    />
  );
}

function TopArtist({
  rank,
  name,
  meta,
  tone,
}: {
  rank: string;
  name: string;
  meta: string;
  tone: "violet" | "rose" | "amber";
}) {
  const grad =
    tone === "violet"
      ? "from-violet-600 to-purple-900"
      : tone === "rose"
        ? "from-rose-600 to-pink-900"
        : "from-amber-500 to-orange-900";
  return (
    <li className="flex items-center gap-4">
      <span className="w-6 text-sm font-black text-subtle">{rank}</span>
      <div className={`size-12 shrink-0 rounded-full bg-gradient-to-br ${grad} ring-2 ring-surface-elevated`} />
      <div className="min-w-0 flex-1">
        <p className="font-bold text-ink">{name}</p>
        <p className="text-xs text-muted">{meta}</p>
      </div>
    </li>
  );
}

function TrackRow({ title, artist, plays }: { title: string; artist: string; plays: number }) {
  return (
    <li className="flex items-center justify-between gap-4 py-4 first:pt-0">
      <div className="min-w-0">
        <p className="font-bold text-ink">{title}</p>
        <p className="truncate text-xs text-muted">{artist}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-lg font-black text-primary">{plays}</p>
        <p className="text-[10px] font-bold uppercase tracking-wide text-subtle">Plays</p>
      </div>
    </li>
  );
}

function HistoryRow({
  title,
  artist,
  time,
  isLast,
}: {
  title: string;
  artist: string;
  time: string;
  isLast?: boolean;
}) {
  return (
    <li
      className={`flex items-start gap-4 py-3 ${!isLast ? "border-b border-primary-faint" : ""}`}
    >
      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary-faint" />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-ink">{title}</p>
        <p className="text-xs text-muted">{artist}</p>
      </div>
      <span className="shrink-0 text-xs font-bold text-subtle">{time}</span>
    </li>
  );
}

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function BellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}

function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646a9 9 0 1011.708 11.708z"
      />
    </svg>
  );
}

function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25M12 18.75V21M4.97 4.97l1.59 1.59M17.44 17.44l1.59 1.59M3 12h2.25M18.75 12H21M4.97 19.03l1.59-1.59M17.44 6.56l1.59-1.59M15.75 12A3.75 3.75 0 1112 8.25 3.75 3.75 0 0115.75 12z"
      />
    </svg>
  );
}
