"use client";

import type { ButtonHTMLAttributes, ReactNode, SVGProps } from "react";
import { useState } from "react";

type Theme = "light" | "dark";

export function LoginScreen() {
  const [theme, setTheme] = useState<Theme>("dark");

  return (
    <div data-theme={theme} className="app-backdrop min-h-screen text-ink antialiased">
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 md:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute bottom-16 left-12 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute right-12 top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="absolute right-5 top-5 z-10 md:right-8 md:top-8">
          <ThemeButton
            label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
          </ThemeButton>
        </div>

        <section className="relative z-10 w-full max-w-[1280px]">
          <div className="mx-auto flex w-full max-w-[576px] flex-col items-center">
            <div
              className={`w-full rounded-[16px] border px-6 py-12 text-center shadow-glass backdrop-blur-[16px] sm:px-16 sm:py-16 ${
                theme === "dark"
                  ? "border-primary-faint bg-panel"
                  : "border-black/[0.08] bg-white/70"
              }`}
            >
              <div className="mb-10 flex justify-center">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                  <div className="absolute -inset-5 rounded-full bg-primary/25 blur-2xl" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-primary/15">
                    <span className="text-3xl font-black tracking-tight text-primary">V</span>
                  </div>
                </div>
              </div>

              <h1 className="text-5xl font-black tracking-[-0.06em] text-ink sm:text-6xl sm:leading-[1]">
                Connect your
                <br />
                vibe
              </h1>

              <p className="mx-auto mt-9 max-w-[384px] text-base leading-7 text-muted sm:text-lg sm:leading-[1.625]">
                Sync your Spotify account to visualize your listening habits in a high-fidelity
                cinematic environment.
              </p>

              <button
                type="button"
                className={`mx-auto mt-12 inline-flex h-[68px] w-full max-w-[256px] items-center justify-center gap-3 rounded-full border font-bold shadow-[0_12px_30px_rgba(29,185,84,0.28)] transition hover:scale-[1.01] hover:brightness-105 ${
                  theme === "dark"
                    ? "border-white/20 bg-[#1DB954] text-black"
                    : "border-white/30 bg-[#1DB954] text-white"
                }`}
              >
                <SpotifyIcon className="size-[18px]" />
                <span className="text-lg tracking-[-0.025em]">Login with Spotify</span>
              </button>

              <div className="mt-14 space-y-2 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-subtle">
                  Secure Authentication
                </p>
                <p className="mx-auto max-w-[296px] text-[11px] leading-[1.5] text-muted">
                  We use Spotify OAuth for secure access. VibeCheck never stores your password or
                  personal identification data.
                </p>
              </div>
            </div>

            <div className="mt-12 flex w-full items-center justify-between px-4 text-[8px] font-black uppercase tracking-[0.2em] text-muted">
              <div className="flex items-center gap-2">
                <span className="h-1 w-12 rounded-full bg-primary/80" />
                <span>Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Sync</span>
                <span className="h-1 w-12 rounded-full bg-accent/75" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ThemeButton({
  label,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-full border border-line bg-panel text-ink shadow-glass backdrop-blur-md transition hover:border-line-strong"
      {...props}
    >
      {children}
    </button>
  );
}

function SpotifyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.503 17.305a.747.747 0 0 1-1.028.247c-2.816-1.72-6.36-2.11-10.534-1.158a.749.749 0 1 1-.332-1.46c4.568-1.043 8.482-.597 11.647 1.338a.75.75 0 0 1 .247 1.033Zm1.469-3.271a.934.934 0 0 1-1.286.308c-3.223-1.981-8.135-2.554-11.949-1.395a.937.937 0 0 1-.544-1.793c4.356-1.322 9.779-.684 13.473 1.586a.936.936 0 0 1 .306 1.294Zm.126-3.405C15.25 8.341 8.909 8.125 5.23 9.241a1.123 1.123 0 0 1-.654-2.15c4.223-1.282 11.244-1.034 15.698 1.61a1.124 1.124 0 1 1-1.176 1.928Z" />
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
