/* ── Shared types for the GeneCode data layer ── */

export type AACategory = "nonpolar" | "polar" | "basic" | "acidic" | "stop";
export type ComponentCategory = "structural" | "functional" | "regulatory";
export type MoleculeTab = "dna" | "rna" | "protein";

export interface AminoAcid {
  name: string;
  abbr3: string;
  abbr1: string;
  category: AACategory;
  mw: number; // Da
  pI: number;
  codons: string[]; // RNA codons
  hydrophobicity: number; // Kyte-Doolittle
  sideChain: string;
  charge: "positive" | "negative" | "neutral";
}

export interface Codon {
  triplet: string; // RNA e.g. "AUG"
  dnaTriplet: string; // DNA e.g. "ATG"
  aminoAcid: string; // 3-letter abbr or "Stop"
  aminoAcid1: string; // 1-letter or "*"
  category: AACategory;
  anticodon: string;
  isStart: boolean;
  isStop: boolean;
}

export interface MolecularComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  tab: MoleculeTab;
  shortDesc: string;
  formula?: string;
  details: {
    identity: string;
    structure: string;
    function: string;
    context: string;
  };
}
