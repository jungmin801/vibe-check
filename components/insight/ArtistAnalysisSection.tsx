import { ProgressBar } from "@/components/ui/ProgressBar";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export function ArtistAnalysisSection() {
  return (
    <SurfaceCard className="p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink">Artist Analysis</h2>
          <p className="text-sm text-muted">
            Your top-tier loyalty & frequency
          </p>
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
        <ProgressBar
          value={progress}
          className="h-1.5 w-full"
          indicatorClassName={barMuted ? "bg-subtle" : "bg-primary"}
        />
      </div>
      {rightLabel ? (
        <span className={`shrink-0 text-xs font-bold ${rightClass ?? ""}`}>
          {rightLabel}
        </span>
      ) : null}
    </li>
  );
}
