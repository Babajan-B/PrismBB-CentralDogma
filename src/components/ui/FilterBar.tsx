"use client";

import { motion } from "framer-motion";

export interface FilterOption<T extends string = string> {
  value: T | "all";
  label: string;
  dotColor?: string;
  count?: number;
}

interface FilterBarProps<T extends string = string> {
  options: FilterOption<T>[];
  value: T | "all";
  onChange: (v: T | "all") => void;
  className?: string;
}

export function FilterBar<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: FilterBarProps<T>) {
  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 ${className}`}
      role="tablist"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 -z-10 rounded-full border border-border bg-muted"
                transition={{ type: "spring", damping: 28, stiffness: 320 }}
              />
            )}
            {opt.dotColor && (
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: opt.dotColor }}
              />
            )}
            {opt.label}
            {typeof opt.count === "number" && (
              <span className="text-[10px] tabular-nums text-muted-foreground">
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
