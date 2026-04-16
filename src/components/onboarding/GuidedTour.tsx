"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

export interface TourStep {
  selector: string;
  title: string;
  body: string;
  placement?: "top" | "bottom" | "left" | "right";
}

interface GuidedTourProps {
  id: string;
  steps: TourStep[];
  active: boolean;
  onClose: () => void;
  onComplete: (id: string) => void;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function GuidedTour({
  id,
  steps,
  active,
  onClose,
  onComplete,
}: GuidedTourProps) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);

  const step = steps[index];

  useEffect(() => {
    if (!active) {
      setIndex(0);
      return;
    }
    const measure = () => {
      if (!step) return;
      const el = document.querySelector<HTMLElement>(step.selector);
      if (!el) {
        setRect(null);
        return;
      }
      const r = el.getBoundingClientRect();
      setRect({ x: r.left, y: r.top, w: r.width, h: r.height });
      el.scrollIntoView({ block: "center", behavior: "smooth" });
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [active, step]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") advance();
      else if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, index]);

  const advance = () => {
    if (index >= steps.length - 1) {
      onComplete(id);
      onClose();
    } else {
      setIndex(index + 1);
    }
  };

  const placement = step?.placement ?? "bottom";

  const tooltipStyle = rect
    ? computeTooltipPosition(rect, placement)
    : { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  return (
    <AnimatePresence>
      {active && step && (
        <>
          {/* Backdrop with a hole around the target */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed inset-0 z-[70]"
          >
            <svg className="h-full w-full" aria-hidden="true">
              <defs>
                <mask id={`tour-mask-${id}`}>
                  <rect width="100%" height="100%" fill="white" />
                  {rect && (
                    <rect
                      x={rect.x - 8}
                      y={rect.y - 8}
                      width={rect.w + 16}
                      height={rect.h + 16}
                      rx={12}
                      fill="black"
                    />
                  )}
                </mask>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="rgb(0 0 0 / 0.55)"
                mask={`url(#tour-mask-${id})`}
              />
            </svg>
            {rect && (
              <motion.div
                layoutId={`tour-ring-${id}`}
                style={{
                  position: "absolute",
                  left: rect.x - 8,
                  top: rect.y - 8,
                  width: rect.w + 16,
                  height: rect.h + 16,
                }}
                className="pointer-events-none rounded-xl ring-2 ring-accent"
              />
            )}
          </motion.div>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            style={tooltipStyle}
            className="fixed z-[80] w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
          >
            <div className="flex items-start justify-between gap-2 px-4 pt-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                  Step {index + 1} of {steps.length}
                </div>
                <h3 className="mt-1 text-sm font-bold">{step.title}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close tour"
              >
                <X size={14} />
              </button>
            </div>
            <p className="px-4 pb-3 pt-2 text-xs leading-relaxed text-muted-foreground">
              {step.body}
            </p>
            <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-2">
              <button
                type="button"
                onClick={() => setIndex(Math.max(0, index - 1))}
                disabled={index === 0}
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
              >
                <ChevronLeft size={12} />
                Back
              </button>
              <div className="flex gap-1">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      i === index ? "bg-accent" : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={advance}
                className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background"
              >
                {index === steps.length - 1 ? "Finish" : "Next"}
                <ChevronRight size={12} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function computeTooltipPosition(
  rect: Rect,
  placement: "top" | "bottom" | "left" | "right",
): React.CSSProperties {
  const margin = 14;
  switch (placement) {
    case "top":
      return {
        position: "fixed",
        left: Math.max(16, rect.x + rect.w / 2),
        top: Math.max(16, rect.y - margin),
        transform: "translate(-50%, -100%)",
      };
    case "left":
      return {
        position: "fixed",
        left: Math.max(16, rect.x - margin),
        top: rect.y + rect.h / 2,
        transform: "translate(-100%, -50%)",
      };
    case "right":
      return {
        position: "fixed",
        left: rect.x + rect.w + margin,
        top: rect.y + rect.h / 2,
        transform: "translate(0, -50%)",
      };
    case "bottom":
    default:
      return {
        position: "fixed",
        left: rect.x + rect.w / 2,
        top: rect.y + rect.h + margin,
        transform: "translate(-50%, 0)",
      };
  }
}
