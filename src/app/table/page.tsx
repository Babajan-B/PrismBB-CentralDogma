"use client";

import { CodonGrid } from "@/components/codon-grid/CodonGrid";
import { DNAInlinePanel } from "@/components/3d/DNAInlinePanel";

export default function TablePage() {
  return (
    <main className="flex-1 px-6 pb-24 pt-6 md:px-8 md:pb-10">
      <header className="mb-8">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Interactive Reference
        </div>
        <h1 className="text-3xl font-black tracking-tight md:text-4xl">
          The Genetic Code
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          All 64 codons of the standard genetic code, organized by nucleotide
          position. Tap any codon to explore its identity, chemistry, genomic
          context, and biological significance.
        </p>
      </header>

      {/* Two-column layout: codon table + DNA panel */}
      <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
        {/* Codon table — takes all available space */}
        <div className="min-w-0 flex-1">
          <CodonGrid />
        </div>

        {/* DNA inline panel — sticky on the right on large screens */}
        <div className="xl:sticky xl:top-20 xl:w-64 xl:shrink-0">
          {/* Mobile: compact horizontal labels only, panel opens below */}
          <div className="block xl:hidden">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              DNA Structure
            </p>
          </div>
          <DNAInlinePanel />
        </div>
      </div>
    </main>
  );
}
