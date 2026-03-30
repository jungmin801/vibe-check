"use client";

import { useState } from "react";
import { AppHeader } from "@/components/shared/AppHeader";
import { GenreDistributionCard } from "@/components/dashboard/GenreDistributionCard";
import { ListeningByHourCard } from "@/components/dashboard/ListeningByHourCard";
import { NowPlayingCard } from "@/components/dashboard/NowPlayingCard";
import { PageContainer } from "@/components/shared/PageContainer";
import { RecentHistoryCard } from "@/components/dashboard/RecentHistoryCard";
import { SyncStatusCard } from "@/components/dashboard/SyncStatusCard";
import { TopArtistsSection } from "@/components/dashboard/TopArtistsSection";
import { TopTracksSection } from "@/components/dashboard/TopTracksSection";
import { IconButton } from "@/components/ui/IconButton";
import { MoonIcon, SunIcon } from "@/components/ui/Icons";

type Theme = "light" | "dark";

export function MusicInsightsDashboardScreen() {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <div
      data-theme={theme}
      className="app-backdrop min-h-screen text-ink antialiased"
    >
      <AppHeader
        activeNav="Dashboard"
        leadingActions={
          <IconButton
            label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
            onClick={() =>
              setTheme((prev) => (prev === "light" ? "dark" : "light"))
            }
          >
            {theme === "light" ? (
              <MoonIcon className="size-4" />
            ) : (
              <SunIcon className="size-4" />
            )}
          </IconButton>
        }
      />

      <PageContainer className="pb-16 pt-8">
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
          <SyncStatusCard />
        </section>

        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <NowPlayingCard />
            <GenreDistributionCard />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <TopArtistsSection />
            <TopTracksSection />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <ListeningByHourCard />
            <RecentHistoryCard />
          </div>
        </div>
      </PageContainer>

      <footer className="border-t border-primary-faint px-6 py-4 text-center text-xs text-subtle">
        <p className="font-semibold text-muted">VibeCheck Engine v2.4.0</p>
        <p className="mt-1">
          © 2024 VibeCheck Insight. Data refreshed every 6 hours.
        </p>
      </footer>
    </div>
  );
}
