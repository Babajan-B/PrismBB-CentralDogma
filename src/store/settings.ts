import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LangCode } from "@/i18n/translations";

export type Theme = "dark" | "light" | "system";
export type SeqNotation = "rna" | "dna";
export type AADisplay = "one" | "three" | "full";

interface SettingsState {
  theme: Theme;
  language: LangCode;
  seqNotation: SeqNotation;
  aaDisplay: AADisplay;
  animationSpeed: number;
  soundEnabled: boolean;
  welcomeSeen: boolean;
  lastSeenVersion: string;
  toursCompleted: string[];
  setTheme: (t: Theme) => void;
  setLanguage: (l: LangCode) => void;
  setSeqNotation: (n: SeqNotation) => void;
  setAADisplay: (d: AADisplay) => void;
  setAnimationSpeed: (s: number) => void;
  setSoundEnabled: (e: boolean) => void;
  markWelcomeSeen: () => void;
  markVersionSeen: (v: string) => void;
  markTourCompleted: (id: string) => void;
  resetOnboarding: () => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: "light",
      language: "en",
      seqNotation: "rna",
      aaDisplay: "three",
      animationSpeed: 0.6,
      soundEnabled: false,
      welcomeSeen: false,
      lastSeenVersion: "",
      toursCompleted: [],
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setSeqNotation: (seqNotation) => set({ seqNotation }),
      setAADisplay: (aaDisplay) => set({ aaDisplay }),
      setAnimationSpeed: (animationSpeed) => set({ animationSpeed }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      markWelcomeSeen: () => set({ welcomeSeen: true }),
      markVersionSeen: (v) => set({ lastSeenVersion: v }),
      markTourCompleted: (id) => {
        const done = get().toursCompleted;
        if (!done.includes(id)) {
          set({ toursCompleted: [...done, id] });
        }
      },
      resetOnboarding: () =>
        set({
          welcomeSeen: false,
          lastSeenVersion: "",
          toursCompleted: [],
        }),
    }),
    { name: "genecode-settings" }
  )
);
