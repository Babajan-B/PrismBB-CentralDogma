import type { Metadata } from "next";
import { WorksheetTool } from "@/components/tools/WorksheetTool";

export const metadata: Metadata = {
  title: "Worksheet Generator — GeneCode",
  description: "Generate printable genetics worksheets with codon, transcription, and mutation questions.",
};

export default function WorksheetPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10 max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Worksheet Generator</h1>
        <p className="text-muted-foreground text-sm">
          Generate custom genetics worksheets. Use Print / Save PDF to export.
        </p>
      </div>
      <WorksheetTool />
    </main>
  );
}
