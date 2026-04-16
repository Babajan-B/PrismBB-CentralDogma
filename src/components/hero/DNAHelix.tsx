"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface DNAHelixProps {
  rungs?: number;
  width?: number;
  height?: number;
  speed?: number;
  className?: string;
}

const BASE_COLORS = {
  A: "#3b82f6",
  T: "#ef4444",
  G: "#10b981",
  C: "#f59e0b",
} as const;

const PAIRS: Array<[keyof typeof BASE_COLORS, keyof typeof BASE_COLORS]> = [
  ["A", "T"],
  ["T", "A"],
  ["G", "C"],
  ["C", "G"],
];

export function DNAHelix({
  rungs = 24,
  width = 360,
  height = 640,
  speed = 8,
  className = "",
}: DNAHelixProps) {
  const points = useMemo(() => {
    return Array.from({ length: rungs }, (_, i) => {
      const t = i / (rungs - 1);
      const y = t * height;
      const pair = PAIRS[i % PAIRS.length];
      return { t, y, pair, index: i };
    });
  }, [rungs, height]);

  const cx = width / 2;
  const amplitude = width * 0.32;

  return (
    <div
      className={`relative ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="strand-a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="strand-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {points.map(({ t, y, pair, index }) => {
          const delay = (index / rungs) * speed;
          const [leftBase, rightBase] = pair;
          return (
            <g key={index}>
              {/* Rung */}
              <motion.line
                x1={cx}
                x2={cx}
                y1={y}
                y2={y}
                strokeWidth={2}
                strokeLinecap="round"
                stroke="currentColor"
                className="text-muted-foreground/30"
                animate={{
                  x1: [
                    cx + Math.sin(t * Math.PI * 4) * amplitude,
                    cx + Math.sin(t * Math.PI * 4 + Math.PI) * amplitude,
                    cx + Math.sin(t * Math.PI * 4 + Math.PI * 2) * amplitude,
                  ],
                  x2: [
                    cx + Math.sin(t * Math.PI * 4 + Math.PI) * amplitude,
                    cx + Math.sin(t * Math.PI * 4 + Math.PI * 2) * amplitude,
                    cx + Math.sin(t * Math.PI * 4 + Math.PI * 3) * amplitude,
                  ],
                }}
                transition={{
                  duration: speed,
                  repeat: Infinity,
                  ease: "linear",
                  delay: -delay,
                }}
              />

              {/* Left base nucleotide */}
              <motion.circle
                r={7}
                cy={y}
                cx={cx}
                fill={BASE_COLORS[leftBase]}
                filter="url(#glow)"
                animate={{
                  cx: [
                    cx + Math.sin(t * Math.PI * 4) * amplitude,
                    cx + Math.sin(t * Math.PI * 4 + Math.PI) * amplitude,
                    cx + Math.sin(t * Math.PI * 4 + Math.PI * 2) * amplitude,
                  ],
                  scale: [1, 0.6, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: speed,
                  repeat: Infinity,
                  ease: "linear",
                  delay: -delay,
                }}
              />

              {/* Right base nucleotide */}
              <motion.circle
                r={7}
                cy={y}
                cx={cx}
                fill={BASE_COLORS[rightBase]}
                filter="url(#glow)"
                animate={{
                  cx: [
                    cx + Math.sin(t * Math.PI * 4 + Math.PI) * amplitude,
                    cx + Math.sin(t * Math.PI * 4 + Math.PI * 2) * amplitude,
                    cx + Math.sin(t * Math.PI * 4 + Math.PI * 3) * amplitude,
                  ],
                  scale: [0.6, 1, 0.6],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: speed,
                  repeat: Infinity,
                  ease: "linear",
                  delay: -delay,
                }}
              />
            </g>
          );
        })}

        {/* Backbones drawn with curves */}
        <motion.path
          d={buildHelixPath(width, height, rungs, 0, amplitude)}
          fill="none"
          stroke="url(#strand-a)"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.6}
        />
        <motion.path
          d={buildHelixPath(width, height, rungs, Math.PI, amplitude)}
          fill="none"
          stroke="url(#strand-b)"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.6}
        />
      </motion.svg>
    </div>
  );
}

function buildHelixPath(
  width: number,
  height: number,
  rungs: number,
  phase: number,
  amplitude: number
): string {
  const cx = width / 2;
  const samples = rungs * 4;
  return Array.from({ length: samples }, (_, i) => {
    const t = i / (samples - 1);
    const y = t * height;
    const x = cx + Math.sin(t * Math.PI * 4 + phase) * amplitude;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");
}
