"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSettings } from "@/store/settings";
import { CURRENT_VERSION } from "@/data/changelog";
import { useHydrated } from "@/hooks/useHydrated";
import { WelcomeModal } from "./WelcomeModal";
import { ChangelogModal } from "./ChangelogModal";
import { SearchDialog } from "@/components/search/SearchDialog";

interface OnboardingCtx {
  openSearch: () => void;
  openChangelog: () => void;
  openWelcome: () => void;
}

const Ctx = createContext<OnboardingCtx | null>(null);

export function useOnboarding() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useOnboarding must be used within OnboardingProvider");
  return v;
}

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const welcomeSeen = useSettings((s) => s.welcomeSeen);
  const lastSeenVersion = useSettings((s) => s.lastSeenVersion);
  const markWelcomeSeen = useSettings((s) => s.markWelcomeSeen);
  const markVersionSeen = useSettings((s) => s.markVersionSeen);

  const hydrated = useHydrated();
  const [searchOpen, setSearchOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [changelogOpen, setChangelogOpen] = useState(false);

  // First-visit + new-version detection (after hydration to avoid SSR flash)
  useEffect(() => {
    if (!hydrated) return;
    if (!welcomeSeen) {
      const t = setTimeout(() => setWelcomeOpen(true), 450);
      return () => clearTimeout(t);
    }
    if (lastSeenVersion && lastSeenVersion !== CURRENT_VERSION) {
      const t = setTimeout(() => setChangelogOpen(true), 450);
      return () => clearTimeout(t);
    }
    if (!lastSeenVersion) {
      markVersionSeen(CURRENT_VERSION);
    }
  }, [hydrated, welcomeSeen, lastSeenVersion, markVersionSeen]);

  // Cmd+K / Ctrl+K toggles search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      } else if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const openChangelog = useCallback(() => setChangelogOpen(true), []);
  const openWelcome = useCallback(() => setWelcomeOpen(true), []);

  const closeWelcome = () => {
    setWelcomeOpen(false);
    markWelcomeSeen();
    markVersionSeen(CURRENT_VERSION);
  };
  const closeChangelog = () => {
    setChangelogOpen(false);
    markVersionSeen(CURRENT_VERSION);
  };

  return (
    <Ctx.Provider value={{ openSearch, openChangelog, openWelcome }}>
      {children}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <WelcomeModal open={welcomeOpen} onClose={closeWelcome} />
      <ChangelogModal
        open={changelogOpen}
        onClose={closeChangelog}
        highlightFrom={lastSeenVersion}
      />
    </Ctx.Provider>
  );
}
