import { SurfaceCard } from "@/components/ui/SurfaceCard";

const hourBars = [
  { label: "12am", h: 25 },
  { label: "4am", h: 12 },
  { label: "8am", h: 35 },
  { label: "12pm", h: 45 },
  { label: "4pm", h: 55 },
  { label: "8pm", h: 78 },
  { label: "11pm", h: 100 },
];

export function ListeningByHourCard() {
  return (
    <SurfaceCard className="p-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-md bg-primary-soft px-2 py-1 text-[10px] font-bold text-primary">
          Chart
        </span>
        <h2 className="text-sm font-bold text-ink">Listening by Hour</h2>
      </div>
      <p className="mb-6 text-xs text-muted">
        Your peak activity is at 10:00 PM
      </p>
      <div className="flex h-40 items-end justify-between gap-2 border-b border-primary-faint pb-1">
        {hourBars.map((bar) => (
          <div
            key={bar.label}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div
              className="w-full max-w-[2rem] rounded-t-md bg-gradient-to-t from-primary to-violet-400"
              style={{ height: `${bar.h}%` }}
            />
            <span className="text-[10px] font-bold text-subtle">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
}
