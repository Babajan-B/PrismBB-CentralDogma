"use client";

import { useState } from "react";
import { Printer } from "lucide-react";
import { codons } from "@/data/geneticCode";

type QuestionType = "codon-to-aa" | "aa-to-codon" | "transcription" | "complement";

interface Question {
  prompt: string;
  answer: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(type: QuestionType, count: number): Question[] {
  const nonStop = codons.filter((c) => !c.isStop);
  switch (type) {
    case "codon-to-aa":
      return shuffle(nonStop).slice(0, count).map((c) => ({
        prompt: `What amino acid is encoded by codon ${c.triplet}?`,
        answer: `${c.aminoAcid} (${c.aminoAcid1})`,
      }));
    case "aa-to-codon": {
      const unique = [...new Set(nonStop.map((c) => c.aminoAcid1))];
      return shuffle(unique).slice(0, count).map((aa1) => {
        const group = nonStop.filter((c) => c.aminoAcid1 === aa1);
        return {
          prompt: `Name one codon that encodes the amino acid ${group[0].aminoAcid} (${aa1}).`,
          answer: group.map((c) => c.triplet).join(" or "),
        };
      });
    }
    case "transcription": {
      const templates = ["ATGCGATAGCAATCCA", "GCTATGCTAGCTATCG", "TTAACGGTAGCATGCA", "AAGTCCGATGCATCGC"];
      return shuffle(templates).slice(0, count).map((dna) => ({
        prompt: `Transcribe the following DNA coding strand to mRNA:\n5′–${dna}–3′`,
        answer: `5′–${dna.replace(/T/g, "U")}–3′`,
      }));
    }
    case "complement": {
      const seqs = ["ATGCTA", "GCAATT", "TAGCCA", "CGATAG"];
      return shuffle(seqs).slice(0, count).map((seq) => {
        const comp: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };
        return {
          prompt: `Write the complementary DNA strand for: 5′–${seq}–3′`,
          answer: `3′–${seq.split("").map((b) => comp[b] ?? b).join("")}–5′`,
        };
      });
    }
    default:
      return [];
  }
}

export function WorksheetTool() {
  const [type, setType] = useState<QuestionType>("codon-to-aa");
  const [count, setCount] = useState(10);
  const [showAnswers, setShowAnswers] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  function generate() {
    setQuestions(generateQuestions(type, count));
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto">
      {/* Controls */}
      <aside className="lg:w-64 shrink-0 space-y-5">
        <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-4">
          <h3 className="text-sm font-semibold">Worksheet Settings</h3>

          <div className="space-y-2">
            <label className="text-xs text-muted-foreground font-medium">Question Type</label>
            {(
              [
                { value: "codon-to-aa", label: "Codon → Amino Acid" },
                { value: "aa-to-codon", label: "Amino Acid → Codon" },
                { value: "transcription", label: "Transcription" },
                { value: "complement", label: "Complementary Strand" },
              ] as { value: QuestionType; label: string }[]
            ).map(({ value, label }) => (
              <button
                key={value}
                onClick={() => { setType(value); setQuestions([]); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs border transition-all ${
                  type === value
                    ? "bg-primary/20 border-primary text-foreground font-medium"
                    : "bg-muted/30 border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">
              Number of Questions: {count}
            </label>
            <input
              type="range" min={5} max={20} step={1} value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full accent-primary h-1.5 rounded-full cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground font-medium">Show answers</label>
            <button
              onClick={() => setShowAnswers((v) => !v)}
              className={`relative w-10 h-5 rounded-full transition-colors ${showAnswers ? "bg-primary" : "bg-muted"}`}
              role="switch" aria-checked={showAnswers}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${showAnswers ? "translate-x-5" : ""}`} />
            </button>
          </div>

          <button
            onClick={generate}
            className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Generate
          </button>

          {questions.length > 0 && (
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-muted/40 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          )}
        </div>
      </aside>

      {/* Preview */}
      <div className="flex-1 min-h-[400px]" id="worksheet-preview">
        {questions.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-64 rounded-xl border-2 border-dashed border-border text-muted-foreground text-sm">
            Configure and click Generate to preview your worksheet
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-white dark:bg-muted/10 border border-border space-y-4 print:p-0 print:border-none">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground print:text-black">GeneCode Worksheet</h2>
              <p className="text-xs text-muted-foreground print:text-gray-600">Name: __________________ Date: __________</p>
            </div>
            <ol className="space-y-5">
              {questions.map((q, i) => (
                <li key={i} className="space-y-1.5">
                  <p className="text-sm text-foreground print:text-black whitespace-pre-line">
                    <span className="font-semibold">{i + 1}.</span> {q.prompt}
                  </p>
                  {showAnswers ? (
                    <p className="text-xs text-emerald-500 font-mono pl-4">→ {q.answer}</p>
                  ) : (
                    <div className="border-b border-dashed border-border h-6 ml-4 print:border-gray-400" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
