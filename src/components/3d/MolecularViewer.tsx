"use client";

import { motion } from "framer-motion";
import { RotateCw, Pause, Play, Maximize2 } from "lucide-react";
import { useState } from "react";

interface MolecularViewerProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  /** base rotation period in seconds */
  rotationSpeed?: number;
  /** show orbit-like grid behind the model */
  grid?: boolean;
  /** legend rows — { color, label } */
  legend?: Array<{ color: string; label: string }>;
  className?: string;
}

export function MolecularViewer({
  title,
  subtitle,
  children,
  rotationSpeed = 16,
  grid = true,
  legend,
  className = "",
}: MolecularViewerProps) {
  const [playing, setPlaying] = useState(true);
  const [zoom, setZoom] = useState(1);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background via-muted/20 to-background ${className}`}
    >
      {/* Orbit grid + glow */}
      {grid && (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,theme(colors.accent/15),transparent_60%)]" />
        </>
      )}

      {/* Header */}
      {(title || subtitle) && (
        <div className="relative z-10 flex items-start justify-between gap-3 px-4 pt-4">
          <div className="min-w-0">
            {title && (
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {title}
              </h4>
            )}
            {subtitle && (
              <p className="mt-0.5 text-sm font-medium text-foreground">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="rounded-full border border-border bg-background/60 p-1.5 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
              aria-label={playing ? "Pause rotation" : "Play rotation"}
            >
              {playing ? <Pause size={12} /> : <Play size={12} />}
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => (z >= 1.35 ? 0.9 : z + 0.15))}
              className="rounded-full border border-border bg-background/60 p-1.5 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
              aria-label="Zoom"
            >
              <Maximize2 size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Stage */}
      <div
        className="relative flex items-center justify-center"
        style={{ aspectRatio: "4 / 3" }}
      >
        <motion.div
          animate={{
            rotate: playing ? 360 : 0,
            scale: zoom,
          }}
          transition={{
            rotate: {
              duration: rotationSpeed,
              repeat: playing ? Infinity : 0,
              ease: "linear",
            },
            scale: { type: "spring", damping: 22, stiffness: 220 },
          }}
          className="relative flex h-full w-full items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </motion.div>
      </div>

      {/* Legend */}
      {legend && legend.length > 0 && (
        <div className="relative z-10 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-border bg-background/40 px-4 py-2 backdrop-blur-sm">
          {legend.map((l) => (
            <span
              key={l.label}
              className="inline-flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: l.color }}
              />
              {l.label}
            </span>
          ))}
        </div>
      )}

      {/* Rotation indicator */}
      {playing && (
        <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <RotateCw size={10} className="animate-spin [animation-duration:3s]" />
            Auto-rotate
          </span>
        </div>
      )}
    </div>
  );
}
