import { getCodon } from "@/data/geneticCode";

export type MutationType = "substitution" | "insertion" | "deletion";
export type MutationConsequence = "silent" | "missense" | "nonsense" | "frameshift";

export interface MutationResult {
  original: string;
  mutated: string;
  position: number;
  type: MutationType;
  newBase?: string;
  consequence: MutationConsequence;
  description: string;
}

const DNA_BASES = ["A", "T", "G", "C"] as const;

function codonConsequence(
  origCodon: string,
  mutCodon: string
): { consequence: MutationConsequence; description: string } {
  const o = getCodon(origCodon.toUpperCase().replace(/T/g, "U"));
  const m = getCodon(mutCodon.toUpperCase().replace(/T/g, "U"));
  if (!o || !m) return { consequence: "missense", description: "Incomplete codon." };
  if (!o.isStop && m.isStop)
    return { consequence: "nonsense", description: `Early stop codon introduced — truncated protein.` };
  if (o.isStop && !m.isStop)
    return { consequence: "missense", description: `Stop codon removed — read-through mutation.` };
  if (o.aminoAcid === m.aminoAcid)
    return { consequence: "silent", description: `${origCodon}→${mutCodon} both encode ${o.aminoAcid} (synonymous).` };
  return {
    consequence: "missense",
    description: `Amino acid change: ${o.aminoAcid} → ${m.aminoAcid}.`,
  };
}

export function simulateMutation(
  sequence: string,
  type: MutationType,
  position: number,
  newBase?: string
): MutationResult {
  const seq = sequence.toUpperCase().replace(/[^ATGC]/g, "");
  const pos = Math.max(0, Math.min(position, seq.length - 1));

  if (type === "substitution") {
    const base = newBase ?? DNA_BASES.find((b) => b !== seq[pos]) ?? "A";
    const mutated = seq.slice(0, pos) + base + seq.slice(pos + 1);
    // Find affected codon
    const codonIdx = Math.floor(pos / 3);
    const origCodon = seq.slice(codonIdx * 3, codonIdx * 3 + 3);
    const mutCodon = mutated.slice(codonIdx * 3, codonIdx * 3 + 3);
    const { consequence, description } = codonConsequence(origCodon, mutCodon);
    return { original: seq, mutated, position: pos, type, newBase: base, consequence, description };
  }

  if (type === "insertion") {
    const base = newBase ?? "A";
    const mutated = seq.slice(0, pos + 1) + base + seq.slice(pos + 1);
    return {
      original: seq, mutated, position: pos, type, newBase: base,
      consequence: "frameshift",
      description: `Insertion of '${base}' at position ${pos + 1} causes a +1 frameshift.`,
    };
  }

  // deletion
  const mutated = seq.slice(0, pos) + seq.slice(pos + 1);
  return {
    original: seq, mutated, position: pos, type,
    consequence: "frameshift",
    description: `Deletion of '${seq[pos]}' at position ${pos + 1} causes a -1 frameshift.`,
  };
}

export { DNA_BASES };

export const CONSEQUENCE_COLOR: Record<MutationConsequence, string> = {
  silent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  missense: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  nonsense: "text-red-400 bg-red-500/10 border-red-500/30",
  frameshift: "text-violet-400 bg-violet-500/10 border-violet-500/30",
};
