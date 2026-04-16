"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Grid3X3, Dna, FlaskConical } from "lucide-react";
import { DNAHelix } from "./DNAHelix";

const QUICK_LINKS = [
  {
    href: "/table",
    label: "Codon Grid",
    icon: Grid3X3,
    description: "64 codons, 4-level detail",
  },
  {
    href: "/molecules",
    label: "Molecule Engine",
    icon: Dna,
    description: "DNA · RNA · Protein",
  },
  {
    href: "/tools",
    label: "Interactive Tools",
    icon: FlaskConical,
    description: "Transcription · Translation",
  },
] as const;

const STATS = [
  { value: "64", label: "Codons" },
  { value: "20", label: "Amino Acids" },
  { value: "28", label: "Components" },
  { value: "2", label: "Languages" },
];

export function CentralDogmaHero() {
  return (
    <section className="relative hidden md:flex min-h-[calc(100vh-64px)] w-full items-center justify-center overflow-hidden">
      {/* Background — zperiod radial glow pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 18% 20%, rgba(0,154,192,0.14) 0%, transparent 42%),
                         radial-gradient(circle at 82% 18%, rgba(112,204,128,0.10) 0%, transparent 40%),
                         radial-gradient(circle at 50% 80%, rgba(85,104,200,0.08) 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Ambient letter stream (Zperiod pattern) */}
      <LetterStream />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-8 py-16 lg:grid-cols-[1.2fr_1fr]">
        {/* Left: copy */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Interactive · Free · Open Reference
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl"
          >
            Master{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--brand-glow)" }}
            >
              Genetics.
            </span>
            <br />
            Visually &amp; Instantly.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-xl text-lg text-muted-foreground"
          >
            An interactive atlas of the central dogma — from DNA structure
            through RNA transcription to protein translation. Explore 64 codons,
            simulate mutations, and generate printable worksheets in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/table"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              style={{
                background: "var(--brand-glow)",
                boxShadow: "0 4px 20px rgba(0,154,192,0.35)",
                transition: `transform 0.25s var(--ease-spring), box-shadow 0.25s var(--ease-spring)`,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; }}
            >
              Explore Codon Grid
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              style={{
                background: "var(--element-bg)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                backdropFilter: "blur(8px)",
                transition: `background 0.2s var(--ease-spring)`,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--element-hover)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--element-bg)"; }}
            >
              Try Interactive Tools
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 grid max-w-xl grid-cols-4 gap-4 border-t border-border pt-6"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold tracking-tight">
                  {s.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: DNA helix */}
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 rounded-full bg-accent/20 blur-[120px]" />
            <DNAHelix
              rungs={26}
              width={360}
              height={620}
              speed={10}
              className="mx-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Quick links strip — zperiod bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          background: "var(--glass-bg)",
          borderTop: "1px solid var(--border)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-0 divide-x divide-border">
          {QUICK_LINKS.map(({ href, label, icon: Icon, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-4 px-6 py-4"
              style={{ transition: `background 0.2s var(--ease-spring)` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--element-hover)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: "var(--element-bg)", color: "var(--accent)" }}
              >
                <Icon size={18} />
              </span>
              <div className="flex-1">
                <div className="text-sm font-semibold">{label}</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {description}
                </div>
              </div>
              <ArrowRight
                size={16}
                style={{ color: "var(--muted-foreground)", transition: `transform 0.2s var(--ease-spring)` }}
                className="group-hover:translate-x-0.5 group-hover:!text-foreground"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function LetterStream() {
  const letters = "ATGCATGCATGC".split("");
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.07]">
      {Array.from({ length: 12 }).map((_, col) => (
        <motion.div
          key={col}
          className="absolute top-0 flex flex-col gap-2 font-mono text-xl font-bold"
          style={{
            left: `${(col / 12) * 100}%`,
            color: col % 2 === 0 ? "var(--accent)" : "var(--foreground)",
          }}
          animate={{ y: ["-30%", "110%"] }}
          transition={{
            duration: 18 + (col % 4) * 3,
            repeat: Infinity,
            ease: "linear",
            delay: col * 0.8,
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i}>{letters[(col + i) % letters.length]}</span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
