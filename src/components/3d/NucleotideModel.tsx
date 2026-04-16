"use client";

interface NucleotideModelProps {
  base?: "A" | "T" | "U" | "G" | "C";
  type?: "dna" | "rna";
  size?: number;
}

const BASE_COLOR: Record<string, string> = {
  A: "#3b82f6",
  T: "#ef4444",
  U: "#ec4899",
  G: "#10b981",
  C: "#f59e0b",
};

export function NucleotideModel({
  base = "A",
  type = "dna",
  size = 280,
}: NucleotideModelProps) {
  const baseColor = BASE_COLOR[base] ?? "#3b82f6";
  const effectiveBase = type === "rna" && base === "T" ? "U" : base;

  return (
    <svg
      viewBox="0 0 300 260"
      width={size}
      height={size * 0.87}
      className="drop-shadow-[0_10px_24px_rgba(0,0,0,0.4)]"
    >
      <defs>
        <radialGradient id="phos" cx="0.35" cy="0.35">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <radialGradient id="sugar" cx="0.35" cy="0.35">
          <stop offset="0%" stopColor="#e0e7ff" />
          <stop offset="100%" stopColor="#6366f1" />
        </radialGradient>
        <radialGradient id="base" cx="0.35" cy="0.35">
          <stop offset="0%" stopColor="white" stopOpacity="0.55" />
          <stop offset="60%" stopColor={baseColor} />
          <stop offset="100%" stopColor={baseColor} stopOpacity="0.9" />
        </radialGradient>
      </defs>

      {/* Bonds */}
      <g stroke="#6b7280" strokeWidth="3" strokeLinecap="round">
        <line x1="60" y1="130" x2="140" y2="130" />
        <line x1="160" y1="120" x2="210" y2="90" />
        {type === "rna" && (
          <line x1="150" y1="155" x2="150" y2="190" />
        )}
      </g>

      {/* Phosphate */}
      <circle cx="60" cy="130" r="26" fill="url(#phos)" stroke="#d97706" strokeWidth="2" />
      <text
        x="60"
        y="135"
        textAnchor="middle"
        className="fill-white"
        fontFamily="var(--font-mono)"
        fontWeight={800}
        fontSize="14"
      >
        P
      </text>
      <text
        x="60"
        y="170"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight={600}
      >
        Phosphate
      </text>

      {/* Sugar (pentose ring) */}
      <polygon
        points="150,110 180,125 170,155 130,155 120,125"
        fill="url(#sugar)"
        stroke="#4f46e5"
        strokeWidth="2"
      />
      <text
        x="150"
        y="137"
        textAnchor="middle"
        className="fill-white"
        fontFamily="var(--font-mono)"
        fontWeight={800}
        fontSize="11"
      >
        {type === "rna" ? "Ribose" : "2′-deoxy"}
      </text>

      {/* 2'-OH for RNA */}
      {type === "rna" && (
        <>
          <circle cx="150" cy="200" r="10" fill="#ef4444" stroke="#f87171" strokeWidth="2" />
          <text
            x="150"
            y="204"
            textAnchor="middle"
            className="fill-white"
            fontFamily="var(--font-mono)"
            fontWeight={800}
            fontSize="10"
          >
            OH
          </text>
          <text
            x="150"
            y="226"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontFamily="var(--font-sans)"
            fontSize="9"
            fontWeight={600}
          >
            2′-hydroxyl
          </text>
        </>
      )}

      {/* Base */}
      <circle cx="220" cy="80" r="32" fill="url(#base)" stroke={baseColor} strokeWidth="2" />
      <text
        x="220"
        y="86"
        textAnchor="middle"
        className="fill-white"
        fontFamily="var(--font-mono)"
        fontWeight={900}
        fontSize="22"
      >
        {effectiveBase}
      </text>
      <text
        x="220"
        y="130"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight={600}
      >
        Base
      </text>
    </svg>
  );
}

export const NUCLEOTIDE_LEGEND = [
  { color: "#d97706", label: "Phosphate" },
  { color: "#6366f1", label: "Sugar" },
  { color: "#3b82f6", label: "Base" },
];
