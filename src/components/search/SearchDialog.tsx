"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Grid3X3,
  Dna,
  FlaskConical,
  ArrowRight,
  Command,
  BookOpen,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { codons } from "@/data/geneticCode";
import { nucleotides } from "@/data/nucleotides";
import { allProteinComponents } from "@/data/proteinExpanded";
import { glossaryEntries } from "@/data/glossary";

type ResultKind = "codon" | "molecule" | "page" | "glossary";

interface SearchResult {
  kind: ResultKind;
  id: string;
  title: string;
  subtitle: string;
  href: string;
  score: number;
}

const PAGES: Array<{ title: string; subtitle: string; href: string }> = [
  { title: "Codon Grid", subtitle: "64 interactive codons", href: "/table" },
  { title: "Molecule Engine", subtitle: "DNA · RNA · Protein", href: "/molecules" },
  { title: "Tools", subtitle: "Transcription · Translation · Mutation", href: "/tools" },
  { title: "Genetics Quiz", subtitle: "Quick practice questions", href: "/tools/quiz" },
  { title: "Flashcards", subtitle: "Active-recall revision cards", href: "/tools/flashcards" },
  { title: "Glossary", subtitle: "Key genetics terms and definitions", href: "/glossary" },
  { title: "Settings", subtitle: "Theme, language, display", href: "/settings" },
];

const KIND_ICON: Record<ResultKind, typeof Grid3X3> = {
  codon: Grid3X3,
  molecule: Dna,
  page: FlaskConical,
  glossary: BookOpen,
};

const KIND_LABEL: Record<ResultKind, string> = {
  codon: "Codons",
  molecule: "Molecules",
  page: "Pages",
  glossary: "Glossary",
};

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  return (
    <AnimatePresence>
      {open && <SearchDialogInner onClose={onClose} />}
    </AnimatePresence>
  );
}

function SearchDialogInner({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Body scroll lock + focus + ESC — only side effects, no setState inside.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  // Build index once per mount
  const index = useMemo<SearchResult[]>(() => {
    const codonResults: SearchResult[] = codons.map((c) => ({
      kind: "codon",
      id: c.triplet,
      title: c.triplet,
      subtitle: `${c.aminoAcid} (${c.aminoAcid1}) · ${c.category}${c.isStart ? " · Start" : ""}${c.isStop ? " · Stop" : ""}`,
      href: `/table?codon=${c.triplet}`,
      score: 0,
    }));
    const moleculeResults: SearchResult[] = [
      ...nucleotides,
      ...allProteinComponents,
    ].map((m) => ({
      kind: "molecule",
      id: m.id,
      title: m.name,
      subtitle: `${m.tab.toUpperCase()} · ${m.category} · ${m.shortDesc}`,
      href: `/molecules?open=${m.id}`,
      score: 0,
    }));
    const pageResults: SearchResult[] = PAGES.map((p) => ({
      kind: "page",
      id: p.href,
      title: p.title,
      subtitle: p.subtitle,
      href: p.href,
      score: 0,
    }));
    const glossaryResults: SearchResult[] = glossaryEntries.map((entry) => ({
      kind: "glossary",
      id: entry.id,
      title: entry.term,
      subtitle: `${entry.category} · ${entry.summary}`,
      href: `/glossary#${entry.id}`,
      score: 0,
    }));
    return [...pageResults, ...glossaryResults, ...codonResults, ...moleculeResults];
  }, []);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return index.filter((r) => r.kind === "page").slice(0, 8);
    }
    const qRna = q.replace(/t/g, "u");
    return index
      .map((r) => {
        const hay = `${r.title} ${r.subtitle}`.toLowerCase();
        let score = 0;
        if (r.title.toLowerCase() === q) score += 100;
        if (r.title.toLowerCase().startsWith(q)) score += 40;
        if (hay.includes(q)) score += 20;
        if (r.kind === "codon" && r.title.toLowerCase().includes(qRna))
          score += 35;
        return { ...r, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 24);
  }, [index, query]);

  const flat = useMemo<SearchResult[]>(() => {
    const page = results.filter((r) => r.kind === "page");
    const glossary = results.filter((r) => r.kind === "glossary");
    const codon = results.filter((r) => r.kind === "codon");
    const molecule = results.filter((r) => r.kind === "molecule");
    return [...page, ...glossary, ...codon, ...molecule];
  }, [results]);

  // Clamp cursor without a setState-in-effect
  const safeCursor = Math.min(cursor, Math.max(0, flat.length - 1));

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(flat.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = flat[safeCursor];
      if (r) {
        router.push(r.href);
        onClose();
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
        className="fixed inset-0 z-[80] bg-background/70 backdrop-blur-sm"
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        onKeyDown={onKeyDown}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="fixed left-1/2 top-[12vh] z-[90] flex w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
      >
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search size={16} className="text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            placeholder="Search codons, molecules, glossary terms, pages..."
            className="flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[55vh] overflow-y-auto">
          {flat.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No matches for{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{query}&rdquo;
              </span>
            </div>
          ) : (
            (["page", "glossary", "codon", "molecule"] as ResultKind[]).map((kind) => {
              const group = flat.filter((r) => r.kind === kind);
              if (group.length === 0) return null;
              const offset = flat.indexOf(group[0]);
              const Icon = KIND_ICON[kind];
              return (
                <div key={kind} className="py-2">
                  <div className="px-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {KIND_LABEL[kind]}{" "}
                    <span className="text-muted-foreground/60">
                      {group.length}
                    </span>
                  </div>
                  {group.map((r, i) => {
                    const active = offset + i === safeCursor;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onMouseEnter={() => setCursor(offset + i)}
                        onClick={() => {
                          router.push(r.href);
                          onClose();
                        }}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          active ? "bg-muted" : "hover:bg-muted/60"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            active
                              ? "bg-accent/20 text-accent"
                              : "bg-muted/50 text-muted-foreground"
                          }`}
                        >
                          <Icon size={14} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block truncate text-sm font-medium ${kind === "codon" ? "font-sequence tracking-wider" : ""}`}
                          >
                            {r.title}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {r.subtitle}
                          </span>
                        </span>
                        {active && (
                          <ArrowRight
                            size={14}
                            className="shrink-0 text-muted-foreground"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/20 px-4 py-2 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-border bg-background px-1 py-0.5 font-mono">
                ↑↓
              </kbd>{" "}
              Navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-border bg-background px-1 py-0.5 font-mono">
                ↵
              </kbd>{" "}
              Open
            </span>
          </div>
          <span className="inline-flex items-center gap-1">
            <Command size={10} />K to toggle
          </span>
        </div>
      </motion.div>
    </>
  );
}
