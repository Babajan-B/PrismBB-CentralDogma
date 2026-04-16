"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   Shared helpers
───────────────────────────────────────────────────────────────── */

function DidYouKnow({ text }: { text: string }) {
  return (
    <div
      className="rounded-xl border p-4 text-sm leading-relaxed"
      style={{
        borderColor: "var(--border)",
        background: "var(--card-sky)",
        color: "var(--card-text)",
      }}
    >
      <span className="mr-2 font-black" style={{ color: "#0a5a7a" }}>
        Did you know?
      </span>
      {text}
    </div>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col gap-6"
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Pattern 1 — Classical Mendelian
───────────────────────────────────────────────────────────────── */

type Allele = "A" | "a";

function isUpper(a: string) {
  return a === a.toUpperCase() && a !== a.toLowerCase();
}

function MendelianPunnett() {
  const [p1, setP1] = useState<[Allele, Allele]>(["A", "a"]);
  const [p2, setP2] = useState<[Allele, Allele]>(["A", "a"]);

  const combos: Array<{ pair: string; dominant: boolean; col: Allele; row: Allele }> = [];
  for (const col of p1) {
    for (const row of p2) {
      const sorted = [col, row].sort((a, b) =>
        isUpper(a) === isUpper(b) ? 0 : isUpper(a) ? -1 : 1
      );
      combos.push({ pair: sorted.join(""), dominant: isUpper(col) || isUpper(row), col, row });
    }
  }

  const domCount = combos.filter((c) => c.dominant).length;

  const genotypeOptions: Array<[Allele, Allele]> = [
    ["A", "A"],
    ["A", "a"],
    ["a", "a"],
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap gap-10 justify-center">
        {(
          [
            ["Parent 1", p1, setP1],
            ["Parent 2", p2, setP2],
          ] as [
            string,
            [Allele, Allele],
            React.Dispatch<React.SetStateAction<[Allele, Allele]>>
          ][]
        ).map(([label, val, set]) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {label}
            </p>
            <div className="flex gap-2">
              {genotypeOptions.map(([a1, a2]) => (
                <button
                  key={`${a1}${a2}`}
                  onClick={() => set([a1, a2])}
                  className="rounded-lg border px-3 py-1.5 text-sm font-black transition-all"
                  style={{
                    borderColor:
                      val[0] === a1 && val[1] === a2 ? "#3b82f6" : "var(--border)",
                    background:
                      val[0] === a1 && val[1] === a2 ? "#3b82f620" : "transparent",
                    color: "var(--foreground)",
                  }}
                >
                  <span style={{ color: isUpper(a1) ? "#3b82f6" : "#ef4444" }}>{a1}</span>
                  <span style={{ color: isUpper(a2) ? "#3b82f6" : "#ef4444" }}>{a2}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="select-none">
        <div className="flex">
          <div className="h-10 w-10" />
          {p1.map((a, i) => (
            <div
              key={i}
              className="flex h-10 w-20 items-center justify-center text-lg font-black"
              style={{ color: isUpper(a) ? "#3b82f6" : "#ef4444" }}
            >
              {a}
            </div>
          ))}
        </div>
        {p2.map((rowA, ri) => (
          <div key={ri} className="flex">
            <div
              className="flex h-20 w-10 items-center justify-center text-lg font-black"
              style={{ color: isUpper(rowA) ? "#3b82f6" : "#ef4444" }}
            >
              {rowA}
            </div>
            {p1.map((colA, ci) => {
              const cell = combos[ci * 2 + ri];
              return (
                <motion.div
                  key={ci}
                  whileHover={{ scale: 1.06 }}
                  className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-xl border-2 m-1 cursor-default"
                  style={{
                    borderColor: cell.dominant ? "#3b82f640" : "#ef444440",
                    background: cell.dominant ? "#3b82f612" : "#ef444412",
                  }}
                >
                  <span className="text-xl font-black">
                    <span style={{ color: isUpper(colA) ? "#3b82f6" : "#ef4444" }}>
                      {colA}
                    </span>
                    <span style={{ color: isUpper(rowA) ? "#3b82f6" : "#ef4444" }}>
                      {rowA}
                    </span>
                  </span>
                  <span className="text-[9px] font-semibold text-muted-foreground">
                    {cell.dominant ? "Dominant" : "Recessive"}
                  </span>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex gap-4 rounded-xl border border-border bg-muted/20 px-6 py-3 text-sm">
        <span>
          <span className="font-black" style={{ color: "#3b82f6" }}>
            {domCount}/4
          </span>{" "}
          <span className="text-muted-foreground">Dominant phenotype</span>
        </span>
        <span className="text-border">|</span>
        <span>
          <span className="font-black" style={{ color: "#ef4444" }}>
            {4 - domCount}/4
          </span>{" "}
          <span className="text-muted-foreground">Recessive phenotype</span>
        </span>
      </div>
    </div>
  );
}

function ChromosomePairSVG() {
  return (
    <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="chrA" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        <radialGradient id="chrB" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#166534" />
        </radialGradient>
        <filter id="shadow1" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Dominant chromosome */}
      <ellipse cx="75" cy="60" rx="26" ry="50" fill="url(#chrA)" filter="url(#shadow1)" />
      {/* Dominant allele band */}
      <ellipse cx="75" cy="55" rx="26" ry="7" fill="#fbbf24" opacity="0.85" />
      <text x="75" y="59" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e3a5f">A</text>
      <text x="75" y="108" textAnchor="middle" fontSize="9" fill="#93c5fd">Dominant</text>

      {/* Recessive chromosome */}
      <ellipse cx="145" cy="60" rx="26" ry="50" fill="url(#chrB)" filter="url(#shadow1)" />
      {/* Recessive allele band */}
      <ellipse cx="145" cy="55" rx="26" ry="7" fill="#fca5a5" opacity="0.85" />
      <text x="145" y="59" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#14532d">a</text>
      <text x="145" y="108" textAnchor="middle" fontSize="9" fill="#86efac">Recessive</text>
    </svg>
  );
}

function PatternMendelian() {
  return (
    <SectionCard>
      <div className="rounded-2xl border border-border p-6 md:p-8">
        <h2 className="mb-1 text-xl font-black">Pattern 1 — Classical Mendelian (Dominant / Recessive)</h2>
        <p className="mb-6 text-sm text-muted-foreground max-w-2xl">
          One allele completely masks the other. The dominant allele (uppercase) is expressed whenever
          present; the recessive allele (lowercase) is only expressed in the homozygous state.
        </p>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex flex-col items-center gap-3">
            <ChromosomePairSVG />
            <p className="text-xs text-muted-foreground text-center max-w-[180px]">
              Chromosome pair showing dominant (A) and recessive (a) alleles
            </p>
          </div>
          <div className="flex-1">
            <h3 className="mb-4 font-bold">Interactive Punnett Square</h3>
            <MendelianPunnett />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border p-5" style={{ background: "var(--card-sky)" }}>
          <h4 className="mb-2 font-bold" style={{ color: "#0a5a7a" }}>Human Examples</h4>
          <ul className="flex flex-col gap-1.5 text-sm" style={{ color: "var(--card-text)", opacity: 0.8 }}>
            <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Tongue rolling</span> — R (roller) dominant over r (non-roller)</li>
            <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Widow&apos;s peak</span> — W dominant over w (straight hairline)</li>
            <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Huntington&apos;s disease</span> — rare autosomal dominant; one copy causes disease</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border p-5" style={{ background: "var(--card-mint)" }}>
          <h4 className="mb-2 font-bold" style={{ color: "#1a6a40" }}>Key Facts</h4>
          <ul className="flex flex-col gap-1.5 text-sm" style={{ color: "var(--card-text)", opacity: 0.8 }}>
            <li>Aa × Aa cross yields <span className="font-black" style={{ color: "var(--card-text)" }}>3:1</span> dominant:recessive phenotype ratio</li>
            <li><span className="font-black" style={{ color: "var(--card-text)" }}>75%</span> of offspring show dominant phenotype in Aa × Aa</li>
            <li>AA and Aa are phenotypically identical — only aa shows recessive</li>
          </ul>
        </div>
      </div>

      <DidYouKnow text="Albinism is a classic autosomal recessive trait — both parents can be carriers (Aa) and appear unaffected, yet have a 25% chance of an albino child (aa)." />
    </SectionCard>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Pattern 2 — Incomplete Dominance
───────────────────────────────────────────────────────────────── */

function FlowersSVG() {
  return (
    <svg width="260" height="110" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="red" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="100%" stopColor="#b91c1c" />
        </radialGradient>
        <radialGradient id="white" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <radialGradient id="pink" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#db2777" />
        </radialGradient>
        <filter id="fs" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="3" stdDeviation="3" floodOpacity="0.25" />
        </filter>
      </defs>
      {/* Red flower */}
      <circle cx="40" cy="50" r="32" fill="url(#red)" filter="url(#fs)" />
      <text x="40" y="54" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">C¹C¹</text>
      <text x="40" y="98" textAnchor="middle" fontSize="9" fill="#fca5a5">Red</text>

      {/* × */}
      <text x="88" y="55" textAnchor="middle" fontSize="18" fill="var(--muted-foreground)">×</text>

      {/* White flower */}
      <circle cx="130" cy="50" r="32" fill="url(#white)" filter="url(#fs)" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="130" y="54" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">C²C²</text>
      <text x="130" y="98" textAnchor="middle" fontSize="9" fill="#94a3b8">White</text>

      {/* → */}
      <text x="178" y="55" textAnchor="middle" fontSize="18" fill="var(--muted-foreground)">→</text>

      {/* Pink flower */}
      <circle cx="220" cy="50" r="32" fill="url(#pink)" filter="url(#fs)" />
      <text x="220" y="54" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">C¹C²</text>
      <text x="220" y="98" textAnchor="middle" fontSize="9" fill="#f9a8d4">Pink (blend)</text>
    </svg>
  );
}

function PatternIncompleteDominance() {
  return (
    <SectionCard>
      <div className="rounded-2xl border border-border p-6 md:p-8">
        <h2 className="mb-1 text-xl font-black">Pattern 2 — Incomplete Dominance</h2>
        <p className="mb-6 text-sm text-muted-foreground max-w-2xl">
          Neither allele is fully dominant. The heterozygous phenotype is an intermediate blend
          between the two homozygous phenotypes — like mixing red and white paint to get pink.
        </p>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex flex-col items-center gap-3">
            <FlowersSVG />
            <p className="text-xs text-muted-foreground text-center max-w-[220px]">
              Red × White snapdragon cross produces Pink offspring (F₁)
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="rounded-xl border border-border p-4" style={{ background: "var(--card-pink)" }}>
              <h4 className="mb-2 font-bold" style={{ color: "#8a1a50" }}>F₁ × F₁ Ratio</h4>
              <div className="flex gap-3 flex-wrap">
                {[
                  { g: "C¹C¹", p: "Red", c: "#b91c1c", bg: "#fee2e2" },
                  { g: "C¹C²", p: "Pink", c: "#db2777", bg: "#fce7f3" },
                  { g: "C¹C²", p: "Pink", c: "#db2777", bg: "#fce7f3" },
                  { g: "C²C²", p: "White", c: "#475569", bg: "#f1f5f9" },
                ].map((cell, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center rounded-lg border px-3 py-2 text-xs font-bold"
                    style={{ borderColor: `${cell.c}60`, background: cell.bg, color: cell.c }}
                  >
                    <span>{cell.g}</span>
                    <span className="font-normal text-[10px] mt-0.5">{cell.p}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">1 Red : 2 Pink : 1 White</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border p-5" style={{ background: "var(--card-pink)" }}>
          <h4 className="mb-2 font-bold" style={{ color: "#8a1a50" }}>Human Example</h4>
          <p className="text-sm leading-relaxed" style={{ color: "var(--card-text)", opacity: 0.8 }}>
            <span className="font-semibold" style={{ color: "var(--card-text)" }}>Familial Hypercholesterolaemia (FH):</span>{" "}
            Heterozygotes (one faulty LDL-receptor allele) have mildly elevated cholesterol;
            homozygotes (two faulty alleles) have severely elevated cholesterol and early heart disease.
          </p>
        </div>
        <div className="rounded-xl border border-border p-5" style={{ background: "var(--card-lavender)" }}>
          <h4 className="mb-2 font-bold" style={{ color: "#4a2e90" }}>vs. Complete Dominance</h4>
          <ul className="flex flex-col gap-1.5 text-sm" style={{ color: "var(--card-text)", opacity: 0.8 }}>
            <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Complete dominance:</span> Aa looks like AA</li>
            <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Incomplete dominance:</span> Aa looks different from both AA and aa</li>
            <li>Phenotype ratio mirrors genotype ratio (1:2:1)</li>
          </ul>
        </div>
      </div>

      <DidYouKnow text="Four o'clock flowers (Mirabilis jalapa) are the textbook example of incomplete dominance — red × white always gives pink hybrids. The alleles both contribute pigment, but in half the usual amount." />
    </SectionCard>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Pattern 3 — Codominance
───────────────────────────────────────────────────────────────── */

function BloodCellSVG() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rbc" cx="38%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="100%" stopColor="#991b1b" />
        </radialGradient>
        <radialGradient id="antA" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        <radialGradient id="antB" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
        <filter id="rbcShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="4" stdDeviation="5" floodOpacity="0.35" />
        </filter>
      </defs>
      {/* Red blood cell body */}
      <circle cx="90" cy="90" r="62" fill="url(#rbc)" filter="url(#rbcShadow)" />
      {/* A antigens */}
      <circle cx="50" cy="52" r="13" fill="url(#antA)" />
      <text x="50" y="56" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">A</text>
      <circle cx="68" cy="32" r="11" fill="url(#antA)" />
      <text x="68" y="36" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">A</text>
      {/* B antigens */}
      <circle cx="128" cy="52" r="13" fill="url(#antB)" />
      <text x="128" y="56" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">B</text>
      <circle cx="112" cy="32" r="11" fill="url(#antB)" />
      <text x="112" y="36" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">B</text>
      {/* Label */}
      <text x="90" y="97" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">AB</text>
      <text x="90" y="113" textAnchor="middle" fontSize="9" fill="#fca5a5">Blood Type AB</text>
      {/* Legend */}
      <rect x="12" y="148" width="12" height="12" rx="3" fill="url(#antA)" />
      <text x="28" y="158" fontSize="9" fill="var(--muted-foreground)">A antigen</text>
      <rect x="92" y="148" width="12" height="12" rx="3" fill="url(#antB)" />
      <text x="108" y="158" fontSize="9" fill="var(--muted-foreground)">B antigen</text>
    </svg>
  );
}

function PatternCodominance() {
  return (
    <SectionCard>
      <div className="rounded-2xl border border-border p-6 md:p-8">
        <h2 className="mb-1 text-xl font-black">Pattern 3 — Codominance</h2>
        <p className="mb-6 text-sm text-muted-foreground max-w-2xl">
          Both alleles are fully and simultaneously expressed in the heterozygote. Neither masks the
          other — the phenotype shows a mosaic or mixture of both parental traits, not a blend.
        </p>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex flex-col items-center gap-3">
            <BloodCellSVG />
            <p className="text-xs text-muted-foreground text-center max-w-[160px]">
              Both A and B antigens are present on the red blood cell surface
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="rounded-xl border border-border p-4">
              <h4 className="mb-3 font-bold">ABO Blood Type Alleles</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { g: "IᴬIᴬ or Iᴬi", p: "Type A", c: "#1d4ed8", bg: "#eff6ff" },
                  { g: "IᴮIᴮ or Iᴮi", p: "Type B", c: "#b45309", bg: "#fffbeb" },
                  { g: "IᴬIᴮ", p: "Type AB", c: "#7c3aed", bg: "#f5f3ff" },
                  { g: "ii", p: "Type O", c: "#991b1b", bg: "#fef2f2" },
                ].map((row) => (
                  <div
                    key={row.p}
                    className="flex flex-col items-center rounded-xl border px-4 py-2 text-xs font-bold min-w-[90px]"
                    style={{ borderColor: `${row.c}50`, background: row.bg, color: row.c }}
                  >
                    <span>{row.g}</span>
                    <span className="font-normal mt-0.5" style={{ color: "var(--muted-foreground)" }}>{row.p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border p-4" style={{ background: "var(--card-lavender)" }}>
              <h4 className="mb-2 font-bold" style={{ color: "#4a2e90" }}>Codominance vs Incomplete Dominance</h4>
              <ul className="flex flex-col gap-1 text-xs" style={{ color: "var(--card-text)", opacity: 0.8 }}>
                <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Incomplete:</span> blend (pink flower)</li>
                <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Codominance:</span> both traits separately visible (AB blood type shows both A and B antigens)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <DidYouKnow text="If you are blood type AB, you are a universal plasma donor but can only receive blood from AB donors. Type O is the universal red cell donor because it has neither A nor B antigens — unrecognised by any immune system." />
    </SectionCard>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Pattern 4 — Sex-linked Traits
───────────────────────────────────────────────────────────────── */

function XYChromosomesSVG() {
  return (
    <svg width="200" height="140" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="xChr" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6d28d9" />
        </radialGradient>
        <radialGradient id="yChr" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
        <filter id="chrShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="1" dy="3" stdDeviation="3" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* X chromosome — large X shape approximated with two crossing bars */}
      <g filter="url(#chrShadow)">
        <rect x="42" y="10" width="22" height="120" rx="11" fill="url(#xChr)" transform="rotate(-30 53 70)" />
        <rect x="42" y="10" width="22" height="120" rx="11" fill="url(#xChr)" transform="rotate(30 53 70)" />
      </g>
      <text x="53" y="74" textAnchor="middle" fontSize="22" fontWeight="900" fill="white" opacity="0.9">X</text>
      <text x="53" y="130" textAnchor="middle" fontSize="10" fill="#c4b5fd">X chromosome</text>

      {/* Y chromosome — smaller */}
      <g filter="url(#chrShadow)">
        <rect x="135" y="30" width="18" height="70" rx="9" fill="url(#yChr)" />
        <rect x="118" y="18" width="18" height="50" rx="9" fill="url(#yChr)" transform="rotate(-25 127 43)" />
        <rect x="152" y="18" width="18" height="50" rx="9" fill="url(#yChr)" transform="rotate(25 161 43)" />
      </g>
      <text x="144" y="74" textAnchor="middle" fontSize="18" fontWeight="900" fill="white" opacity="0.9">Y</text>
      <text x="144" y="130" textAnchor="middle" fontSize="10" fill="#fdba74">Y chromosome</text>
    </svg>
  );
}

function PedigreeDiagram() {
  // Carrier mother (XᴴX) × normal father (XY)
  // Offspring: XᴴX (carrier daughter), XX (normal daughter), XᴴY (affected son), XY (normal son)
  const offspring = [
    { label: "Xᴴ X", desc: "Carrier ♀", affected: false, female: true },
    { label: "X X", desc: "Normal ♀", affected: false, female: true },
    { label: "Xᴴ Y", desc: "Affected ♂", affected: true, female: false },
    { label: "X Y", desc: "Normal ♂", affected: false, female: false },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Parents */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-xs font-bold"
            style={{ borderColor: "#a78bfa", background: "#a78bfa20", color: "#a78bfa" }}
          >
            Xᴴ X
          </div>
          <span className="text-[10px] text-muted-foreground">Carrier Mother</span>
        </div>
        <span className="text-muted-foreground">×</span>
        <div className="flex flex-col items-center gap-1">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-sm border-2 text-xs font-bold"
            style={{ borderColor: "#60a5fa", background: "#60a5fa20", color: "#60a5fa" }}
          >
            X Y
          </div>
          <span className="text-[10px] text-muted-foreground">Normal Father</span>
        </div>
      </div>

      {/* Line */}
      <div className="h-6 w-px" style={{ background: "var(--border)" }} />

      {/* Offspring */}
      <div className="flex flex-wrap gap-4 justify-center">
        {offspring.map((o, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            {o.female ? (
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-[10px] font-bold"
                style={{
                  borderColor: o.affected ? "#ef4444" : "#a78bfa",
                  background: o.affected ? "#ef444420" : "#a78bfa15",
                  color: o.affected ? "#ef4444" : "#a78bfa",
                }}
              >
                {o.label}
              </div>
            ) : (
              <div
                className="flex h-12 w-12 items-center justify-center rounded-sm border-2 text-[10px] font-bold"
                style={{
                  borderColor: o.affected ? "#ef4444" : "#60a5fa",
                  background: o.affected ? "#ef444430" : "#60a5fa15",
                  color: o.affected ? "#ef4444" : "#60a5fa",
                }}
              >
                {o.label}
              </div>
            )}
            <span
              className="text-[10px] font-semibold"
              style={{ color: o.affected ? "#ef4444" : "var(--muted-foreground)" }}
            >
              {o.desc}
            </span>
            <span className="text-[9px] text-muted-foreground">25% each</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center max-w-xs">
        Circles = females, Squares = males. Red border = affected. Filled circle = carrier.
      </p>
    </div>
  );
}

function PatternSexLinked() {
  return (
    <SectionCard>
      <div className="rounded-2xl border border-border p-6 md:p-8">
        <h2 className="mb-1 text-xl font-black">Pattern 4 — Sex-linked Traits</h2>
        <p className="mb-6 text-sm text-muted-foreground max-w-2xl">
          Genes located on the sex chromosomes (X or Y) show sex-linked inheritance.
          X-linked recessives affect males far more often because males have only one X chromosome —
          there is no second allele to mask the recessive.
        </p>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center gap-3">
            <XYChromosomesSVG />
            <p className="text-xs text-muted-foreground text-center max-w-[170px]">
              X chromosome carries many more genes than the much smaller Y
            </p>
          </div>
          <div className="flex-1">
            <h3 className="mb-4 font-bold">Pedigree: X-linked Recessive (Xᴴ = defective allele)</h3>
            <PedigreeDiagram />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border p-5" style={{ background: "var(--card-lavender)" }}>
          <h4 className="mb-2 font-bold" style={{ color: "#4a2e90" }}>Human Examples</h4>
          <ul className="flex flex-col gap-1.5 text-sm" style={{ color: "var(--card-text)", opacity: 0.8 }}>
            <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Red-green colour blindness:</span> affects ~8% of males, only ~0.5% of females</li>
            <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Haemophilia A:</span> carried through Queen Victoria&apos;s lineage to royal families across Europe</li>
            <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Duchenne muscular dystrophy:</span> X-linked recessive, affects ~1 in 3,500 male births</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border p-5" style={{ background: "var(--card-pink)" }}>
          <h4 className="mb-2 font-bold" style={{ color: "#8a1a50" }}>Key Facts</h4>
          <ul className="flex flex-col gap-1.5 text-sm" style={{ color: "var(--card-text)", opacity: 0.8 }}>
            <li>Males (XY) cannot be carriers — they either have the trait or they don&apos;t</li>
            <li>Carrier females (XᴴX) are usually unaffected but pass the allele to 50% of sons</li>
            <li>Affected fathers cannot pass X-linked traits to sons (sons get Y from father)</li>
          </ul>
        </div>
      </div>

      <DidYouKnow text="Queen Victoria was almost certainly a carrier of haemophilia A. Two of her daughters were carriers, and one of her sons (Leopold) had the disease. The mutation likely arose spontaneously in Victoria herself or one of her parents." />
    </SectionCard>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Pattern 5 — Polygenic Inheritance
───────────────────────────────────────────────────────────────── */

function BellCurveSVG() {
  // Simple bell curve path
  const W = 320;
  const H = 120;
  const cx = W / 2;
  const sd = 45;

  function gauss(x: number) {
    return Math.exp(-0.5 * ((x - cx) / sd) ** 2);
  }

  const points: string[] = [];
  for (let x = 0; x <= W; x += 2) {
    const y = H - 10 - gauss(x) * (H - 20);
    points.push(`${x},${y}`);
  }
  const polyline = points.join(" ");

  return (
    <svg width={W} height={H + 30} viewBox={`0 0 ${W} ${H + 30}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="20%" stopColor="#fbbf24" />
          <stop offset="45%" stopColor="#d97706" />
          <stop offset="65%" stopColor="#92400e" />
          <stop offset="85%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#1c0a00" />
        </linearGradient>
        <clipPath id="bellClip">
          <polyline points={`0,${H} ${polyline} ${W},${H}`} />
        </clipPath>
      </defs>
      {/* Gradient fill under bell curve */}
      <rect x="0" y="0" width={W} height={H} fill="url(#skinGrad)" clipPath="url(#bellClip)" opacity="0.7" />
      {/* Bell curve line */}
      <polyline points={polyline} stroke="#d97706" strokeWidth="2.5" fill="none" />
      {/* Baseline */}
      <line x1="0" y1={H - 10} x2={W} y2={H - 10} stroke="var(--border)" strokeWidth="1" />
      {/* Labels */}
      <text x="10" y={H + 20} fontSize="9" fill="var(--muted-foreground)">Very light</text>
      <text x={W / 2} y={H + 20} textAnchor="middle" fontSize="9" fill="var(--muted-foreground)">Medium</text>
      <text x={W - 10} y={H + 20} textAnchor="end" fontSize="9" fill="var(--muted-foreground)">Very dark</text>
      {/* Axis label */}
      <text x={W / 2} y="12" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--foreground)">Skin Tone Distribution</text>
    </svg>
  );
}

function SkinToneBar() {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Skin tone spectrum (≥6 gene loci)</p>
      <div
        className="h-6 w-full rounded-full"
        style={{
          background:
            "linear-gradient(to right, #fde68a, #fbbf24, #d97706, #92400e, #78350f, #1c0a00)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>AABBCC… (all light)</span>
        <span>aabbcc… (all dark)</span>
      </div>
    </div>
  );
}

function PatternPolygenic() {
  return (
    <SectionCard>
      <div className="rounded-2xl border border-border p-6 md:p-8">
        <h2 className="mb-1 text-xl font-black">Pattern 5 — Polygenic Inheritance</h2>
        <p className="mb-6 text-sm text-muted-foreground max-w-2xl">
          Many genes — each with a small additive effect — together control a single trait.
          This produces a continuous, bell-shaped distribution of phenotypes in a population,
          rather than discrete categories.
        </p>
        <BellCurveSVG />
      </div>

      <div className="rounded-xl border border-border p-5" style={{ background: "var(--card-yellow)" }}>
        <SkinToneBar />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border p-5" style={{ background: "var(--card-yellow)" }}>
          <h4 className="mb-2 font-bold" style={{ color: "#7a5200" }}>Human Examples</h4>
          <ul className="flex flex-col gap-1.5 text-sm" style={{ color: "var(--card-text)", opacity: 0.8 }}>
            <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Skin colour:</span> at least 6 gene loci (MC1R, OCA2, TYRP1, SLC45A2, SLC24A5, HERC2)</li>
            <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Height:</span> influenced by 800+ genes, each contributing tiny fractions</li>
            <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Intelligence:</span> highly polygenic with strong environmental interaction</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border p-5" style={{ background: "var(--card-sky)" }}>
          <h4 className="mb-2 font-bold" style={{ color: "#0a5a7a" }}>Key Facts</h4>
          <ul className="flex flex-col gap-1.5 text-sm" style={{ color: "var(--card-text)", opacity: 0.8 }}>
            <li>Produces continuous phenotypic variation — not discrete categories</li>
            <li>Environment interacts with genetics (GxE) to shift phenotype</li>
            <li>More gene loci → smoother, more normal bell curve</li>
          </ul>
        </div>
      </div>

      <DidYouKnow text="Genome-wide association studies (GWAS) have identified over 12,000 genetic variants that influence human height — yet they collectively explain only about 25% of the heritability. The rest remains in rare variants and complex interactions." />
    </SectionCard>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Pattern 6 — Epistasis
───────────────────────────────────────────────────────────────── */

function LabradorSVG() {
  return (
    <svg width="280" height="120" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="black" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#4b5563" />
          <stop offset="100%" stopColor="#111827" />
        </radialGradient>
        <radialGradient id="choc" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#a16207" />
          <stop offset="100%" stopColor="#78350f" />
        </radialGradient>
        <radialGradient id="yellow" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <filter id="dogShadow">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.25" />
        </filter>
      </defs>
      {/* Black Labrador */}
      <ellipse cx="45" cy="58" rx="35" ry="45" fill="url(#black)" filter="url(#dogShadow)" />
      <text x="45" y="62" textAnchor="middle" fontSize="9" fill="#d1d5db" fontWeight="bold">B_E_</text>
      <text x="45" y="105" textAnchor="middle" fontSize="9" fill="#9ca3af">Black</text>

      <text x="95" y="62" textAnchor="middle" fontSize="20" fill="var(--muted-foreground)">·</text>

      {/* Chocolate Labrador */}
      <ellipse cx="140" cy="58" rx="35" ry="45" fill="url(#choc)" filter="url(#dogShadow)" />
      <text x="140" y="62" textAnchor="middle" fontSize="9" fill="#fde68a" fontWeight="bold">bbE_</text>
      <text x="140" y="105" textAnchor="middle" fontSize="9" fill="#fbbf24">Chocolate</text>

      <text x="190" y="62" textAnchor="middle" fontSize="20" fill="var(--muted-foreground)">·</text>

      {/* Yellow Labrador */}
      <ellipse cx="235" cy="58" rx="35" ry="45" fill="url(#yellow)" filter="url(#dogShadow)" />
      <text x="235" y="62" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="bold">__ee</text>
      <text x="235" y="105" textAnchor="middle" fontSize="9" fill="#d97706">Yellow</text>
    </svg>
  );
}

function EpistasisPunnett() {
  // AaBb × AaBb — standard 4×4 showing coat colour outcomes
  const pa = ["A", "a"] as const;
  const pb = ["B", "b"] as const;
  const gametes: Array<[string, string]> = [];
  for (const a of pa) for (const b of pb) gametes.push([a, b]);

  function phenotype(g1: [string, string], g2: [string, string]): { label: string; color: string } {
    const hasA = g1[0] === "A" || g2[0] === "A";
    const hasB = g1[1] === "B" || g2[1] === "B";
    if (!hasA) return { label: "Yellow", color: "#d97706" };
    if (hasB) return { label: "Black", color: "#374151" };
    return { label: "Choc", color: "#92400e" };
  }

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-xs">
        <thead>
          <tr>
            <td className="w-8 h-8" />
            {gametes.map(([a, b], i) => (
              <th key={i} className="w-16 h-8 text-center font-black" style={{ color: "var(--muted-foreground)" }}>
                {a}{b}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {gametes.map((g1, ri) => (
            <tr key={ri}>
              <th className="w-8 font-black text-center" style={{ color: "var(--muted-foreground)" }}>
                {g1[0]}{g1[1]}
              </th>
              {gametes.map((g2, ci) => {
                const ph = phenotype(g1, g2);
                return (
                  <td
                    key={ci}
                    className="w-16 h-12 text-center rounded border border-border text-[10px] font-semibold"
                    style={{
                      background: `${ph.color}18`,
                      color: ph.color,
                      border: `1px solid ${ph.color}40`,
                    }}
                  >
                    {ph.label}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-[10px] text-muted-foreground">
        AaBb × AaBb yields 9 Black : 3 Chocolate : 4 Yellow (9:3:4 epistatic ratio)
      </p>
    </div>
  );
}

function PatternEpistasis() {
  return (
    <SectionCard>
      <div className="rounded-2xl border border-border p-6 md:p-8">
        <h2 className="mb-1 text-xl font-black">Pattern 6 — Epistasis</h2>
        <p className="mb-6 text-sm text-muted-foreground max-w-2xl">
          One gene masks or modifies the expression of another, non-allelic gene.
          This breaks the expected 9:3:3:1 ratio from a dihybrid cross into a modified ratio.
        </p>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3">
            <LabradorSVG />
            <p className="text-xs text-muted-foreground text-center max-w-xs">
              Gene B: black (B_) or chocolate (bb) pigment. Gene E: whether pigment is deposited at all.
              ee dogs are always yellow regardless of B gene.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold">4×4 Punnett Square — AaBb × AaBb</h3>
            <EpistasisPunnett />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border p-5" style={{ background: "var(--card-teal)" }}>
          <h4 className="mb-2 font-bold" style={{ color: "#0f6070" }}>How It Works</h4>
          <ul className="flex flex-col gap-1.5 text-sm" style={{ color: "var(--card-text)", opacity: 0.8 }}>
            <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Gene B</span> controls whether pigment is black (B) or chocolate (b)</li>
            <li><span className="font-semibold" style={{ color: "var(--card-text)" }}>Gene E</span> controls whether pigment is deposited (E) or absent (e)</li>
            <li>ee is <span className="font-semibold" style={{ color: "#7a5200" }}>epistatic</span> to the B gene — overrides it completely, giving yellow</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border p-5" style={{ background: "var(--card-pink)" }}>
          <h4 className="mb-2 font-bold" style={{ color: "#8a1a50" }}>Modified Dihybrid Ratios</h4>
          <ul className="flex flex-col gap-1.5 text-sm" style={{ color: "var(--card-text)", opacity: 0.8 }}>
            <li>Standard dihybrid: <span className="font-black" style={{ color: "var(--card-text)" }}>9:3:3:1</span></li>
            <li>Recessive epistasis (Labrador): <span className="font-black" style={{ color: "var(--card-text)" }}>9:3:4</span></li>
            <li>Dominant epistasis: <span className="font-black" style={{ color: "var(--card-text)" }}>12:3:1</span></li>
            <li>Duplicate recessive epistasis: <span className="font-black" style={{ color: "var(--card-text)" }}>9:7</span></li>
          </ul>
        </div>
      </div>

      <DidYouKnow text="Two black Labrador parents can produce yellow puppies! If both parents are BbEe (black coat, carriers for both chocolate and no-pigment alleles), there is a 1-in-16 chance of each puppy being yellow (bbee or BBee or Bbee)." />
    </SectionCard>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Page shell
───────────────────────────────────────────────────────────────── */

const PATTERNS = [
  { label: "Mendelian", color: "#0a5a7a" },
  { label: "Incomplete Dom.", color: "#8a1a50" },
  { label: "Codominance", color: "#4a2e90" },
  { label: "Sex-linked", color: "#4a2e90" },
  { label: "Polygenic", color: "#7a5200" },
  { label: "Epistasis", color: "#0f6070" },
] as const;

export default function GeneticConceptsPage() {
  const [active, setActive] = useState(0);

  const sections = [
    <PatternMendelian key="0" />,
    <PatternIncompleteDominance key="1" />,
    <PatternCodominance key="2" />,
    <PatternSexLinked key="3" />,
    <PatternPolygenic key="4" />,
    <PatternEpistasis key="5" />,
  ];

  return (
    <main className="flex-1 px-4 pb-28 pt-6 md:px-8 md:pb-10">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Genetics Education
        </div>
        <h1 className="text-3xl font-black tracking-tight md:text-4xl">Genetic Concepts</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Explore all major inheritance patterns — from classical Mendelian ratios to complex epistatic
          interactions — with interactive diagrams and real human examples.
        </p>
      </motion.header>

      {/* Pattern tab bar */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {PATTERNS.map(({ label, color }, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all"
            style={{
              borderColor: active === i ? color : "var(--border)",
              background: active === i ? `${color}18` : "transparent",
              color: active === i ? color : "var(--muted-foreground)",
            }}
          >
            <span className="mr-1.5 font-black">{i + 1}.</span>
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.22 }}
        >
          {sections[active]}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
