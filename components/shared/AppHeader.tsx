"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { PageContainer } from "@/components/shared/PageContainer";
import { IconButton } from "@/components/ui/IconButton";
import { BellIcon, SearchIcon } from "@/components/ui/Icons";

const navItems = ["Dashboard", "Insights"] as const;

type AppHeaderProps = {
  activeNav?: (typeof navItems)[number];
  leadingActions?: ReactNode;
};

export function AppHeader({ activeNav = "Dashboard", leadingActions }: AppHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function toggleMenu() {
    if (!avatarButtonRef.current) {
      setIsMenuOpen((open) => !open);
      return;
    }

    const rect = avatarButtonRef.current.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + 12,
      left: rect.right - 120,
    });
    setIsMenuOpen((open) => !open);
  }

  return (
    <header className="sticky top-0 z-20 overflow-visible border-b border-primary-faint bg-panel backdrop-blur-md">
      <PageContainer className="flex h-[65px] items-center justify-between overflow-visible">
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
                href={item === "Dashboard" ? "/dashboard" : "/insights"}
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

          <div ref={menuRef} className="relative ml-1">
            <button
              ref={avatarButtonRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              aria-label="Open profile menu"
              className="rounded-full border-2 border-primary-faint p-0.5 transition hover:border-primary"
              onClick={toggleMenu}
            >
              <div className="size-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-700" />
            </button>

            {isMenuOpen ? (
              <div
                className="fixed z-[100] min-w-[120px] rounded-card border border-line bg-panel p-2 shadow-glass backdrop-blur-md"
                style={{ top: menuPosition.top, left: menuPosition.left }}
              >
                <form method="POST" action="/api/auth/logout">
                  <button
                    type="submit"
                    className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-semibold text-ink transition hover:bg-primary-faint"
                  >
                    로그아웃
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
