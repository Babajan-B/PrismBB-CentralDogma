"use client";

import { Search } from "lucide-react";
import { useOnboarding } from "@/components/onboarding/OnboardingProvider";

export function SearchTrigger() {
  const { openSearch } = useOnboarding();

  return (
    <button
      type="button"
      onClick={openSearch}
      className="group hidden items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:inline-flex"
      aria-label="Open search"
      data-tour="search-trigger"
    >
      <Search size={14} />
      <span>Search</span>
      <kbd className="hidden items-center gap-0.5 rounded border border-border bg-background px-1 py-0.5 font-mono text-[10px] md:inline-flex">
        ⌘/Ctrl K
      </kbd>
    </button>
  );
}
