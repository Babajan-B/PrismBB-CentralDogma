"use client";

import { useState } from "react";
import { Moon, Sun, Monitor, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "@/store/settings";
import { useTranslation } from "@/hooks/useTranslation";
import { changelog } from "@/data/changelog";
import { LANGUAGES } from "@/i18n/translations";
import type { Theme, SeqNotation, AADisplay } from "@/store/settings";

const TAG_COLORS: Record<string, string> = {
  NEW: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  UI: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  DATA: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  PERF: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  LANG: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  FIX: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

const NAV_SECTIONS = [
  { id: "appearance", labelKey: "appearance" as const, icon: "🎨" },
  { id: "language", labelKey: "language" as const, icon: "🌐" },
  { id: "display", labelKey: "display" as const, icon: "🔤" },
  { id: "onboarding", labelKey: "onboarding" as const, icon: "🎓" },
] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SettingsPanel() {
  const {
    theme, setTheme,
    language, setLanguage,
    seqNotation, setSeqNotation,
    aaDisplay, setAADisplay,
    animationSpeed, setAnimationSpeed,
    soundEnabled, setSoundEnabled,
    resetOnboarding,
  } = useSettings();
  const t = useTranslation();
  const [resetDone, setResetDone] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [suggestionSent, setSuggestionSent] = useState(false);

  function handleReset() {
    resetOnboarding();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2000);
  }

  function handleSuggestion(e: React.FormEvent) {
    e.preventDefault();
    setSuggestionSent(true);
    setSuggestion("");
    setTimeout(() => setSuggestionSent(false), 4000);
  }

  return (
    <div className="flex flex-1 min-h-0">
      {/* ── Left sticky nav ── */}
      <aside className="hidden lg:flex flex-col gap-1 w-52 shrink-0 border-r border-border px-4 py-8 sticky top-16 self-start h-[calc(100vh-4rem)]">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-2">
          {t.settings.title}
        </p>
        {NAV_SECTIONS.map(({ id, labelKey, icon }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors text-left"
          >
            <span>{icon}</span>
            <span>{t.settings[labelKey]}</span>
          </button>
        ))}
      </aside>

      {/* ── Center content ── */}
      <main className="flex-1 px-6 py-8 max-w-2xl mx-auto space-y-14 overflow-y-auto">
        <h1 className="text-2xl font-bold">{t.settings.title}</h1>

        {/* APPEARANCE */}
        <section id="appearance" className="space-y-6 scroll-mt-6">
          <div>
            <h2 className="text-lg font-semibold mb-1">{t.settings.appearance}</h2>
            <div className="w-12 h-0.5 bg-primary rounded-full" />
          </div>

          {/* Theme */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{t.settings.theme}</label>
            <div className="flex gap-2">
              {(
                [
                  { value: "dark", label: t.settings.themeDark, icon: Moon },
                  { value: "light", label: t.settings.themeLight, icon: Sun },
                  { value: "system", label: t.settings.themeSystem, icon: Monitor },
                ] as { value: Theme; label: string; icon: React.ComponentType<{ className?: string }> }[]
              ).map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-all ${
                    theme === value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/40 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Animation speed */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              {t.settings.animationSpeed}
            </label>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground w-10">{t.settings.animationSlow}</span>
              <input
                type="range"
                min={0.2}
                max={2}
                step={0.1}
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                className="flex-1 accent-primary h-1.5 rounded-full cursor-pointer"
              />
              <span className="text-xs text-muted-foreground w-10 text-right">{t.settings.animationFast}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {animationSpeed.toFixed(1)}× — {animationSpeed < 0.7 ? t.settings.animationSlow : animationSpeed > 1.4 ? t.settings.animationFast : t.settings.animationNormal}
            </p>
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
            <div className="flex items-center gap-3">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-primary" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="text-sm font-medium">{t.settings.soundEnabled}</span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                soundEnabled ? "bg-primary" : "bg-muted"
              }`}
              role="switch"
              aria-checked={soundEnabled}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  soundEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </section>

        {/* LANGUAGE */}
        <section id="language" className="space-y-6 scroll-mt-6">
          <div>
            <h2 className="text-lg font-semibold mb-1">{t.settings.language}</h2>
            <div className="w-12 h-0.5 bg-primary rounded-full" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm transition-all ${
                  language === lang.code
                    ? "bg-primary/10 border-primary text-foreground font-medium"
                    : "bg-muted/30 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <span className="text-lg leading-none">{lang.flag}</span>
                <div className="flex flex-col items-start min-w-0">
                  <span className="truncate">{lang.nativeName}</span>
                  {lang.dir === "rtl" && (
                    <span className="text-[10px] text-muted-foreground">RTL</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* DISPLAY */}
        <section id="display" className="space-y-6 scroll-mt-6">
          <div>
            <h2 className="text-lg font-semibold mb-1">{t.settings.display}</h2>
            <div className="w-12 h-0.5 bg-primary rounded-full" />
          </div>

          {/* Sequence notation */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{t.settings.seqNotation}</label>
            <div className="flex gap-2">
              {(
                [
                  { value: "rna", label: t.settings.seqRNA },
                  { value: "dna", label: t.settings.seqDNA },
                ] as { value: SeqNotation; label: string }[]
              ).map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setSeqNotation(value)}
                  className={`px-5 py-2 rounded-lg text-sm border font-mono font-semibold transition-all ${
                    seqNotation === value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/40 text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* AA display */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{t.settings.aaDisplay}</label>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { value: "one", label: t.settings.aaOne, example: "M" },
                  { value: "three", label: t.settings.aaThree, example: "Met" },
                  { value: "full", label: t.settings.aaFull, example: "Methionine" },
                ] as { value: AADisplay; label: string; example: string }[]
              ).map(({ value, label, example }) => (
                <button
                  key={value}
                  onClick={() => setAADisplay(value)}
                  className={`flex flex-col items-start px-4 py-2.5 rounded-lg border text-sm transition-all ${
                    aaDisplay === value
                      ? "bg-primary/10 border-primary text-foreground"
                      : "bg-muted/30 border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <span className="font-semibold">{label}</span>
                  <span className="text-xs font-mono mt-0.5 opacity-70">{example}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ONBOARDING */}
        <section id="onboarding" className="space-y-6 scroll-mt-6 pb-8">
          <div>
            <h2 className="text-lg font-semibold mb-1">{t.settings.onboarding}</h2>
            <div className="w-12 h-0.5 bg-primary rounded-full" />
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border">
            <div className="flex-1">
              <p className="text-sm font-medium">{t.settings.resetOnboarding}</p>
              <p className="text-xs text-muted-foreground mt-1">{t.settings.resetOnboardingDesc}</p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-border text-sm hover:border-primary/50 hover:text-foreground text-muted-foreground transition-all shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <AnimatePresence mode="wait">
                {resetDone ? (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="text-emerald-400"
                  >
                    Done ✓
                  </motion.span>
                ) : (
                  <motion.span key="reset" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}>
                    Reset
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </section>
      </main>

      {/* ── Right sidebar ── */}
      <aside className="hidden xl:flex flex-col gap-6 w-72 shrink-0 border-l border-border px-5 py-8 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
        {/* Changelog timeline */}
        <div>
          <h3 className="text-sm font-semibold mb-4">{t.settings.changelog}</h3>
          <ol className="relative border-l border-border space-y-6 pl-4">
            {changelog.map((entry) => (
              <li key={entry.version} className="relative">
                <span className="absolute -left-[1.125rem] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-background" />
                <p className="text-xs text-muted-foreground mb-1.5">{entry.date}</p>
                <p className="text-sm font-medium leading-snug mb-2">{entry.title}</p>
                <div className="flex flex-wrap gap-1.5">
                  {entry.items.map((item, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border ${TAG_COLORS[item.tag] ?? TAG_COLORS.NEW}`}
                    >
                      {item.tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Suggestion widget */}
        <div className="mt-auto">
          <h3 className="text-sm font-semibold mb-3">{t.settings.suggestion}</h3>
          <AnimatePresence mode="wait">
            {suggestionSent ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm text-center"
              >
                {t.settings.suggestionThanks}
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSuggestion}
                className="space-y-2"
              >
                <textarea
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder={t.settings.suggestionPlaceholder}
                  rows={3}
                  className="w-full text-sm bg-muted/30 border border-border rounded-lg px-3 py-2 resize-none placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={!suggestion.trim()}
                  className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                  {t.settings.suggestionSubmit}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </div>
  );
}
