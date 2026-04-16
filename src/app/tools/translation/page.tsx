import type { Metadata } from "next";
import { TranslationTool } from "@/components/tools/TranslationTool";

export const metadata: Metadata = {
  title: "Translation Tool — GeneCode",
  description: "Step through mRNA codon by codon and watch the ribosome build a protein chain.",
};

export default function TranslationPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">mRNA Translation</h1>
        <p className="text-muted-foreground text-sm">
          Enter an mRNA sequence and step through codon-by-codon translation.
        </p>
      </div>
      <TranslationTool />
    </main>
  );
}
