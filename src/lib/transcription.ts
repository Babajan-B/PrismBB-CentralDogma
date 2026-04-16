const COMPLEMENT: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };
const TO_RNA: Record<string, string> = { A: "A", T: "U", G: "G", C: "C" };

export interface TranscriptionStep {
  label: string;
  sequence: string;
  direction: "5′→3′" | "3′→5′";
  colorClass: string;
}

/** Clean input to valid DNA bases */
export function sanitizeDna(input: string): string {
  return input.toUpperCase().replace(/[^ATGC]/g, "");
}

/** DNA coding strand → transcription steps */
export function transcribe(dnaCoding: string): TranscriptionStep[] {
  const clean = sanitizeDna(dnaCoding);
  if (!clean) return [];
  const template = clean.split("").map((b) => COMPLEMENT[b] ?? "N").reverse().join("");
  const mrna = clean.split("").map((b) => TO_RNA[b] ?? "N").join("");

  return [
    { label: "DNA Coding Strand", sequence: clean, direction: "5′→3′", colorClass: "text-blue-400" },
    { label: "DNA Template Strand", sequence: template, direction: "3′→5′", colorClass: "text-indigo-400" },
    { label: "Pre-mRNA Transcript", sequence: mrna, direction: "5′→3′", colorClass: "text-amber-400" },
  ];
}

export const BASE_COLOR: Record<string, string> = {
  A: "bg-emerald-500/30 text-emerald-300 border-emerald-500/40",
  T: "bg-red-500/30 text-red-300 border-red-500/40",
  U: "bg-amber-500/30 text-amber-300 border-amber-500/40",
  G: "bg-violet-500/30 text-violet-300 border-violet-500/40",
  C: "bg-blue-500/30 text-blue-300 border-blue-500/40",
  N: "bg-muted text-muted-foreground border-border",
};
