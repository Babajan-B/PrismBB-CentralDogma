export type QuizTopic =
  | "DNA"
  | "RNA"
  | "Protein"
  | "Mutation"
  | "Inheritance";

export interface QuizQuestion {
  id: string;
  topic: QuizTopic;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "dna-base-pair",
    topic: "DNA",
    prompt: "Which base pairs with adenine in DNA?",
    choices: ["Uracil", "Cytosine", "Thymine", "Guanine"],
    answerIndex: 2,
    explanation:
      "In DNA, adenine pairs with thymine through hydrogen bonding. In RNA, adenine pairs with uracil instead.",
  },
  {
    id: "start-codon",
    topic: "RNA",
    prompt: "Which mRNA codon most commonly starts translation?",
    choices: ["UAA", "AUG", "UGA", "GGG"],
    answerIndex: 1,
    explanation:
      "AUG is the usual start codon and typically encodes methionine at the beginning of translation.",
  },
  {
    id: "trna-role",
    topic: "RNA",
    prompt: "What is the main role of tRNA during translation?",
    choices: [
      "It stores genetic information long-term",
      "It brings amino acids to the ribosome",
      "It copies DNA before cell division",
      "It removes introns from mRNA",
    ],
    answerIndex: 1,
    explanation:
      "tRNA carries specific amino acids and matches its anticodon to the correct mRNA codon at the ribosome.",
  },
  {
    id: "exons",
    topic: "RNA",
    prompt: "What happens to exons during RNA splicing?",
    choices: [
      "They are removed and discarded",
      "They are turned into DNA",
      "They are joined together in mature mRNA",
      "They stop translation immediately",
    ],
    answerIndex: 2,
    explanation:
      "Exons are retained and joined together in the mature mRNA after introns are removed.",
  },
  {
    id: "frameshift",
    topic: "Mutation",
    prompt: "Which mutation is most likely to cause a frameshift?",
    choices: [
      "A base substitution",
      "An insertion of one nucleotide",
      "A silent mutation",
      "A swap between two codons",
    ],
    answerIndex: 1,
    explanation:
      "Adding one nucleotide changes the grouping of bases into codons and shifts the reading frame downstream.",
  },
  {
    id: "stop-codon",
    topic: "Protein",
    prompt: "What does a stop codon do?",
    choices: [
      "It adds the final amino acid",
      "It starts DNA replication",
      "It signals the end of translation",
      "It removes an intron",
    ],
    answerIndex: 2,
    explanation:
      "Stop codons do not code for amino acids. They signal release factors to end translation.",
  },
  {
    id: "protein-function",
    topic: "Protein",
    prompt: "Proteins are made from chains of what molecules?",
    choices: ["Fatty acids", "Amino acids", "Nucleotides", "Monosaccharides"],
    answerIndex: 1,
    explanation:
      "Proteins are polymers of amino acids linked together by peptide bonds.",
  },
  {
    id: "genotype-definition",
    topic: "Inheritance",
    prompt: "What does genotype describe?",
    choices: [
      "The visible trait only",
      "The environmental conditions around a cell",
      "The allele combination an organism carries",
      "The number of ribosomes in a cell",
    ],
    answerIndex: 2,
    explanation:
      "Genotype refers to the specific alleles present, while phenotype refers to the observable outcome.",
  },
  {
    id: "heterozygous",
    topic: "Inheritance",
    prompt: "An individual with two different alleles for a gene is:",
    choices: ["Homozygous", "Diploid", "Recessive", "Heterozygous"],
    answerIndex: 3,
    explanation:
      "Heterozygous means the two alleles differ, such as Aa.",
  },
  {
    id: "crossing-over-stage",
    topic: "Inheritance",
    prompt: "Crossing over occurs during which process?",
    choices: ["Mitosis", "Translation", "Meiosis", "Transcription"],
    answerIndex: 2,
    explanation:
      "Crossing over happens during meiosis I and increases genetic variation by exchanging DNA between homologous chromosomes.",
  },
  {
    id: "promoter-role",
    topic: "RNA",
    prompt: "What is the job of a promoter region?",
    choices: [
      "To mark where transcription begins",
      "To stop ribosomes",
      "To carry amino acids",
      "To separate DNA fragments by size",
    ],
    answerIndex: 0,
    explanation:
      "Promoters are DNA regions where transcription machinery binds to begin RNA synthesis.",
  },
  {
    id: "mrna-role",
    topic: "RNA",
    prompt: "What is the main job of mRNA?",
    choices: [
      "To carry the coding message from DNA to ribosomes",
      "To replicate chromosomes",
      "To digest proteins",
      "To package DNA into nucleosomes",
    ],
    answerIndex: 0,
    explanation:
      "mRNA acts as the readable message used by ribosomes to build proteins.",
  },
];
