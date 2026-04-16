"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  Grid3X3,
  Dna,
  FlaskConical,
  Sparkles,
  Globe,
  ArrowRight,
  X,
} from "lucide-react";
import { DNAHelix } from "@/components/hero/DNAHelix";

const FEATURES = [
  { icon: Grid3X3, title: "64 Codons", body: "Color-coded grid with 4-level detail." },
  { icon: Dna, title: "Molecule Engine", body: "DNA, RNA & protein components." },
  { icon: FlaskConical, title: "Interactive Tools", body: "Transcription, translation, mutation." },
  { icon: Sparkles, title: "3D Models", body: "tRNA, ribosome, amino acids." },
  { icon: Globe, title: "2 Languages", body: "English and Arabic, including RTL layout support." },
];

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

export function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-background/70 backdrop-blur-sm"
            aria-hidden="true"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed left-1/2 top-1/2 z-[90] w-[min(780px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close welcome modal"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr]">
              {/* Left pane — author card */}
              <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden border-b border-border bg-gradient-to-br from-accent/20 via-muted/30 to-background p-8 md:border-b-0 md:border-r">
                <div className="relative">
                  <div className="absolute inset-0 -z-10 rounded-full bg-accent/30 blur-3xl" />
                  <DNAHelix rungs={14} width={200} height={280} speed={11} />
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Welcome to
                  </div>
                  <div className="mt-1 text-3xl font-bold tracking-tight">
                    GeneCode
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Master genetics, visually.
                  </div>
                </div>
              </div>

              {/* Right pane — feature list + CTAs */}
              <div className="flex flex-col p-7">
                <h2
                  id="welcome-title"
                  className="text-xl font-bold tracking-tight"
                >
                  A free, interactive atlas of the central dogma.
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Explore every codon, every amino acid, and every molecule of
                  the genetic code — with 3D models, tools, and worksheets.
                </p>

                <ul className="mt-5 space-y-2.5">
                  {FEATURES.map(({ icon: Icon, title, body }) => (
                    <li key={title} className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                        <Icon size={15} />
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold">{title}</div>
                        <div className="text-xs text-muted-foreground">
                          {body}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-2">
                  <Link
                    href="/table"
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
                  >
                    Start with Codon Grid
                    <ArrowRight size={15} />
                  </Link>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
