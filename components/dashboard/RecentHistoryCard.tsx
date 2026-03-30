import { SurfaceCard } from "@/components/ui/SurfaceCard";

export function RecentHistoryCard() {
  return (
    <SurfaceCard className="p-6">
      <h2 className="mb-6 text-sm font-bold text-ink">Recent History</h2>
      <ul className="space-y-0">
        <HistoryRow title="Selfless" artist="The Strokes" time="2m ago" />
        <HistoryRow
          title="Sweater Weather"
          artist="The Neighbourhood"
          time="14m ago"
        />
        <HistoryRow title="Starboy" artist="The Weeknd" time="28m ago" />
        <HistoryRow title="Nightcall" artist="Kavinsky" time="45m ago" />
        <HistoryRow
          title="Blinding Lights"
          artist="The Weeknd"
          time="1h ago"
          isLast
        />
      </ul>
    </SurfaceCard>
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
