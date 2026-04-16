export type GlossaryCategory =
  | "DNA"
  | "RNA"
  | "Protein"
  | "Inheritance"
  | "Lab";

export interface GlossaryEntry {
  id: string;
  term: string;
  category: GlossaryCategory;
  summary: string;
  detail: string;
  related: string[];
}

export const glossaryEntries: GlossaryEntry[] = [
  {
    id: "nucleotide",
    term: "Nucleotide",
    category: "DNA",
    summary: "The basic building block of DNA and RNA.",
    detail:
      "A nucleotide contains a sugar, a phosphate group, and a nitrogenous base. DNA uses deoxyribose and the bases A, T, G, and C, while RNA uses ribose and replaces T with U.",
    related: ["gene", "chromosome", "codon"],
  },
  {
    id: "gene",
    term: "Gene",
    category: "DNA",
    summary: "A DNA sequence that contains information for a functional product.",
    detail:
      "Many genes encode proteins, but some genes encode functional RNAs. A gene usually includes regulatory regions, coding regions, and signals that help control expression.",
    related: ["promoter", "transcription", "allele"],
  },
  {
    id: "chromosome",
    term: "Chromosome",
    category: "DNA",
    summary: "A packaged DNA molecule containing many genes.",
    detail:
      "Chromosomes organize DNA so it can fit inside the nucleus and be copied accurately. Humans usually have 46 chromosomes in most body cells, arranged as 23 pairs.",
    related: ["gene", "meiosis", "allele"],
  },
  {
    id: "replication",
    term: "DNA Replication",
    category: "DNA",
    summary: "The process of copying DNA before cell division.",
    detail:
      "During replication, helicase opens the double helix and DNA polymerase synthesizes new complementary strands. Each daughter DNA molecule contains one old strand and one newly made strand.",
    related: ["dna-polymerase", "chromosome", "mutation"],
  },
  {
    id: "mrna",
    term: "mRNA",
    category: "RNA",
    summary: "Messenger RNA that carries coding information from DNA to ribosomes.",
    detail:
      "mRNA is produced by transcription and read by ribosomes during translation. Its codons determine the amino acid sequence of the resulting polypeptide.",
    related: ["transcription", "translation", "codon"],
  },
  {
    id: "trna",
    term: "tRNA",
    category: "RNA",
    summary: "Transfer RNA that delivers amino acids to the ribosome.",
    detail:
      "Each tRNA has an anticodon that pairs with an mRNA codon and carries a specific amino acid. This makes translation accurate and sequence-specific.",
    related: ["anticodon", "translation", "ribosome"],
  },
  {
    id: "ribosome",
    term: "Ribosome",
    category: "Protein",
    summary: "The molecular machine that translates mRNA into protein.",
    detail:
      "Ribosomes move along mRNA codon by codon, position tRNAs, and catalyze peptide bond formation. They are made from ribosomal RNA and proteins.",
    related: ["translation", "trna", "codon"],
  },
  {
    id: "codon",
    term: "Codon",
    category: "RNA",
    summary: "A three-base sequence on mRNA that specifies an amino acid or stop signal.",
    detail:
      "Because codons are read in groups of three, insertions or deletions can disrupt the reading frame. AUG is the usual start codon, and UAA, UAG, and UGA are stop codons.",
    related: ["anticodon", "translation", "frameshift"],
  },
  {
    id: "anticodon",
    term: "Anticodon",
    category: "RNA",
    summary: "A three-base sequence on tRNA complementary to an mRNA codon.",
    detail:
      "The anticodon allows a tRNA to recognize the correct codon during translation, ensuring the right amino acid is added to the growing chain.",
    related: ["trna", "codon", "translation"],
  },
  {
    id: "transcription",
    term: "Transcription",
    category: "RNA",
    summary: "The process of making RNA from a DNA template.",
    detail:
      "RNA polymerase reads the DNA template strand and builds a complementary RNA transcript. In eukaryotes, the first product is often a pre-mRNA that must be processed before translation.",
    related: ["promoter", "mrna", "splicing"],
  },
  {
    id: "promoter",
    term: "Promoter",
    category: "RNA",
    summary: "A DNA region where transcription machinery binds to begin transcription.",
    detail:
      "Promoters help position RNA polymerase at the correct start site. Changes in promoter sequences can alter how strongly a gene is expressed.",
    related: ["gene", "transcription", "regulation"],
  },
  {
    id: "splicing",
    term: "Splicing",
    category: "RNA",
    summary: "The removal of introns and joining of exons in pre-mRNA.",
    detail:
      "Splicing produces mature mRNA ready for translation. Alternative splicing allows a single gene to produce multiple mRNA and protein variants.",
    related: ["exon", "intron", "mrna"],
  },
  {
    id: "exon",
    term: "Exon",
    category: "RNA",
    summary: "A sequence retained in mature mRNA after splicing.",
    detail:
      "Exons often contain coding sequence, but they can also include untranslated regions. Their order in mature mRNA affects the protein product.",
    related: ["splicing", "intron", "gene"],
  },
  {
    id: "intron",
    term: "Intron",
    category: "RNA",
    summary: "A sequence removed from pre-mRNA during splicing.",
    detail:
      "Introns are transcribed into pre-mRNA but usually do not remain in mature mRNA. Mutations at splice sites can cause incorrect RNA processing.",
    related: ["splicing", "exon", "mutation"],
  },
  {
    id: "translation",
    term: "Translation",
    category: "Protein",
    summary: "The process of building a protein from an mRNA sequence.",
    detail:
      "Translation begins at a start codon, continues codon by codon, and ends at a stop codon. Ribosomes and tRNAs coordinate the addition of amino acids into a polypeptide.",
    related: ["ribosome", "trna", "codon"],
  },
  {
    id: "amino-acid",
    term: "Amino Acid",
    category: "Protein",
    summary: "A monomer used to build proteins.",
    detail:
      "Each amino acid has a central carbon, amino group, carboxyl group, hydrogen, and side chain. Differences in side chains shape protein structure and function.",
    related: ["protein", "translation", "peptide-bond"],
  },
  {
    id: "protein",
    term: "Protein",
    category: "Protein",
    summary: "A folded chain of amino acids that performs cellular functions.",
    detail:
      "Proteins can act as enzymes, receptors, channels, structural fibers, or signaling molecules. Their function depends on their amino acid sequence and final 3D shape.",
    related: ["amino-acid", "translation", "mutation"],
  },
  {
    id: "mutation",
    term: "Mutation",
    category: "DNA",
    summary: "A change in the nucleotide sequence of DNA.",
    detail:
      "Mutations can be neutral, harmful, or beneficial. They include substitutions, insertions, deletions, and larger chromosomal changes.",
    related: ["frameshift", "allele", "protein"],
  },
  {
    id: "frameshift",
    term: "Frameshift Mutation",
    category: "DNA",
    summary: "A mutation that changes the codon reading frame.",
    detail:
      "Frameshifts usually occur when bases are inserted or deleted in numbers not divisible by three. They often change every codon downstream and can create early stop codons.",
    related: ["mutation", "codon", "translation"],
  },
  {
    id: "allele",
    term: "Allele",
    category: "Inheritance",
    summary: "An alternative form of the same gene.",
    detail:
      "Different alleles can produce different trait outcomes. An individual inherits one allele from each parent for most genes on paired chromosomes.",
    related: ["genotype", "phenotype", "homozygous"],
  },
  {
    id: "genotype",
    term: "Genotype",
    category: "Inheritance",
    summary: "The allele combination an organism carries.",
    detail:
      "A genotype describes genetic makeup, such as AA, Aa, or aa. It influences the phenotype, often together with environment and gene interactions.",
    related: ["allele", "phenotype", "heterozygous"],
  },
  {
    id: "phenotype",
    term: "Phenotype",
    category: "Inheritance",
    summary: "The observable trait or characteristic.",
    detail:
      "Phenotype is the visible or measurable outcome of genotype plus environment. Examples include flower color, blood type, or an enzyme deficiency.",
    related: ["genotype", "allele", "dominant"],
  },
  {
    id: "homozygous",
    term: "Homozygous",
    category: "Inheritance",
    summary: "Having two identical alleles for a gene.",
    detail:
      "An organism is homozygous dominant if both alleles are dominant, or homozygous recessive if both are recessive.",
    related: ["heterozygous", "genotype", "allele"],
  },
  {
    id: "heterozygous",
    term: "Heterozygous",
    category: "Inheritance",
    summary: "Having two different alleles for a gene.",
    detail:
      "In a heterozygous genotype, one allele may mask the other in complete dominance, or both may contribute in incomplete dominance or codominance.",
    related: ["homozygous", "genotype", "dominant"],
  },
  {
    id: "dominant",
    term: "Dominant Allele",
    category: "Inheritance",
    summary: "An allele whose effect is seen in a heterozygous genotype.",
    detail:
      "In complete dominance, a single dominant allele is enough to produce the dominant phenotype. This does not mean the allele is more common or stronger in every sense.",
    related: ["recessive", "heterozygous", "phenotype"],
  },
  {
    id: "recessive",
    term: "Recessive Allele",
    category: "Inheritance",
    summary: "An allele whose effect is usually masked in a heterozygous genotype.",
    detail:
      "A recessive phenotype usually appears only when both alleles are recessive, although real genetics can be more complex than simple Mendelian patterns.",
    related: ["dominant", "homozygous", "phenotype"],
  },
  {
    id: "meiosis",
    term: "Meiosis",
    category: "Inheritance",
    summary: "The cell division process that produces gametes.",
    detail:
      "Meiosis reduces chromosome number by half and introduces variation through crossing over and independent assortment. It is essential for sexual reproduction.",
    related: ["chromosome", "crossing-over", "allele"],
  },
  {
    id: "crossing-over",
    term: "Crossing Over",
    category: "Inheritance",
    summary: "Exchange of DNA segments between homologous chromosomes during meiosis.",
    detail:
      "Crossing over occurs in meiosis I and creates new allele combinations. It increases genetic variation in offspring.",
    related: ["meiosis", "chromosome", "allele"],
  },
  {
    id: "pcr",
    term: "PCR",
    category: "Lab",
    summary: "A method used to amplify a specific DNA sequence.",
    detail:
      "Polymerase chain reaction cycles through denaturation, primer annealing, and extension to produce millions of copies of a target DNA region.",
    related: ["dna-replication", "primer", "gel-electrophoresis"],
  },
  {
    id: "gel-electrophoresis",
    term: "Gel Electrophoresis",
    category: "Lab",
    summary: "A technique for separating DNA fragments by size.",
    detail:
      "DNA moves through a gel matrix toward the positive electrode because its phosphate backbone is negatively charged. Smaller fragments usually move farther than larger ones.",
    related: ["pcr", "dna", "fragment"],
  },
  {
    id: "crispr",
    term: "CRISPR",
    category: "Lab",
    summary: "A gene-editing system that can target and cut specific DNA sequences.",
    detail:
      "CRISPR systems use a guide RNA to direct a nuclease such as Cas9 to a chosen DNA sequence. Repair after the cut can disrupt a gene or introduce a designed change.",
    related: ["gene", "mutation", "dna"],
  },
];
