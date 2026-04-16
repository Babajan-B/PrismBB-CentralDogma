"use client";

import { useEffect } from "react";
import { useSettings } from "@/store/settings";
import {
  applyThemePreference,
  SYSTEM_THEME_MEDIA_QUERY,
} from "@/lib/preferences";

export function ThemeProvider() {
  const theme = useSettings((s) => s.theme);

  useEffect(() => {
    applyThemePreference(theme);

    if (theme !== "system") return;

    const media = window.matchMedia(SYSTEM_THEME_MEDIA_QUERY);
    const onChange = () => applyThemePreference("system");

    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  return null;
}
