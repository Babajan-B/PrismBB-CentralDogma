"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useSettings, type Theme } from "@/store/settings";

const icons: Record<Theme, typeof Moon> = {
  dark: Moon,
  light: Sun,
  system: Monitor,
};

const cycle: Theme[] = ["dark", "light", "system"];

export function ThemeToggle() {
  const theme = useSettings((s) => s.theme);
  const setTheme = useSettings((s) => s.setTheme);

  const Icon = icons[theme];
  const next = cycle[(cycle.indexOf(theme) + 1) % cycle.length];

  return (
    <button
      onClick={() => setTheme(next)}
      className="rounded-full p-2 hover:bg-muted transition-colors"
      aria-label={`Switch to ${next} theme`}
    >
      <Icon size={18} />
    </button>
  );
}
