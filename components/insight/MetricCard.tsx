import type { ReactNode } from "react";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

type MetricCardProps = {
  title: string;
  badgeClass: string;
  value: string;
  delta?: string;
  deltaClass?: string;
  description: string;
  footer: ReactNode;
};

export function MetricCard({
  title,
  badgeClass,
  value,
  delta,
  deltaClass,
  description,
  footer,
}: MetricCardProps) {
  return (
    <SurfaceCard className="flex flex-col rounded-panel p-6">
      <div className="mb-4 flex items-start justify-between gap-2">
        <span className="text-sm font-semibold text-muted">{title}</span>
        <span
          className={`size-2 shrink-0 rounded-full ${badgeClass}`}
          aria-hidden
        />
      </div>
      <div className="mb-2 flex flex-wrap items-baseline gap-2">
        <span className="text-4xl font-black text-ink">{value}</span>
        {delta ? (
          <span className={`text-sm font-bold ${deltaClass}`}>{delta}</span>
        ) : null}
      </div>
      <p className="mb-6 flex-1 text-xs leading-relaxed text-muted">
        {description}
      </p>
      {footer}
    </SurfaceCard>
  );
}
