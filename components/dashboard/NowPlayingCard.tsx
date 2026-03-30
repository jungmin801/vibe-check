import { ProgressBar } from "@/components/ui/ProgressBar";
import { RoundControlButton } from "@/components/ui/RoundControlButton";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export function NowPlayingCard() {
  return (
    <SurfaceCard className="p-6">
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
            <p className="text-sm text-muted">
              M83 • Hurry Up, We&apos;re Dreaming
            </p>
          </div>
          <div className="space-y-2">
            <ProgressBar value={68} className="h-1.5" />
            <div className="flex justify-between text-xs font-semibold text-subtle">
              <span>2:45</span>
              <span>4:03</span>
            </div>
          </div>
          <div className="flex gap-2">
            <RoundControlButton aria-label="Previous" />
            <RoundControlButton aria-label="Play" primary />
            <RoundControlButton aria-label="Next" />
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}
