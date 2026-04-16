"use client";

import type { AminoAcid } from "@/data/types";

const CATEGORY_COLOR: Record<AminoAcid["category"], string> = {
  nonpolar: "#3b82f6",
  polar: "#10b981",
  basic: "#f59e0b",
  acidic: "#ef4444",
  stop: "#6b7280",
};

const ATOM: Record<string, { fill: string; stroke: string; r: number }> = {
  C: { fill: "#1f2937", stroke: "#4b5563", r: 10 },
  N: { fill: "#2563eb", stroke: "#60a5fa", r: 10 },
  O: { fill: "#dc2626", stroke: "#f87171", r: 10 },
  H: { fill: "#e5e7eb", stroke: "#9ca3af", r: 6 },
  S: { fill: "#d97706", stroke: "#fbbf24", r: 11 },
  R: { fill: "#a78bfa", stroke: "#c4b5fd", r: 14 },
};

interface AminoAcidModelProps {
  aa: AminoAcid;
  size?: number;
}

/**
 * Schematic ball-and-stick representation of a generic amino acid:
 * H₂N — Cα(H) — COOH
 *         |
 *         R (side chain, colored by category)
 */
export function AminoAcidModel({ aa, size = 280 }: AminoAcidModelProps) {
  const color = CATEGORY_COLOR[aa.category];
  const sideChainAtom = { ...ATOM.R, fill: color, stroke: color };

  return (
    <svg
      viewBox="0 0 280 240"
      width={size}
      height={size * 0.86}
      className="drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
    >
      <defs>
        <radialGradient id={`aa-r-${aa.abbr1}`} cx="0.35" cy="0.35">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="40%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* Bonds */}
      <g stroke="#6b7280" strokeWidth="3" strokeLinecap="round">
        <line x1="70" y1="120" x2="140" y2="120" />
        <line x1="140" y1="120" x2="210" y2="120" />
        <line x1="140" y1="120" x2="140" y2="60" />
        <line x1="140" y1="120" x2="140" y2="180" />
      </g>

      {/* N-terminus amino */}
      <Atom x={70} y={120} atom={ATOM.N} label="NH₂" labelYOffset={-18} />

      {/* Alpha carbon */}
      <Atom x={140} y={120} atom={ATOM.C} label="Cα" labelYOffset={-18} />

      {/* Hydrogen on alpha carbon */}
      <Atom x={140} y={180} atom={ATOM.H} label="H" labelYOffset={18} />

      {/* C-terminus carboxyl */}
      <Atom x={210} y={120} atom={ATOM.C} label="C" labelYOffset={-18} />
      {/* COOH double bond O */}
      <g stroke="#6b7280" strokeWidth="3" strokeLinecap="round">
        <line x1="210" y1="120" x2="244" y2="96" />
        <line x1="210" y1="120" x2="244" y2="144" />
      </g>
      <Atom x={244} y={96} atom={ATOM.O} />
      <Atom x={244} y={144} atom={ATOM.O} label="OH" labelYOffset={18} />

      {/* Side chain (R group) */}
      <Atom
        x={140}
        y={60}
        atom={sideChainAtom}
        label="R"
        fillOverride={`url(#aa-r-${aa.abbr1})`}
        labelYOffset={-22}
        big
      />

      {/* AA single-letter code centered on side chain */}
      <text
        x={140}
        y={64}
        textAnchor="middle"
        className="select-none fill-white"
        fontFamily="var(--font-mono), monospace"
        fontWeight={800}
        fontSize={12}
      >
        {aa.abbr1}
      </text>
    </svg>
  );
}

function Atom({
  x,
  y,
  atom,
  label,
  labelYOffset = -16,
  fillOverride,
  big,
}: {
  x: number;
  y: number;
  atom: { fill: string; stroke: string; r: number };
  label?: string;
  labelYOffset?: number;
  fillOverride?: string;
  big?: boolean;
}) {
  const r = big ? atom.r + 2 : atom.r;
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={fillOverride ?? atom.fill}
        stroke={atom.stroke}
        strokeWidth={1.5}
      />
      {label && (
        <text
          x={x}
          y={y + labelYOffset}
          textAnchor="middle"
          className="select-none fill-muted-foreground"
          fontFamily="var(--font-sans), system-ui"
          fontWeight={600}
          fontSize={10}
        >
          {label}
        </text>
      )}
    </g>
  );
}

export const AMINO_ACID_LEGEND = [
  { color: ATOM.N.fill, label: "N · Amino" },
  { color: ATOM.C.fill, label: "C · Carbon" },
  { color: ATOM.O.fill, label: "O · Oxygen" },
  { color: ATOM.H.fill, label: "H · Hydrogen" },
];
