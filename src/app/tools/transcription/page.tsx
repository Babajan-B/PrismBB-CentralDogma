import type { Metadata } from "next";
import { TranscriptionTool } from "@/components/tools/TranscriptionTool";

export const metadata: Metadata = {
  title: "Transcription Tool — GeneCode",
  description: "Convert a DNA coding strand to pre-mRNA step by step with animated visualization.",
};

export default function TranscriptionPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">DNA Transcription</h1>
        <p className="text-muted-foreground text-sm">
          Enter a DNA coding strand to visualize the three steps of transcription.
        </p>
      </div>
      <TranscriptionTool />
    </main>
  );
}
