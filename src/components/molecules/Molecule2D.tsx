"use client";

/**
 * Simple 2D structural formula diagrams for molecular components.
 * Each returns a clean SVG illustration.
 */

interface Molecule2DProps {
  moleculeId: string;
  className?: string;
  accentColor?: string;
}

/* Color palette */
const C = {
  carbon: "#555",
  nitrogen: "#3b82f6",
  oxygen: "#ef4444",
  phosphorus: "#f59e0b",
  sulfur: "#eab308",
  hydrogen: "#94a3b8",
  bond: "#aaa",
  ring: "#ddd",
  backbone: "#8b5cf6",
};

function PurineSVG({ color = C.nitrogen }: { color?: string }) {
  return (
    <svg viewBox="0 0 120 100" className="h-full w-full">
      {/* Double fused ring */}
      <polygon
        points="20,65 20,35 45,20 70,35 70,65 45,80"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
      />
      <polygon
        points="70,35 95,25 110,45 95,65 70,65"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
      />
      {/* N atoms */}
      {[
        [20, 50],
        [45, 20],
        [70, 50],
        [95, 25],
        [95, 65],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={color} />
      ))}
      {/* Label */}
      <text x="60" y="96" textAnchor="middle" fontSize="9" fill="#888" fontWeight="600">
        Purine
      </text>
    </svg>
  );
}

function PyrimidineSVG({ color = C.nitrogen }: { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <polygon
        points="25,70 25,30 50,15 75,30 75,70 50,85"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
      />
      {/* N atoms */}
      {[
        [25, 50],
        [50, 15],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={color} />
      ))}
      {/* O atom */}
      <circle cx="75" cy="50" r="4" fill={C.oxygen} />
      <text x="50" y="96" textAnchor="middle" fontSize="9" fill="#888" fontWeight="600">
        Pyrimidine
      </text>
    </svg>
  );
}

function SugarBackboneSVG() {
  return (
    <svg viewBox="0 0 120 100" className="h-full w-full">
      {/* Pentagon (furanose ring) */}
      <polygon
        points="35,60 45,30 75,30 85,60 60,75"
        fill="none"
        stroke={C.carbon}
        strokeWidth="2"
      />
      {/* Atoms at vertices */}
      {[
        [35, 60, C.carbon],
        [45, 30, C.carbon],
        [75, 30, C.carbon],
        [85, 60, C.carbon],
        [60, 75, C.oxygen],
      ].map(([x, y, c], i) => (
        <circle key={i} cx={x as number} cy={y as number} r="4" fill={c as string} />
      ))}
      {/* OH groups */}
      <line x1="35" y1="60" x2="18" y2="70" stroke={C.bond} strokeWidth="1.5" />
      <circle cx="15" cy="72" r="3.5" fill={C.oxygen} />
      <line x1="85" y1="60" x2="102" y2="70" stroke={C.bond} strokeWidth="1.5" />
      <circle cx="105" cy="72" r="3.5" fill={C.oxygen} />
      {/* 5' phosphate link */}
      <line x1="45" y1="30" x2="30" y2="12" stroke={C.bond} strokeWidth="1.5" />
      <circle cx="27" cy="10" r="4" fill={C.phosphorus} />
      <text x="60" y="96" textAnchor="middle" fontSize="8" fill="#888" fontWeight="600">
        Deoxyribose
      </text>
    </svg>
  );
}

function PhosphateSVG() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {/* Central P */}
      <circle cx="50" cy="50" r="10" fill={C.phosphorus} />
      <text x="50" y="54" textAnchor="middle" fontSize="10" fill="white" fontWeight="700">
        P
      </text>
      {/* 4 oxygens */}
      {[
        [50, 18],
        [82, 50],
        [50, 82],
        [18, 50],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1="50" y1="50" x2={x} y2={y} stroke={C.bond} strokeWidth="2" />
          <circle cx={x} cy={y} r="7" fill={C.oxygen} />
          <text x={x} y={(y as number) + 4} textAnchor="middle" fontSize="8" fill="white" fontWeight="600">
            O
          </text>
        </g>
      ))}
      <text x="50" y="97" textAnchor="middle" fontSize="8" fill="#888" fontWeight="600">
        Phosphate
      </text>
    </svg>
  );
}

function BasePairSVG() {
  return (
    <svg viewBox="0 0 140 90" className="h-full w-full">
      {/* Base A (left) */}
      <rect x="10" y="25" width="35" height="35" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="27" y="48" textAnchor="middle" fontSize="16" fontWeight="800" fill="#3b82f6">A</text>
      {/* H-bonds */}
      <line x1="48" y1="38" x2="92" y2="38" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="48" y1="48" x2="92" y2="48" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" />
      {/* Base T (right) */}
      <rect x="95" y="25" width="35" height="35" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="112" y="48" textAnchor="middle" fontSize="16" fontWeight="800" fill="#ef4444">T</text>
      <text x="70" y="80" textAnchor="middle" fontSize="8" fill="#888" fontWeight="600">
        A=T (2 H-bonds)
      </text>
    </svg>
  );
}

function HelixSVG() {
  return (
    <svg viewBox="0 0 100 120" className="h-full w-full">
      {/* Strand 1 */}
      <path
        d="M25,10 C65,25 35,45 75,60 C35,75 65,95 25,110"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Strand 2 */}
      <path
        d="M75,10 C35,25 65,45 25,60 C65,75 35,95 75,110"
        fill="none"
        stroke="#ef4444"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Rungs */}
      {[25, 43, 60, 78, 95].map((y, i) => (
        <line
          key={i}
          x1="35"
          y1={y}
          x2="65"
          y2={y}
          stroke="#d1d5db"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

function AminoAcidSVG({ color = C.backbone }: { color?: string }) {
  return (
    <svg viewBox="0 0 120 100" className="h-full w-full">
      {/* Central Cα */}
      <circle cx="60" cy="50" r="8" fill={C.carbon} />
      <text x="60" y="54" textAnchor="middle" fontSize="8" fill="white" fontWeight="700">Cα</text>
      {/* NH₂ */}
      <line x1="52" y1="45" x2="25" y2="28" stroke={C.bond} strokeWidth="2" />
      <circle cx="22" cy="25" r="7" fill={C.nitrogen} />
      <text x="22" y="29" textAnchor="middle" fontSize="7" fill="white" fontWeight="600">N</text>
      {/* COOH */}
      <line x1="68" y1="45" x2="95" y2="28" stroke={C.bond} strokeWidth="2" />
      <circle cx="98" cy="25" r="7" fill={C.oxygen} />
      <text x="98" y="29" textAnchor="middle" fontSize="7" fill="white" fontWeight="600">O</text>
      {/* R group */}
      <line x1="60" y1="58" x2="60" y2="82" stroke={C.bond} strokeWidth="2" />
      <circle cx="60" cy="86" r="9" fill={color} opacity="0.8" />
      <text x="60" y="90" textAnchor="middle" fontSize="8" fill="white" fontWeight="700">R</text>
      {/* H */}
      <line x1="60" y1="42" x2="60" y2="22" stroke={C.bond} strokeWidth="1.5" />
      <circle cx="60" cy="18" r="4" fill={C.hydrogen} />
    </svg>
  );
}

function MrnaSVG() {
  return (
    <svg viewBox="0 0 140 80" className="h-full w-full">
      {/* Strand */}
      <path
        d="M10,40 Q30,20 50,40 Q70,60 90,40 Q110,20 130,40"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* 5' cap */}
      <circle cx="10" cy="40" r="5" fill="#f59e0b" />
      <text x="10" y="55" textAnchor="middle" fontSize="7" fill="#888" fontWeight="600">5&apos;</text>
      {/* Poly-A */}
      <circle cx="130" cy="40" r="4" fill="#ef4444" />
      <text x="130" y="55" textAnchor="middle" fontSize="7" fill="#888" fontWeight="600">3&apos;</text>
      {/* Codons */}
      {[35, 55, 75, 95, 115].map((x, i) => (
        <rect key={i} x={x - 6} y="28" width="12" height="6" rx="1" fill="#10b981" opacity="0.3" />
      ))}
      <text x="70" y="75" textAnchor="middle" fontSize="8" fill="#888" fontWeight="600">mRNA</text>
    </svg>
  );
}

function TrnaSVG() {
  return (
    <svg viewBox="0 0 100 110" className="h-full w-full">
      {/* Cloverleaf shape */}
      <path
        d="M50,95 L50,60 C35,55 25,40 35,30 C25,20 30,5 50,8 C70,5 75,20 65,30 C75,40 65,55 50,60"
        fill="none"
        stroke={C.backbone}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Anticodon loop (bottom) */}
      <circle cx="50" cy="95" r="4" fill={C.nitrogen} />
      {/* Amino acid attachment (top) */}
      <circle cx="50" cy="5" r="5" fill="#10b981" />
      <text x="50" y="9" textAnchor="middle" fontSize="6" fill="white" fontWeight="700">AA</text>
      <text x="50" y="108" textAnchor="middle" fontSize="7" fill="#888" fontWeight="600">
        tRNA
      </text>
    </svg>
  );
}

function GenericMoleculeSVG({ color = "#8b5cf6" }: { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {/* Generic molecular structure */}
      <circle cx="50" cy="50" r="12" fill={color} opacity="0.15" stroke={color} strokeWidth="2" />
      <circle cx="50" cy="50" r="5" fill={color} />
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * 30;
        const y = 50 + Math.sin(rad) * 30;
        return (
          <g key={i}>
            <line x1="50" y1="50" x2={x} y2={y} stroke={color} strokeWidth="1.5" opacity="0.5" />
            <circle cx={x} cy={y} r="4" fill={color} opacity="0.6" />
          </g>
        );
      })}
    </svg>
  );
}

/* Map molecule IDs to their 2D diagrams */
const DIAGRAM_MAP: Record<string, (color: string) => React.ReactNode> = {
  // DNA
  "dna-nucleotide": () => <SugarBackboneSVG />,
  "dna-deoxyribose": () => <SugarBackboneSVG />,
  "dna-phosphate": () => <PhosphateSVG />,
  "dna-base": (c) => <PurineSVG color={c} />,
  "dna-basepair": () => <BasePairSVG />,
  "dna-strand": () => <HelixSVG />,
  "dna-helix": () => <HelixSVG />,
  "dna-coding": () => <MrnaSVG />,
  "dna-template": () => <MrnaSVG />,
  "dna-gene": () => <HelixSVG />,
  "dna-promoter": (c) => <GenericMoleculeSVG color={c} />,
  "dna-exon": (c) => <GenericMoleculeSVG color={c} />,
  "dna-intron": (c) => <GenericMoleculeSVG color={c} />,
  "dna-utr": (c) => <GenericMoleculeSVG color={c} />,
  // RNA
  "rna-nucleotide": () => <SugarBackboneSVG />,
  "rna-ribose": () => <SugarBackboneSVG />,
  "rna-uracil": (c) => <PyrimidineSVG color={c} />,
  "rna-mrna": () => <MrnaSVG />,
  "rna-premrna": () => <MrnaSVG />,
  "rna-trna": () => <TrnaSVG />,
  "rna-rrna": (c) => <GenericMoleculeSVG color={c} />,
  "rna-codon": () => <MrnaSVG />,
  "rna-anticodon": () => <TrnaSVG />,
  "rna-5cap": (c) => <GenericMoleculeSVG color={c} />,
  "rna-polya": () => <MrnaSVG />,
  "rna-startcodon": () => <MrnaSVG />,
  "rna-stopcodon": () => <MrnaSVG />,
  "rna-readingframe": () => <MrnaSVG />,
};

/** Pick which 3D scene type to use for a given molecule */
export function get3DType(
  id: string,
): { type: "base" | "sugar" | "aminoAcid" | "helix"; base?: string; color?: string } | null {
  // All amino acids
  if (id.startsWith("prot-aa-")) return { type: "aminoAcid", color: "#8b5cf6" };
  // All protein structural components
  if (id.startsWith("prot-")) return { type: "aminoAcid", color: "#a78bfa" };

  switch (id) {
    // DNA bases & base-related
    case "dna-base":
      return { type: "base", base: "A", color: "#ef4444" };
    case "dna-basepair":
      return { type: "base", base: "G", color: "#10b981" };

    // DNA sugars & backbone
    case "dna-deoxyribose":
    case "dna-phosphate":
    case "dna-nucleotide":
      return { type: "sugar", color: "#f59e0b" };

    // DNA helix-like structures
    case "dna-helix":
    case "dna-strand":
    case "dna-gene":
    case "dna-coding":
    case "dna-template":
      return { type: "helix" };

    // DNA regulatory regions
    case "dna-promoter":
      return { type: "base", base: "T", color: "#f59e0b" };
    case "dna-exon":
      return { type: "helix", color: "#3b82f6" };
    case "dna-intron":
      return { type: "helix", color: "#94a3b8" };
    case "dna-utr":
      return { type: "base", base: "C", color: "#8b5cf6" };

    // RNA bases & backbone
    case "rna-uracil":
      return { type: "base", base: "U", color: "#3b82f6" };
    case "rna-ribose":
    case "rna-nucleotide":
      return { type: "sugar", color: "#f59e0b" };

    // RNA types
    case "rna-mrna":
    case "rna-premrna":
    case "rna-readingframe":
      return { type: "helix", color: "#10b981" };
    case "rna-trna":
    case "rna-anticodon":
      return { type: "aminoAcid", color: "#8b5cf6" };
    case "rna-rrna":
      return { type: "aminoAcid", color: "#3b82f6" };

    // RNA codons & signals
    case "rna-codon":
    case "rna-startcodon":
    case "rna-stopcodon":
      return { type: "base", base: "A", color: "#10b981" };
    case "rna-5cap":
      return { type: "sugar", color: "#f59e0b" };
    case "rna-polya":
      return { type: "sugar", color: "#ef4444" };

    default:
      return null;
  }
}

export function Molecule2D({ moleculeId, className = "", accentColor = "#8b5cf6" }: Molecule2DProps) {
  // Check for amino acid
  if (moleculeId.startsWith("prot-aa-")) {
    return (
      <div className={className}>
        <AminoAcidSVG color={accentColor} />
      </div>
    );
  }

  // Check for protein structural components
  if (moleculeId.startsWith("prot-")) {
    return (
      <div className={className}>
        <GenericMoleculeSVG color={accentColor} />
      </div>
    );
  }

  const diagramFn = DIAGRAM_MAP[moleculeId];
  if (!diagramFn) {
    return (
      <div className={className}>
        <GenericMoleculeSVG color={accentColor} />
      </div>
    );
  }

  return <div className={className}>{diagramFn(accentColor)}</div>;
}
