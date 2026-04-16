import type { AminoAcid } from "./types";

export const aminoAcids: AminoAcid[] = [
  { name: "Alanine",       abbr3: "Ala", abbr1: "A", category: "nonpolar", mw: 89.09,  pI: 6.00, codons: ["GCU","GCC","GCA","GCG"], hydrophobicity: 1.8,  sideChain: "Methyl (-CH₃)", charge: "neutral" },
  { name: "Arginine",      abbr3: "Arg", abbr1: "R", category: "basic",    mw: 174.20, pI: 10.76,codons: ["CGU","CGC","CGA","CGG","AGA","AGG"], hydrophobicity: -4.5, sideChain: "Guanidinium", charge: "positive" },
  { name: "Asparagine",    abbr3: "Asn", abbr1: "N", category: "polar",    mw: 132.12, pI: 5.41, codons: ["AAU","AAC"], hydrophobicity: -3.5, sideChain: "Carboxamide", charge: "neutral" },
  { name: "Aspartate",     abbr3: "Asp", abbr1: "D", category: "acidic",   mw: 133.10, pI: 2.77, codons: ["GAU","GAC"], hydrophobicity: -3.5, sideChain: "Carboxylate", charge: "negative" },
  { name: "Cysteine",      abbr3: "Cys", abbr1: "C", category: "polar",    mw: 121.16, pI: 5.07, codons: ["UGU","UGC"], hydrophobicity: 2.5,  sideChain: "Thiol (-SH)", charge: "neutral" },
  { name: "Glutamate",     abbr3: "Glu", abbr1: "E", category: "acidic",   mw: 147.13, pI: 3.22, codons: ["GAA","GAG"], hydrophobicity: -3.5, sideChain: "Carboxylate", charge: "negative" },
  { name: "Glutamine",     abbr3: "Gln", abbr1: "Q", category: "polar",    mw: 146.15, pI: 5.65, codons: ["CAA","CAG"], hydrophobicity: -3.5, sideChain: "Carboxamide", charge: "neutral" },
  { name: "Glycine",       abbr3: "Gly", abbr1: "G", category: "nonpolar", mw: 75.03,  pI: 5.97, codons: ["GGU","GGC","GGA","GGG"], hydrophobicity: -0.4, sideChain: "Hydrogen (-H)", charge: "neutral" },
  { name: "Histidine",     abbr3: "His", abbr1: "H", category: "basic",    mw: 155.16, pI: 7.59, codons: ["CAU","CAC"], hydrophobicity: -3.2, sideChain: "Imidazole", charge: "positive" },
  { name: "Isoleucine",    abbr3: "Ile", abbr1: "I", category: "nonpolar", mw: 131.17, pI: 6.02, codons: ["AUU","AUC","AUA"], hydrophobicity: 4.5,  sideChain: "sec-Butyl", charge: "neutral" },
  { name: "Leucine",       abbr3: "Leu", abbr1: "L", category: "nonpolar", mw: 131.17, pI: 5.98, codons: ["UUA","UUG","CUU","CUC","CUA","CUG"], hydrophobicity: 3.8, sideChain: "Isobutyl", charge: "neutral" },
  { name: "Lysine",        abbr3: "Lys", abbr1: "K", category: "basic",    mw: 146.19, pI: 9.74, codons: ["AAA","AAG"], hydrophobicity: -3.9, sideChain: "Amino (-NH₃⁺)", charge: "positive" },
  { name: "Methionine",    abbr3: "Met", abbr1: "M", category: "nonpolar", mw: 149.21, pI: 5.74, codons: ["AUG"], hydrophobicity: 1.9, sideChain: "Thioether (-S-CH₃)", charge: "neutral" },
  { name: "Phenylalanine", abbr3: "Phe", abbr1: "F", category: "nonpolar", mw: 165.19, pI: 5.48, codons: ["UUU","UUC"], hydrophobicity: 2.8, sideChain: "Benzyl", charge: "neutral" },
  { name: "Proline",       abbr3: "Pro", abbr1: "P", category: "nonpolar", mw: 115.13, pI: 6.30, codons: ["CCU","CCC","CCA","CCG"], hydrophobicity: -1.6, sideChain: "Pyrrolidine (cyclic)", charge: "neutral" },
  { name: "Serine",        abbr3: "Ser", abbr1: "S", category: "polar",    mw: 105.09, pI: 5.68, codons: ["UCU","UCC","UCA","UCG","AGU","AGC"], hydrophobicity: -0.8, sideChain: "Hydroxymethyl (-CH₂OH)", charge: "neutral" },
  { name: "Threonine",     abbr3: "Thr", abbr1: "T", category: "polar",    mw: 119.12, pI: 5.60, codons: ["ACU","ACC","ACA","ACG"], hydrophobicity: -0.7, sideChain: "Hydroxyethyl", charge: "neutral" },
  { name: "Tryptophan",    abbr3: "Trp", abbr1: "W", category: "nonpolar", mw: 204.23, pI: 5.89, codons: ["UGG"], hydrophobicity: -0.9, sideChain: "Indole", charge: "neutral" },
  { name: "Tyrosine",      abbr3: "Tyr", abbr1: "Y", category: "polar",    mw: 181.19, pI: 5.66, codons: ["UAU","UAC"], hydrophobicity: -1.3, sideChain: "Phenol", charge: "neutral" },
  { name: "Valine",        abbr3: "Val", abbr1: "V", category: "nonpolar", mw: 117.15, pI: 5.96, codons: ["GUU","GUC","GUA","GUG"], hydrophobicity: 4.2, sideChain: "Isopropyl", charge: "neutral" },
];

/** Lookup amino acid by 1-letter code */
export function getAA(code1: string): AminoAcid | undefined {
  return aminoAcids.find((a) => a.abbr1 === code1);
}

/** Lookup amino acid by 3-letter abbreviation */
export function getAAByAbbr3(abbr3: string): AminoAcid | undefined {
  return aminoAcids.find((a) => a.abbr3.toLowerCase() === abbr3.toLowerCase());
}
