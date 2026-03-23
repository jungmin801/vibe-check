import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonVariant = "soft" | "glass";

const variantClasses: Record<IconButtonVariant, string> = {
  soft: "rounded-control bg-primary-faint text-primary hover:bg-primary-soft",
  glass:
    "rounded-full border border-line bg-panel text-ink shadow-glass backdrop-blur-md hover:border-line-strong",
};

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
  variant?: IconButtonVariant;
};

export function IconButton({
  label,
  children,
  variant = "soft",
  className = "",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={`flex size-10 items-center justify-center transition ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
