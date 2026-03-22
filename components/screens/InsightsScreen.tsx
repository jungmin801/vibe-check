import type { ReactNode } from "react";

export function MusicDnaScreen() {
  return (
    <div className="app-backdrop min-h-screen text-ink antialiased">
      <header className="sticky top-0 z-10 border-b border-primary-faint bg-panel backdrop-blur-md">
        <div className="mx-auto flex h-[65px] max-w-[1280px] items-center justify-between px-5 md:px-20">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-control bg-primary-soft">
              <span className="text-sm font-black text-primary">V</span>
            </div>
            <span className="text-xl font-black tracking-tight text-ink">
              VibeCheck Insight
            </span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#"
              className="border-b-2 border-primary pb-0.5 text-sm font-semibold text-primary"
            >
              Insights
            </a>
            <a href="#" className="text-sm font-semibold text-muted hover:text-ink">
              Library
            </a>
            <a href="#" className="text-sm font-semibold text-muted hover:text-ink">
              Social
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-control bg-primary-faint text-primary transition hover:bg-primary-soft"
              aria-label="Search"
            >
              <SearchIcon className="size-4" />
            </button>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-control bg-primary-faint text-primary transition hover:bg-primary-soft"
              aria-label="Notifications"
            >
              <BellIcon className="size-4" />
            </button>
            <div className="ml-1 rounded-full border-2 border-primary-faint p-0.5">
              <div className="size-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-700" />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-5 pb-16 pt-8 md:px-20">
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
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-card bg-primary px-5 py-3 text-base font-bold text-white shadow-glow-sm transition hover:bg-primary-hover"
            >
              <ShareIcon className="size-4" />
              Share DNA
            </button>
            <button
              type="button"
              className="rounded-card border border-line bg-surface-elevated px-5 py-3 text-base font-bold text-ink transition hover:border-line-strong"
            >
              Export Data
            </button>
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
            footer={
              <div className="h-1 w-full overflow-hidden rounded-full bg-surface-elevated">
                <div className="h-full w-[78%] rounded-full bg-primary" />
              </div>
            }
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

        <section className="glass-card p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-ink">Artist Analysis</h2>
              <p className="text-sm text-muted">Your top-tier loyalty & frequency</p>
            </div>
            <div className="flex rounded-control bg-surface-elevated p-1">
              <button
                type="button"
                className="rounded-md bg-primary px-4 py-2 text-xs font-bold text-white"
              >
                Monthly
              </button>
              <button
                type="button"
                className="rounded-md px-4 py-2 text-xs font-bold text-muted hover:text-ink"
              >
                All Time
              </button>
            </div>
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
        </section>
      </main>
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
    <div className="glass-card flex flex-col rounded-panel p-6">
      <div className="mb-4 flex items-start justify-between gap-2">
        <span className="text-sm font-semibold text-muted">{title}</span>
        <span
          className={`size-2 shrink-0 rounded-full ${badgeClass}`}
          aria-hidden
        />
      </div>
      <div className="mb-2 flex flex-wrap items-baseline gap-2">
        <span className="text-4xl font-black text-ink">{value}</span>
        {delta ? <span className={`text-sm font-bold ${deltaClass}`}>{delta}</span> : null}
      </div>
      <p className="mb-6 flex-1 text-xs leading-relaxed text-muted">{description}</p>
      {footer}
    </div>
  );
}

function MiniBarChart() {
  const heights = [40, 60, 75, 50, 85];
  return (
    <div className="flex h-8 items-end gap-1.5">
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-primary"
          style={{ height: `${h}%`, opacity: 0.25 + i * 0.12 }}
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
          <span
            className={`text-xs font-black ${loyaltyHighlight ? "text-primary" : "text-muted"}`}
          >
            {loyalty}
          </span>
        </div>
        <p className="text-xs text-muted">{meta}</p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-elevated">
          <div
            className={`h-full rounded-full ${barMuted ? "bg-subtle" : "bg-primary"}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {rightLabel ? (
        <span className={`shrink-0 text-xs font-bold ${rightClass ?? ""}`}>{rightLabel}</span>
      ) : null}
    </li>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      />
    </svg>
  );
}
