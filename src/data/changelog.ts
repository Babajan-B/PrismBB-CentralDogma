export type ChangelogTag = "NEW" | "UI" | "DATA" | "PERF" | "LANG" | "FIX";

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  items: Array<{ tag: ChangelogTag; text: string }>;
}

export const CURRENT_VERSION = "0.7.0";

export const changelog: ChangelogEntry[] = [
  {
    version: "0.7.0",
    date: "2026-04-15",
    title: "Protein Explorer + 3D Models",
    items: [
      { tag: "NEW", text: "20 amino acids added to the Protein tab with ball-and-stick viewers." },
      { tag: "NEW", text: "Dedicated 3D-style viewers for tRNA cloverleaf, ribosome (60S/40S), DNA helix, and nucleotides." },
      { tag: "UI", text: "Molecular viewer with auto-rotate, pause/play, zoom, and legend footer." },
      { tag: "DATA", text: "Protein-tab component count grew from 12 to 32." },
    ],
  },
  {
    version: "0.6.0",
    date: "2026-04-15",
    title: "Molecule Engine",
    items: [
      { tag: "NEW", text: "DNA / RNA / Protein explorer with 4-level detail modals." },
      { tag: "UI", text: "Tabbed interface with animated background pill and live component counts." },
      { tag: "DATA", text: "28 DNA + RNA molecular components wired into searchable grid." },
    ],
  },
  {
    version: "0.5.0",
    date: "2026-04-14",
    title: "Codon Grid",
    items: [
      { tag: "NEW", text: "Interactive 64-tile codon grid grouped by first base." },
      { tag: "UI", text: "4-level card slider — identity, chemistry, genomics, context." },
      { tag: "UI", text: "RNA/DNA notation toggle and 1-letter / 3-letter AA display." },
    ],
  },
  {
    version: "0.4.0",
    date: "2026-04-13",
    title: "Hero Landing",
    items: [
      { tag: "NEW", text: "Animated DNA helix hero on desktop." },
      { tag: "NEW", text: "Mobile scroll-reveal landing with feature showcase cards." },
      { tag: "PERF", text: "SVG-based helix keeps landing page LCP under 1.5s." },
    ],
  },
  {
    version: "0.3.0",
    date: "2026-04-12",
    title: "Layout & Navigation",
    items: [
      { tag: "NEW", text: "Pill navigation with sliding active indicator." },
      { tag: "UI", text: "Dark / light / system theme toggle persisted to localStorage." },
      { tag: "UI", text: "Mobile bottom tab bar with safe-area padding." },
    ],
  },
  {
    version: "0.2.0",
    date: "2026-04-11",
    title: "Data Layer",
    items: [
      { tag: "DATA", text: "All 64 codons → amino acid mappings." },
      { tag: "DATA", text: "20 amino acids with MW, pI, hydrophobicity, and codon tables." },
      { tag: "DATA", text: "28 named molecular components across DNA, RNA, and protein." },
    ],
  },
  {
    version: "0.1.0",
    date: "2026-04-10",
    title: "Foundation",
    items: [
      { tag: "NEW", text: "Next.js 15 App Router scaffold with TypeScript strict mode." },
      { tag: "NEW", text: "Tailwind CSS 4 design tokens and dark-mode-first palette." },
      { tag: "NEW", text: "Zustand store with localStorage persistence." },
    ],
  },
];

export const TAG_STYLE: Record<ChangelogTag, { bg: string; fg: string }> = {
  NEW: { bg: "bg-accent/15", fg: "text-accent" },
  UI: { bg: "bg-blue-500/15", fg: "text-blue-400" },
  DATA: { bg: "bg-emerald-500/15", fg: "text-emerald-400" },
  PERF: { bg: "bg-amber-500/15", fg: "text-amber-400" },
  LANG: { bg: "bg-fuchsia-500/15", fg: "text-fuchsia-400" },
  FIX: { bg: "bg-rose-500/15", fg: "text-rose-400" },
};
