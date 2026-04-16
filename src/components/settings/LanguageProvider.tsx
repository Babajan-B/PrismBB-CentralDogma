"use client";

import { useEffect } from "react";
import { useSettings } from "@/store/settings";
import { applyLanguagePreference } from "@/lib/preferences";

export function LanguageProvider() {
  const language = useSettings((s) => s.language);

  useEffect(() => {
    applyLanguagePreference(language);
  }, [language]);

  return null;
}
