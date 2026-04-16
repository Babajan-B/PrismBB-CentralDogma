"use client";

import { useEffect, useState } from "react";
import { HelpCircle } from "lucide-react";
import { GuidedTour, type TourStep } from "./GuidedTour";
import { useSettings } from "@/store/settings";
import { useHydrated } from "@/hooks/useHydrated";

const STEPS: TourStep[] = [
  {
    selector: '[data-tour="codon-search"]',
    title: "Fast search",
    body: "Type a codon (e.g. AUG), an amino acid (Leu), or a single letter (K) to highlight matching tiles across the grid.",
    placement: "bottom",
  },
  {
    selector: '[data-tour="codon-notation"]',
    title: "RNA ↔ DNA",
    body: "Flip the whole grid between RNA (U) and DNA (T) notation. The choice persists across sessions.",
    placement: "bottom",
  },
  {
    selector: '[data-tour="codon-filter"]',
    title: "Category filters",
    body: "Dim all codons except a chemistry class — nonpolar, polar, basic, acidic, or stop.",
    placement: "bottom",
  },
  {
    selector: '[data-tour="codon-tile"]',
    title: "4-level detail",
    body: "Tap any tile to open identity, chemistry, genomics, and biological context in a 4-card slider.",
    placement: "right",
  },
];

const TOUR_ID = "codon-grid";

export function CodonGridTour() {
  const toursCompleted = useSettings((s) => s.toursCompleted);
  const markTourCompleted = useSettings((s) => s.markTourCompleted);
  const [active, setActive] = useState(false);
  const hydrated = useHydrated();
  const done = toursCompleted.includes(TOUR_ID);

  useEffect(() => {
    if (!hydrated || done) return;
    const t = setTimeout(() => setActive(true), 800);
    return () => clearTimeout(t);
  }, [hydrated, done]);

  return (
    <>
      <button
        type="button"
        onClick={() => setActive(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Show tour for codon grid"
      >
        <HelpCircle size={13} />
        Tour
      </button>
      <GuidedTour
        id={TOUR_ID}
        steps={STEPS}
        active={active}
        onClose={() => setActive(false)}
        onComplete={markTourCompleted}
      />
    </>
  );
}
