import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools — GeneCode",
  description: "Interactive DNA/RNA/protein tools: transcription, translation, mutation simulator, splicing, worksheet generator, and virtual lab.",
};

const TOOLS = [
  {
    href: "/tools/transcription",
    icon: "🔬",
    title: "Transcription",
    desc: "Convert DNA coding strand to pre-mRNA step by step.",
    color: "border-blue-500/30 hover:border-blue-500/60",
    badge: "DNA → mRNA",
  },
  {
    href: "/tools/translation",
    icon: "🧬",
    title: "Translation",
    desc: "Decode mRNA codon by codon into an amino acid chain.",
    color: "border-emerald-500/30 hover:border-emerald-500/60",
    badge: "mRNA → Protein",
  },
  {
    href: "/tools/mutation",
    icon: "⚡",
    title: "Mutation Simulator",
    desc: "Simulate substitution, insertion, and deletion mutations.",
    color: "border-red-500/30 hover:border-red-500/60",
    badge: "Point mutations",
  },
  {
    href: "/tools/splicing",
    icon: "✂️",
    title: "Splicing Tool",
    desc: "Mark exons and introns, then splice to mature mRNA.",
    color: "border-violet-500/30 hover:border-violet-500/60",
    badge: "RNA processing",
  },
  {
    href: "/tools/worksheet",
    icon: "📄",
    title: "Worksheet Generator",
    desc: "Generate printable biology worksheets with answer keys.",
    color: "border-amber-500/30 hover:border-amber-500/60",
    badge: "Print-ready",
  },
  {
    href: "/tools/virtual-lab",
    icon: "🔭",
    title: "Virtual Lab",
    desc: "Animate ribosome translation with a growing protein chain.",
    color: "border-cyan-500/30 hover:border-cyan-500/60",
    badge: "Simulation",
  },
];

export default function ToolsPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10 max-w-5xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-2">Interactive Tools</h1>
      <p className="text-muted-foreground mb-10">
        Hands-on simulations for the central dogma of molecular biology.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TOOLS.map(({ href, icon, title, desc, color, badge }) => (
          <Link
            key={href}
            href={href}
            className={`group relative flex flex-col gap-3 p-5 rounded-2xl bg-muted/20 border-2 transition-all duration-200 ${color}`}
          >
            <div className="text-3xl">{icon}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-semibold text-base">{title}</h2>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {badge}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-snug">{desc}</p>
            </div>
            <span className="absolute bottom-4 right-4 text-muted-foreground/30 group-hover:text-primary/60 transition-colors text-lg">→</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
