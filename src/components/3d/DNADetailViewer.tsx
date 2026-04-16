"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export type DNAComponentId =
  | "overview"
  | "nitrogen"
  | "sugar"
  | "phosphate"
  | "hydrogen"
  | "inheritance"
  | "photo51"
  | "watson";

interface DNADetailViewerProps {
  isOpen: boolean;
  initialTab?: DNAComponentId;
  onClose: () => void;
}

const TABS: { id: DNAComponentId; label: string; color: string; group: "structure" | "history" }[] = [
  { id: "overview",    label: "Nucleotide",       color: "#a78bfa", group: "structure" },
  { id: "nitrogen",    label: "Nitrogen Bases",   color: "#3b82f6", group: "structure" },
  { id: "sugar",       label: "Ribose Sugar",     color: "#d946ef", group: "structure" },
  { id: "phosphate",   label: "Phosphate Group",  color: "#f59e0b", group: "structure" },
  { id: "hydrogen",    label: "Hydrogen Bonds",   color: "#10b981", group: "structure" },
  { id: "inheritance", label: "Inheritance",      color: "#06b6d4", group: "history"   },
  { id: "photo51",     label: "Photo 51",         color: "#ec4899", group: "history"   },
  { id: "watson",      label: "Watson & Crick",   color: "#f97316", group: "history"   },
];

/* ═══════════════════════════════════════════════════════════════════
   SVG DIAGRAMS
═══════════════════════════════════════════════════════════════════ */

function NucleotideOverviewSVG() {
  return (
    <svg viewBox="0 0 440 220" className="w-full max-w-sm">
      <circle cx={70} cy={110} r={36} fill="#f59e0b22" stroke="#f59e0b" strokeWidth={2} />
      <text x={70} y={104} textAnchor="middle" fill="#f59e0b" fontSize={13} fontWeight="bold">PO₄</text>
      <text x={70} y={120} textAnchor="middle" fill="#f59e0b" fontSize={10}>Phosphate</text>
      <line x1={106} y1={110} x2={150} y2={110} stroke="#888" strokeWidth={2} strokeDasharray="4 2" />
      <polygon points="195,74 231,101 218,143 172,143 159,101" fill="#d946ef22" stroke="#d946ef" strokeWidth={2} />
      <text x={195} y={114} textAnchor="middle" fill="#d946ef" fontSize={11} fontWeight="bold">C₅H₁₀O₃</text>
      <text x={195} y={128} textAnchor="middle" fill="#d946ef" fontSize={9}>Ribose Sugar</text>
      <line x1={231} y1={110} x2={270} y2={110} stroke="#888" strokeWidth={2} strokeDasharray="4 2" />
      <rect x={270} y={74} width={110} height={72} rx={10} fill="#3b82f622" stroke="#3b82f6" strokeWidth={2} />
      <text x={325} y={107} textAnchor="middle" fill="#3b82f6" fontSize={22} fontWeight="900">A</text>
      <text x={325} y={122} textAnchor="middle" fill="#3b82f6" fontSize={9.5} fontWeight="600">Nitrogen Base</text>
      <text x={325} y={135} textAnchor="middle" fill="#3b82f6" fontSize={8} opacity={0.7}>(Adenine)</text>
      <text x={70}  y={165} textAnchor="middle" fill="#f59e0b" fontSize={9} fontWeight="600">① Phosphate</text>
      <text x={195} y={165} textAnchor="middle" fill="#d946ef" fontSize={9} fontWeight="600">② Deoxyribose</text>
      <text x={325} y={165} textAnchor="middle" fill="#3b82f6" fontSize={9} fontWeight="600">③ Nitrogenous Base</text>
      <line x1={70}  y1={148} x2={70}  y2={157} stroke="#f59e0b" strokeWidth={1.5} />
      <line x1={195} y1={147} x2={195} y2={157} stroke="#d946ef" strokeWidth={1.5} />
      <line x1={325} y1={148} x2={325} y2={157} stroke="#3b82f6" strokeWidth={1.5} />
    </svg>
  );
}

function NitrogenBasesSVG() {
  const bases = [
    { letter: "A", name: "Adenine",  type: "Purine",     color: "#3b82f6", x: 60  },
    { letter: "T", name: "Thymine",  type: "Pyrimidine", color: "#ef4444", x: 180 },
    { letter: "G", name: "Guanine",  type: "Purine",     color: "#10b981", x: 300 },
    { letter: "C", name: "Cytosine", type: "Pyrimidine", color: "#f59e0b", x: 420 },
  ];
  return (
    <svg viewBox="0 0 490 200" className="w-full">
      {bases.map((b) => (
        <g key={b.letter}>
          {b.type === "Purine" ? (
            <>
              <rect x={b.x-46} y={30} width={44} height={90} rx={8} fill={`${b.color}18`} stroke={b.color} strokeWidth={1.5} />
              <rect x={b.x-4}  y={48} width={36} height={54} rx={8} fill={`${b.color}18`} stroke={b.color} strokeWidth={1.5} />
            </>
          ) : (
            <rect x={b.x-38} y={44} width={74} height={62} rx={10} fill={`${b.color}18`} stroke={b.color} strokeWidth={1.5} />
          )}
          <text x={b.x} y={90}  textAnchor="middle" fill={b.color} fontSize={36} fontWeight="900">{b.letter}</text>
          <text x={b.x} y={140} textAnchor="middle" fill={b.color} fontSize={10} fontWeight="700">{b.name}</text>
          <text x={b.x} y={155} textAnchor="middle" fill={b.color} fontSize={8.5} opacity={0.7}>{b.type}</text>
          <text x={b.x} y={172} textAnchor="middle" fill={b.color} fontSize={8} opacity={0.6}>pairs with {b.letter === "A" ? "T · 2 bonds" : b.letter === "T" ? "A · 2 bonds" : b.letter === "G" ? "C · 3 bonds" : "G · 3 bonds"}</text>
        </g>
      ))}
      <line x1={120} y1={76} x2={150} y2={76} stroke="#ccc" strokeWidth={1.5} strokeDasharray="3 2" />
      <text x={135} y={70} textAnchor="middle" fill="#aaa" fontSize={7}>2 H-bonds</text>
      <line x1={360} y1={76} x2={390} y2={76} stroke="#ccc" strokeWidth={1.5} strokeDasharray="3 2" />
      <text x={375} y={70} textAnchor="middle" fill="#aaa" fontSize={7}>3 H-bonds</text>
    </svg>
  );
}

function RiboseSugarSVG() {
  const cx = 200, cy = 100, r = 70;
  const angles = [270, 342, 54, 126, 198];
  const pts = angles.map((a) => ({
    x: cx + r * Math.cos((a * Math.PI) / 180),
    y: cy + r * Math.sin((a * Math.PI) / 180),
  }));
  const labels = ["1'", "2'", "3'", "4'", "5'"];
  const notes  = [
    "→ Base attaches here",
    "→ –H  (no –OH in DNA)",
    "→ 3′-OH linkage",
    "",
    "→ Phosphate attaches",
  ];
  return (
    <svg viewBox="0 0 400 210" className="w-full max-w-xs">
      <polygon points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="#d946ef15" stroke="#d946ef" strokeWidth={2.5} strokeLinejoin="round" />
      <text x={cx} y={cy+5} textAnchor="middle" fill="#d946ef" fontSize={13} fontWeight="700">O</text>
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={14} fill="#d946ef22" stroke="#d946ef" strokeWidth={1.5} />
          <text x={p.x} y={p.y+4.5} textAnchor="middle" fill="#d946ef" fontSize={10} fontWeight="bold">C{labels[i]}</text>
          {notes[i] && (
            <text x={p.x + (p.x > cx ? 20 : -20)} y={p.y - 20} fill="#aaa" fontSize={7.5} textAnchor={p.x > cx ? "start" : "end"}>{notes[i]}</text>
          )}
        </g>
      ))}
      <text x={cx} y={195} textAnchor="middle" fill="#d946ef" fontSize={10} fontWeight="600">2-Deoxyribose (C₅H₁₀O₃)</text>
    </svg>
  );
}

function PhosphateSVG() {
  return (
    <svg viewBox="0 0 440 200" className="w-full">
      <rect x={10}  y={10}  width={70} height={40} rx={8} fill="#88888820" stroke="#888" strokeWidth={1.5} />
      <text x={45} y={36} textAnchor="middle" fill="#ccc" fontSize={11} fontWeight="600">Sugar</text>
      <circle cx={45} cy={100} r={30} fill="#f59e0b22" stroke="#f59e0b" strokeWidth={2.5} />
      <text x={45} y={96}  textAnchor="middle" fill="#f59e0b" fontSize={12} fontWeight="900">P</text>
      <text x={45} y={112} textAnchor="middle" fill="#f59e0b" fontSize={8.5}>PO₄³⁻</text>
      <rect x={10} y={150} width={70} height={40} rx={8} fill="#88888820" stroke="#888" strokeWidth={1.5} />
      <text x={45} y={176} textAnchor="middle" fill="#ccc" fontSize={11} fontWeight="600">Sugar</text>
      <line x1={45} y1={50}  x2={45} y2={70}  stroke="#f59e0b" strokeWidth={2} />
      <line x1={45} y1={130} x2={45} y2={150} stroke="#f59e0b" strokeWidth={2} />
      <text x={80} y={56}  fill="#aaa" fontSize={9} fontWeight="600">5′ end</text>
      <text x={80} y={154} fill="#aaa" fontSize={9} fontWeight="600">3′ end</text>
      <line x1={90} y1={55} x2={90} y2={155} stroke="#f59e0b" strokeWidth={1.5} markerEnd="url(#arrP)" />
      <text x={96} y={110} fill="#f59e0b" fontSize={8}>5′→3′</text>
      <rect x={160} y={20}  width={265} height={48} rx={8} fill="#f59e0b10" stroke="#f59e0b40" strokeWidth={1} />
      <text x={175} y={40}  fill="#f59e0b" fontSize={10} fontWeight="700">Phosphodiester Bond</text>
      <text x={175} y={58}  fill="#aaa" fontSize={8.5}>Covalent — very strong; links C3′ to C5′</text>
      <rect x={160} y={80}  width={265} height={40} rx={8} fill="#f59e0b10" stroke="#f59e0b40" strokeWidth={1} />
      <text x={175} y={98}  fill="#f59e0b" fontSize={10} fontWeight="700">Negative Charge</text>
      <text x={175} y={114} fill="#aaa" fontSize={8.5}>PO₄ is negatively charged at pH 7</text>
      <rect x={160} y={133} width={265} height={40} rx={8} fill="#f59e0b10" stroke="#f59e0b40" strokeWidth={1} />
      <text x={175} y={151} fill="#f59e0b" fontSize={10} fontWeight="700">Backbone = Sugar + Phosphate</text>
      <text x={175} y={167} fill="#aaa" fontSize={8.5}>Repeating units form the DNA rails</text>
      <defs>
        <marker id="arrP" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#f59e0b" />
        </marker>
      </defs>
    </svg>
  );
}

function HydrogenBondsSVG() {
  return (
    <svg viewBox="0 0 480 220" className="w-full">
      <rect x={10}  y={30} width={80} height={80} rx={10} fill="#3b82f622" stroke="#3b82f6" strokeWidth={2} />
      <text x={50}  y={78} textAnchor="middle" fill="#3b82f6" fontSize={36} fontWeight="900">A</text>
      <text x={50}  y={95} textAnchor="middle" fill="#3b82f6" fontSize={8} opacity={0.7}>Adenine</text>
      <line x1={90}  y1={60} x2={150} y2={60} stroke="#10b981" strokeWidth={2} strokeDasharray="5 3" />
      <line x1={90}  y1={80} x2={150} y2={80} stroke="#10b981" strokeWidth={2} strokeDasharray="5 3" />
      <text x={120} y={50} textAnchor="middle" fill="#10b981" fontSize={8} fontWeight="700">2 H-bonds</text>
      <rect x={150} y={30} width={80} height={80} rx={10} fill="#ef444422" stroke="#ef4444" strokeWidth={2} />
      <text x={190} y={78} textAnchor="middle" fill="#ef4444" fontSize={36} fontWeight="900">T</text>
      <text x={190} y={95} textAnchor="middle" fill="#ef4444" fontSize={8} opacity={0.7}>Thymine</text>
      <text x={120} y={130} textAnchor="middle" fill="#aaa" fontSize={9} fontWeight="600">Adenine–Thymine pair</text>
      <text x={120} y={142} textAnchor="middle" fill="#aaa" fontSize={8}>Weaker — easier to separate</text>
      <rect x={260} y={30} width={80} height={80} rx={10} fill="#10b98122" stroke="#10b981" strokeWidth={2} />
      <text x={300} y={78} textAnchor="middle" fill="#10b981" fontSize={36} fontWeight="900">G</text>
      <text x={300} y={95} textAnchor="middle" fill="#10b981" fontSize={8} opacity={0.7}>Guanine</text>
      <line x1={340} y1={55} x2={400} y2={55} stroke="#10b981" strokeWidth={2} strokeDasharray="5 3" />
      <line x1={340} y1={70} x2={400} y2={70} stroke="#10b981" strokeWidth={2} strokeDasharray="5 3" />
      <line x1={340} y1={85} x2={400} y2={85} stroke="#10b981" strokeWidth={2} strokeDasharray="5 3" />
      <text x={370} y={45} textAnchor="middle" fill="#10b981" fontSize={8} fontWeight="700">3 H-bonds</text>
      <rect x={400} y={30} width={70} height={80} rx={10} fill="#f59e0b22" stroke="#f59e0b" strokeWidth={2} />
      <text x={435} y={78} textAnchor="middle" fill="#f59e0b" fontSize={36} fontWeight="900">C</text>
      <text x={435} y={95} textAnchor="middle" fill="#f59e0b" fontSize={8} opacity={0.7}>Cytosine</text>
      <text x={370} y={130} textAnchor="middle" fill="#aaa" fontSize={9} fontWeight="600">Guanine–Cytosine pair</text>
      <text x={370} y={142} textAnchor="middle" fill="#aaa" fontSize={8}>Stronger — higher melting point</text>
      <line x1={235} y1={20} x2={235} y2={160} stroke="#ffffff10" strokeWidth={1} />
      <rect x={10} y={162} width={460} height={45} rx={8} fill="#10b98110" stroke="#10b98130" strokeWidth={1} />
      <text x={240} y={182} textAnchor="middle" fill="#10b981" fontSize={10} fontWeight="700">Chargaff's Rule</text>
      <text x={240} y={198} textAnchor="middle" fill="#aaa" fontSize={8.5}>%A = %T and %G = %C in any double-stranded DNA molecule</text>
    </svg>
  );
}

/* ─── INHERITANCE ──────────────────────────────────────────────── */
function InheritanceSVG() {
  // Parent 1 (Aa) and Parent 2 (Aa) → offspring Punnett square
  return (
    <svg viewBox="0 0 480 260" className="w-full">
      {/* ── Parent boxes ── */}
      {/* Parent 1 */}
      <rect x={30}  y={10} width={110} height={56} rx={10} fill="#06b6d415" stroke="#06b6d4" strokeWidth={2} />
      <text x={85}  y={34} textAnchor="middle" fill="#06b6d4" fontSize={11} fontWeight="700">Parent 1</text>
      <text x={85}  y={54} textAnchor="middle" fill="#06b6d4" fontSize={16} fontWeight="900">Aa</text>

      {/* Parent 2 */}
      <rect x={340} y={10} width={110} height={56} rx={10} fill="#a78bfa15" stroke="#a78bfa" strokeWidth={2} />
      <text x={395} y={34} textAnchor="middle" fill="#a78bfa" fontSize={11} fontWeight="700">Parent 2</text>
      <text x={395} y={54} textAnchor="middle" fill="#a78bfa" fontSize={16} fontWeight="900">Aa</text>

      {/* X cross label */}
      <text x={240} y={44} textAnchor="middle" fill="#888" fontSize={20} fontWeight="900">×</text>

      {/* Arrows down to punnett */}
      <line x1={85}  y1={66} x2={150} y2={115} stroke="#06b6d4" strokeWidth={1.5} markerEnd="url(#arrI)" strokeDasharray="4 2" />
      <line x1={395} y1={66} x2={330} y2={115} stroke="#a78bfa" strokeWidth={1.5} markerEnd="url(#arrI2)" strokeDasharray="4 2" />

      {/* ── Punnett Square ── */}
      {/* Header row */}
      <rect x={150} y={100} width={80} height={40} rx={0} fill="none" stroke="#444" strokeWidth={1} />
      <rect x={230} y={100} width={80} height={40} rx={0} fill="none" stroke="#444" strokeWidth={1} />
      <text x={190} y={126} textAnchor="middle" fill="#06b6d4" fontSize={14} fontWeight="800">A</text>
      <text x={270} y={126} textAnchor="middle" fill="#06b6d4" fontSize={14} fontWeight="800">a</text>

      {/* Header col */}
      <rect x={110} y={140} width={40} height={50} rx={0} fill="none" stroke="#444" strokeWidth={1} />
      <rect x={110} y={190} width={40} height={50} rx={0} fill="none" stroke="#444" strokeWidth={1} />
      <text x={130} y={170} textAnchor="middle" fill="#a78bfa" fontSize={14} fontWeight="800">A</text>
      <text x={130} y={220} textAnchor="middle" fill="#a78bfa" fontSize={14} fontWeight="800">a</text>

      {/* Cells */}
      {[
        { x: 150, y: 140, label: "AA", color: "#10b981", note: "Dominant" },
        { x: 230, y: 140, label: "Aa", color: "#06b6d4", note: "Carrier"  },
        { x: 150, y: 190, label: "Aa", color: "#06b6d4", note: "Carrier"  },
        { x: 230, y: 190, label: "aa", color: "#ef4444", note: "Recessive"},
      ].map((cell) => (
        <g key={`${cell.x}-${cell.y}`}>
          <rect x={cell.x} y={cell.y} width={80} height={50} fill={`${cell.color}18`} stroke={cell.color} strokeWidth={1.5} />
          <text x={cell.x + 40} y={cell.y + 24} textAnchor="middle" fill={cell.color} fontSize={15} fontWeight="900">{cell.label}</text>
          <text x={cell.x + 40} y={cell.y + 40} textAnchor="middle" fill={cell.color} fontSize={7.5} opacity={0.8}>{cell.note}</text>
        </g>
      ))}

      {/* ── Ratio legend ── */}
      <rect x={330} y={130} width={145} height={115} rx={10} fill="#06b6d410" stroke="#06b6d430" strokeWidth={1} />
      <text x={402} y={150} textAnchor="middle" fill="#06b6d4" fontSize={10} fontWeight="700">Offspring Ratio</text>
      {[
        { label: "1 × AA", sub: "25% Dominant", color: "#10b981" },
        { label: "2 × Aa", sub: "50% Carrier",  color: "#06b6d4" },
        { label: "1 × aa", sub: "25% Recessive",color: "#ef4444" },
      ].map((r, i) => (
        <g key={r.label}>
          <circle cx={347} cy={172 + i * 26} r={5} fill={r.color} />
          <text x={358} cy={177 + i * 26} y={177 + i * 26} fill={r.color} fontSize={10} fontWeight="700">{r.label}</text>
          <text x={358} y={189 + i * 26} fill="#aaa" fontSize={8}>{r.sub}</text>
        </g>
      ))}

      {/* bottom label */}
      <text x={240} y={255} textAnchor="middle" fill="#aaa" fontSize={8.5}>Mendelian Inheritance — Punnett Square (Aa × Aa cross)</text>

      <defs>
        <marker id="arrI"  markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#06b6d4" /></marker>
        <marker id="arrI2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a78bfa" /></marker>
      </defs>
    </svg>
  );
}

/* ─── PHOTO 51 ─────────────────────────────────────────────────── */
function Photo51SVG() {
  // Simplified X-ray diffraction pattern — the iconic "X" shape
  const spots: { cx: number; cy: number; r: number; opacity: number }[] = [
    // Central beam block
    { cx: 200, cy: 100, r: 6, opacity: 0.2 },
    // The 4 main X arms
    { cx: 155, cy: 62,  r: 9, opacity: 0.9 },
    { cx: 245, cy: 62,  r: 9, opacity: 0.9 },
    { cx: 155, cy: 138, r: 9, opacity: 0.9 },
    { cx: 245, cy: 138, r: 9, opacity: 0.9 },
    // Inner ring spots
    { cx: 172, cy: 72,  r: 6, opacity: 0.7 },
    { cx: 228, cy: 72,  r: 6, opacity: 0.7 },
    { cx: 172, cy: 128, r: 6, opacity: 0.7 },
    { cx: 228, cy: 128, r: 6, opacity: 0.7 },
    // Middle horizontal layer lines
    { cx: 120, cy: 100, r: 7, opacity: 0.6 },
    { cx: 280, cy: 100, r: 7, opacity: 0.6 },
    { cx: 135, cy: 100, r: 4, opacity: 0.4 },
    { cx: 265, cy: 100, r: 4, opacity: 0.4 },
    // Upper/lower smear
    { cx: 200, cy: 42,  r: 10, opacity: 0.5 },
    { cx: 200, cy: 158, r: 10, opacity: 0.5 },
    { cx: 200, cy: 28,  r: 6,  opacity: 0.3 },
    { cx: 200, cy: 172, r: 6,  opacity: 0.3 },
    // Outer diagonal spots
    { cx: 130, cy: 50,  r: 5, opacity: 0.5 },
    { cx: 270, cy: 50,  r: 5, opacity: 0.5 },
    { cx: 130, cy: 150, r: 5, opacity: 0.5 },
    { cx: 270, cy: 150, r: 5, opacity: 0.5 },
  ];

  return (
    <svg viewBox="0 0 400 240" className="w-full">
      {/* Dark film background */}
      <ellipse cx={200} cy={100} rx={175} ry={90} fill="#0a0a14" stroke="#333" strokeWidth={1.5} />

      {/* Layer lines (horizontal bands — key evidence for helix) */}
      {[-56, -28, 0, 28, 56].map((dy, i) => (
        <line key={i} x1={30} y1={100 + dy} x2={370} y2={100 + dy} stroke="#ffffff08" strokeWidth={1} />
      ))}

      {/* X-pattern spots */}
      {spots.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.opacity} />
      ))}

      {/* X guide lines */}
      <line x1={120} y1={40} x2={280} y2={160} stroke="#ec4899" strokeWidth={1} opacity={0.25} />
      <line x1={280} y1={40} x2={120} y2={160} stroke="#ec4899" strokeWidth={1} opacity={0.25} />

      {/* Labels */}
      <text x={200} y={198} textAnchor="middle" fill="#ec4899" fontSize={11} fontWeight="700">Photo 51 — X-ray Diffraction Pattern</text>
      <text x={200} y={212} textAnchor="middle" fill="#aaa" fontSize={8.5}>Rosalind Franklin, 1952 · King's College London</text>

      {/* Annotation: X = helix */}
      <line x1={275} y1={60} x2={310} y2={40} stroke="#ec4899" strokeWidth={1} opacity={0.6} />
      <text x={313} y={38} fill="#ec4899" fontSize={8}>The "X" = helical</text>
      <text x={313} y={50} fill="#ec4899" fontSize={8}>structure</text>

      {/* Annotation: layer lines = pitch */}
      <line x1={30} y1={100} x2={12} y2={100} stroke="#ec4899" strokeWidth={1} opacity={0.6} />
      <text x={10} y={85}  fill="#ec4899" fontSize={7.5} textAnchor="middle">Layer</text>
      <text x={10} y={97}  fill="#ec4899" fontSize={7.5} textAnchor="middle">lines</text>
      <text x={10} y={109} fill="#ec4899" fontSize={7.5} textAnchor="middle">= pitch</text>
    </svg>
  );
}

/* ─── WATSON & CRICK ───────────────────────────────────────────── */
function WatsonCrickSVG() {
  const events = [
    { year: "1950", text: "Franklin begins X-ray work on DNA at King's College",           color: "#ec4899" },
    { year: "1951", text: "Watson attends Franklin's lecture; notes key measurements",      color: "#f97316" },
    { year: "1952", text: "Franklin produces Photo 51 — the clearest DNA image ever made", color: "#ec4899" },
    { year: "1953", text: "Watson & Crick publish the double helix model in Nature",       color: "#10b981" },
    { year: "1962", text: "Nobel Prize in Physiology awarded to Watson, Crick & Wilkins",  color: "#a78bfa" },
  ];

  return (
    <svg viewBox="0 0 460 230" className="w-full">
      {/* Vertical timeline line */}
      <line x1={70} y1={15} x2={70} y2={215} stroke="#333" strokeWidth={2} />

      {events.map((ev, i) => {
        const y = 20 + i * 42;
        return (
          <g key={ev.year}>
            {/* dot */}
            <circle cx={70} cy={y + 10} r={7} fill={ev.color} />
            {/* year */}
            <text x={55} y={y + 15} textAnchor="end" fill={ev.color} fontSize={11} fontWeight="900">{ev.year}</text>
            {/* event text */}
            <foreignObject x={84} y={y} width={370} height={38}>
              <div
                // @ts-expect-error — SVG foreignObject namespace
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ fontSize: "9px", color: "#bbb", lineHeight: "1.45", fontFamily: "system-ui, sans-serif" }}
              >
                {ev.text}
              </div>
            </foreignObject>
          </g>
        );
      })}

      {/* Double helix mini icon */}
      <g transform="translate(390,20)">
        {[0,1,2,3,4].map((i) => {
          const y = i * 15;
          const lx = 8 + Math.sin(i * 1.4) * 10;
          const rx = 38 - Math.sin(i * 1.4) * 10;
          return (
            <g key={i}>
              <circle cx={lx} cy={y} r={4} fill="#10b981" opacity={0.8} />
              <circle cx={rx} cy={y} r={4} fill="#a78bfa" opacity={0.8} />
              <line x1={lx} y1={y} x2={rx} y2={y} stroke="#555" strokeWidth={1.5} strokeDasharray="3 2" />
            </g>
          );
        })}
        <text x={23} y={90} textAnchor="middle" fill="#f97316" fontSize={8} fontWeight="700">1953 Model</text>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DESCRIPTIONS
═══════════════════════════════════════════════════════════════════ */
const DESCRIPTIONS: Record<DNAComponentId, { title: string; body: string[] }> = {
  overview: {
    title: "What is a Nucleotide?",
    body: [
      "A nucleotide is the basic building block of DNA. Every nucleotide has exactly three parts: a phosphate group, a 5-carbon deoxyribose sugar, and one of four nitrogenous bases (A, T, G, or C).",
      "Thousands of nucleotides link together to form a strand of DNA. Two complementary strands coil around each other to form the famous double helix.",
    ],
  },
  nitrogen: {
    title: "The Four Nitrogen Bases",
    body: [
      "DNA has four nitrogenous bases: Adenine (A), Thymine (T), Guanine (G), and Cytosine (C). These four letters encode all genetic information in every living organism on Earth.",
      "Purines (A & G) have a double-ring structure. Pyrimidines (T & C) have a single ring. Base pairing is always purine ↔ pyrimidine — this keeps the helix width perfectly constant.",
    ],
  },
  sugar: {
    title: "2-Deoxyribose Sugar",
    body: [
      "The sugar in DNA is 2-deoxyribose — a 5-carbon ring. The word 'deoxy' means it is missing an –OH group at carbon 2′ compared to RNA's ribose. This makes DNA chemically more stable.",
      "Carbon 1′ anchors the base; C3′ provides the –OH for the next phosphodiester bond; C5′ holds the phosphate. The numbering goes clockwise around the ring.",
    ],
  },
  phosphate: {
    title: "Phosphate Group (PO₄³⁻)",
    body: [
      "The phosphate group bridges nucleotides through phosphodiester bonds — linking C3′ of one sugar to C5′ of the next. This creates the directional sugar-phosphate backbone running 5′→3′.",
      "Because phosphate carries a negative charge at physiological pH, DNA is an acid (hence deoxyribonucleic acid). The backbone is the structural 'rails' of the DNA ladder.",
    ],
  },
  hydrogen: {
    title: "Hydrogen Bonds — Base Pairing",
    body: [
      "Hydrogen bonds are weak non-covalent attractions that hold the two DNA strands together. A always pairs with T using 2 H-bonds; G always pairs with C using 3 H-bonds.",
      "Because G–C has 3 bonds it takes more energy to separate. This matters in PCR, sequencing, and gene regulation. Chargaff's Rule: in any DNA sample, %A = %T and %G = %C.",
    ],
  },
  inheritance: {
    title: "Inheritance & Mendelian Genetics",
    body: [
      "DNA is the physical carrier of heredity. During reproduction, each parent contributes one copy of each chromosome. The combination determines the offspring's traits.",
      "Gregor Mendel's laws describe how traits are passed. Dominant alleles (A) mask recessive alleles (a). A cross of two carriers (Aa × Aa) produces a 1:2:1 ratio — 25% dominant, 50% carrier, 25% recessive. The Punnett square visualises all possible outcomes.",
    ],
  },
  photo51: {
    title: "Photo 51 — Rosalind Franklin",
    body: [
      "In 1952 at King's College London, chemist Rosalind Franklin used X-ray crystallography to produce Photo 51 — the sharpest diffraction image of DNA ever taken. The iconic 'X' pattern in the centre is the unmistakable signature of a helix. The layer lines reveal the pitch (3.4 nm per turn) and the spacing shows the diameter (2 nm).",
      "Without Franklin's permission, her colleague Maurice Wilkins showed the image to Watson and Crick. Its measurements were the key constraints that let them build the correct double helix model in 1953. Franklin died in 1958; only Watson, Crick, and Wilkins received the 1962 Nobel Prize.",
    ],
  },
  watson: {
    title: "Watson, Crick & the Double Helix",
    body: [
      "In April 1953, James Watson and Francis Crick published a landmark 900-word paper in Nature proposing the double helix model of DNA. Their model correctly placed the sugar-phosphate backbones on the outside, bases on the inside, and explained complementary base pairing.",
      "The model was built on: Franklin's X-ray data (Photo 51), Chargaff's base-ratio rules (A=T, G=C), and Linus Pauling's α-helix protein work. The discovery explained for the first time how DNA can be copied exactly — each strand is a template for the other.",
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */
export function DNADetailViewer({ isOpen, initialTab = "overview", onClose }: DNADetailViewerProps) {
  const [tab, setTab] = useState<DNAComponentId>(initialTab);
  const [prevInit, setPrevInit] = useState(initialTab);
  if (initialTab !== prevInit) { setPrevInit(initialTab); setTab(initialTab); }

  const desc     = DESCRIPTIONS[tab];
  const tabColor = TABS.find((t) => t.id === tab)?.color ?? "#a78bfa";

  const structureTabs = TABS.filter((t) => t.group === "structure");
  const historyTabs   = TABS.filter((t) => t.group === "history");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.60)" }}
        >
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
            style={{ maxHeight: "92vh" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {TABS.find((t) => t.id === tab)?.group === "history" ? "History of DNA" : "DNA Structure"}
                </p>
                <h2 className="text-xl font-black tracking-tight" style={{ color: tabColor }}>
                  {desc.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs — two groups */}
            <div className="border-b border-border bg-muted/30 px-4 py-2">
              <div className="mb-1.5 flex items-center gap-1 overflow-x-auto">
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest text-muted-foreground pr-1">Structure</span>
                {structureTabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className="relative shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors"
                    style={{
                      color:      tab === t.id ? t.color : undefined,
                      background: tab === t.id ? `${t.color}18` : undefined,
                    }}
                  >
                    {tab === t.id && (
                      <motion.span layoutId="tab-ind" className="absolute inset-0 -z-10 rounded-lg" style={{ background: `${t.color}18` }} transition={{ type: "spring", damping: 28, stiffness: 320 }} />
                    )}
                    {t.label}
                  </button>
                ))}
                <span className="mx-1 h-4 w-px shrink-0 bg-border" />
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest text-muted-foreground pr-1">Discovery</span>
                {historyTabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className="relative shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors"
                    style={{
                      color:      tab === t.id ? t.color : undefined,
                      background: tab === t.id ? `${t.color}18` : undefined,
                    }}
                  >
                    {tab === t.id && (
                      <motion.span layoutId="tab-ind" className="absolute inset-0 -z-10 rounded-lg" style={{ background: `${t.color}18` }} transition={{ type: "spring", damping: 28, stiffness: 320 }} />
                    )}
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.16 }}
                  className="flex flex-col gap-6"
                >
                  {/* Diagram */}
                  <div
                    className="flex items-center justify-center rounded-xl p-5"
                    style={{ background: `${tabColor}08`, border: `1px solid ${tabColor}25` }}
                  >
                    {tab === "overview"    && <NucleotideOverviewSVG />}
                    {tab === "nitrogen"    && <NitrogenBasesSVG />}
                    {tab === "sugar"       && <RiboseSugarSVG />}
                    {tab === "phosphate"   && <PhosphateSVG />}
                    {tab === "hydrogen"    && <HydrogenBondsSVG />}
                    {tab === "inheritance" && <InheritanceSVG />}
                    {tab === "photo51"     && <Photo51SVG />}
                    {tab === "watson"      && <WatsonCrickSVG />}
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-3">
                    {desc.body.map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-muted-foreground">{para}</p>
                    ))}
                  </div>

                  {/* Nitrogen base cards */}
                  {tab === "nitrogen" && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        { letter: "A", name: "Adenine",  color: "#3b82f6", type: "Purine"     },
                        { letter: "T", name: "Thymine",  color: "#ef4444", type: "Pyrimidine" },
                        { letter: "G", name: "Guanine",  color: "#10b981", type: "Purine"     },
                        { letter: "C", name: "Cytosine", color: "#f59e0b", type: "Pyrimidine" },
                      ].map((b) => (
                        <div
                          key={b.letter}
                          className="flex flex-col items-center gap-1 rounded-xl border py-4 text-center"
                          style={{ borderColor: `${b.color}40`, background: `${b.color}08` }}
                        >
                          <span className="text-4xl font-black" style={{ color: b.color }}>{b.letter}</span>
                          <span className="text-xs font-semibold" style={{ color: b.color }}>{b.name}</span>
                          <span className="text-[10px] text-muted-foreground">{b.type}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Photo 51 key facts */}
                  {tab === "photo51" && (
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "1952", label: "Year taken",    color: "#ec4899" },
                        { value: "3.4 nm", label: "Pitch / turn", color: "#ec4899" },
                        { value: "2 nm",   label: "Helix width",  color: "#ec4899" },
                      ].map((f) => (
                        <div
                          key={f.label}
                          className="rounded-xl border py-3 text-center"
                          style={{ borderColor: `${f.color}30`, background: `${f.color}08` }}
                        >
                          <div className="text-lg font-black" style={{ color: f.color }}>{f.value}</div>
                          <div className="text-[10px] text-muted-foreground">{f.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Watson & Crick key facts */}
                  {tab === "watson" && (
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "900",   label: "Words in the paper", color: "#f97316" },
                        { value: "April 1953", label: "Nature publication", color: "#f97316" },
                        { value: "1962",  label: "Nobel Prize year",    color: "#f97316" },
                      ].map((f) => (
                        <div
                          key={f.label}
                          className="rounded-xl border py-3 text-center"
                          style={{ borderColor: `${f.color}30`, background: `${f.color}08` }}
                        >
                          <div className="text-lg font-black" style={{ color: f.color }}>{f.value}</div>
                          <div className="text-[10px] text-muted-foreground">{f.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
