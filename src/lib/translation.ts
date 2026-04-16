import { getCodon } from "@/data/geneticCode";

export interface TranslatedCodon {
  codon: string;
  position: number;
  aminoAcid: string;
  aminoAcid1: string;
  category: string;
  isStart: boolean;
  isStop: boolean;
}

export interface TranslationResult {
  mrna: string;
  orfStart: number;
  codons: TranslatedCodon[];
  protein: string;
}

export function sanitizeMrna(input: string): string {
  return input.toUpperCase().replace(/[^AUCG]/g, "").replace(/T/g, "U");
}

export function translate(mrnaRaw: string): TranslationResult {
  const seq = sanitizeMrna(mrnaRaw);
  const orfStart = seq.indexOf("AUG");
  if (orfStart === -1) return { mrna: seq, orfStart: -1, codons: [], protein: "" };

  const codons: TranslatedCodon[] = [];
  const protein: string[] = [];

  for (let i = orfStart; i + 2 < seq.length; i += 3) {
    const codon = seq.slice(i, i + 3);
    const entry = getCodon(codon);
    if (!entry) break;

    codons.push({
      codon,
      position: (i - orfStart) / 3,
      aminoAcid: entry.aminoAcid,
      aminoAcid1: entry.aminoAcid1,
      category: entry.category,
      isStart: i === orfStart,
      isStop: entry.isStop,
    });

    if (entry.isStop) break;
    protein.push(entry.aminoAcid1);
  }

  return { mrna: seq, orfStart, codons, protein: protein.join("") };
}

export const CATEGORY_COLOR: Record<string, string> = {
  nonpolar: "bg-blue-500/30 text-blue-300 border-blue-500/50",
  polar: "bg-emerald-500/30 text-emerald-300 border-emerald-500/50",
  basic: "bg-amber-500/30 text-amber-300 border-amber-500/50",
  acidic: "bg-red-500/30 text-red-300 border-red-500/50",
  stop: "bg-zinc-500/30 text-zinc-400 border-zinc-500/50",
};
