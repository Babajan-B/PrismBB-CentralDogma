import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools — GeneCode",
  description:
    "Interactive DNA/RNA/protein tools: transcription, translation, mutation simulator, splicing, worksheet generator, virtual lab, genetics quiz, and flashcards.",
};

const TOOLS = [
  {
    href: "/tools/transcription",
    icon: "🔬",
    title: "Transcription",
    desc: "Convert DNA coding strand to pre-mRNA step by step.",
    cardVar: "--card-teal",
    badge: "DNA → mRNA",
  },
  {
    href: "/tools/translation",
    icon: "🧬",
    title: "Translation",
    desc: "Decode mRNA codon by codon into an amino acid chain.",
    cardVar: "--card-mint",
    badge: "mRNA → Protein",
  },
  {
    href: "/tools/mutation",
    icon: "⚡",
    title: "Mutation Simulator",
    desc: "Simulate substitution, insertion, and deletion mutations.",
    cardVar: "--card-pink",
    badge: "Point mutations",
  },
  {
    href: "/tools/splicing",
    icon: "✂️",
    title: "Splicing Tool",
    desc: "Mark exons and introns, then splice to mature mRNA.",
    cardVar: "--card-lavender",
    badge: "RNA processing",
  },
  {
    href: "/tools/worksheet",
    icon: "📄",
    title: "Worksheet Generator",
    desc: "Generate printable biology worksheets with answer keys.",
    cardVar: "--card-yellow",
    badge: "Print-ready",
  },
  {
    href: "/tools/virtual-lab",
    icon: "🔭",
    title: "Virtual Lab",
    desc: "Animate ribosome translation with a growing protein chain.",
    cardVar: "--card-sky",
    badge: "Simulation",
  },
  {
    href: "/tools/quiz",
    icon: "📝",
    title: "Genetics Quiz",
    desc: "Check understanding with fast multiple-choice revision questions.",
    cardVar: "--card-peach",
    badge: "Practice",
  },
  {
    href: "/tools/flashcards",
    icon: "🗂️",
    title: "Flashcards",
    desc: "Revise key genetics ideas with active-recall flashcards and review tracking.",
    cardVar: "--card-teal",
    badge: "Revision",
  },
  {
    href: "/glossary",
    icon: "📚",
    title: "Glossary",
    desc: "Search important genetics terms across DNA, RNA, inheritance, and lab skills.",
    cardVar: "--card-salmon",
    badge: "Study",
  },
];

export default function ToolsPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10 max-w-5xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-2 text-foreground">Interactive Tools</h1>
      <p className="text-muted-foreground mb-10">
        Hands-on simulations for the central dogma of molecular biology.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TOOLS.map(({ href, icon, title, desc, cardVar, badge }) => (
          <Link
            key={href}
            href={href}
            className="group relative flex flex-col gap-3 p-5 rounded-2xl border border-transparent transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            style={{
              background: `var(${cardVar})`,
              color: "var(--card-text)",
            }}
          >
            <div className="text-3xl">{icon}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-bold text-base" style={{ color: "var(--card-text)" }}>{title}</h2>
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border"
                  style={{
                    background: "rgba(0,0,0,0.08)",
                    borderColor: "rgba(0,0,0,0.12)",
                    color: "var(--card-text)",
                  }}
                >
                  {badge}
                </span>
              </div>
              <p className="text-sm leading-snug" style={{ color: "var(--card-text)", opacity: 0.72 }}>{desc}</p>
            </div>
            <span className="absolute bottom-4 right-4 text-lg opacity-30 group-hover:opacity-80 transition-opacity">→</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
