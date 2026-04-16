import type { Metadata } from "next";
import { MutationTool } from "@/components/tools/MutationTool";

export const metadata: Metadata = {
  title: "Mutation Simulator — GeneCode",
  description: "Simulate point mutations — substitution, insertion, deletion — and see their consequences.",
};

export default function MutationPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Mutation Simulator</h1>
        <p className="text-muted-foreground text-sm">
          Simulate point mutations and classify their consequence: silent, missense, nonsense, or frameshift.
        </p>
      </div>
      <MutationTool />
    </main>
  );
}
