import { LANGUAGES, type LangCode } from "@/i18n/translations";
import type { Theme } from "@/store/settings";

export const SETTINGS_STORAGE_KEY = "genecode-settings";
export const SYSTEM_THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)";

export function getLanguageMeta(language: string) {
  return LANGUAGES.find((entry) => entry.code === language) ?? LANGUAGES[0];
}

export function applyLanguagePreference(language: string) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const lang = getLanguageMeta(language);

  root.lang = lang.code;
  root.dir = lang.dir;
}

export function resolveThemePreference(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    if (typeof window !== "undefined") {
      return window.matchMedia(SYSTEM_THEME_MEDIA_QUERY).matches ? "dark" : "light";
    }

    return "light";
  }

  return theme;
}

export function applyThemePreference(theme: Theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const resolved = resolveThemePreference(theme);

  root.classList.toggle("dark", resolved === "dark");
  root.dataset.theme = resolved;
}

export function sanitizeStoredLanguage(value: unknown): LangCode {
  return LANGUAGES.some((entry) => entry.code === value) ? (value as LangCode) : "en";
}
