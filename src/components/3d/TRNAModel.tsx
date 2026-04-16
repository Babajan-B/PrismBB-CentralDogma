"use client";

interface TRNAModelProps {
  size?: number;
}

/**
 * Schematic tRNA cloverleaf: acceptor stem (top, CCA-3'), D-loop (left),
 * anticodon loop (bottom), TΨC-loop (right), variable arm.
 */
export function TRNAModel({ size = 280 }: TRNAModelProps) {
  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      className="drop-shadow-[0_10px_24px_rgba(0,0,0,0.4)]"
    >
      <defs>
        <linearGradient id="trna-stem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="trna-anti" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
      </defs>

      {/* Acceptor stem */}
      <g stroke="url(#trna-stem)" strokeWidth="8" strokeLinecap="round" fill="none">
        <line x1="160" y1="30" x2="160" y2="130" />
      </g>
      {/* Base pair rungs in acceptor stem */}
      <g stroke="#9ca3af" strokeWidth="2" opacity="0.6">
        {[45, 65, 85, 105, 125].map((y) => (
          <line key={y} x1="150" y1={y} x2="170" y2={y} />
        ))}
      </g>
      {/* CCA 3' tag */}
      <circle cx="172" cy="36" r="6" fill="#f59e0b" />
      <circle cx="180" cy="24" r="6" fill="#f59e0b" />
      <circle cx="192" cy="14" r="7" fill="#10b981" />
      <text
        x="200"
        y="18"
        className="fill-muted-foreground"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fontWeight={700}
      >
        CCA-3′
      </text>

      {/* Amino acid attached to CCA */}
      <circle
        cx="210"
        cy="8"
        r="10"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="2"
      />

      {/* D-loop (left) */}
      <path
        d="M 160 140 L 90 130 L 50 160 L 70 200 L 120 180 L 160 170 Z"
        fill="none"
        stroke="url(#trna-stem)"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <text
        x="60"
        y="220"
        className="fill-muted-foreground"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight={600}
      >
        D-loop
      </text>

      {/* TΨC loop (right) */}
      <path
        d="M 160 140 L 230 130 L 270 160 L 250 200 L 200 180 L 160 170 Z"
        fill="none"
        stroke="url(#trna-stem)"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <text
        x="240"
        y="220"
        className="fill-muted-foreground"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight={600}
      >
        TΨC-loop
      </text>

      {/* Anticodon stem + loop (bottom) */}
      <line
        x1="160"
        y1="170"
        x2="160"
        y2="240"
        stroke="url(#trna-anti)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <g stroke="#9ca3af" strokeWidth="2" opacity="0.6">
        {[180, 200, 220].map((y) => (
          <line key={y} x1="150" y1={y} x2="170" y2={y} />
        ))}
      </g>
      <circle
        cx="160"
        cy="270"
        r="30"
        fill="none"
        stroke="url(#trna-anti)"
        strokeWidth="7"
      />
      {/* Anticodon bases */}
      {[
        { x: 140, y: 290 },
        { x: 160, y: 300 },
        { x: 180, y: 290 },
      ].map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="7"
          fill="#ec4899"
          stroke="#f472b6"
          strokeWidth="1.5"
        />
      ))}
      <text
        x="160"
        y="318"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fontWeight={700}
      >
        Anticodon
      </text>
    </svg>
  );
}

export const TRNA_LEGEND = [
  { color: "#a78bfa", label: "Backbone stems" },
  { color: "#ec4899", label: "Anticodon" },
  { color: "#fbbf24", label: "Amino acid" },
  { color: "#10b981", label: "CCA-3′" },
];
