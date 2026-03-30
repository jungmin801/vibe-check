import type { ButtonHTMLAttributes } from "react";

type RoundControlButtonProps = {
  primary?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function RoundControlButton({
  primary,
  ...props
}: RoundControlButtonProps) {
  return (
    <button
      type="button"
      className={`flex size-10 items-center justify-center rounded-full border transition ${
        primary
          ? "border-primary bg-primary text-white shadow-glow-sm"
          : "border-line bg-surface-elevated text-muted hover:border-line-strong hover:text-ink"
      }`}
      {...props}
    />
  );
}
