"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { detectIntrons, splice, sanitizeMrna, EXAMPLE_PRE_MRNA } from "@/lib/splicing";
import type { SpliceRegion } from "@/lib/splicing";

const REGION_COLORS = {
  exon: "bg-blue-500/30 text-blue-300 border-blue-500/50 hover:bg-blue-500/40",
  intron: "bg-zinc-500/30 text-zinc-500 border-zinc-500/30 hover:bg-zinc-500/40 line-through",
};

export function SplicingTool() {
  const [preMrna, setPreMrna] = useState("");
  const [regions, setRegions] = useState<SpliceRegion[]>([]);
  const [spliced, setSpliced] = useState<string | null>(null);

  const clean = sanitizeMrna(preMrna);

  function handleDetect() {
    const r = detectIntrons(clean);
    setRegions(r.length ? r : [{ start: 0, end: clean.length - 1, type: "exon" as const }]);
    setSpliced(null);
  }

  function toggleRegion(i: number) {
    setRegions((prev) =>
      prev.map((r, idx) =>
        idx === i ? { ...r, type: r.type === "exon" ? "intron" : "exon" } : r
      )
    );
    setSpliced(null);
  }

  const handleSplice = useCallback(() => {
    setSpliced(splice(clean, regions));
  }, [clean, regions]);

  function loadExample() {
    setPreMrna(EXAMPLE_PRE_MRNA);
    setSpliced(null);
    setRegions([]);
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-64">
          <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Pre-mRNA Sequence</label>
          <input
            type="text"
            value={preMrna}
            onChange={(e) => { setPreMrna(e.target.value); setRegions([]); setSpliced(null); }}
            placeholder="Paste or type a pre-mRNA sequence"
            className="w-full bg-muted/30 border border-border rounded-lg px-3 py-2 font-mono text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary uppercase"
          />
        </div>
        <div className="flex gap-2 items-end">
          <button onClick={loadExample}
            className="px-3 py-2 rounded-lg text-xs bg-muted/40 border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
            Load example
          </button>
          <button onClick={handleDetect} disabled={!clean}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity">
            Detect Introns
          </button>
        </div>
      </div>

      {/* Region editor */}
      {regions.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Click a region to toggle between <b>exon</b> and <b>intron</b>
          </p>
          <div className="flex flex-wrap gap-2">
            {regions.map((r, i) => (
              <button key={i} onClick={() => toggleRegion(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${REGION_COLORS[r.type]}`}>
                {clean.slice(r.start, r.end + 1)}
                <span className="ml-1.5 text-[10px] font-sans opacity-70 capitalize">{r.type}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button onClick={handleSplice}
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              Splice 🧬
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      <AnimatePresence>
        {spliced !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <div className="p-4 rounded-xl bg-muted/20 border border-border">
              <p className="text-xs text-muted-foreground font-medium mb-2">Pre-mRNA (with introns)</p>
              <div className="flex flex-wrap gap-0.5">
                {regions.map((r, i) => (
                  <span key={i}
                    className={`font-mono text-xs px-0.5 rounded ${r.type === "exon" ? "text-blue-300" : "text-zinc-600 line-through"}`}>
                    {clean.slice(r.start, r.end + 1)}
                  </span>
                ))}
              </div>
            </div>

            {spliced ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <p className="text-xs text-emerald-400 font-medium mb-2">Mature mRNA (introns removed)</p>
                <p className="font-mono text-sm font-bold text-emerald-300 tracking-wider break-all">{spliced}</p>
                <p className="text-xs text-muted-foreground mt-2">{spliced.length} bases</p>
              </div>
            ) : (
              <p className="text-sm text-amber-400">No exon regions — mark at least one segment as an exon.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
