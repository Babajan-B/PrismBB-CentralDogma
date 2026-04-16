"use client";

interface RibosomeModelProps {
  size?: number;
}

/**
 * Schematic ribosome with large (60S) + small (40S) subunits,
 * mRNA running through, and A/P/E tRNA sites.
 */
export function RibosomeModel({ size = 300 }: RibosomeModelProps) {
  return (
    <svg
      viewBox="0 0 340 280"
      width={size}
      height={size * 0.82}
      className="drop-shadow-[0_10px_24px_rgba(0,0,0,0.4)]"
    >
      <defs>
        <radialGradient id="ribo-large" cx="0.4" cy="0.3">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="60%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#6b21a8" />
        </radialGradient>
        <radialGradient id="ribo-small" cx="0.4" cy="0.3">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="60%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
      </defs>

      {/* Large subunit (60S) */}
      <ellipse
        cx="170"
        cy="90"
        rx="150"
        ry="75"
        fill="url(#ribo-large)"
        stroke="#7c3aed"
        strokeWidth="2"
        opacity="0.95"
      />
      <text
        x="170"
        y="65"
        textAnchor="middle"
        className="fill-white/80"
        fontFamily="var(--font-sans)"
        fontSize="11"
        fontWeight={700}
      >
        60S (Large)
      </text>

      {/* Small subunit (40S) */}
      <ellipse
        cx="170"
        cy="180"
        rx="130"
        ry="55"
        fill="url(#ribo-small)"
        stroke="#2563eb"
        strokeWidth="2"
        opacity="0.95"
      />
      <text
        x="170"
        y="195"
        textAnchor="middle"
        className="fill-white/80"
        fontFamily="var(--font-sans)"
        fontSize="11"
        fontWeight={700}
      >
        40S (Small)
      </text>

      {/* mRNA through the small subunit */}
      <path
        d="M 20 210 Q 170 230 320 210"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="4"
        strokeDasharray="0"
      />
      {/* Codon triplets on mRNA */}
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 35 + i * 34;
        const y = 211 + Math.sin(i * 0.4) * 4;
        const colors = ["#ef4444", "#3b82f6", "#10b981"];
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="4"
            fill={colors[i % 3]}
            stroke="white"
            strokeWidth="1"
          />
        );
      })}
      <text
        x="30"
        y="252"
        className="fill-muted-foreground"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fontWeight={700}
      >
        5′ mRNA
      </text>
      <text
        x="310"
        y="252"
        textAnchor="end"
        className="fill-muted-foreground"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fontWeight={700}
      >
        3′
      </text>

      {/* A/P/E sites */}
      <g>
        {[
          { x: 110, label: "E", color: "#64748b" },
          { x: 170, label: "P", color: "#059669" },
          { x: 230, label: "A", color: "#dc2626" },
        ].map((site) => (
          <g key={site.label}>
            <rect
              x={site.x - 22}
              y={115}
              width={44}
              height={40}
              rx={10}
              fill={site.color}
              opacity="0.25"
              stroke={site.color}
              strokeWidth="1.5"
            />
            <text
              x={site.x}
              y={140}
              textAnchor="middle"
              className="fill-white"
              fontFamily="var(--font-mono)"
              fontWeight={800}
              fontSize="14"
            >
              {site.label}
            </text>
          </g>
        ))}
      </g>

      {/* Growing polypeptide exiting large subunit */}
      <path
        d="M 170 20 L 155 5"
        stroke="#9ca3af"
        strokeWidth="2"
        strokeDasharray="3 3"
      />
      {[
        { x: 170, y: 22, c: "#3b82f6" },
        { x: 162, y: 12, c: "#10b981" },
        { x: 150, y: 4, c: "#f59e0b" },
      ].map((b, i) => (
        <circle
          key={i}
          cx={b.x}
          cy={b.y}
          r="6"
          fill={b.c}
          stroke="white"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

export const RIBOSOME_LEGEND = [
  { color: "#9333ea", label: "60S · Large subunit" },
  { color: "#2563eb", label: "40S · Small subunit" },
  { color: "#f59e0b", label: "mRNA" },
  { color: "#dc2626", label: "A · Aminoacyl site" },
  { color: "#059669", label: "P · Peptidyl site" },
  { color: "#64748b", label: "E · Exit site" },
];
