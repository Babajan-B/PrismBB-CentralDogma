"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { translate, sanitizeMrna, CATEGORY_COLOR } from "@/lib/translation";

const EXAMPLES = [
  { label: "Short peptide", seq: "AUGAAAGUGUGA" },
  { label: "Met-Phe-Leu-Stop", seq: "AUGUUUUUAUGA" },
  { label: "No start codon", seq: "GCUGCUGCUGCU" },
];

export function TranslationTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof translate> | null>(null);
  const [step, setStep] = useState(-1);

  function handleTranslate() {
    const r = translate(sanitizeMrna(input));
    setResult(r);
    setStep(0);
  }

  function handleStepForward() {
    if (result && step < result.codons.length) setStep((s) => s + 1);
  }

  function reset() {
    setInput(""); setResult(null); setStep(-1);
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Input */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-64">
          <label className="text-xs text-muted-foreground font-medium mb-1.5 block">mRNA Sequence (5′→3′)</label>
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setResult(null); setStep(-1); }}
            placeholder="e.g. AUGAAAGUGUGA"
            className="w-full bg-muted/30 border border-border rounded-lg px-3 py-2 font-mono text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary uppercase"
          />
        </div>
        <div className="flex gap-2 items-end">
          <button
            onClick={handleTranslate}
            disabled={!input.trim()}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            Translate
          </button>
          <button onClick={reset} className="p-2 rounded-lg bg-muted/30 border border-border text-muted-foreground hover:text-foreground transition-colors" title="Reset">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Examples */}
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button key={ex.label} onClick={() => { setInput(ex.seq); setResult(null); setStep(-1); }}
            className="px-3 py-1 rounded-full text-xs bg-muted/40 border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
            {ex.label}
          </button>
        ))}
      </div>

      {/* mRNA display */}
      {result && (
        <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-3">
          <p className="text-xs text-muted-foreground font-medium">mRNA (5′→3′)</p>
          <div className="flex flex-wrap gap-0.5 font-mono text-xs">
            {result.mrna.split("").map((b, i) => {
              const inOrf = result.orfStart >= 0 && i >= result.orfStart;
              const codonIdx = inOrf ? Math.floor((i - result.orfStart) / 3) : -1;
              const active = step >= 0 && codonIdx >= 0 && codonIdx < step;
              return (
                <span
                  key={i}
                  className={`inline-flex w-[18px] h-[22px] items-center justify-center rounded-sm transition-colors ${
                    active ? "bg-primary/30 text-primary font-bold" :
                    inOrf ? "bg-muted/40 text-foreground" :
                    "text-muted-foreground"
                  }`}
                >
                  {b}
                </span>
              );
            })}
          </div>
          {result.orfStart === -1 && (
            <p className="text-xs text-amber-400">No start codon (AUG) found.</p>
          )}
        </div>
      )}

      {/* Step-through codons */}
      {result && result.codons.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Ribosome — codon {Math.min(step, result.codons.length)} / {result.codons.length}</p>
            <button
              onClick={handleStepForward}
              disabled={step >= result.codons.length}
              className="px-4 py-1.5 rounded-lg bg-primary/20 border border-primary/40 text-primary text-sm disabled:opacity-30 hover:bg-primary/30 transition-colors"
            >
              Next codon →
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {result.codons.slice(0, step).map((c, i) => (
              <AnimatePresence key={`${c.codon}-${i}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={`flex flex-col items-center px-2.5 py-1.5 rounded-lg border text-xs ${
                    c.isStop ? CATEGORY_COLOR.stop :
                    c.isStart ? "bg-violet-500/20 text-violet-300 border-violet-500/40" :
                    CATEGORY_COLOR[c.category] ?? CATEGORY_COLOR.nonpolar
                  }`}
                >
                  <span className="font-mono font-bold text-[11px]">{c.codon}</span>
                  <span className="font-semibold mt-0.5">{c.aminoAcid1}</span>
                  <span className="text-[9px] opacity-70">{c.aminoAcid}</span>
                </motion.div>
              </AnimatePresence>
            ))}
          </div>

          {step >= result.codons.length && result.protein && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
            >
              <p className="text-xs text-emerald-400 font-medium mb-1">Protein sequence (1-letter)</p>
              <p className="font-mono text-sm font-bold text-emerald-300 tracking-widest">{result.protein}</p>
              <p className="text-xs text-muted-foreground mt-1">{result.protein.length} amino acids</p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
