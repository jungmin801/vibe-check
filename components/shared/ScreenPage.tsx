import type { ReactNode } from "react";
import { publicSans } from "@/lib/fonts";

export function ScreenPage({ children }: { children: ReactNode }) {
  return <div className={`${publicSans.className} min-h-screen`}>{children}</div>;
}
