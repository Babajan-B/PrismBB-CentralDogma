"use client";

import { useMemo, useState } from "react";
import { Search, BookOpen } from "lucide-react";
import {
  glossaryEntries,
  type GlossaryCategory,
} from "@/data/glossary";
import { FilterBar, type FilterOption } from "@/components/ui/FilterBar";

type CategoryFilter = GlossaryCategory | "all";

const CATEGORY_DOTS: Record<GlossaryCategory, string> = {
  DNA: "#3b82f6",
  RNA: "#10b981",
  Protein: "#a78bfa",
  Inheritance: "#ec4899",
  Lab: "#f59e0b",
};

export function GlossaryExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const normalizedQuery = query.trim().toLowerCase();

  const filterOptions = useMemo<FilterOption<GlossaryCategory>[]>(() => {
    const counts = glossaryEntries.reduce<Record<string, number>>((acc, entry) => {
      acc[entry.category] = (acc[entry.category] ?? 0) + 1;
      return acc;
    }, {});

    return [
      { value: "all", label: "All", count: glossaryEntries.length },
      { value: "DNA", label: "DNA", dotColor: CATEGORY_DOTS.DNA, count: counts.DNA ?? 0 },
      { value: "RNA", label: "RNA", dotColor: CATEGORY_DOTS.RNA, count: counts.RNA ?? 0 },
      {
        value: "Protein",
        label: "Protein",
        dotColor: CATEGORY_DOTS.Protein,
        count: counts.Protein ?? 0,
      },
      {
        value: "Inheritance",
        label: "Inheritance",
        dotColor: CATEGORY_DOTS.Inheritance,
        count: counts.Inheritance ?? 0,
      },
      { value: "Lab", label: "Lab", dotColor: CATEGORY_DOTS.Lab, count: counts.Lab ?? 0 },
    ];
  }, []);

  const filtered = useMemo(() => {
    return glossaryEntries.filter((entry) => {
      if (category !== "all" && entry.category !== category) return false;
      if (!normalizedQuery) return true;

      const haystack = `${entry.term} ${entry.summary} ${entry.detail} ${entry.related.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [category, normalizedQuery]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-border bg-muted/20 p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-semibold text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              Revision Glossary
            </div>
            <h2 className="text-2xl font-black tracking-tight">Core Genetics Terms</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Use this glossary for quick revision before solving worksheets, doing quizzes, or
              moving into the larger concept pages. Search by term, process, or idea.
            </p>
          </div>

          <div className="relative min-w-[240px] max-w-md flex-1">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search codon, meiosis, promoter..."
              className="w-full rounded-full border border-border bg-background/80 py-2.5 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <FilterBar
            options={filterOptions}
            value={category}
            onChange={(value) => setCategory(value)}
          />
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
            {glossaryEntries.length} terms
          </p>
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-muted/20 p-10 text-center text-sm text-muted-foreground">
          No glossary terms matched your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((entry) => (
            <article
              key={entry.id}
              id={entry.id}
              className="rounded-2xl border border-border bg-background/85 p-5 shadow-card scroll-mt-24"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <div
                    className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest"
                    style={{
                      color: CATEGORY_DOTS[entry.category],
                      borderColor: `${CATEGORY_DOTS[entry.category]}40`,
                      background: `${CATEGORY_DOTS[entry.category]}10`,
                    }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: CATEGORY_DOTS[entry.category] }}
                    />
                    {entry.category}
                  </div>
                  <h3 className="mt-3 text-xl font-bold tracking-tight">{entry.term}</h3>
                </div>
              </div>

              <p className="text-sm font-medium text-foreground">{entry.summary}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{entry.detail}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {entry.related.map((related) => (
                  <span
                    key={related}
                    className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    {related}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
