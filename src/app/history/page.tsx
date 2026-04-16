"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   PHOTO 51 SVG — Rosalind Franklin's X-ray diffraction pattern
═══════════════════════════════════════════════════════════════ */
function Photo51Demo() {
  const spots = [
    { cx: 155, cy: 62,  r: 10, o: 0.95 },
    { cx: 245, cy: 62,  r: 10, o: 0.95 },
    { cx: 155, cy: 138, r: 10, o: 0.95 },
    { cx: 245, cy: 138, r: 10, o: 0.95 },
    { cx: 172, cy: 72,  r: 6,  o: 0.7  },
    { cx: 228, cy: 72,  r: 6,  o: 0.7  },
    { cx: 172, cy: 128, r: 6,  o: 0.7  },
    { cx: 228, cy: 128, r: 6,  o: 0.7  },
    { cx: 120, cy: 100, r: 8,  o: 0.6  },
    { cx: 280, cy: 100, r: 8,  o: 0.6  },
    { cx: 200, cy: 42,  r: 11, o: 0.55 },
    { cx: 200, cy: 158, r: 11, o: 0.55 },
    { cx: 200, cy: 26,  r: 6,  o: 0.3  },
    { cx: 200, cy: 174, r: 6,  o: 0.3  },
    { cx: 130, cy: 52,  r: 5,  o: 0.5  },
    { cx: 270, cy: 52,  r: 5,  o: 0.5  },
    { cx: 130, cy: 148, r: 5,  o: 0.5  },
    { cx: 270, cy: 148, r: 5,  o: 0.5  },
    { cx: 200, cy: 100, r: 4,  o: 0.15 },
  ];

  return (
    <svg viewBox="0 0 400 260" className="w-full max-w-md">
      {/* Film background */}
      <ellipse cx={200} cy={100} rx={185} ry={96} fill="#06060f" stroke="#2a2a3a" strokeWidth={1.5} />

      {/* Horizontal layer lines */}
      {[-60, -30, 0, 30, 60].map((dy) => (
        <line key={dy} x1={25} y1={100 + dy} x2={375} y2={100 + dy} stroke="#ffffff06" strokeWidth={1} />
      ))}

      {/* X guide lines */}
      <line x1={115} y1={35} x2={285} y2={165} stroke="#ec4899" strokeWidth={1} opacity={0.2} />
      <line x1={285} y1={35} x2={115} y2={165} stroke="#ec4899" strokeWidth={1} opacity={0.2} />

      {/* Diffraction spots */}
      {spots.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.cx} cy={s.cy} r={s.r}
          fill="white"
          initial={{ opacity: 0 }}
          animate={{ opacity: s.o }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
        />
      ))}

      {/* Annotations */}
      <line x1={286} y1={62} x2={320} y2={44} stroke="#ec4899" strokeWidth={1} opacity={0.7} />
      <text x={323} y={43} fill="#ec4899" fontSize={9} fontWeight="700">X = helix</text>

      <line x1={30} y1={100} x2={14} y2={100} stroke="#ec4899" strokeWidth={1} opacity={0.7} />
      <text x={2} y={82}  fill="#ec4899" fontSize={7.5} textAnchor="middle">Layer</text>
      <text x={2} y={93}  fill="#ec4899" fontSize={7.5} textAnchor="middle">lines</text>
      <text x={2} y={104} fill="#ec4899" fontSize={7.5} textAnchor="middle">= pitch</text>

      <line x1={200} y1={200} x2={200} y2={215} stroke="#ec4899" strokeWidth={1} opacity={0.6} />
      <text x={200} y={228} textAnchor="middle" fill="#ec4899" fontSize={11} fontWeight="700">Photo 51 — Rosalind Franklin, 1952</text>
      <text x={200} y={244} textAnchor="middle" fill="#888" fontSize={8.5}>King's College London · X-ray crystallography</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WATSON & CRICK MODEL SVG
═══════════════════════════════════════════════════════════════ */
function WatsonCrickModelDemo() {
  const rungs = 10;
  const cx = 110, amplitude = 70, h = 280;

  return (
    <svg viewBox="0 0 400 320" className="w-full max-w-lg">
      {/* Backbone strand A */}
      <path
        d={Array.from({ length: rungs * 8 }, (_, i) => {
          const t = i / (rungs * 8 - 1);
          const y = 20 + t * (h - 20);
          const x = cx + Math.sin(t * Math.PI * 4) * amplitude;
          return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
        }).join(" ")}
        fill="none" stroke="url(#wc-a)" strokeWidth={3} strokeLinecap="round" opacity={0.8}
      />
      {/* Backbone strand B */}
      <path
        d={Array.from({ length: rungs * 8 }, (_, i) => {
          const t = i / (rungs * 8 - 1);
          const y = 20 + t * (h - 20);
          const x = cx + Math.sin(t * Math.PI * 4 + Math.PI) * amplitude;
          return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
        }).join(" ")}
        fill="none" stroke="url(#wc-b)" strokeWidth={3} strokeLinecap="round" opacity={0.8}
      />

      {/* Rungs (base pairs) */}
      {Array.from({ length: rungs }, (_, i) => {
        const t = (i + 0.5) / rungs;
        const y = 20 + t * (h - 20);
        const x1 = cx + Math.sin(t * Math.PI * 4) * amplitude;
        const x2 = cx + Math.sin(t * Math.PI * 4 + Math.PI) * amplitude;
        const pairs: [string, string][] = [["A","T"],["T","A"],["G","C"],["C","G"],["A","T"],["T","A"],["G","C"],["C","G"],["A","T"],["G","C"]];
        const [l, r] = pairs[i];
        const colors: Record<string, string> = { A:"#3b82f6", T:"#ef4444", G:"#10b981", C:"#f59e0b" };
        return (
          <g key={i}>
            <line x1={x1} y1={y} x2={x2} y2={y} stroke="#44444a" strokeWidth={1.5} />
            <circle cx={x1} cy={y} r={6} fill={colors[l]} opacity={0.9} />
            <circle cx={x2} cy={y} r={6} fill={colors[r]} opacity={0.9} />
          </g>
        );
      })}

      {/* Measurement annotations */}
      {/* Width: 2 nm */}
      <line x1={40}  y1={100} x2={40}  y2={160} stroke="#aaa" strokeWidth={1} strokeDasharray="3 2" />
      <line x1={37}  y1={100} x2={43}  y2={100} stroke="#aaa" strokeWidth={1} />
      <line x1={37}  y1={160} x2={43}  y2={160} stroke="#aaa" strokeWidth={1} />
      <text x={28} y={134} fill="#aaa" fontSize={7.5} textAnchor="middle">2 nm</text>
      <text x={28} y={143} fill="#aaa" fontSize={7}   textAnchor="middle">width</text>

      {/* Pitch: 3.4 nm */}
      <line x1={190} y1={55} x2={190} y2={130} stroke="#a78bfa" strokeWidth={1} strokeDasharray="3 2" />
      <line x1={187} y1={55}  x2={193} y2={55}  stroke="#a78bfa" strokeWidth={1} />
      <line x1={187} y1={130} x2={193} y2={130} stroke="#a78bfa" strokeWidth={1} />
      <text x={205} y={88}  fill="#a78bfa" fontSize={7.5}>3.4 nm</text>
      <text x={205} y={98}  fill="#a78bfa" fontSize={7}>per turn</text>

      {/* Right-side legend */}
      {[
        { color:"#3b82f6", label:"Adenine (A)"  },
        { color:"#ef4444", label:"Thymine (T)"  },
        { color:"#10b981", label:"Guanine (G)"  },
        { color:"#f59e0b", label:"Cytosine (C)" },
      ].map((b, i) => (
        <g key={b.label}>
          <circle cx={230} cy={26 + i * 22} r={7} fill={b.color} />
          <text x={243} y={31 + i * 22} fill="#ccc" fontSize={10} fontWeight="600">{b.label}</text>
        </g>
      ))}

      {/* Backbone legend */}
      <line x1={225} y1={122} x2={245} y2={122} stroke="url(#wc-a)" strokeWidth={3} />
      <text x={250} y={126} fill="#ccc" fontSize={9.5}>Sugar-phosphate</text>
      <text x={250} y={137} fill="#ccc" fontSize={9.5}>backbone (×2)</text>

      {/* 3' 5' labels */}
      <text x={cx - amplitude - 8} y={25}  fill="#a78bfa" fontSize={9} fontWeight="700">5′</text>
      <text x={cx - amplitude - 8} y={285} fill="#a78bfa" fontSize={9} fontWeight="700">3′</text>
      <text x={cx + amplitude + 4} y={25}  fill="#ec4899" fontSize={9} fontWeight="700">3′</text>
      <text x={cx + amplitude + 4} y={285} fill="#ec4899" fontSize={9} fontWeight="700">5′</text>

      <text x={cx} y={310} textAnchor="middle" fill="#aaa" fontSize={9}>Antiparallel strands — Watson &amp; Crick model, 1953</text>

      <defs>
        <linearGradient id="wc-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="wc-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CENTRAL DOGMA FLOW
═══════════════════════════════════════════════════════════════ */
function CentralDogmaDemo() {
  const steps = [
    { label: "DNA",        sub: "Deoxyribonucleic acid",  color: "#3b82f6", icon: "🧬", note: "Stored in nucleus" },
    { label: "mRNA",       sub: "Messenger RNA",          color: "#10b981", icon: "📜", note: "Transcription" },
    { label: "Ribosome",   sub: "Translation machine",    color: "#f59e0b", icon: "⚙️", note: "In cytoplasm" },
    { label: "Protein",    sub: "Amino acid chain",       color: "#a78bfa", icon: "🔵", note: "Functional molecule" },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Flow */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.08, y: -3 }}
              className="flex flex-col items-center gap-1.5 rounded-2xl border-2 px-5 py-4 text-center"
              style={{ borderColor: `${s.color}50`, background: `${s.color}12` }}
            >
              <span className="text-3xl">{s.icon}</span>
              <span className="text-base font-black" style={{ color: s.color }}>{s.label}</span>
              <span className="text-[10px] text-muted-foreground">{s.sub}</span>
              <span className="rounded-full border px-2 py-0.5 text-[9px] font-semibold"
                style={{ borderColor: `${s.color}40`, color: s.color }}>{s.note}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <div className="flex flex-col items-center gap-0.5">
                <div className="text-xl font-bold text-muted-foreground">→</div>
                <div className="text-[9px] text-muted-foreground">{["Transcription","→","Translation"][i] ?? ""}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Codon example */}
      <div className="w-full max-w-xl rounded-2xl border border-border bg-muted/10 p-5">
        <h4 className="mb-3 text-sm font-bold">Codon Example: AUG (Start codon)</h4>
        <div className="flex flex-wrap items-center gap-3">
          {["A","U","G"].map((b) => {
            const colors: Record<string, string> = { A:"#3b82f6", U:"#ef4444", G:"#10b981" };
            return (
              <span key={b} className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black text-white"
                style={{ background: colors[b] }}>{b}</span>
            );
          })}
          <span className="text-muted-foreground">→</span>
          <span className="rounded-xl border border-purple-400/40 bg-purple-400/10 px-3 py-1 text-sm font-bold text-purple-400">Methionine (Met · M)</span>
          <span className="text-xs text-muted-foreground">→ Starts translation</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TIMELINE DATA
═══════════════════════════════════════════════════════════════ */
const TIMELINE = [
  { year: "1869", who: "Friedrich Miescher",  color: "#0f6070", cardVar: "--card-teal",    event: "Discovers 'nuclein' (DNA) in white blood cells — the first evidence of a special molecule in cell nuclei." },
  { year: "1944", who: "Avery, MacLeod, McCarty", color: "#0a5a7a", cardVar: "--card-sky", event: "Prove that DNA (not protein) is the molecule of heredity using Streptococcus bacteria transformation experiments." },
  { year: "1950", who: "Erwin Chargaff",      color: "#7a5200", cardVar: "--card-yellow",  event: "Discovers base-pairing rules: %A = %T and %G = %C in all DNA samples — Chargaff's Rules." },
  { year: "1952", who: "Rosalind Franklin",   color: "#8a1a50", cardVar: "--card-pink",    event: "Produces Photo 51 at King's College London — the clearest X-ray diffraction image of DNA ever taken, revealing the helix dimensions." },
  { year: "1953", who: "Watson & Crick",      color: "#1a6a40", cardVar: "--card-mint",    event: "Publish the double helix model in Nature (April 25). 900 words. Uses Franklin's Photo 51 and Chargaff's rules as constraints." },
  { year: "1958", who: "Meselson & Stahl",    color: "#4a2e90", cardVar: "--card-lavender",event: "Prove DNA replication is semi-conservative — each daughter DNA keeps one original strand." },
  { year: "1962", who: "Nobel Committee",     color: "#7a3500", cardVar: "--card-peach",   event: "Nobel Prize awarded to Watson, Crick and Wilkins. Franklin had died in 1958 and Nobels are not awarded posthumously." },
  { year: "1977", who: "Fred Sanger",         color: "#0a5a7a", cardVar: "--card-sky",     event: "Develops DNA sequencing. Wins his second Nobel Prize. Enables reading the exact order of bases in a DNA molecule." },
  { year: "2003", who: "Human Genome Project",color: "#4a2e90", cardVar: "--card-lavender",event: "Complete sequence of all 3 billion base pairs in the human genome published — 50 years after the double helix." },
];

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
const SECTIONS = ["Timeline", "Rosalind Franklin", "Double Helix Model", "Central Dogma"] as const;
type Section = (typeof SECTIONS)[number];

export default function HistoryPage() {
  const [section, setSection] = useState<Section>("Timeline");

  return (
    <main className="flex-1 px-6 pb-24 pt-6 md:px-8 md:pb-10">
      <header className="mb-8">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          DNA Discovery
        </div>
        <h1 className="text-3xl font-black tracking-tight md:text-4xl">DNA Structure History</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          From Miescher's nuclein in 1869 to the complete human genome in 2003 — the story of how humanity decoded the molecule of life.
        </p>
      </header>

      {/* Section tabs */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
        {SECTIONS.map((s) => {
          const colors: Record<Section, string> = {
            "Timeline":            "#4a2e90",
            "Rosalind Franklin":   "#8a1a50",
            "Double Helix Model":  "#1a6a40",
            "Central Dogma":       "#0a5a7a",
          };
          const active = section === s;
          return (
            <button
              key={s}
              onClick={() => setSection(s)}
              className="relative shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all"
              style={{
                borderColor: active ? colors[s] : "var(--border)",
                background:  active ? `${colors[s]}18` : "transparent",
                color:       active ? colors[s] : "var(--muted-foreground)",
              }}
            >
              {s}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.2 }}
        >
          {/* ── TIMELINE ── */}
          {section === "Timeline" && (
            <div className="relative flex flex-col gap-0 pl-8">
              <div className="absolute left-3 top-0 h-full w-0.5 bg-border" />
              {TIMELINE.map((ev, i) => (
                <motion.div
                  key={ev.year}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="relative mb-6"
                >
                  {/* dot */}
                  <div
                    className="absolute -left-[21px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-background"
                    style={{ background: ev.color }}
                  />
                  <div className="rounded-2xl border border-border p-4" style={{ background: `var(${ev.cardVar})` }}>
                    <div className="mb-1 flex items-baseline gap-3">
                      <span className="text-lg font-black" style={{ color: ev.color }}>{ev.year}</span>
                      <span className="text-xs font-semibold" style={{ color: "var(--card-text)", opacity: 0.6 }}>{ev.who}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--card-text)", opacity: 0.75 }}>{ev.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* ── ROSALIND FRANKLIN ── */}
          {section === "Rosalind Franklin" && (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Photo 51 visual */}
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-border bg-[#06060f] p-6">
                  <Photo51Demo />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "1952",   label: "Year taken",    color: "#8a1a50", cardVar: "--card-pink"    },
                    { value: "3.4 nm", label: "Pitch per turn",color: "#8a1a50", cardVar: "--card-pink"    },
                    { value: "2 nm",   label: "Helix diameter",color: "#8a1a50", cardVar: "--card-pink"    },
                  ].map((f) => (
                    <div key={f.label} className="rounded-xl border py-3 text-center"
                      style={{ borderColor: `${f.color}40`, background: `var(${f.cardVar})` }}>
                      <div className="text-lg font-black" style={{ color: f.color }}>{f.value}</div>
                      <div className="text-[10px]" style={{ color: "var(--card-text)", opacity: 0.6 }}>{f.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Biography & story */}
              <div className="flex flex-col gap-5">
                <div className="rounded-2xl border border-border p-6" style={{ background: "var(--card-pink)" }}>
                  <h2 className="mb-1 text-xl font-black" style={{ color: "#8a1a50" }}>Rosalind Franklin</h2>
                  <p className="mb-4 text-xs" style={{ color: "var(--card-text)", opacity: 0.55 }}>1920–1958 · Physical chemist & X-ray crystallographer</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--card-text)", opacity: 0.75 }}>
                    Franklin used X-ray crystallography to study the structure of DNA at King's College London. Her meticulous work produced Photo 51 — the most detailed image of DNA ever captured at that time.
                  </p>
                </div>

                {[
                  { title: "What is X-ray Crystallography?", color: "#8a1a50", cardVar: "--card-pink" },
                  { title: "What Photo 51 Revealed",        color: "#8a1a50", cardVar: "--card-pink" },
                  { title: "Franklin's Legacy",             color: "#8a1a50", cardVar: "--card-pink" },
                ].map((card, i) => {
                  const bodies = [
                    "A technique where X-rays are fired at a crystalline sample. The atoms scatter the X-rays in patterns. By analysing these patterns (a 'diffraction pattern'), scientists can calculate the 3D positions of atoms — without ever seeing them directly.",
                    "The X-shaped cross confirmed a helical structure. The layer lines (horizontal bands) gave the pitch: 3.4 nm per full turn, with 10 base pairs per turn. The repeating unit spacing showed the sugar-phosphate backbone is on the outside. These measurements were the critical constraints Watson & Crick needed.",
                    "Franklin died of cancer in 1958, aged 37. The 1962 Nobel Prize went to Watson, Crick, and Wilkins. Her contribution was only formally recognised decades later. Today she is celebrated as one of the most important scientists of the 20th century.",
                  ];
                  return (
                  <div key={card.title} className="rounded-xl border border-border p-4" style={{ background: `var(${card.cardVar})` }}>
                    <h3 className="mb-2 font-bold" style={{ color: card.color }}>{card.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--card-text)", opacity: 0.75 }}>{bodies[i]}</p>
                  </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── DOUBLE HELIX MODEL ── */}
          {section === "Double Helix Model" && (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Model visual */}
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-border bg-muted/10 p-6">
                  <WatsonCrickModelDemo />
                </div>

                {/* Key features */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Two strands",       value: "Antiparallel", color: "#1a6a40", cardVar: "--card-mint" },
                    { label: "Base pairs / turn",  value: "10",           color: "#1a6a40", cardVar: "--card-mint" },
                    { label: "Pitch",              value: "3.4 nm",       color: "#1a6a40", cardVar: "--card-mint" },
                    { label: "Diameter",           value: "2 nm",         color: "#1a6a40", cardVar: "--card-mint" },
                  ].map((f) => (
                    <div key={f.label} className="rounded-xl border py-3 text-center"
                      style={{ borderColor: `${f.color}40`, background: `var(${f.cardVar})` }}>
                      <div className="text-base font-black" style={{ color: f.color }}>{f.value}</div>
                      <div className="text-[10px]" style={{ color: "var(--card-text)", opacity: 0.6 }}>{f.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Story & rules */}
              <div className="flex flex-col gap-5">
                <div className="rounded-2xl border border-border p-6" style={{ background: "var(--card-mint)" }}>
                  <h2 className="mb-1 text-xl font-black" style={{ color: "#1a6a40" }}>Watson &amp; Crick, 1953</h2>
                  <p className="mb-4 text-xs" style={{ color: "var(--card-text)", opacity: 0.55 }}>James Watson (USA) · Francis Crick (UK) · Cavendish Laboratory, Cambridge</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--card-text)", opacity: 0.75 }}>
                    Watson and Crick built physical models of DNA using metal plates and rods. Their breakthrough came when they realised the bases must pair specifically — Chargaff's rules told them the ratios, Franklin's Photo 51 told them the geometry.
                  </p>
                </div>

                {[
                  { title: "The Three Clues They Used", color: "#1a6a40", cardVar: "--card-mint",
                    body: "① Franklin's Photo 51 gave the pitch (3.4 nm), diameter (2 nm), and proved the helix. ② Chargaff's rules (%A=%T, %G=%C) forced specific base pairing. ③ Linus Pauling's α-helix work showed proteins and DNA can form stable helices." },
                  { title: "Why Antiparallel?", color: "#1a6a40", cardVar: "--card-mint",
                    body: "The two strands run in opposite directions: one 5′→3′, the other 3′→5′. This is called antiparallel. It is required for specific base pairing — A can only hydrogen-bond with T, and G with C, when the strands run in opposite directions." },
                  { title: "Why It Explains Inheritance", color: "#1a6a40", cardVar: "--card-mint",
                    body: "Because each strand is a perfect template for the other, DNA can be copied with perfect fidelity. Watson and Crick ended their famous 1953 paper with: 'It has not escaped our notice that the specific pairing we have postulated immediately suggests a possible copying mechanism for the genetic material.'" },
                ].map((card) => (
                  <div key={card.title} className="rounded-xl border border-border p-4" style={{ background: `var(${card.cardVar})` }}>
                    <h3 className="mb-2 font-bold" style={{ color: card.color }}>{card.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--card-text)", opacity: 0.75 }}>{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CENTRAL DOGMA ── */}
          {section === "Central Dogma" && (
            <div className="flex flex-col gap-8">
              <div className="rounded-2xl border border-border p-6 md:p-10">
                <h2 className="mb-2 text-xl font-black">The Central Dogma of Molecular Biology</h2>
                <p className="mb-8 text-sm text-muted-foreground">
                  Proposed by Francis Crick in 1958 — the fundamental principle explaining how genetic information flows in a cell.
                </p>
                <CentralDogmaDemo />
              </div>

              {/* Steps detail */}
              <div className="grid gap-5 md:grid-cols-2">
                {[
                  { title: "① Transcription (DNA → mRNA)", color: "#1a6a40", cardVar: "--card-mint",
                    steps: ["RNA polymerase binds to a promoter region on the DNA.", "It unwinds the helix and reads the template strand 3′→5′.", "Builds a complementary mRNA strand (U replaces T).", "mRNA exits the nucleus through nuclear pores."] },
                  { title: "② Translation (mRNA → Protein)", color: "#4a2e90", cardVar: "--card-lavender",
                    steps: ["Ribosome binds to mRNA at the start codon AUG.", "tRNA molecules carry amino acids matching each codon.", "Peptide bonds form between amino acids.", "The polypeptide chain folds into a functional protein."] },
                  { title: "Exceptions to the Dogma", color: "#7a3500", cardVar: "--card-peach",
                    steps: ["Reverse transcription: RNA → DNA (retroviruses like HIV).", "RNA replication: RNA → RNA (RNA viruses).", "Direct translation of RNA in some viruses.", "Prions: protein conformation can change other proteins (no DNA/RNA)."] },
                  { title: "Why It Matters", color: "#0a5a7a", cardVar: "--card-sky",
                    steps: ["Every protein in your body is made this way.", "Gene editing (CRISPR) works by modifying the DNA source.", "mRNA vaccines (COVID-19) use synthetic mRNA for translation.", "Understanding the dogma explains how mutations cause disease."] },
                ].map((block) => (
                  <div key={block.title} className="rounded-2xl border border-border p-5"
                    style={{ background: `var(${block.cardVar})` }}>
                    <h3 className="mb-3 font-bold" style={{ color: block.color }}>{block.title}</h3>
                    <ol className="flex flex-col gap-1.5">
                      {block.steps.map((s, i) => (
                        <li key={i} className="flex gap-2 text-sm" style={{ color: "var(--card-text)", opacity: 0.75 }}>
                          <span className="shrink-0 font-semibold" style={{ color: block.color }}>{i + 1}.</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
