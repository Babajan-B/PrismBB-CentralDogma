"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Grid3X3,
  Dna,
  FlaskConical,
  Sparkles,
  Languages,
  Zap,
} from "lucide-react";
import { DNAHelix } from "./DNAHelix";

const FEATURES = [
  {
    icon: Grid3X3,
    title: "64-Codon Grid",
    body: "Color-coded by amino acid category with 4-level detail cards for every codon.",
    tint: "bg-blue-500/10 text-blue-400",
  },
  {
    icon: Dna,
    title: "Molecule Engine",
    body: "DNA, RNA, and protein components explained with interactive 3D models.",
    tint: "bg-emerald-500/10 text-emerald-400",
  },
  {
    icon: FlaskConical,
    title: "Virtual Lab",
    body: "Simulate transcription, translation, mutations, and splicing in your browser.",
    tint: "bg-amber-500/10 text-amber-400",
  },
  {
    icon: Sparkles,
    title: "Worksheet Generator",
    body: "Print-ready exercises for classrooms — export to PDF in one click.",
    tint: "bg-fuchsia-500/10 text-fuchsia-400",
  },
  {
    icon: Languages,
    title: "2 Languages",
    body: "English and Arabic, with RTL support for Arabic.",
    tint: "bg-cyan-500/10 text-cyan-400",
  },
  {
    icon: Zap,
    title: "Fast & Free",
    body: "No installs, no accounts. Works instantly in any modern browser.",
    tint: "bg-orange-500/10 text-orange-400",
  },
];

const STATS = [
  { value: "64", label: "Codons" },
  { value: "20", label: "AAs" },
  { value: "28", label: "Molecules" },
  { value: "10", label: "Tools" },
];

export function MobileLanding() {
  return (
    <section className="md:hidden relative w-full overflow-hidden pb-24">
      {/* Hero block */}
      <div className="relative flex flex-col items-center px-6 pt-10 pb-14">
        {/* Background glow — zperiod radial */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, rgba(0,154,192,0.18) 0%, transparent 60%)`,
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Interactive Genetic Code Atlas
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 text-center text-4xl font-bold leading-tight tracking-tight"
        >
          Master{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--brand-glow)" }}>
            Genetics.
          </span>
          <br />
          Visually.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-sm text-center text-[15px] text-muted-foreground"
        >
          From DNA to protein — explore 64 codons, simulate mutations, and
          generate worksheets.
        </motion.p>

        {/* DNA helix preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mt-6"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-accent/25 blur-[80px]" />
          <DNAHelix rungs={18} width={220} height={380} speed={9} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex w-full max-w-sm flex-col gap-3"
        >
          <Link
            href="/table"
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
            style={{ background: "var(--brand-glow)", boxShadow: "0 4px 20px rgba(0,154,192,0.35)" }}
          >
            Explore Codon Grid
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
            style={{ background: "var(--element-bg)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          >
            Try Interactive Tools
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 grid w-full max-w-sm grid-cols-4 divide-x divide-border rounded-2xl border border-border bg-muted/40 py-3 text-center backdrop-blur-sm"
        >
          {STATS.map((s) => (
            <div key={s.label} className="px-2">
              <div className="text-lg font-bold">{s.value}</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Feature showcase */}
      <div className="px-6 pt-2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">What&apos;s inside</h2>
          <Link
            href="/molecules"
            className="text-xs font-medium text-accent"
          >
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="flex items-start gap-3 rounded-2xl p-4"
              style={{ background: "var(--element-bg)", border: "1px solid var(--border)", boxShadow: "var(--shadow-xs)" }}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${f.tint}`}
              >
                <f.icon size={18} />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{f.title}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Closing CTA band */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-6 mt-8 overflow-hidden rounded-3xl p-6"
        style={{
          background: "linear-gradient(135deg, rgba(0,154,192,0.12) 0%, var(--element-bg) 50%, rgba(112,204,128,0.08) 100%)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <h3 className="text-lg font-bold">Built for learners.</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Designed for students, educators, and bioinformaticians who want a
          fast, beautiful reference.
        </p>
        <Link
          href="/settings"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
        >
          Customize your experience
          <ArrowRight size={14} />
        </Link>
      </motion.div>
    </section>
  );
}
