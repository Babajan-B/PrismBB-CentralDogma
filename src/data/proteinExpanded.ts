import type { MolecularComponent } from "./types";
import { aminoAcids } from "./aminoAcids";
import { proteinComponents } from "./components";

/**
 * Protein tab listing: all 20 amino acids materialized as MolecularComponents,
 * plus the existing protein structural/functional components.
 *
 * Each amino acid carries its 1-letter abbreviation in the id so viewers
 * can resolve back to the AminoAcid record.
 */
function aaToComponent(aa: (typeof aminoAcids)[number]): MolecularComponent {
  const codonList = aa.codons.join(", ");
  return {
    id: `prot-aa-${aa.abbr1}`,
    name: `${aa.name} (${aa.abbr3})`,
    category: "functional",
    tab: "protein",
    shortDesc: `${aa.category} amino acid · MW ${aa.mw} Da · pI ${aa.pI}`,
    details: {
      identity: `${aa.name} (${aa.abbr3}/${aa.abbr1}) is a ${aa.category} amino acid with a ${aa.sideChain.toLowerCase()} side chain. It carries a ${aa.charge} charge at physiological pH.`,
      structure: `Side chain: ${aa.sideChain}. Molecular weight: ${aa.mw} Da. Isoelectric point (pI): ${aa.pI}. Kyte-Doolittle hydrophobicity: ${aa.hydrophobicity}.`,
      function: `Encoded by ${aa.codons.length} codon${aa.codons.length > 1 ? "s" : ""} (${codonList}). ${
        aa.category === "nonpolar"
          ? "Typically buried in the hydrophobic core of folded proteins."
          : aa.category === "polar"
            ? "Often found on the protein surface and in hydrogen-bonding networks."
            : aa.category === "basic"
              ? "Positively charged; contributes to DNA/RNA binding and catalysis."
              : aa.category === "acidic"
                ? "Negatively charged; key in metal binding and enzyme active sites."
                : "Specialized role in signaling."
      }`,
      context: `${aa.name} ${
        aa.abbr1 === "M"
          ? "is the universal translation start (AUG codon)."
          : aa.abbr1 === "W"
            ? "is the largest amino acid and has a single codon (UGG) — rare and conserved."
            : aa.abbr1 === "P"
              ? "breaks α-helices because its rigid ring locks the backbone."
              : aa.abbr1 === "G"
                ? "is the smallest and most flexible, enabling tight turns and loops."
                : aa.abbr1 === "C"
                  ? "forms disulfide bonds (S-S) that stabilize tertiary and quaternary structure."
                  : `is one of the 20 proteinogenic amino acids incorporated during translation.`
      }`,
    },
  };
}

export const proteinAminoAcidComponents: MolecularComponent[] =
  aminoAcids.map(aaToComponent);

/** Full protein-tab listing for the Molecule Engine */
export const allProteinComponents: MolecularComponent[] = [
  ...proteinComponents,
  ...proteinAminoAcidComponents,
];
