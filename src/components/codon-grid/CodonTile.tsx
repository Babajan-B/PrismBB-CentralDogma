"use client";

import { motion } from "framer-motion";
import type { Codon } from "@/data/types";
import { getAAByAbbr3 } from "@/data/aminoAcids";
import { useSettings } from "@/store/settings";

interface CodonTileProps {
  codon: Codon;
  index: number;
  dimmed?: boolean;
  highlighted?: boolean;
  onSelect: (codon: Codon) => void;
}

/* ── zperiod-style: deep bg + bright fg for each category ── */
const CATEGORY_STYLE: Record<string, { bg: string; fg: string }> = {
  nonpolar: { bg: "var(--aa-nonpolar-bg)", fg: "var(--aa-nonpolar-fg)" },
  polar:    { bg: "var(--aa-polar-bg)",    fg: "var(--aa-polar-fg)"    },
  basic:    { bg: "var(--aa-basic-bg)",    fg: "var(--aa-basic-fg)"    },
  acidic:   { bg: "var(--aa-acidic-bg)",   fg: "var(--aa-acidic-fg)"   },
  stop:     { bg: "var(--aa-stop-bg)",     fg: "var(--aa-stop-fg)"     },
};

const FALLBACK = { bg: "var(--element-bg)", fg: "var(--muted-foreground)" };

export function CodonTile({
  codon,
  index,
  dimmed = false,
  highlighted = false,
  onSelect,
}: CodonTileProps) {
  const seqNotation = useSettings((s) => s.seqNotation);
  const triplet = seqNotation === "dna" ? codon.dnaTriplet : codon.triplet;
  const aa = codon.isStop ? undefined : getAAByAbbr3(codon.aminoAcid);
  const { bg, fg } = CATEGORY_STYLE[codon.category] ?? FALLBACK;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(codon)}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: dimmed ? 0.15 : 1,
        scale: highlighted ? 1.06 : 1,
      }}
      whileHover={dimmed ? {} : { scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{
        type: "spring",
        damping: 22,
        stiffness: 300,
        delay: index * 0.003,
      }}
      className="group relative flex w-full cursor-pointer flex-col items-center rounded-lg p-2 text-center select-none sm:rounded-xl sm:p-3"
      style={{
        background: bg,
        boxShadow: highlighted
          ? `0 0 0 2px ${fg}, 0 4px 16px color-mix(in srgb, ${fg} 30%, transparent)`
          : "var(--shadow-xs)",
        transition: `box-shadow 0.2s var(--ease-spring), transform 0.2s var(--ease-spring)`,
      }}
      aria-label={`${codon.triplet} — ${codon.aminoAcid}`}
    >
      {/* ── Top row: START badge ── */}
      {codon.isStart && (
        <span
          className="mb-0.5 self-end rounded-sm px-1 py-px text-[5px] font-bold leading-none text-white sm:text-[6px]"
          style={{ background: "var(--aa-start)" }}
        >
          START
        </span>
      )}

      {/* ── Center: codon triplet — the main identifier ── */}
      <div className="my-1 flex flex-1 items-center justify-center sm:my-1.5">
        <span
          className="font-sequence text-sm font-black leading-none tracking-wide sm:text-base md:text-lg"
          style={{ color: fg }}
        >
          {triplet}
        </span>
      </div>

      {/* ── Bottom: 1-letter + full name ── */}
      <div className="flex w-full items-center justify-between gap-1">
        <span
          className="text-[9px] font-bold leading-tight sm:text-[11px]"
          style={{ color: fg }}
        >
          {codon.isStop ? "✱" : codon.aminoAcid1}
        </span>
        <span
          className="max-w-[60%] truncate text-right text-[7px] font-medium leading-tight sm:text-[9px]"
          style={{ color: fg, opacity: 0.7 }}
        >
          {codon.isStop ? "Stop" : aa?.name ?? codon.aminoAcid}
        </span>
      </div>
    </motion.button>
  );
}
