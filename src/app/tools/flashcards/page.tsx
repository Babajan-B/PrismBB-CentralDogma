import type { Metadata } from "next";
import { FlashcardsTool } from "@/components/study/FlashcardsTool";

export const metadata: Metadata = {
  title: "Flashcards — GeneCode",
  description:
    "Active-recall genetics flashcards covering DNA, RNA, protein synthesis, inheritance, mutations, and lab concepts.",
};

export default function FlashcardsPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10 md:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-8 max-w-3xl">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Practice Mode
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            Genetics Flashcards
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Use active recall to revise the most important ideas in genetics. Reveal each answer
            only after you think it through, then mark which cards need more review.
          </p>
        </header>

        <FlashcardsTool />
      </div>
    </main>
  );
}
