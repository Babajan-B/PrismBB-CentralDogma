"use client";

import { useMemo, useState } from "react";
import { Search, Dna, FlaskConical, Atom } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { nucleotides } from "@/data/nucleotides";
import { allProteinComponents } from "@/data/proteinExpanded";
import type {
  MolecularComponent,
  MoleculeTab,
  ComponentCategory,
} from "@/data/types";
import { FilterBar, type FilterOption } from "@/components/ui/FilterBar";
import { MoleculeCard } from "./MoleculeCard";
import { MoleculeModal } from "./MoleculeModal";

type CatFilter = ComponentCategory | "all";

const ALL_COMPONENTS: MolecularComponent[] = [
  ...nucleotides,
  ...allProteinComponents,
];

const TABS: Array<{
  value: MoleculeTab;
  label: string;
  icon: typeof Dna;
  accent: string;
}> = [
  { value: "dna", label: "DNA", icon: Dna, accent: "#3b82f6" },
  { value: "rna", label: "RNA", icon: Atom, accent: "#10b981" },
  { value: "protein", label: "Protein", icon: FlaskConical, accent: "#a78bfa" },
];

const CATEGORY_DOTS: Record<ComponentCategory, string> = {
  structural: "#3b82f6",
  functional: "#10b981",
  regulatory: "#d946ef",
};

export function MoleculeGrid() {
  const [tab, setTab] = useState<MoleculeTab>("dna");
  const [category, setCategory] = useState<CatFilter>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MolecularComponent | null>(null);

  const tabComponents = useMemo(
    () => ALL_COMPONENTS.filter((c) => c.tab === tab),
    [tab],
  );

  const filterOptions: FilterOption<ComponentCategory>[] = useMemo(() => {
    const counts = tabComponents.reduce<Record<string, number>>((acc, c) => {
      acc[c.category] = (acc[c.category] ?? 0) + 1;
      return acc;
    }, {});
    return [
      { value: "all", label: "All", count: tabComponents.length },
      {
        value: "structural",
        label: "Structural",
        dotColor: CATEGORY_DOTS.structural,
        count: counts.structural ?? 0,
      },
      {
        value: "functional",
        label: "Functional",
        dotColor: CATEGORY_DOTS.functional,
        count: counts.functional ?? 0,
      },
      {
        value: "regulatory",
        label: "Regulatory",
        dotColor: CATEGORY_DOTS.regulatory,
        count: counts.regulatory ?? 0,
      },
    ];
  }, [tabComponents]);

  const normalizedQuery = query.trim().toLowerCase();

  const isMatch = (c: MolecularComponent): boolean => {
    if (!normalizedQuery) return false;
    return (
      c.name.toLowerCase().includes(normalizedQuery) ||
      c.shortDesc.toLowerCase().includes(normalizedQuery) ||
      c.details.identity.toLowerCase().includes(normalizedQuery) ||
      (c.formula?.toLowerCase().includes(normalizedQuery) ?? false)
    );
  };

  const isDimmed = (c: MolecularComponent): boolean => {
    if (category !== "all" && c.category !== category) return true;
    if (normalizedQuery && !isMatch(c)) return true;
    return false;
  };

  const visibleCount = tabComponents.filter((c) => !isDimmed(c)).length;

  return (
    <>
      {/* Tabs */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto">
        {TABS.map(({ value, label, icon: Icon, accent }) => {
          const active = tab === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                setTab(value);
                setCategory("all");
              }}
              className={`group relative inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "border-transparent text-foreground"
                  : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="molecule-tab-bg"
                  className="absolute inset-0 -z-10 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${accent}33, ${accent}11)`,
                    border: `1px solid ${accent}55`,
                  }}
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                />
              )}
              <Icon
                size={16}
                style={active ? { color: accent } : undefined}
              />
              {label}
              <span className="rounded-full bg-muted/60 px-1.5 py-0.5 text-[10px] tabular-nums text-muted-foreground">
                {ALL_COMPONENTS.filter((c) => c.tab === value).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative min-w-[240px] max-w-md flex-1">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components, formulas, descriptions…"
            className="w-full rounded-full border border-border bg-muted/40 py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <FilterBar
          options={filterOptions}
          value={category}
          onChange={(v) => setCategory(v as CatFilter)}
        />
      </div>

      {/* Result count */}
      <div className="mb-4 flex items-center gap-3 text-xs text-muted-foreground">
        <span>
          Showing <span className="font-semibold text-foreground">{visibleCount}</span>{" "}
          of {tabComponents.length} {tab.toUpperCase()} components
        </span>
        {(category !== "all" || normalizedQuery) && (
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setQuery("");
            }}
            className="text-accent hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {tabComponents.map((c) => (
            <MoleculeCard
              key={c.id}
              component={c}
              dimmed={isDimmed(c)}
              highlighted={!!normalizedQuery && isMatch(c) && !isDimmed(c)}
              onSelect={setSelected}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {visibleCount === 0 && (
        <div className="mt-16 text-center text-sm text-muted-foreground">
          No components match your filters.
        </div>
      )}

      <MoleculeModal
        component={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
