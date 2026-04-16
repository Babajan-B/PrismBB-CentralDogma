"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export interface SliderCard {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface CardSliderProps {
  cards: SliderCard[];
  initialIndex?: number;
}

export function CardSlider({ cards, initialIndex = 0 }: CardSliderProps) {
  const [index, setIndex] = useState(initialIndex);
  const safeIndex = Math.min(Math.max(index, 0), cards.length - 1);
  const card = cards[safeIndex];

  const go = (next: number) => {
    if (next < 0 || next >= cards.length) return;
    setIndex(next);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Tab header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/80 px-5 pt-4 backdrop-blur-md">
        <div className="flex items-center gap-1 overflow-x-auto pb-3">
          {cards.map((c, i) => {
            const active = i === safeIndex;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="slider-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-muted"
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  />
                )}
                <span className="mr-1.5 text-[10px] tabular-nums text-muted-foreground">
                  0{i + 1}
                </span>
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Card body */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={card.key}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="h-full overflow-y-auto px-5 py-5"
          >
            {card.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-between border-t border-border bg-background/80 px-5 py-3 backdrop-blur-md">
        <button
          type="button"
          onClick={() => go(safeIndex - 1)}
          disabled={safeIndex === 0}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={14} />
          Prev
        </button>
        <div className="text-[11px] tabular-nums text-muted-foreground">
          {safeIndex + 1} / {cards.length}
        </div>
        <button
          type="button"
          onClick={() => go(safeIndex + 1)}
          disabled={safeIndex === cards.length - 1}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
