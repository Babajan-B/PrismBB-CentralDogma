"use client";

import { useSettings } from "@/store/settings";
import { translations, type LangCode, type Translations } from "@/i18n/translations";

export function useTranslation(): Translations {
  const language = useSettings((s) => s.language);
  return translations[(language as LangCode)] ?? translations.en;
}
