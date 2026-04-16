"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import {
  simulateMutation,
  DNA_BASES,
  CONSEQUENCE_COLOR,
  type MutationType,
  type MutationResult,
} from "@/lib/mutation";

const EXAMPLES = [
  { label: "Example ORF", seq: "ATGCAATTTGAGTAA" },
  { label: "BRAF V600E-like", seq: "ATGGTAGTGTCCCAG" },
];

export function MutationTool() {
  const [seq, setSeq] = useState("");
  const [type, setType] = useState<MutationType>("substitution");
  const [pos, setPos] = useState(0);
  const [newBase, setNewBase] = useState<string>("A");
  const [result, setResult] = useState<MutationResult | null>(null);

  const clean = seq.toUpperCase().replace(/[^ATGC]/g, "");

  function applyMutation() {
    if (!clean) return;
    setResult(simulateMutation(clean, type, pos, type === "insertion" || type === "substitution" ? newBase : undefined));
  }

  function reset() { setSeq(""); setResult(null); setPos(0); }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Input */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-64">
            <label className="text-xs text-muted-foreground font-medium mb-1.5 block">DNA Sequence</label>
            <input
              type="text"
              value={seq}
              onChange={(e) => { setSeq(e.target.value); setResult(null); setPos(0); }}
              placeholder="e.g. ATGCAATTTGAGTAA"
              className="w-full bg-muted/30 border border-border rounded-lg px-3 py-2 font-mono text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary uppercase"
            />
          </div>
          <button onClick={reset} className="self-end p-2.5 rounded-lg bg-muted/30 border border-border text-muted-foreground hover:text-foreground transition-colors" title="Reset">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button key={ex.label} onClick={() => { setSeq(ex.seq); setResult(null); setPos(0); }}
              className="px-3 py-1 rounded-full text-xs bg-muted/40 border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      {clean.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-muted/20 border border-border">
          {/* Mutation type */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground font-medium">Mutation Type</label>
            <div className="flex flex-col gap-1.5">
              {(["substitution", "insertion", "deletion"] as MutationType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => { setType(t); setResult(null); }}
                  className={`text-left px-3 py-1.5 rounded-lg text-xs border capitalize transition-all ${
                    type === t ? "bg-primary/20 border-primary text-foreground font-semibold" :
                    "bg-muted/30 border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Position */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground font-medium">
              Position (1–{clean.length})
            </label>
            <input
              type="number"
              min={1}
              max={clean.length}
              value={pos + 1}
              onChange={(e) => setPos(Math.max(0, Math.min(clean.length - 1, parseInt(e.target.value) - 1)))}
              className="w-full bg-muted/30 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="text-[10px] text-muted-foreground font-mono">Current base: <b>{clean[pos]}</b></p>
          </div>

          {/* New base (for sub/ins) */}
          {type !== "deletion" && (
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground font-medium">
                {type === "substitution" ? "Replace with" : "Insert base"}
              </label>
              <div className="flex gap-1.5 flex-wrap">
                {DNA_BASES.map((b) => (
                  <button
                    key={b}
                    onClick={() => setNewBase(b)}
                    disabled={type === "substitution" && b === clean[pos]}
                    className={`w-9 h-9 rounded-lg font-mono font-bold text-sm border transition-all disabled:opacity-30 ${
                      newBase === b ? "bg-primary text-primary-foreground border-primary" :
                      "bg-muted/40 text-muted-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {clean.length > 0 && (
        <button
          onClick={applyMutation}
          className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Apply Mutation
        </button>
      )}

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Sequence diff */}
          <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-3">
            <p className="text-xs text-muted-foreground font-medium">Sequence Diff</p>
            {[
              { label: "Original", seq: result.original },
              { label: "Mutated", seq: result.mutated },
            ].map(({ label, seq: s }) => (
              <div key={label}>
                <p className="text-[10px] text-muted-foreground mb-1">{label}</p>
                <div className="flex flex-wrap gap-0.5">
                  {s.split("").map((b, i) => {
                    const changed =
                      result.type === "substitution"
                        ? i === result.position
                        : result.type === "insertion"
                        ? label === "Mutated" && i === result.position + 1
                        : label === "Mutated" && i >= result.position;
                    return (
                      <span
                        key={i}
                        className={`inline-flex w-[18px] h-[22px] items-center justify-center rounded-sm font-mono text-xs ${
                          changed ? "bg-red-500/30 text-red-300 font-bold ring-1 ring-red-500/50" : "text-muted-foreground"
                        }`}
                      >
                        {b}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Consequence */}
          <div className={`flex items-start gap-3 p-4 rounded-xl border ${CONSEQUENCE_COLOR[result.consequence]}`}>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1">{result.consequence}</p>
              <p className="text-sm">{result.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
