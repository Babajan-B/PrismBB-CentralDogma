"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Box, Layers } from "lucide-react";
import type { MolecularComponent, ComponentCategory } from "@/data/types";
import { Molecule2D, get3DType } from "./Molecule2D";
import dynamic from "next/dynamic";

const Molecule3D = dynamic(() => import("@/components/3d/Molecule3D").then((m) => m.Molecule3D), {
  ssr: false,
});

interface MoleculeCardProps {
  component: MolecularComponent;
  dimmed?: boolean;
  highlighted?: boolean;
  onSelect: (c: MolecularComponent) => void;
}

const CATEGORY_STYLE: Record<
  ComponentCategory,
  { label: string; cardVar: string; accentHex: string }
> = {
  structural: {
    label: "Structural",
    cardVar: "--card-teal",
    accentHex: "#0f6070",
  },
  functional: {
    label: "Functional",
    cardVar: "--card-mint",
    accentHex: "#1a6a40",
  },
  regulatory: {
    label: "Regulatory",
    cardVar: "--card-lavender",
    accentHex: "#4a2e90",
  },
};

export function MoleculeCard({
  component,
  dimmed = false,
  highlighted = false,
  onSelect,
}: MoleculeCardProps) {
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const style = CATEGORY_STYLE[component.category];
  const scene3D = get3DType(component.id);
  const has3D = !!scene3D;

  return (
    <motion.div
      layout
      animate={{
        opacity: dimmed ? 0.25 : 1,
        scale: highlighted ? 1.02 : 1,
      }}
      transition={{ type: "spring", damping: 24, stiffness: 300 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all ${
        highlighted
          ? "border-accent ring-2 ring-accent/40"
          : "border-transparent hover:shadow-lg"
      }`}
      style={{ background: `var(${style.cardVar})` }}
    >
      {/* Visualization Area */}
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-white/30 dark:bg-black/20">
        {/* View toggle */}
        {has3D && (
          <div className="absolute right-2 top-2 z-10 flex overflow-hidden rounded-lg border border-border/40 bg-white/80 backdrop-blur-sm dark:bg-black/40">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setViewMode("2d"); }}
              className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold transition-colors ${
                viewMode === "2d"
                  ? `text-foreground bg-white dark:bg-white/10`
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers size={11} />
              2D
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setViewMode("3d"); }}
              className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold transition-colors ${
                viewMode === "3d"
                  ? `text-foreground bg-white dark:bg-white/10`
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Box size={11} />
              3D
            </button>
          </div>
        )}

        {/* Category badge (top-left) */}
        <span
          className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm dark:bg-black/40"
          style={{ color: style.accentHex }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: style.accentHex }}
          />
          {style.label}
        </span>

        {/* 2D View */}
        {viewMode === "2d" && (
          <motion.div
            key="2d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full w-full items-center justify-center p-4"
          >
            <Molecule2D
              moleculeId={component.id}
              accentColor={style.accentHex}
              className="h-28 w-28"
            />
          </motion.div>
        )}

        {/* 3D View */}
        {viewMode === "3d" && has3D && (
          <motion.div
            key="3d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full"
          >
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                  Loading 3D…
                </div>
              }
            >
              <Molecule3D
                type={scene3D.type}
                base={scene3D.base}
                color={scene3D.color}
                size={1}
                className="h-full w-full"
              />
            </Suspense>
          </motion.div>
        )}
      </div>

      {/* Info Area */}
      <button
        type="button"
        onClick={() => onSelect(component)}
        className="flex flex-1 flex-col gap-1.5 p-4 text-left"
      >
        <h3 className="text-sm font-bold leading-tight text-foreground">
          {component.name}
        </h3>

        {component.formula && (
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
            {component.formula}
          </span>
        )}

        <p className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground/80">
          {component.shortDesc}
        </p>

        <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[10px] font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
          View details →
        </span>
      </button>
    </motion.div>
  );
}
