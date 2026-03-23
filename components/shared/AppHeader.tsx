import type { ReactNode } from "react";
import { PageContainer } from "@/components/shared/PageContainer";
import { IconButton } from "@/components/ui/IconButton";
import { BellIcon, SearchIcon } from "@/components/ui/Icons";

const navItems = ["Insights", "Library", "Social"] as const;

type AppHeaderProps = {
  activeNav?: (typeof navItems)[number];
  leadingActions?: ReactNode;
};

export function AppHeader({ activeNav = "Insights", leadingActions }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-primary-faint bg-panel backdrop-blur-md">
      <PageContainer className="flex h-[65px] items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-control bg-primary-soft">
            <span className="text-sm font-black text-primary">V</span>
          </div>
          <span className="text-xl font-black tracking-tight text-ink">VibeCheck Insight</span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = item === activeNav;

            return (
              <a
                key={item}
                href="#"
                className={`border-b-2 pb-0.5 text-sm font-semibold transition ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {item}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {leadingActions}
          <IconButton label="Search">
            <SearchIcon className="size-4" />
          </IconButton>
          <IconButton label="Notifications">
            <BellIcon className="size-4" />
          </IconButton>
          <div className="ml-1 rounded-full border-2 border-primary-faint p-0.5">
            <div className="size-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-700" />
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
