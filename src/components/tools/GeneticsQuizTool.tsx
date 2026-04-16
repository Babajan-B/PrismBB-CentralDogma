"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { quizQuestions } from "@/data/quiz";

interface AnswerRecord {
  questionId: string;
  topic: string;
  correct: boolean;
}

export function GeneticsQuizTool() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const current = quizQuestions[currentIndex];
  const finished = currentIndex >= quizQuestions.length;
  const score = answers.filter((entry) => entry.correct).length;

  const weakestTopics = useMemo(() => {
    const counts = answers.reduce<Record<string, number>>((acc, entry) => {
      if (entry.correct) return acc;
      acc[entry.topic] = (acc[entry.topic] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([topic]) => topic);
  }, [answers]);

  function handleAnswer(choiceIndex: number) {
    if (selectedIndex !== null || !current) return;

    setSelectedIndex(choiceIndex);
    setAnswers((prev) => [
      ...prev,
      {
        questionId: current.id,
        topic: current.topic,
        correct: choiceIndex === current.answerIndex,
      },
    ]);
  }

  function handleNext() {
    if (selectedIndex === null) return;

    setSelectedIndex(null);
    setCurrentIndex((prev) => prev + 1);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswers([]);
  }

  if (finished) {
    const percent = Math.round((score / quizQuestions.length) * 100);

    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-3xl border border-border bg-muted/20 p-8 shadow-card">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Quiz Complete
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight">
            Score: {score} / {quizQuestions.length}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You answered <span className="font-semibold text-foreground">{percent}%</span> of the
            questions correctly.
          </p>

          {weakestTopics.length > 0 && (
            <div className="mt-5 rounded-2xl border border-border bg-background/70 p-4">
              <h3 className="text-sm font-semibold">Review these topics next</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {weakestTopics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Use the glossary and the concept pages to reinforce weak areas before retrying.
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
            >
              <RotateCcw className="h-4 w-4" />
              Restart Quiz
            </button>
            <Link
              href="/glossary"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-5 py-2.5 text-sm font-semibold text-foreground"
            >
              Open Glossary
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / quizQuestions.length) * 100;
  const selectedCorrect = selectedIndex === current.answerIndex;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-3xl border border-border bg-muted/20 p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Question {currentIndex + 1} of {quizQuestions.length}
            </div>
            <div className="mt-2 inline-flex rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground">
              Topic: {current.topic}
            </div>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-background">
          <div
            className="h-full rounded-full bg-[var(--brand-glow)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-background/85 p-6 shadow-card">
        <h2 className="text-2xl font-black tracking-tight">{current.prompt}</h2>

        <div className="mt-6 grid gap-3">
          {current.choices.map((choice, index) => {
            const isSelected = selectedIndex === index;
            const isCorrect = current.answerIndex === index;

            let className =
              "border-border bg-muted/20 text-foreground hover:border-accent/40 hover:bg-muted/40";

            if (selectedIndex !== null) {
              if (isCorrect) {
                className = "border-emerald-500/40 bg-emerald-500/10 text-foreground";
              } else if (isSelected) {
                className = "border-rose-500/40 bg-rose-500/10 text-foreground";
              } else {
                className = "border-border bg-muted/10 text-muted-foreground";
              }
            }

            return (
              <button
                key={choice}
                type="button"
                disabled={selectedIndex !== null}
                onClick={() => handleAnswer(index)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${className}`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background text-xs font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="leading-relaxed">{choice}</span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedIndex !== null && (
          <div
            className={`mt-5 rounded-2xl border p-4 ${
              selectedCorrect
                ? "border-emerald-500/30 bg-emerald-500/10"
                : "border-rose-500/30 bg-rose-500/10"
            }`}
          >
            <div className="flex items-start gap-3">
              {selectedCorrect ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
              ) : (
                <XCircle className="mt-0.5 h-5 w-5 text-rose-400" />
              )}
              <div>
                <p className="text-sm font-semibold">
                  {selectedCorrect ? "Correct" : "Not quite"}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {current.explanation}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background"
              >
                {currentIndex === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
