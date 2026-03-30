import { ProgressBar } from "@/components/ui/ProgressBar";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

const genres = [
  { label: "Synthpop", pct: 38, color: "bg-chart-1" },
  { label: "Indie Rock", pct: 28, color: "bg-chart-3" },
  { label: "Electronic", pct: 22, color: "bg-chart-7" },
  { label: "Jazz Fusion", pct: 12, color: "bg-chart-2" },
];

export function GenreDistributionCard() {
  return (
    <SurfaceCard className="p-6">
      <div className="mb-6 flex items-start justify-between">
        <h2 className="text-sm font-bold text-ink">Genre Distribution</h2>
        <div className="text-right">
          <p className="text-2xl font-black text-primary">12</p>
          <p className="text-xs font-semibold text-muted">Genres</p>
        </div>
      </div>
      <ul className="space-y-4">
        {genres.map((genre) => (
          <li key={genre.label}>
            <div className="mb-1 flex justify-between text-xs font-semibold">
              <span className="text-muted">{genre.label}</span>
              <span className="text-ink">{genre.pct}%</span>
            </div>
            <ProgressBar
              value={genre.pct}
              className="h-2"
              indicatorClassName={genre.color}
            />
          </li>
        ))}
      </ul>
    </SurfaceCard>
  );
}
