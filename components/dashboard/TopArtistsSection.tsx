import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export function TopArtistsSection() {
  return (
    <SurfaceCard className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-ink">Top Artists</h2>
        <SegmentedControl
          items={[
            { label: "1 Month", value: "1-month" },
            { label: "6 Months", value: "6-months" },
          ]}
          activeValue="1-month"
        />
      </div>
      <ul className="space-y-4">
        <TopArtist
          rank="01"
          name="Tame Impala"
          meta="Psych Rock • 124 listens"
          tone="violet"
        />
        <TopArtist
          rank="02"
          name="Lana Del Rey"
          meta="Art Pop • 98 listens"
          tone="rose"
        />
        <TopArtist
          rank="03"
          name="Miles Davis"
          meta="Jazz • 82 listens"
          tone="amber"
        />
      </ul>
    </SurfaceCard>
  );
}

function TopArtist({
  rank,
  name,
  meta,
  tone,
}: {
  rank: string;
  name: string;
  meta: string;
  tone: "violet" | "rose" | "amber";
}) {
  const gradient =
    tone === "violet"
      ? "from-violet-600 to-purple-900"
      : tone === "rose"
        ? "from-rose-600 to-pink-900"
        : "from-amber-500 to-orange-900";

  return (
    <li className="flex items-center gap-4">
      <span className="w-6 text-sm font-black text-subtle">{rank}</span>
      <div
        className={`size-12 shrink-0 rounded-full bg-gradient-to-br ${gradient} ring-2 ring-surface-elevated`}
      />
      <div className="min-w-0 flex-1">
        <p className="font-bold text-ink">{name}</p>
        <p className="text-xs text-muted">{meta}</p>
      </div>
    </li>
  );
}
