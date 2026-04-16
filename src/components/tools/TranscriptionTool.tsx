"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, RotateCcw } from "lucide-react";
import { transcribe, sanitizeDna, BASE_COLOR } from "@/lib/transcription";

const EXAMPLES = [
  { label: "Methionine start", seq: "ATGAAACCC" },
  { label: "BRCA1 fragment", seq: "ATGGATTTATCTGCTCTTCGCGTTGAA" },
  { label: "Short ORF", seq: "ATGCGATTAGCA" },
];

export function TranscriptionTool() {
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(0);

  const steps = transcribe(sanitizeDna(input));

  function handleTranscribe() {
    setRevealed(0);
    setTimeout(() => setRevealed(steps.length), 50);
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Input row */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-64">
          <label className="text-xs text-muted-foreground font-medium mb-1.5 block">
            DNA Coding Strand (5′→3′)
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setRevealed(0);
            }}
            placeholder="e.g. ATGAAACCC"
            className="w-full bg-muted/30 border border-border rounded-lg px-3 py-2 font-mono text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary uppercase"
          />
        </div>
        <div className="flex flex-col justify-end">
          <button
            onClick={handleTranscribe}
            disabled={!input.trim()}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            Transcribe
          </button>
        </div>
        <button
          onClick={() => { setInput(""); setRevealed(0); }}
          className="self-end p-2 rounded-lg bg-muted/30 border border-border text-muted-foreground hover:text-foreground transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Example buttons */}
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            onClick={() => { setInput(ex.seq); setRevealed(0); }}
            className="px-3 py-1 rounded-full text-xs bg-muted/40 border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Steps */}
      <AnimatePresence>
        {revealed > 0 && steps.map((step, i) => (
          i < revealed ? (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="space-y-2"
            >
              {i > 0 && (
                <div className="flex justify-center">
                  <ArrowDown className="w-5 h-5 text-muted-foreground opacity-50" />
                </div>
              )}
              <div className="p-4 rounded-xl bg-muted/20 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-semibold ${step.colorClass}`}>{step.label}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">{step.direction}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {step.sequence.split("").map((base, j) => (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15 + j * 0.02 }}
                      className={`inline-flex w-7 h-7 items-center justify-center rounded text-xs font-mono font-bold border ${BASE_COLOR[base] ?? BASE_COLOR.N}`}
                    >
                      {base}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null
        ))}
      </AnimatePresence>

      {input && steps.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          Enter a DNA sequence using A, T, G, C bases.
        </p>
      )}
    </div>
  );
}
