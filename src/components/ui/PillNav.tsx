"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, FlaskConical, Grid3X3, Dna, Home } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchTrigger } from "./SearchTrigger";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/table", label: "Table", icon: Grid3X3 },
  { href: "/molecules", label: "Molecules", icon: Dna },
  { href: "/tools", label: "Tools", icon: FlaskConical },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function PillNav() {
  const pathname = usePathname();

  return (
    <>
      {/* ── Desktop nav — zperiod style ── */}
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
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
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

        {/* Pill nav — matches zperiod's center pill group */}
        <div
          className="flex items-center gap-0.5 rounded-full p-1"
          style={{
            background: "var(--element-bg)",
            border: "1px solid var(--border)",
          }}
          data-tour="pill-nav"
        >
          {links.map(({ href, label }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                data-tour={`nav-${href.replace("/", "") || "home"}`}
                className="relative px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  color: active ? "var(--foreground)" : "var(--muted-foreground)",
                  background: active ? "var(--background)" : "transparent",
                  boxShadow: active ? "var(--shadow-xs)" : "none",
                  transition: `all 0.25s var(--ease-spring)`,
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </nav>

      {/* ── Mobile bottom tab bar — zperiod style ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 safe-area-bottom"
        style={{
          background: "var(--glass-bg)",
          borderTop: "1px solid var(--border)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
        }}
      >
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 text-xs font-medium"
              style={{
                color: active ? "var(--accent)" : "var(--muted-foreground)",
                transition: `color 0.2s var(--ease-spring)`,
              }}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
