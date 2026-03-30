import { ProgressBar } from "@/components/ui/ProgressBar";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export function SyncStatusCard() {
  return (
    <SurfaceCard className="flex w-full max-w-sm flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">
            Syncing your library...
          </p>
          <p className="text-xs text-muted">
            Latest activity from your Spotify profile
          </p>
        </div>
        <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
          Active
        </span>
      </div>
      <ProgressBar value={66} className="h-1.5" />
    </SurfaceCard>
  );
}
