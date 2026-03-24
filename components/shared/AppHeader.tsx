"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { PageContainer } from "@/components/shared/PageContainer";
import { LogoutIcon } from "@/components/ui/Icons";
import { useSpotifyMeQuery } from "@/lib/spotify/queries";

const navItems = ["Dashboard", "Insights"] as const;

type AppHeaderProps = {
  activeNav?: (typeof navItems)[number];
  leadingActions?: ReactNode;
};

export function AppHeader({
  activeNav = "Dashboard",
  leadingActions,
}: AppHeaderProps) {
  const { data: me, isPending } = useSpotifyMeQuery();
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

  const avatarLabel = me?.avatarLabel ?? "?";
  const displayName = me?.displayName ?? "Spotify User";
  const avatarStyle = me?.imageUrl
    ? {
        backgroundImage: `url("${me.imageUrl}")`,
      }
    : undefined;

  return (
    <header className="sticky top-0 z-20 overflow-visible border-b border-primary-faint bg-panel backdrop-blur-md">
      <PageContainer className="flex h-[65px] items-center justify-between overflow-visible">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-control bg-primary-soft">
            <span className="text-sm font-black text-primary">V</span>
          </div>
          <span className="text-xl font-black tracking-tight text-ink">
            VibeCheck
          </span>
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

          <div ref={menuRef} className="relative ml-1">
            <button
              ref={avatarButtonRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              aria-label={`${displayName} 프로필 메뉴 열기`}
              className="rounded-full border-2 border-primary-faint p-0.5 transition hover:border-primary"
              onClick={toggleMenu}
            >
              <div
                className={`flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-700 bg-cover bg-center text-xs font-black text-white ${
                  isPending ? "animate-pulse" : ""
                }`}
                style={avatarStyle}
              >
                {me?.imageUrl ? null : <span>{avatarLabel}</span>}
              </div>
            </button>

            {isMenuOpen ? (
              <div
                className="fixed z-[100] min-w-[180px] rounded-card border border-line bg-panel p-2 shadow-glass backdrop-blur-md"
                style={{ top: menuPosition.top, left: menuPosition.left }}
              >
                <div className="border-b border-primary-faint px-3 py-2">
                  <p className="truncate text-sm font-semibold text-ink">
                    Hello, {displayName || "Spotify User"}
                  </p>
                </div>
                <form method="POST" action="/api/auth/logout">
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold text-ink transition hover:bg-primary-faint"
                  >
                    <LogoutIcon className="size-4" />
                    Sign Out
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
