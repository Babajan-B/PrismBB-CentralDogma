import type { Metadata } from "next";
import { SplicingTool } from "@/components/tools/SplicingTool";

export const metadata: Metadata = {
  title: "Splicing Tool — GeneCode",
  description: "Mark exons and introns on a pre-mRNA sequence and splice to produce mature mRNA.",
};

export default function SplicingPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">RNA Splicing</h1>
        <p className="text-muted-foreground text-sm">
          Detect or manually mark exons and introns on a pre-mRNA sequence, then splice to produce mature mRNA.
        </p>
      </div>
      <SplicingTool />
    </main>
  );
}
