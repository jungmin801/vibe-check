import { MetricCard } from "@/components/insight/MetricCard";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function InsightMetricsSection() {
  return (
    <section className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Artist Diversity"
        badgeClass="bg-success"
        value="78%"
        delta="+5.2%"
        deltaClass="text-success"
        description="Your palette is expanding into Indie- Folk and Lofi House this month."
        footer={<ProgressBar value={78} className="h-1" />}
      />
      <MetricCard
        title="Repeat Rate"
        badgeClass="bg-danger"
        value="42%"
        delta="-2.1%"
        deltaClass="text-danger"
        description="You're seeking new sounds. Your 'Obsession Factor' has decreased significantly."
        footer={<MiniBarChart />}
      />
      <MetricCard
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
      <MetricCard
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
