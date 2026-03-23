import type { ReactNode } from "react";
import { AppHeader } from "@/components/shared/AppHeader";
import { PageContainer } from "@/components/shared/PageContainer";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { ShareIcon } from "@/components/ui/Icons";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export function MusicDnaScreen() {
  return (
    <div className="app-backdrop min-h-screen text-ink antialiased">
      <AppHeader activeNav="Insights" />

      <PageContainer className="pb-16 pt-8">
        <section className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1">
              <span className="size-2 rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Live Analysis
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-ink md:text-5xl md:leading-none">
              Your Music DNA
            </h1>
            <p className="text-base leading-6 text-muted">
              A deep dive into your sonic architecture. We&apos;ve analyzed 2,482 streams to map your
              unique listening profile for June 2024.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">
              <ShareIcon className="size-4" />
              Share DNA
            </Button>
            <Button variant="secondary">Export Data</Button>
          </div>
        </section>

        <section className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Artist Diversity"
            badgeClass="bg-success"
            value="78%"
            delta="+5.2%"
            deltaClass="text-success"
            description="Your palette is expanding into Indie- Folk and Lofi House this month."
            footer={<ProgressBar value={78} className="h-1" />}
          />
          <StatCard
            title="Repeat Rate"
            badgeClass="bg-danger"
            value="42%"
            delta="-2.1%"
            deltaClass="text-danger"
            description="You're seeking new sounds. Your 'Obsession Factor' has decreased significantly."
            footer={<MiniBarChart />}
          />
          <StatCard
            title="Night Owl Index"
            badgeClass="bg-warning"
            value="65/100"
            description="Most active between 11 PM — 2 AM. Your peak listening hour is midnight."
            footer={
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <span className="text-subtle">Day</span>
                <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-warning via-indigo-900 to-indigo-900" />
                <span className="text-primary">Night</span>
              </div>
            }
          />
          <StatCard
            title="Taste Overlap"
            badgeClass="bg-primary"
            value="92%"
            description="Your saved tracks perfectly match your daily listening habits this week."
            footer={
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full border border-canvas-deep bg-primary text-[10px] font-bold text-ink">
                  YOU
                </span>
                <span className="-ml-3 flex size-8 items-center justify-center rounded-full border border-canvas-deep bg-indigo-500 text-[10px] font-bold text-ink">
                  DNA
                </span>
              </div>
            }
          />
        </section>

        <SurfaceCard className="p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-ink">Artist Analysis</h2>
              <p className="text-sm text-muted">Your top-tier loyalty & frequency</p>
            </div>
            <SegmentedControl
              items={[
                { label: "Monthly", value: "monthly" },
                { label: "All Time", value: "all-time" },
              ]}
              activeValue="monthly"
            />
          </div>

          <ul className="space-y-4">
            <ArtistRow
              name="The Midnight Aura"
              meta="428 streams • Synthwave / Retrowave"
              loyalty="84% Loyalty"
              loyaltyHighlight
              progress={84}
              rightLabel="+12%"
              rightClass="text-success"
              gradient="from-fuchsia-600 to-violet-900"
            />
            <ArtistRow
              name="Neon Drifter"
              meta="312 streams • Dream Pop"
              loyalty="62% Loyalty"
              progress={62}
              barMuted
              rightLabel="New"
              rightClass="text-subtle"
              gradient="from-cyan-600 to-blue-900"
            />
            <ArtistRow
              name="Echo Resonance"
              meta="156 streams • Ambient Electronic"
              loyalty="48% Loyalty"
              progress={48}
              barMuted
              rightLabel=""
              gradient="from-orange-600 to-rose-900"
            />
          </ul>
        </SurfaceCard>
      </PageContainer>
    </div>
  );
}

function StatCard({
  title,
  badgeClass,
  value,
  delta,
  deltaClass,
  description,
  footer,
}: {
  title: string;
  badgeClass: string;
  value: string;
  delta?: string;
  deltaClass?: string;
  description: string;
  footer: ReactNode;
}) {
  return (
    <SurfaceCard className="flex flex-col rounded-panel p-6">
      <div className="mb-4 flex items-start justify-between gap-2">
        <span className="text-sm font-semibold text-muted">{title}</span>
        <span className={`size-2 shrink-0 rounded-full ${badgeClass}`} aria-hidden />
      </div>
      <div className="mb-2 flex flex-wrap items-baseline gap-2">
        <span className="text-4xl font-black text-ink">{value}</span>
        {delta ? <span className={`text-sm font-bold ${deltaClass}`}>{delta}</span> : null}
      </div>
      <p className="mb-6 flex-1 text-xs leading-relaxed text-muted">{description}</p>
      {footer}
    </SurfaceCard>
  );
}

function MiniBarChart() {
  const heights = [40, 60, 75, 50, 85];

  return (
    <div className="flex h-8 items-end gap-1.5">
      {heights.map((height, index) => (
        <div
          key={index}
          className="flex-1 rounded-sm bg-primary"
          style={{ height: `${height}%`, opacity: 0.25 + index * 0.12 }}
        />
      ))}
    </div>
  );
}

function ArtistRow({
  name,
  meta,
  loyalty,
  loyaltyHighlight,
  progress,
  barMuted,
  rightLabel,
  rightClass,
  gradient,
}: {
  name: string;
  meta: string;
  loyalty: string;
  loyaltyHighlight?: boolean;
  progress: number;
  barMuted?: boolean;
  rightLabel: string;
  rightClass?: string;
  gradient: string;
}) {
  return (
    <li className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-card bg-surface-elevated">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        <div className="absolute inset-0 bg-primary-faint" />
        <div className="relative flex h-full items-center justify-center text-xs font-bold text-ink/90">
          ♪
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-base font-bold text-ink">{name}</h3>
          <span className={`text-xs font-black ${loyaltyHighlight ? "text-primary" : "text-muted"}`}>
            {loyalty}
          </span>
        </div>
        <p className="text-xs text-muted">{meta}</p>
        <ProgressBar
          value={progress}
          className="h-1.5 w-full"
          indicatorClassName={barMuted ? "bg-subtle" : "bg-primary"}
        />
      </div>
      {rightLabel ? (
        <span className={`shrink-0 text-xs font-bold ${rightClass ?? ""}`}>{rightLabel}</span>
      ) : null}
    </li>
  );
}
