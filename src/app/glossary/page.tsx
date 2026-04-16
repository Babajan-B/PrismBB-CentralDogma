import type { Metadata } from "next";
import { GlossaryExplorer } from "@/components/study/GlossaryExplorer";

export const metadata: Metadata = {
  title: "Genetics Glossary — GeneCode",
  description:
    "Searchable glossary of core genetics terms covering DNA, RNA, protein synthesis, inheritance, and lab methods.",
};

export default function GlossaryPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8 max-w-3xl">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Study Support
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            Genetics Glossary
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A revision-friendly dictionary of the most important genetics terms students meet in
            central dogma, inheritance, and lab-based biology lessons.
          </p>
        </header>

        <GlossaryExplorer />
      </div>
    </main>
  );
}
