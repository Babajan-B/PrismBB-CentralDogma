export type FlashcardTopic =
  | "DNA"
  | "RNA"
  | "Protein"
  | "Mutation"
  | "Inheritance"
  | "Lab";

export interface Flashcard {
  id: string;
  topic: FlashcardTopic;
  front: string;
  back: string;
  hint: string;
}

export const flashcards: Flashcard[] = [
  {
    id: "dna-complementary-base-pairing",
    topic: "DNA",
    front: "What is complementary base pairing in DNA?",
    back: "A pairs with T, and G pairs with C.",
    hint: "Think about the fixed pairs in the double helix.",
  },
  {
    id: "dna-replication-semi-conservative",
    topic: "DNA",
    front: "Why is DNA replication called semi-conservative?",
    back: "Each new DNA molecule contains one original strand and one newly synthesized strand.",
    hint: "The old template is partly preserved in each daughter molecule.",
  },
  {
    id: "gene-definition",
    topic: "DNA",
    front: "What is a gene?",
    back: "A gene is a DNA sequence that contains information for a functional product such as a protein or RNA.",
    hint: "It is a unit of hereditary information.",
  },
  {
    id: "mrna-role",
    topic: "RNA",
    front: "What is the main role of mRNA?",
    back: "mRNA carries coding information from DNA to the ribosome for translation.",
    hint: "It is the message read during protein synthesis.",
  },
  {
    id: "trna-role",
    topic: "RNA",
    front: "What is the function of tRNA in translation?",
    back: "tRNA matches its anticodon to an mRNA codon and delivers the correct amino acid to the ribosome.",
    hint: "It acts like the delivery adapter in translation.",
  },
  {
    id: "splicing-definition",
    topic: "RNA",
    front: "What happens during RNA splicing?",
    back: "Introns are removed and exons are joined together to form mature mRNA.",
    hint: "Pre-mRNA is edited before translation.",
  },
  {
    id: "start-codon",
    topic: "RNA",
    front: "What is the usual start codon, and why is it important?",
    back: "AUG is the usual start codon. It signals the ribosome where translation begins and usually codes for methionine.",
    hint: "It marks the start of the reading frame.",
  },
  {
    id: "codon-definition",
    topic: "Protein",
    front: "What is a codon?",
    back: "A codon is a three-base sequence on mRNA that specifies an amino acid or a stop signal.",
    hint: "Translation reads mRNA in groups of three.",
  },
  {
    id: "protein-definition",
    topic: "Protein",
    front: "What is a protein?",
    back: "A protein is a chain of amino acids folded into a functional structure.",
    hint: "Its function depends on sequence and shape.",
  },
  {
    id: "ribosome-job",
    topic: "Protein",
    front: "What does the ribosome do during translation?",
    back: "It reads mRNA codons, positions tRNAs, and links amino acids together into a growing polypeptide.",
    hint: "It is the molecular machine of protein synthesis.",
  },
  {
    id: "substitution-vs-frameshift",
    topic: "Mutation",
    front: "Which usually has a bigger effect on a protein: a substitution or a frameshift mutation?",
    back: "A frameshift usually has the bigger effect because it changes the reading frame for many codons downstream.",
    hint: "One type changes the grouping of all later bases.",
  },
  {
    id: "silent-mutation",
    topic: "Mutation",
    front: "What is a silent mutation?",
    back: "A silent mutation changes a DNA base or mRNA codon without changing the amino acid in the final protein.",
    hint: "The sequence changes, but the protein may stay the same.",
  },
  {
    id: "allele-definition",
    topic: "Inheritance",
    front: "What is an allele?",
    back: "An allele is an alternative version of the same gene.",
    hint: "You usually inherit one version from each parent.",
  },
  {
    id: "heterozygous-definition",
    topic: "Inheritance",
    front: "What does heterozygous mean?",
    back: "Heterozygous means having two different alleles for a gene, such as Aa.",
    hint: "The two copies are not identical.",
  },
  {
    id: "phenotype-definition",
    topic: "Inheritance",
    front: "What is a phenotype?",
    back: "A phenotype is the observable trait or characteristic produced by genotype and environment.",
    hint: "It is what you can see or measure.",
  },
  {
    id: "meiosis-importance",
    topic: "Inheritance",
    front: "Why is meiosis important in inheritance?",
    back: "Meiosis produces gametes with half the chromosome number and increases variation through crossing over and independent assortment.",
    hint: "It supports sexual reproduction and variation.",
  },
  {
    id: "pcr-definition",
    topic: "Lab",
    front: "What is PCR used for?",
    back: "PCR is used to amplify a specific DNA sequence, making many copies from a small starting sample.",
    hint: "It is a DNA copying technique used in labs.",
  },
  {
    id: "gel-electrophoresis-purpose",
    topic: "Lab",
    front: "What does gel electrophoresis help scientists do?",
    back: "It separates DNA fragments by size so they can be compared and analyzed.",
    hint: "Smaller fragments usually travel farther in the gel.",
  },
  {
    id: "crispr-basic-idea",
    topic: "Lab",
    front: "What is the basic idea behind CRISPR gene editing?",
    back: "A guide RNA directs a nuclease such as Cas9 to a specific DNA sequence, where the DNA can be cut and altered during repair.",
    hint: "It is targeted DNA editing.",
  },
];
