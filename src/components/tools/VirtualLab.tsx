"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { translate, CATEGORY_COLOR, sanitizeMrna } from "@/lib/translation";

const DEMO_MRNA = "AUGAAACCCGGGUUU";

const RIBOSOME_COLORS: Record<string, string> = {
  nonpolar: "#3b82f6",
  polar: "#10b981",
  basic: "#f59e0b",
  acidic: "#ef4444",
  stop: "#71717a",
};

export function VirtualLab() {
  const [mrnaInput, setMrnaInput] = useState(DEMO_MRNA);
  const [playing, setPlaying] = useState(false);
  const [currentCodon, setCurrentCodon] = useState(-1);
  const result = translate(sanitizeMrna(mrnaInput));
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speedRef = useRef(900);
  const isFinished = currentCodon >= result.codons.length - 1;
  const isAnimating = playing && !isFinished;

  function reset() {
    setPlaying(false);
    setCurrentCodon(-1);
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  useEffect(() => {
    if (!isAnimating) return;
    timerRef.current = setTimeout(() => {
      setCurrentCodon((c) => c + 1);
    }, speedRef.current);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isAnimating, currentCodon]);

  const chain = result.codons.slice(0, currentCodon + 1).filter((c) => !c.isStop && !c.isStart || c.isStart);

  function handleMrnaChange(value: string) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPlaying(false);
    setCurrentCodon(-1);
    setMrnaInput(value);
  }

  function handlePlayToggle() {
    if (!result.codons.length) return;
    if (isFinished) {
      setCurrentCodon(-1);
      setPlaying(true);
      return;
    }
    setPlaying((prev) => !prev);
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Input */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-64">
          <label className="text-xs text-muted-foreground font-medium mb-1.5 block">mRNA Sequence</label>
          <input type="text" value={mrnaInput} onChange={(e) => handleMrnaChange(e.target.value)}
            className="w-full bg-muted/30 border border-border rounded-lg px-3 py-2 font-mono text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary uppercase"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={handlePlayToggle} disabled={!result.codons.length}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm disabled:opacity-40 hover:opacity-90 transition-opacity">
            {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isAnimating ? "Pause" : "Play"}
          </button>
          <button onClick={reset} className="p-2.5 rounded-lg bg-muted/30 border border-border text-muted-foreground hover:text-foreground transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* mRNA track + ribosome */}
      <div className="relative p-6 rounded-xl bg-muted/20 border border-border overflow-hidden min-h-48">
        <p className="text-xs text-muted-foreground mb-3 font-medium">mRNA track</p>

        {/* mRNA strand */}
        <div className="flex flex-wrap gap-0.5 relative z-10">
          {sanitizeMrna(mrnaInput).split("").map((base, i) => {
            const inOrf = result.orfStart >= 0 && i >= result.orfStart;
            const codonPos = inOrf ? Math.floor((i - result.orfStart) / 3) : -1;
            const active = codonPos === currentCodon;
            const past = codonPos < currentCodon && codonPos >= 0;
            return (
              <span key={i}
                className={`inline-flex w-[18px] h-[22px] items-center justify-center rounded-sm font-mono text-[11px] font-bold transition-colors duration-200 ${
                  active ? "bg-primary text-primary-foreground ring-1 ring-primary/80 scale-110" :
                  past ? "bg-primary/20 text-primary/70" :
                  inOrf ? "bg-muted/50 text-foreground" :
                  "text-muted-foreground/50"
                }`}>
                {base}
              </span>
            );
          })}
        </div>

        {/* Ribosome visual */}
        {currentCodon >= 0 && result.orfStart >= 0 && (
          <motion.div
            animate={{
              x: Math.min(currentCodon * 56, (sanitizeMrna(mrnaInput).length - 2) * 18),
            }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="absolute top-14 flex flex-col items-center z-20"
            style={{ left: result.orfStart * 18 }}
          >
            {/* tRNA incoming */}
            <AnimatePresence mode="wait">
              {currentCodon < result.codons.length && !result.codons[currentCodon]?.isStop && (
                <motion.div
                  key={currentCodon}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex flex-col items-center mb-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 shadow-lg ${
                      CATEGORY_COLOR[result.codons[currentCodon]?.category ?? "nonpolar"]
                    }`}
                  >
                    {result.codons[currentCodon]?.aminoAcid1}
                  </div>
                  <div className="w-0.5 h-3 bg-muted-foreground/40" />
                  <p className="text-[9px] text-muted-foreground font-mono">
                    {result.codons[currentCodon]?.codon}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ribosome blobs */}
            <div className="flex gap-0.5">
              <div className="w-14 h-8 rounded-full bg-zinc-600/80 border border-zinc-500/60 flex items-center justify-center text-[9px] text-zinc-300 font-semibold">
                60S
              </div>
              <div className="w-10 h-6 mt-1 rounded-full bg-zinc-700/80 border border-zinc-500/60 flex items-center justify-center text-[9px] text-zinc-300 font-semibold">
                40S
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Growing protein chain */}
      {chain.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Growing polypeptide chain</p>
          <div className="flex flex-wrap gap-1.5 items-center">
            {chain.map((c, i) => (
              <div key={i} className="flex items-center gap-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    CATEGORY_COLOR[c.category] ?? CATEGORY_COLOR.nonpolar
                  }`}
                  style={{ backgroundColor: RIBOSOME_COLORS[c.category] + "33" }}
                >
                  {c.aminoAcid1}
                </motion.div>
                {i < chain.length - 1 && (
                  <span className="text-muted-foreground text-lg leading-none">—</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isFinished && result.protein && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
        >
          <p className="text-xs text-emerald-400 font-medium">Translation complete!</p>
          <p className="font-mono text-sm font-bold text-emerald-300 tracking-widest mt-1">{result.protein}</p>
          <p className="text-xs text-muted-foreground mt-1">{result.protein.length} amino acids</p>
        </motion.div>
      )}

      {result.orfStart === -1 && (
        <p className="text-sm text-amber-400 text-center py-4">No AUG start codon found — cannot simulate translation.</p>
      )}
    </div>
  );
}
