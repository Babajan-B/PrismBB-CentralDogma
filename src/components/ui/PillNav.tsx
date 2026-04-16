"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings, FlaskConical, Grid3X3, Dna, Home,
  Share2, BookOpen,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchTrigger } from "./SearchTrigger";

const links = [
  { href: "/",           label: "Home",        icon: Home       },
  { href: "/table",      label: "Table",       icon: Grid3X3    },
  { href: "/molecules",  label: "Molecules",   icon: Dna        },
  { href: "/tools",      label: "Tools",       icon: FlaskConical },
  { href: "/genetic-concepts", label: "Genetic Concepts", icon: Share2 },
  { href: "/history",    label: "History",     icon: BookOpen   },
  { href: "/settings",   label: "Settings",    icon: Settings   },
] as const;

export function PillNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Desktop nav ── */}
      <nav
        className="hidden md:flex items-center justify-between px-6 py-3 sticky top-0 z-50"
        style={{
          background: "var(--glass-bg)",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "var(--shadow-xs)",
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg text-sm"
            style={{ background: "var(--brand-glow)" }}
          >
            🧬
          </span>
          <span>GeneCode</span>
        </Link>

        {/* Pill nav — scrollable on smaller desktops */}
        <div
          className="mx-4 flex min-w-0 items-center gap-0.5 overflow-x-auto rounded-full p-1 scrollbar-none"
          style={{
            background: "var(--element-bg)",
            border: "1px solid var(--border)",
          }}
          data-tour="pill-nav"
        >
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className="relative shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all"
                style={{
                  color:      active ? "var(--foreground)" : "var(--muted-foreground)",
                  background: active ? "var(--background)" : "transparent",
                  boxShadow:  active ? "var(--shadow-xs)" : "none",
                  transition: `all 0.25s var(--ease-spring)`,
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </nav>

      {/* ── Mobile bottom tab bar — horizontally scrollable ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center overflow-x-auto gap-1 px-2 py-2 safe-area-bottom scrollbar-none"
        style={{
          background: "var(--glass-bg)",
          borderTop: "1px solid var(--border)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
        }}
      >
        {links.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex shrink-0 flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[10px] font-medium transition-colors"
              style={{
                color:      active ? "var(--accent)" : "var(--muted-foreground)",
                background: active ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent",
              }}
            >
              <Icon size={19} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
