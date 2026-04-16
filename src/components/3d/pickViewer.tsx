"use client";

import type { MolecularComponent } from "@/data/types";
import { getAA } from "@/data/aminoAcids";
import { MolecularViewer } from "./MolecularViewer";
import { DNAHelix } from "@/components/hero/DNAHelix";
import {
  AminoAcidModel,
  AMINO_ACID_LEGEND,
} from "./AminoAcidModel";
import { TRNAModel, TRNA_LEGEND } from "./TRNAModel";
import { RibosomeModel, RIBOSOME_LEGEND } from "./RibosomeModel";
import {
  NucleotideModel,
  NUCLEOTIDE_LEGEND,
} from "./NucleotideModel";

/**
 * Returns a 3D-style SVG viewer matching the given component, or null if the
 * component has no dedicated visualization.
 */
export function pickViewer(
  component: MolecularComponent,
): React.ReactNode | null {
  // Amino acid materialized component
  if (component.id.startsWith("prot-aa-")) {
    const code = component.id.replace("prot-aa-", "");
    const aa = getAA(code);
    if (!aa) return null;
    return (
      <MolecularViewer
        title="Amino acid · ball & stick"
        subtitle={`${aa.name} (${aa.abbr3}/${aa.abbr1})`}
        rotationSpeed={22}
        legend={AMINO_ACID_LEGEND}
      >
        <AminoAcidModel aa={aa} />
      </MolecularViewer>
    );
  }

  switch (component.id) {
    case "rna-trna":
      return (
        <MolecularViewer
          title="Transfer RNA · cloverleaf"
          subtitle="~76 nucleotides · L-shape in 3D"
          rotationSpeed={20}
          legend={TRNA_LEGEND}
        >
          <TRNAModel />
        </MolecularViewer>
      );

    case "prot-ribosome":
      return (
        <MolecularViewer
          title="Ribosome · 80S complex"
          subtitle="60S + 40S subunits with A/P/E sites"
          rotationSpeed={24}
          legend={RIBOSOME_LEGEND}
        >
          <RibosomeModel />
        </MolecularViewer>
      );

    case "dna-helix":
      return (
        <MolecularViewer
          title="DNA · B-form double helix"
          subtitle="Anti-parallel strands · 10 bp / turn"
          rotationSpeed={14}
          legend={[
            { color: "#3b82f6", label: "A · Adenine" },
            { color: "#ef4444", label: "T · Thymine" },
            { color: "#10b981", label: "G · Guanine" },
            { color: "#f59e0b", label: "C · Cytosine" },
          ]}
        >
          <DNAHelix rungs={18} width={240} height={360} speed={9} />
        </MolecularViewer>
      );

    case "dna-nucleotide":
      return (
        <MolecularViewer
          title="DNA nucleotide"
          subtitle="Deoxyribose + phosphate + base"
          rotationSpeed={20}
          legend={NUCLEOTIDE_LEGEND}
        >
          <NucleotideModel type="dna" base="A" />
        </MolecularViewer>
      );

    case "rna-nucleotide":
      return (
        <MolecularViewer
          title="RNA nucleotide"
          subtitle="Ribose (with 2′-OH) + phosphate + base"
          rotationSpeed={20}
          legend={NUCLEOTIDE_LEGEND}
        >
          <NucleotideModel type="rna" base="U" />
        </MolecularViewer>
      );

    case "dna-base":
    case "rna-uracil":
      return (
        <MolecularViewer
          title="Nitrogenous base"
          subtitle={component.name}
          rotationSpeed={20}
          legend={NUCLEOTIDE_LEGEND}
        >
          <NucleotideModel
            type={component.tab === "rna" ? "rna" : "dna"}
            base={component.id === "rna-uracil" ? "U" : "A"}
          />
        </MolecularViewer>
      );

    default:
      return null;
  }
}
