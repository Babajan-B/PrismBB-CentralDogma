import { CodonGrid } from "@/components/codon-grid/CodonGrid";
import { CodonGridTour } from "@/components/onboarding/CodonGridTour";

export const metadata = {
  title: "Genetic Code Table — GeneCode",
  description:
    "Complete interactive genetic code table with all 64 codons. Explore amino acid properties, codon degeneracy, mutations, and biological context — like a periodic table for genetics.",
};

export default function TablePage() {
  return (
    <main className="flex-1 px-6 pb-24 pt-6 md:px-8 md:pb-10">
      <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Interactive Reference
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            The Genetic Code
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            All 64 codons of the standard genetic code, organized by nucleotide
            position. Tap any codon to explore its identity, chemistry, genomic
            context, and biological significance.
          </p>
        </div>
        <CodonGridTour />
      </header>
      <CodonGrid />
    </main>
  );
}
