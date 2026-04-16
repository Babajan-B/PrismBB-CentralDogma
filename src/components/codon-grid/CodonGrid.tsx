"use client";

import { useMemo, useState, useCallback } from "react";
import { Search, X, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { codons } from "@/data/geneticCode";
import type { Codon, AACategory } from "@/data/types";
import { CodonTile } from "./CodonTile";
import { CodonModal } from "./CodonModal";
import { useSettings } from "@/store/settings";

type CatFilter = AACategory | "all";

const CATEGORY_META: {
  value: CatFilter;
  label: string;
  bg: string;
  dot: string;
}[] = [
  { value: "all",      label: "All",      bg: "transparent",              dot: "var(--muted-foreground)" },
  { value: "nonpolar", label: "Nonpolar", bg: "var(--aa-nonpolar-bg)",    dot: "var(--aa-nonpolar-fg)"   },
  { value: "polar",    label: "Polar",    bg: "var(--aa-polar-bg)",        dot: "var(--aa-polar-fg)"      },
  { value: "basic",    label: "Basic",    bg: "var(--aa-basic-bg)",        dot: "var(--aa-basic-fg)"      },
  { value: "acidic",   label: "Acidic",   bg: "var(--aa-acidic-bg)",       dot: "var(--aa-acidic-fg)"     },
  { value: "stop",     label: "Stop",     bg: "var(--aa-stop-bg)",         dot: "var(--aa-stop-fg)"       },
];

const BASE_ORDER = ["U", "C", "A", "G"] as const;
type Base = (typeof BASE_ORDER)[number];

function baseToDna(b: Base): string {
  return b === "U" ? "T" : b;
}

export function CodonGrid() {
  const [category, setCategory] = useState<CatFilter>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Codon | null>(null);
  const seqNotation = useSettings((s) => s.seqNotation);
  const setSeqNotation = useSettings((s) => s.setSeqNotation);

  const normalizedQuery = query.trim().toUpperCase();

  const isMatch = useCallback(
    (c: Codon): boolean => {
      if (!normalizedQuery) return false;
      const q = normalizedQuery.replace(/T/g, "U");
      return (
        c.triplet.includes(q) ||
        c.dnaTriplet.includes(normalizedQuery) ||
        c.aminoAcid.toUpperCase().includes(normalizedQuery) ||
        c.aminoAcid1 === normalizedQuery
      );
    },
    [normalizedQuery],
  );

  const isDimmed = useCallback(
    (c: Codon): boolean => {
      if (category !== "all" && c.category !== category) return true;
      if (normalizedQuery && !isMatch(c)) return true;
      return false;
    },
    [category, normalizedQuery, isMatch],
  );

  const table = useMemo(() => {
    return BASE_ORDER.map((first) => ({
      first,
      thirdBases: BASE_ORDER.map((third) => ({
        third,
        cells: BASE_ORDER.map(
          (second) =>
            codons.find((c) => c.triplet === `${first}${second}${third}`)!,
        ),
      })),
    }));
  }, []);

  const counts = useMemo(() => {
    const acc: Record<string, number> = { all: 64 };
    codons.forEach((c) => {
      acc[c.category] = (acc[c.category] ?? 0) + 1;
    });
    return acc;
  }, []);

  const displayBase = (b: Base) => (seqNotation === "dna" ? baseToDna(b) : b);
  const hasActiveFilter = category !== "all" || !!normalizedQuery;

  let tileIndex = 0;

  return (
    <>
      {/* ── Toolbar (Zperiod-style: pills) ── */}
      <div className="sticky top-16 z-30 -mx-6 mb-6 border-b border-border bg-background/90 px-6 py-3 backdrop-blur-md md:-mx-8 md:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left side: Category + Notation + Reset */}
          <div className="flex flex-wrap items-center gap-2" data-tour="codon-filter">
            {CATEGORY_META.map((cat) => {
              const active = cat.value === category;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`relative inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "border-foreground/20 bg-muted text-foreground shadow-sm"
                      : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  {cat.value !== "all" && (
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: cat.bg, border: `1.5px solid ${cat.dot}` }}
                    />
                  )}
                  {cat.label}
                  <span className="text-[10px] tabular-nums opacity-50">
                    {counts[cat.value] ?? 0}
                  </span>
                </button>
              );
            })}

            {/* Notation toggle */}
            <div
              className="flex items-center gap-0.5 rounded-full border border-border bg-muted/40 p-0.5 text-xs font-semibold"
              data-tour="codon-notation"
            >
              {(["rna", "dna"] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSeqNotation(n)}
                  className={`relative rounded-full px-3 py-1 uppercase transition-colors ${
                    seqNotation === n
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {seqNotation === n && (
                    <motion.span
                      layoutId="notation-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-background shadow-sm"
                      transition={{ type: "spring", damping: 28, stiffness: 320 }}
                    />
                  )}
                  {n}
                </button>
              ))}
            </div>

            {/* Reset */}
            {hasActiveFilter && (
              <button
                type="button"
                onClick={() => {
                  setCategory("all");
                  setQuery("");
                }}
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw size={12} />
                Reset
              </button>
            )}
          </div>

          {/* Right side: Search */}
          <div className="relative w-full sm:w-56" data-tour="codon-search">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full rounded-full border border-border bg-muted/40 py-1.5 pl-9 pr-8 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Legend (inline colored swatches) ── */}
      <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-muted-foreground">
        {CATEGORY_META.filter((c) => c.value !== "all").map((cat) => (
          <span key={cat.value} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-5 rounded"
              style={{ background: cat.bg, border: `1px solid ${cat.dot}40` }}
            />
            {cat.label}
          </span>
        ))}
      </div>

      {/* ── The Codon Table (Periodic-table style) ── */}
      <div className="overflow-x-auto pb-4">
        <div className="inline-block min-w-[660px]">
          <table className="w-full border-separate" style={{ borderSpacing: "4px" }}>
            {/* Column headers — 2nd base */}
            <thead>
              <tr>
                <th className="w-14" />
                {BASE_ORDER.map((second) => {
                  const db = displayBase(second);
                  return (
                    <th key={second} className="pb-2 text-center">
                      <div className="font-sequence text-xl font-black text-foreground">
                        {db}
                      </div>
                      <div className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
                        2nd base
                      </div>
                    </th>
                  );
                })}
                <th className="w-12" />
              </tr>
            </thead>

            <tbody>
              {table.map(({ first, thirdBases }) => {
                const dbFirst = displayBase(first);
                return (
                  <tr key={first}>
                    {/* First-base label */}
                    <td className="pr-2 text-center align-middle">
                      <div className="font-sequence text-xl font-black text-foreground">
                        {dbFirst}
                      </div>
                      <div className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
                        1st
                      </div>
                    </td>

                    {/* 4 second-base columns — each has 4 codons (third-base variants) */}
                    {BASE_ORDER.map((second, sIdx) => (
                      <td key={second} className="p-0 align-top">
                        <div className="grid grid-cols-1 gap-[3px]">
                          {thirdBases.map(({ third, cells }) => {
                            const codon = cells[sIdx];
                            const idx = tileIndex++;
                            return (
                              <div
                                key={third}
                                data-tour={
                                  first === "U" && second === "U" && third === "U"
                                    ? "codon-tile"
                                    : undefined
                                }
                              >
                                <CodonTile
                                  codon={codon}
                                  index={idx}
                                  dimmed={isDimmed(codon)}
                                  highlighted={
                                    !!normalizedQuery &&
                                    isMatch(codon) &&
                                    !isDimmed(codon)
                                  }
                                  onSelect={setSelected}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    ))}

                    {/* Third-base labels */}
                    <td className="pl-2 align-middle">
                      <div className="flex flex-col items-start gap-4">
                        {BASE_ORDER.map((third) => (
                          <span
                            key={third}
                            className="font-sequence text-xs font-bold text-muted-foreground"
                          >
                            {displayBase(third)}
                          </span>
                        ))}
                      </div>
                      <div className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
                        3rd
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <CodonModal codon={selected} onClose={() => setSelected(null)} />
    </>
  );
}
