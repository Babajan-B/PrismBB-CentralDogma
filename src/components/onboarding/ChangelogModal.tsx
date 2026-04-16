"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { changelog, TAG_STYLE } from "@/data/changelog";

interface ChangelogModalProps {
  open: boolean;
  onClose: () => void;
  highlightFrom?: string;
}

export function ChangelogModal({
  open,
  onClose,
  highlightFrom,
}: ChangelogModalProps) {
  const [selected, setSelected] = useState(changelog[0].version);
  const entry = changelog.find((e) => e.version === selected) ?? changelog[0];

  const highlightIndex = highlightFrom
    ? changelog.findIndex((e) => e.version === highlightFrom)
    : -1;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-background/70 backdrop-blur-sm"
            aria-hidden="true"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="changelog-title"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed left-1/2 top-1/2 z-[90] flex h-[min(640px,85vh)] w-[min(820px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close changelog"
            >
              <X size={18} />
            </button>

            {/* Left pane — version timeline */}
            <aside className="hidden w-60 shrink-0 overflow-y-auto border-r border-border bg-muted/20 p-4 md:block">
              <h2
                id="changelog-title"
                className="px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                Changelog
              </h2>
              <div className="mt-3 flex flex-col gap-1">
                {changelog.map((e, i) => {
                  const active = e.version === selected;
                  const isNew = i <= highlightIndex;
                  return (
                    <button
                      key={e.version}
                      type="button"
                      onClick={() => setSelected(e.version)}
                      className={`group relative flex flex-col items-start gap-0.5 rounded-xl px-3 py-2 text-left transition-colors ${
                        active
                          ? "bg-accent/10 text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-2 text-xs font-semibold">
                        v{e.version}
                        {isNew && (
                          <span className="rounded bg-accent/20 px-1 py-px text-[9px] font-bold text-accent">
                            NEW
                          </span>
                        )}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {e.date}
                      </span>
                      <span className="truncate text-xs">{e.title}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right pane — entry detail */}
            <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
              {/* Mobile version selector */}
              <div className="flex items-center gap-2 overflow-x-auto border-b border-border px-5 py-3 md:hidden">
                {changelog.map((e) => (
                  <button
                    key={e.version}
                    type="button"
                    onClick={() => setSelected(e.version)}
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      e.version === selected
                        ? "bg-accent/15 text-accent"
                        : "text-muted-foreground"
                    }`}
                  >
                    v{e.version}
                  </button>
                ))}
              </div>

              <header className="border-b border-border px-6 pb-5 pt-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-sequence tracking-wider">
                    v{entry.version}
                  </span>
                  <span>·</span>
                  <span>{entry.date}</span>
                </div>
                <h3 className="mt-1 text-2xl font-bold tracking-tight">
                  {entry.title}
                </h3>
              </header>

              <ul className="flex-1 space-y-3 px-6 py-5">
                {entry.items.map((item, i) => {
                  const style = TAG_STYLE[item.tag];
                  return (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider ${style.bg} ${style.fg}`}
                      >
                        {item.tag}
                      </span>
                      <span className="text-sm leading-relaxed text-foreground/90">
                        {item.text}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
