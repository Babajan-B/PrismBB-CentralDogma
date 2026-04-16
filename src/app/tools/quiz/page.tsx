import type { Metadata } from "next";
import { GeneticsQuizTool } from "@/components/tools/GeneticsQuizTool";

export const metadata: Metadata = {
  title: "Genetics Quiz — GeneCode",
  description:
    "Quick genetics quiz for students covering DNA, RNA, translation, mutation, and inheritance.",
};

export default function QuizPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10 md:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-8 max-w-3xl">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Practice Mode
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            Genetics Quiz
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Test yourself on the core ideas behind DNA, RNA, protein synthesis, mutations, and
            inheritance. Use it as a fast revision tool before classwork or exams.
          </p>
        </header>

        <GeneticsQuizTool />
      </div>
    </main>
  );
}
