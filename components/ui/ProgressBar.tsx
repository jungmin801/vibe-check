import type { HTMLAttributes } from "react";

type ProgressBarProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
  indicatorClassName?: string;
};

export function ProgressBar({
  value,
  className = "",
  indicatorClassName = "",
  ...props
}: ProgressBarProps) {
  return (
    <div className={`overflow-hidden rounded-full bg-surface-elevated ${className}`} {...props}>
      <div className={`h-full rounded-full bg-primary ${indicatorClassName}`} style={{ width: `${value}%` }} />
    </div>
  );
}
