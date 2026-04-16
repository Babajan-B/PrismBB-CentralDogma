import type { Metadata } from "next";
import { VirtualLab } from "@/components/tools/VirtualLab";

export const metadata: Metadata = {
  title: "Virtual Lab — GeneCode",
  description: "Animate ribosome translation in real-time — watch codons get decoded into a growing protein chain.",
};

export default function VirtualLabPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Virtual Lab — Ribosome Simulation</h1>
        <p className="text-muted-foreground text-sm">
          Watch a ribosome step along the mRNA and assemble a polypeptide chain in real-time.
        </p>
      </div>
      <VirtualLab />
    </main>
  );
}
