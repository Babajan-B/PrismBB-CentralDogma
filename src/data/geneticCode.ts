import type { Codon, AACategory } from "./types";

/* ── Codon-to-amino-acid mapping (standard genetic code) ── */
const map: Record<string, [string, string, AACategory, boolean]> = {
  // [abbr3, abbr1, category, isStop]
  UUU: ["Phe","F","nonpolar",false], UUC: ["Phe","F","nonpolar",false],
  UUA: ["Leu","L","nonpolar",false], UUG: ["Leu","L","nonpolar",false],
  CUU: ["Leu","L","nonpolar",false], CUC: ["Leu","L","nonpolar",false],
  CUA: ["Leu","L","nonpolar",false], CUG: ["Leu","L","nonpolar",false],
  AUU: ["Ile","I","nonpolar",false], AUC: ["Ile","I","nonpolar",false],
  AUA: ["Ile","I","nonpolar",false], AUG: ["Met","M","nonpolar",false],
  GUU: ["Val","V","nonpolar",false], GUC: ["Val","V","nonpolar",false],
  GUA: ["Val","V","nonpolar",false], GUG: ["Val","V","nonpolar",false],

  UCU: ["Ser","S","polar",false], UCC: ["Ser","S","polar",false],
  UCA: ["Ser","S","polar",false], UCG: ["Ser","S","polar",false],
  CCU: ["Pro","P","nonpolar",false], CCC: ["Pro","P","nonpolar",false],
  CCA: ["Pro","P","nonpolar",false], CCG: ["Pro","P","nonpolar",false],
  ACU: ["Thr","T","polar",false], ACC: ["Thr","T","polar",false],
  ACA: ["Thr","T","polar",false], ACG: ["Thr","T","polar",false],
  GCU: ["Ala","A","nonpolar",false], GCC: ["Ala","A","nonpolar",false],
  GCA: ["Ala","A","nonpolar",false], GCG: ["Ala","A","nonpolar",false],

  UAU: ["Tyr","Y","polar",false],    UAC: ["Tyr","Y","polar",false],
  UAA: ["Stop","*","stop",true],      UAG: ["Stop","*","stop",true],
  CAU: ["His","H","basic",false],     CAC: ["His","H","basic",false],
  CAA: ["Gln","Q","polar",false],     CAG: ["Gln","Q","polar",false],
  AAU: ["Asn","N","polar",false],     AAC: ["Asn","N","polar",false],
  AAA: ["Lys","K","basic",false],     AAG: ["Lys","K","basic",false],
  GAU: ["Asp","D","acidic",false],    GAC: ["Asp","D","acidic",false],
  GAA: ["Glu","E","acidic",false],    GAG: ["Glu","E","acidic",false],

  UGU: ["Cys","C","polar",false],     UGC: ["Cys","C","polar",false],
  UGA: ["Stop","*","stop",true],      UGG: ["Trp","W","nonpolar",false],
  CGU: ["Arg","R","basic",false],     CGC: ["Arg","R","basic",false],
  CGA: ["Arg","R","basic",false],     CGG: ["Arg","R","basic",false],
  AGU: ["Ser","S","polar",false],     AGC: ["Ser","S","polar",false],
  AGA: ["Arg","R","basic",false],     AGG: ["Arg","R","basic",false],
  GGU: ["Gly","G","nonpolar",false],  GGC: ["Gly","G","nonpolar",false],
  GGA: ["Gly","G","nonpolar",false],  GGG: ["Gly","G","nonpolar",false],
};

/** Complement of last base for wobble anticodon */
function anticodon(triplet: string): string {
  const comp: Record<string, string> = { A: "U", U: "A", G: "C", C: "G" };
  return triplet
    .split("")
    .reverse()
    .map((b) => comp[b] ?? b)
    .join("");
}

function rnaToDna(rna: string): string {
  return rna.replace(/U/g, "T");
}

export const codons: Codon[] = Object.entries(map).map(
  ([triplet, [aa3, aa1, cat, stop]]) => ({
    triplet,
    dnaTriplet: rnaToDna(triplet),
    aminoAcid: aa3,
    aminoAcid1: aa1,
    category: cat,
    anticodon: anticodon(triplet),
    isStart: triplet === "AUG",
    isStop: stop,
  })
);

/** Lookup codon by RNA triplet */
export function getCodon(triplet: string): Codon | undefined {
  return codons.find((c) => c.triplet === triplet.toUpperCase());
}

/** Get all codons for a given amino acid (1-letter code) */
export function codonsForAA(aa1: string): Codon[] {
  return codons.filter((c) => c.aminoAcid1 === aa1);
}
