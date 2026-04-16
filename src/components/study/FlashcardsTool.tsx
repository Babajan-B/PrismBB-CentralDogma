"use client";

import { useMemo, useState } from "react";
import { BookCopy, Eye, EyeOff, Shuffle, RotateCcw, CheckCircle2, CircleAlert } from "lucide-react";
import { FilterBar, type FilterOption } from "@/components/ui/FilterBar";
import { flashcards, type FlashcardTopic } from "@/data/flashcards";

type TopicFilter = FlashcardTopic | "all";

const TOPIC_DOTS: Record<FlashcardTopic, string> = {
  DNA: "#3b82f6",
  RNA: "#10b981",
  Protein: "#a78bfa",
  Mutation: "#ef4444",
  Inheritance: "#ec4899",
  Lab: "#f59e0b",
};

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
}

export function FlashcardsTool() {
  const [topic, setTopic] = useState<TopicFilter>("all");
  const [deck, setDeck] = useState(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [knownIds, setKnownIds] = useState<string[]>([]);
  const [reviewIds, setReviewIds] = useState<string[]>([]);

  const filterOptions = useMemo<FilterOption<FlashcardTopic>[]>(() => {
    const counts = flashcards.reduce<Record<string, number>>((acc, card) => {
      acc[card.topic] = (acc[card.topic] ?? 0) + 1;
      return acc;
    }, {});

    return [
      { value: "all", label: "All", count: flashcards.length },
      { value: "DNA", label: "DNA", dotColor: TOPIC_DOTS.DNA, count: counts.DNA ?? 0 },
      { value: "RNA", label: "RNA", dotColor: TOPIC_DOTS.RNA, count: counts.RNA ?? 0 },
      {
        value: "Protein",
        label: "Protein",
        dotColor: TOPIC_DOTS.Protein,
        count: counts.Protein ?? 0,
      },
      {
        value: "Mutation",
        label: "Mutation",
        dotColor: TOPIC_DOTS.Mutation,
        count: counts.Mutation ?? 0,
      },
      {
        value: "Inheritance",
        label: "Inheritance",
        dotColor: TOPIC_DOTS.Inheritance,
        count: counts.Inheritance ?? 0,
      },
      { value: "Lab", label: "Lab", dotColor: TOPIC_DOTS.Lab, count: counts.Lab ?? 0 },
    ];
  }, []);

  const activeDeck = useMemo(() => {
    return deck.filter((card) => (topic === "all" ? true : card.topic === topic));
  }, [deck, topic]);

  const current = activeDeck[Math.min(currentIndex, Math.max(0, activeDeck.length - 1))];

  function moveToIndex(nextIndex: number) {
    if (activeDeck.length === 0) return;

    const normalized = (nextIndex + activeDeck.length) % activeDeck.length;
    setCurrentIndex(normalized);
    setRevealed(false);
  }

  function handleShuffle() {
    setDeck((prev) => shuffleArray(prev));
    setCurrentIndex(0);
    setRevealed(false);
  }

  function handleResetSession() {
    setDeck(flashcards);
    setTopic("all");
    setCurrentIndex(0);
    setRevealed(false);
    setKnownIds([]);
    setReviewIds([]);
  }

  function handleMarkKnown() {
    if (!current) return;

    setKnownIds((prev) => (prev.includes(current.id) ? prev : [...prev, current.id]));
    setReviewIds((prev) => prev.filter((id) => id !== current.id));
    moveToIndex(currentIndex + 1);
  }

  function handleMarkReview() {
    if (!current) return;

    setReviewIds((prev) => (prev.includes(current.id) ? prev : [...prev, current.id]));
    setKnownIds((prev) => prev.filter((id) => id !== current.id));
    moveToIndex(currentIndex + 1);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="rounded-3xl border border-border bg-muted/20 p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground">
              <BookCopy className="h-3.5 w-3.5" />
              Active Recall
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-tight">Study Flashcards</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Reveal the answer only after you think through it. Mark cards you know and flag cards
              you want to review again.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleShuffle}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <Shuffle className="h-3.5 w-3.5" />
              Shuffle
            </button>
            <button
              type="button"
              onClick={handleResetSession}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Session
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <FilterBar
            options={filterOptions}
            value={topic}
            onChange={(value) => {
              setTopic(value);
              setCurrentIndex(0);
              setRevealed(false);
            }}
          />

          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span>
              Deck size: <span className="font-semibold text-foreground">{activeDeck.length}</span>
            </span>
            <span>
              Known: <span className="font-semibold text-foreground">{knownIds.length}</span>
            </span>
            <span>
              Review again: <span className="font-semibold text-foreground">{reviewIds.length}</span>
            </span>
          </div>
        </div>
      </section>

      {current ? (
        <>
          <section className="rounded-3xl border border-border bg-background/90 p-6 shadow-card">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                  style={{
                    color: TOPIC_DOTS[current.topic],
                    borderColor: `${TOPIC_DOTS[current.topic]}40`,
                    background: `${TOPIC_DOTS[current.topic]}10`,
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: TOPIC_DOTS[current.topic] }}
                  />
                  {current.topic}
                </div>

                <div className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Card {currentIndex + 1} of {activeDeck.length}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setRevealed((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background"
              >
                {revealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {revealed ? "Hide Answer" : "Reveal Answer"}
              </button>
            </div>

            <div className="rounded-3xl border border-border bg-muted/20 p-6">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Front
              </div>
              <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight">
                {current.front}
              </h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Hint: {current.hint}
              </p>

              <div
                className={`mt-6 rounded-2xl border p-5 transition-all ${
                  revealed
                    ? "border-emerald-500/30 bg-emerald-500/10 opacity-100"
                    : "border-dashed border-border bg-background/70 opacity-70"
                }`}
              >
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Back
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  {revealed ? current.back : "Think first, then reveal the answer."}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => moveToIndex(currentIndex - 1)}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => moveToIndex(currentIndex + 1)}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Next
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleMarkReview}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300"
                >
                  <CircleAlert className="h-4 w-4" />
                  Review Again
                </button>
                <button
                  type="button"
                  onClick={handleMarkKnown}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  I Know This
                </button>
              </div>
            </div>
          </section>

          {reviewIds.length > 0 && (
            <section className="rounded-3xl border border-border bg-muted/20 p-5 shadow-card">
              <h3 className="text-sm font-semibold">Cards flagged for review</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeDeck
                  .filter((card) => reviewIds.includes(card.id))
                  .map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => {
                        const cardIndex = activeDeck.findIndex((entry) => entry.id === card.id);
                        if (cardIndex >= 0) {
                          setCurrentIndex(cardIndex);
                          setRevealed(false);
                        }
                      }}
                      className="rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                    >
                      {card.front}
                    </button>
                  ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="rounded-3xl border border-border bg-muted/20 p-10 text-center text-sm text-muted-foreground shadow-card">
          No flashcards match the selected topic.
        </div>
      )}
    </div>
  );
}
