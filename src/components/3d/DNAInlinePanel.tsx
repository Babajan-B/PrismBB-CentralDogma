"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Microscope } from "lucide-react";
import { DNAHelix } from "@/components/hero/DNAHelix";
import { DNADetailViewer, type DNAComponentId } from "./DNADetailViewer";

const STRUCTURE_COMPONENTS: {
  id: DNAComponentId;
  badge: string;
  label: string;
  sublabel: string;
  color: string;
  bg: string;
}[] = [
  { id: "nitrogen",  badge: "N", label: "Nitrogen Bases",  sublabel: "A · T · G · C",      color: "#3b82f6", bg: "#3b82f615" },
  { id: "sugar",     badge: "S", label: "Ribose Sugar",    sublabel: "2-Deoxyribose",       color: "#d946ef", bg: "#d946ef15" },
  { id: "phosphate", badge: "P", label: "Phosphate Group", sublabel: "PO₄³⁻ backbone",     color: "#f59e0b", bg: "#f59e0b15" },
  { id: "hydrogen",  badge: "H", label: "Hydrogen Bonds",  sublabel: "A-T: 2  ·  G-C: 3",  color: "#10b981", bg: "#10b98115" },
];

const DISCOVERY_COMPONENTS: {
  id: DNAComponentId;
  badge: string;
  label: string;
  sublabel: string;
  color: string;
  bg: string;
}[] = [
  { id: "inheritance", badge: "I",  label: "Inheritance",     sublabel: "Mendelian genetics",        color: "#06b6d4", bg: "#06b6d415" },
  { id: "photo51",     badge: "51", label: "Photo 51",        sublabel: "Rosalind Franklin, 1952",   color: "#ec4899", bg: "#ec489915" },
  { id: "watson",      badge: "W",  label: "Watson & Crick",  sublabel: "Double helix, 1953",        color: "#f97316", bg: "#f9731615" },
];

function CompButton({
  comp,
  index,
  onOpen,
}: {
  comp: typeof STRUCTURE_COMPONENTS[number];
  index: number;
  onOpen: (id: DNAComponentId) => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.055 }}
      type="button"
      onClick={() => onOpen(comp.id)}
      className="group flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 text-left transition-all"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background    = comp.bg;
        (e.currentTarget as HTMLElement).style.borderColor   = `${comp.color}40`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background  = "";
        (e.currentTarget as HTMLElement).style.borderColor = "";
      }}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-black text-white"
        style={{ background: comp.color }}
      >
        {comp.badge}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold text-foreground">{comp.label}</div>
        <div className="text-[10px] text-muted-foreground">{comp.sublabel}</div>
      </div>
      <span
        className="text-[11px] font-bold opacity-0 transition-opacity group-hover:opacity-100"
        style={{ color: comp.color }}
      >
        →
      </span>
    </motion.button>
  );
}

export function DNAInlinePanel() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<DNAComponentId>("overview");

  function open(tab: DNAComponentId) {
    setActiveTab(tab);
    setModalOpen(true);
  }

  return (
    <>
      <aside className="flex flex-col gap-4">
        {/* ── Animated DNA helix ── */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => open("overview")}
          className="relative flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-border bg-muted/20 pb-4 pt-6 transition-colors hover:border-accent/40 hover:bg-muted/40"
        >
          <DNAHelix rungs={14} width={160} height={220} speed={7} />
          <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
            <Microscope size={12} />
            Click to explore nucleotide
          </div>
          <p className="text-[10px] tracking-wide text-muted-foreground/50">
            Double Helix · B-form DNA
          </p>
        </motion.div>

        {/* ── Structure section ── */}
        <div className="flex flex-col gap-2">
          <p className="px-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Structure
          </p>
          {STRUCTURE_COMPONENTS.map((comp, i) => (
            <CompButton key={comp.id} comp={comp} index={i} onOpen={open} />
          ))}
        </div>

        {/* ── Discovery section ── */}
        <div className="flex flex-col gap-2">
          <p className="px-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Discovery
          </p>
          {DISCOVERY_COMPONENTS.map((comp, i) => (
            <CompButton key={comp.id} comp={comp} index={STRUCTURE_COMPONENTS.length + i} onOpen={open} />
          ))}
        </div>
      </aside>

      {/* ── Modal ── */}
      <DNADetailViewer
        isOpen={modalOpen}
        initialTab={activeTab}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
