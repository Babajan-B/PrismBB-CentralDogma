"use client";

import { useEffect } from "react";
import { useSettings } from "@/store/settings";
import { LANGUAGES } from "@/i18n/translations";

export function LanguageProvider() {
  const language = useSettings((s) => s.language);

  useEffect(() => {
    const lang = LANGUAGES.find((l) => l.code === language);
    if (lang) {
      document.documentElement.lang = lang.code;
      document.documentElement.dir = lang.dir;
    }
  }, [language]);

  return null;
}
