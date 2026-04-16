"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Atom,
  FlaskConical,
  Dna,
  BookOpen,
  ArrowRight,
  Droplets,
  Zap,
  Scale,
} from "lucide-react";
import type { Codon } from "@/data/types";
import { getAAByAbbr3 } from "@/data/aminoAcids";
import { codonsForAA } from "@/data/geneticCode";
import { Molecule3D } from "@/components/3d/Molecule3D";

interface CodonModalProps {
  codon: Codon | null;
  onClose: () => void;
}

const CATEGORY_COLOR: Record<string, string> = {
  nonpolar: "var(--aa-nonpolar)",
  polar: "var(--aa-polar)",
  basic: "var(--aa-basic)",
  acidic: "var(--aa-acidic)",
  stop: "var(--aa-stop)",
};

const TABS = [
  { key: "overview", label: "Overview", icon: Atom },
  { key: "chemistry", label: "Chemistry", icon: FlaskConical },
  { key: "genomics", label: "Genomics", icon: Dna },
  { key: "context", label: "Context", icon: BookOpen },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function CodonModal({ codon, onClose }: CodonModalProps) {
  const [tab, setTab] = useState<TabKey>("overview");
  const aa = codon ? getAAByAbbr3(codon.aminoAcid) : undefined;
  const synonyms = codon ? codonsForAA(codon.aminoAcid1) : [];
  const color = codon ? CATEGORY_COLOR[codon.category] : "var(--aa-stop)";

  /* Reset tab on new codon */
  const [prevTriplet, setPrevTriplet] = useState<string | null>(null);
  if (codon && codon.triplet !== prevTriplet) {
    setPrevTriplet(codon.triplet);
    if (tab !== "overview") setTab("overview");
  }

  return (
    <AnimatePresence>
      {codon && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${codon.triplet} detail`}
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-2xl flex-col border-l border-border bg-background shadow-2xl"
          >
            {/* ── Hero header ── */}
            <div
              className="relative shrink-0 overflow-hidden px-6 pb-5 pt-5"
              style={{
                background: `linear-gradient(145deg, ${color}18 0%, transparent 50%)`,
              }}
            >
              {/* Decorative circles */}
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-[0.06]"
                style={{ background: color }}
              />
              <div
                className="pointer-events-none absolute -right-4 top-16 h-24 w-24 rounded-full opacity-[0.04]"
                style={{ background: color }}
              />

              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Hero content */}
              <div className="flex items-end gap-5">
                {/* 3D amino acid molecule + 1-letter badge */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    damping: 18,
                    stiffness: 200,
                    delay: 0.1,
                  }}
                  className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl shadow-lg sm:h-28 sm:w-28"
                  style={{
                    background: `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)`,
                    border: `2px solid ${color}40`,
                  }}
                >
                  {codon.isStop ? (
                    <span className="text-4xl font-black" style={{ color }}>✕</span>
                  ) : (
                    <Molecule3D type="aminoAcid" color={color} size={0.8} className="h-full w-full" />
                  )}
                  <span
                    className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-white shadow-md"
                    style={{ background: color }}
                  >
                    {codon.aminoAcid1}
                  </span>
                </motion.div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {codon.isStart
                        ? "Start Codon"
                        : codon.isStop
                          ? "Stop Codon"
                          : "Codon"}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase text-white"
                      style={{ background: color }}
                    >
                      {codon.category}
                    </span>
                  </div>
                  <motion.div
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="font-sequence mt-1 text-4xl font-black tracking-[0.2em] text-foreground sm:text-5xl"
                  >
                    {codon.triplet}
                  </motion.div>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="font-semibold" style={{ color }}>
                      {codon.isStop
                        ? "Stop"
                        : aa?.name ?? codon.aminoAcid}
                    </span>
                    {aa && (
                      <>
                        <span>·</span>
                        <span className="tabular-nums">{aa.mw} Da</span>
                        <span>·</span>
                        <span>pI {aa.pI}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick info chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  {
                    label: "RNA",
                    value: codon.triplet,
                    mono: true,
                  },
                  {
                    label: "DNA",
                    value: codon.dnaTriplet,
                    mono: true,
                  },
                  {
                    label: "Anticodon",
                    value: codon.anticodon,
                    mono: true,
                  },
                  {
                    label: "Degeneracy",
                    value: `${synonyms.length}×`,
                    mono: false,
                  },
                ].map((chip) => (
                  <div
                    key={chip.label}
                    className="rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 backdrop-blur-sm"
                  >
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {chip.label}
                    </div>
                    <div
                      className={`text-sm font-bold ${chip.mono ? "font-sequence tracking-wider" : "tabular-nums"}`}
                    >
                      {chip.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Tab bar ── */}
            <div className="shrink-0 border-b border-border bg-background/80 px-6 backdrop-blur-md">
              <div className="flex gap-1 overflow-x-auto py-2">
                {TABS.map((t) => {
                  const active = t.key === tab;
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setTab(t.key)}
                      className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="modal-tab"
                          className="absolute inset-0 -z-10 rounded-full border border-border bg-muted"
                          transition={{
                            type: "spring",
                            damping: 30,
                            stiffness: 300,
                          }}
                        />
                      )}
                      <Icon size={13} />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Tab content ── */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="px-6 py-6"
                >
                  {tab === "overview" && (
                    <OverviewTab codon={codon} aa={aa} color={color} synonyms={synonyms} />
                  )}
                  {tab === "chemistry" && (
                    <ChemistryTab aa={aa} color={color} />
                  )}
                  {tab === "genomics" && (
                    <GenomicsTab codon={codon} synonyms={synonyms} color={color} />
                  )}
                  {tab === "context" && (
                    <ContextTab codon={codon} aa={aa} synonyms={synonyms} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Overview Tab ── */
function OverviewTab({
  codon,
  aa,
  color,
  synonyms,
}: {
  codon: Codon;
  aa: ReturnType<typeof getAAByAbbr3>;
  color: string;
  synonyms: Codon[];
}) {
  return (
    <div className="space-y-6">
      <section>
        <SectionLabel>Role in Translation</SectionLabel>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {codon.isStart
            ? "AUG is the universal start codon. It marks the initiation site of translation and encodes methionine (Met). The ribosome scans the mRNA's 5' UTR until it encounters this codon in the proper Kozak context, where the initiator tRNA (Met-tRNAi) binds to begin protein synthesis."
            : codon.isStop
              ? "This stop codon signals termination of translation. Release factors (eRF1 in eukaryotes, RF1/RF2 in prokaryotes) recognize the stop codon and trigger hydrolysis of the peptidyl-tRNA bond, releasing the completed polypeptide chain from the ribosome."
              : `This codon encodes ${aa?.name ?? codon.aminoAcid} (${codon.aminoAcid1}) during translation. When the ribosome reads this triplet on the mRNA, it recruits the matching aminoacyl-tRNA carrying ${codon.aminoAcid} to the A-site, adding it to the growing polypeptide chain.`}
        </p>
      </section>

      {/* Visual codon breakdown with 3D bases */}
      <section>
        <SectionLabel>Codon Breakdown</SectionLabel>
        <div className="flex items-center gap-1">
          {codon.triplet.split("").map((base, i) => {
            const baseColor =
              base === "A" ? "#ef4444" : base === "U" ? "#3b82f6" : base === "G" ? "#10b981" : "#f59e0b";
            return (
              <div
                key={i}
                className="flex flex-1 flex-col items-center rounded-xl border border-border bg-muted/30 p-3"
              >
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                  {i === 0 ? "1st" : i === 1 ? "2nd" : "3rd (wobble)"}
                </span>
                <div className="my-1 h-14 w-14">
                  <Molecule3D type="base" base={base} color={baseColor} size={0.6} className="h-full w-full" />
                </div>
                <span
                  className="font-sequence text-xl font-black"
                  style={{ color: baseColor }}
                >
                  {base}
                </span>
                <span className="mt-0.5 text-[10px] text-muted-foreground">
                  {base === "A" ? "Adenine" : base === "U" ? "Uracil" : base === "G" ? "Guanine" : "Cytosine"}
                </span>
              </div>
            );
          })}
          <ArrowRight size={16} className="mx-2 shrink-0 text-muted-foreground" />
          <div
            className="flex flex-col items-center rounded-xl border-2 p-3"
            style={{ borderColor: color }}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              Encodes
            </span>
            {codon.isStop ? (
              <span className="font-sequence mt-1 text-2xl font-black" style={{ color }}>✕</span>
            ) : (
              <div className="my-1 h-14 w-14">
                <Molecule3D type="aminoAcid" color={color} size={0.6} className="h-full w-full" />
              </div>
            )}
            <span
              className="font-sequence text-xl font-black"
              style={{ color }}
            >
              {codon.aminoAcid1}
            </span>
            <span className="mt-0.5 text-[10px] text-muted-foreground">
              {codon.isStop ? "Stop" : aa?.name ?? codon.aminoAcid}
            </span>
          </div>
        </div>
      </section>

      {/* Synonymous codons */}
      {synonyms.length > 1 && (
        <section>
          <SectionLabel>
            Synonymous Codons ({synonyms.length})
          </SectionLabel>
          <div className="flex flex-wrap gap-2">
            {synonyms.map((s) => (
              <span
                key={s.triplet}
                className={`font-sequence rounded-lg border px-3 py-1.5 text-sm font-bold tracking-wider transition-colors ${
                  s.triplet === codon.triplet
                    ? "border-transparent text-white"
                    : "border-border bg-muted/30 text-muted-foreground"
                }`}
                style={
                  s.triplet === codon.triplet
                    ? { background: color }
                    : undefined
                }
              >
                {s.triplet}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ── Chemistry Tab ── */
function ChemistryTab({
  aa,
  color,
}: {
  aa: ReturnType<typeof getAAByAbbr3>;
  color: string;
}) {
  if (!aa) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-4xl">🛑</div>
        <p className="mt-3 text-sm font-medium text-muted-foreground">
          Stop codons don&apos;t encode an amino acid.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Translation terminates here — no residue is added.
        </p>
      </div>
    );
  }

  const hydroNorm = ((aa.hydrophobicity + 4.5) / 9) * 100; // -4.5 to 4.5 → 0-100
  const pINorm = (aa.pI / 14) * 100;

  return (
    <div className="space-y-6">
      {/* 3D Amino Acid hero */}
      <div className="mx-auto h-48 w-full max-w-xs overflow-hidden rounded-2xl border border-border" style={{ background: `linear-gradient(145deg, ${color}10 0%, transparent 60%)` }}>
        <Molecule3D type="aminoAcid" color={color} size={1.1} className="h-full w-full" />
      </div>

      {/* Main properties grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <PropCard
          icon={<Scale size={14} />}
          label="Molecular Weight"
          value={`${aa.mw}`}
          unit="Da"
          color={color}
        />
        <PropCard
          icon={<Zap size={14} />}
          label="Isoelectric Point"
          value={`${aa.pI}`}
          unit="pI"
          color={color}
        />
        <PropCard
          icon={<Droplets size={14} />}
          label="Charge"
          value={aa.charge}
          color={color}
        />
      </div>

      {/* Visual bars */}
      <section>
        <SectionLabel>Property Scales</SectionLabel>
        <div className="space-y-4">
          <PropertyBar
            label="Hydrophobicity"
            value={aa.hydrophobicity}
            displayValue={`${aa.hydrophobicity > 0 ? "+" : ""}${aa.hydrophobicity}`}
            percent={hydroNorm}
            color={color}
            leftLabel="Hydrophilic"
            rightLabel="Hydrophobic"
            hint="Kyte-Doolittle scale (−4.5 to +4.5)"
          />
          <PropertyBar
            label="Isoelectric Point"
            value={aa.pI}
            displayValue={aa.pI.toString()}
            percent={pINorm}
            color={color}
            leftLabel="Acidic"
            rightLabel="Basic"
            hint="pH at which net charge is zero"
          />
        </div>
      </section>

      {/* Side chain with sugar molecule */}
      <section>
        <SectionLabel>Side Chain (R-group)</SectionLabel>
        <div
          className="rounded-xl border border-border p-4"
          style={{
            background: `linear-gradient(135deg, ${color}08 0%, transparent 60%)`,
          }}
        >
          <div className="flex items-start gap-4">
            <div className="h-24 w-24 shrink-0">
              <Molecule3D type="sugar" color={color} size={0.7} className="h-full w-full" />
            </div>
            <div>
              <span className="text-lg font-bold text-foreground">
                {aa.sideChain}
              </span>
              <p className="mt-2 text-xs text-muted-foreground">
                The R-group determines the amino acid&apos;s chemical
                properties, including its polarity, charge, and role in protein
                folding and function.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Genomics Tab ── */
function GenomicsTab({
  codon,
  synonyms,
  color,
}: {
  codon: Codon;
  synonyms: Codon[];
  color: string;
}) {
  return (
    <div className="space-y-6">
      {/* Synonymous codons visual */}
      <section>
        <SectionLabel>Codon Degeneracy</SectionLabel>
        <p className="mb-4 text-xs text-muted-foreground">
          {synonyms.length === 1
            ? "This is the only codon encoding this signal — no synonymous alternatives exist."
            : `${synonyms.length} codons encode ${codon.isStop ? "a stop signal" : codon.aminoAcid}. This redundancy buffers against point mutations.`}
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {synonyms.map((s) => {
            const isCurrent = s.triplet === codon.triplet;
            return (
              <div
                key={s.triplet}
                className={`flex flex-col items-center rounded-xl border p-3 transition-all ${
                  isCurrent
                    ? "border-transparent shadow-lg"
                    : "border-border bg-muted/20"
                }`}
                style={
                  isCurrent
                    ? {
                        background: `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)`,
                        borderColor: color,
                      }
                    : undefined
                }
              >
                <span className="font-sequence text-base font-black tracking-wider">
                  {s.triplet}
                </span>
                <span className="font-sequence text-[9px] text-muted-foreground">
                  {s.anticodon}
                </span>
                {isCurrent && (
                  <span
                    className="mt-1 rounded-full px-1.5 py-0.5 text-[7px] font-bold text-white"
                    style={{ background: color }}
                  >
                    CURRENT
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Wobble position */}
      <section>
        <SectionLabel>Wobble Position Analysis</SectionLabel>
        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <div className="flex items-center gap-3">
            {codon.triplet.split("").map((base, i) => (
              <div
                key={i}
                className={`flex h-12 w-12 items-center justify-center rounded-lg font-sequence text-xl font-black ${
                  i === 2
                    ? "border-2 text-foreground"
                    : "border border-border bg-muted/30 text-muted-foreground"
                }`}
                style={
                  i === 2
                    ? {
                        borderColor: color,
                        background: `${color}15`,
                        color,
                      }
                    : undefined
                }
              >
                {base}
              </div>
            ))}
            <div className="ml-2 flex-1">
              <p className="text-xs font-semibold text-foreground">
                Position 3: Wobble Base
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                The third nucleotide tolerates non-standard base pairing.
                Variation here often preserves the encoded amino acid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Codon reading frame */}
      <section>
        <SectionLabel>Reading Frame</SectionLabel>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Codons are read in a fixed reading frame set by the start codon.
          A single insertion or deletion shifts the frame (frameshift
          mutation), typically producing a nonfunctional protein.
        </p>
      </section>
    </div>
  );
}

/* ── Context Tab ── */
function ContextTab({
  codon,
  aa,
  synonyms,
}: {
  codon: Codon;
  aa: ReturnType<typeof getAAByAbbr3>;
  synonyms: Codon[];
}) {
  return (
    <div className="space-y-6">
      <section>
        <SectionLabel>Biological Context</SectionLabel>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {codon.isStart
            ? "Nearly all open reading frames begin with AUG. In bacteria, the Shine-Dalgarno sequence upstream of AUG positions the ribosome; in eukaryotes, the Kozak consensus sequence (GCC ACC AUG G) governs efficient recognition of the start site."
            : codon.isStop
              ? codon.triplet === "UAA"
                ? "UAA (ochre) is the most commonly used stop codon across many genomes. It is efficiently recognized by both Class I release factors. In E. coli, ~63% of genes terminate with UAA."
                : codon.triplet === "UAG"
                  ? "UAG (amber) is frequently used in genetic code expansion experiments. Amber suppressor tRNAs can read through UAG to insert non-canonical amino acids, enabling site-specific protein labeling."
                  : "UGA (opal) has the most versatile recoding. It can encode selenocysteine (the 21st amino acid) via SECIS elements, or tryptophan in mitochondria and certain organisms."
              : `Codon usage bias varies dramatically by organism. In highly expressed genes, preferred codons matching abundant tRNAs are selected to maximize translation speed and accuracy. ${aa?.name ?? codon.aminoAcid} codons show significant bias in many model organisms.`}
        </p>
      </section>

      <section>
        <SectionLabel>Mutation Sensitivity</SectionLabel>
        <div className="space-y-2">
          <MutationRow
            type="Silent"
            description={
              synonyms.length > 1
                ? `${synonyms.length - 1} synonymous substitution${synonyms.length - 1 === 1 ? "" : "s"} preserve the amino acid — these are selectively neutral in most cases.`
                : "No synonymous alternatives exist — every point mutation at the third position is missense or nonsense."
            }
            severity="low"
          />
          <MutationRow
            type="Missense"
            description="Non-synonymous substitutions replace the amino acid, potentially altering protein structure and function. Conservative vs. radical substitutions differ in impact."
            severity="medium"
          />
          <MutationRow
            type="Nonsense"
            description="A mutation creating a premature stop codon truncates the protein. These are typically the most deleterious single-nucleotide mutations."
            severity="high"
          />
        </div>
      </section>

      {/* Evolutionary conservation */}
      <section>
        <SectionLabel>Evolutionary Notes</SectionLabel>
        <p className="text-sm leading-relaxed text-muted-foreground">
          The genetic code is nearly universal across life, with minor
          variations in mitochondria and some organisms (e.g., UGA codes
          for tryptophan in mycoplasma). This conservation suggests the
          code was established very early in evolution, before the
          divergence of the three domains of life.
        </p>
      </section>
    </div>
  );
}

/* ── Shared UI Atoms ── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
      {children}
    </h3>
  );
}

function PropCard({
  icon,
  label,
  value,
  unit,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  color: string;
}) {
  return (
    <div
      className="rounded-xl border border-border p-3"
      style={{
        background: `linear-gradient(135deg, ${color}08 0%, transparent 60%)`,
      }}
    >
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-[9px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-xl font-black tabular-nums text-foreground">
          {value}
        </span>
        {unit && (
          <span className="text-[10px] font-medium text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

function PropertyBar({
  label,
  displayValue,
  percent,
  color,
  leftLabel,
  rightLabel,
  hint,
}: {
  label: string;
  value: number;
  displayValue: string;
  percent: number;
  color: string;
  leftLabel: string;
  rightLabel: string;
  hint: string;
}) {
  const clampedPercent = Math.max(2, Math.min(98, percent));
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-xs font-semibold text-foreground">{label}</span>
        <span className="font-sequence text-xs font-bold" style={{ color }}>
          {displayValue}
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted/40">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedPercent}%` }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: color }}
        />
        {/* Marker */}
        <motion.div
          initial={{ left: "0%" }}
          animate={{ left: `${clampedPercent}%` }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="absolute top-1/2 h-3.5 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow"
        />
      </div>
      <div className="mt-1 flex justify-between">
        <span className="text-[9px] text-muted-foreground">{leftLabel}</span>
        <span className="text-[9px] text-muted-foreground">{rightLabel}</span>
      </div>
      <p className="mt-0.5 text-[9px] italic text-muted-foreground/60">
        {hint}
      </p>
    </div>
  );
}

function MutationRow({
  type,
  description,
  severity,
}: {
  type: string;
  description: string;
  severity: "low" | "medium" | "high";
}) {
  const dotColor =
    severity === "low"
      ? "var(--aa-polar)"
      : severity === "medium"
        ? "var(--aa-basic)"
        : "var(--aa-acidic)";

  return (
    <div className="flex gap-3 rounded-xl border border-border bg-muted/20 p-3">
      <span
        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
        style={{ background: dotColor }}
      />
      <div>
        <span className="text-xs font-bold text-foreground">{type}</span>
        <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
