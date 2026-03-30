import { SurfaceCard } from "@/components/ui/SurfaceCard";

export function TopTracksSection() {
  return (
    <SurfaceCard className="p-6">
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
        <TrackRow
          title="Stargirl Interlude"
          artist="The Weeknd, Lana Del Rey"
          plays={38}
        />
        <TrackRow title="After Dark" artist="Mr.Kitty" plays={35} />
      </ul>
    </SurfaceCard>
  );
}

function TrackRow({
  title,
  artist,
  plays,
}: {
  title: string;
  artist: string;
  plays: number;
}) {
  return (
    <li className="flex items-center justify-between gap-4 py-4 first:pt-0">
      <div className="min-w-0">
        <p className="font-bold text-ink">{title}</p>
        <p className="truncate text-xs text-muted">{artist}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-lg font-black text-primary">{plays}</p>
        <p className="text-[10px] font-bold uppercase tracking-wide text-subtle">
          Plays
        </p>
      </div>
    </li>
  );
}
