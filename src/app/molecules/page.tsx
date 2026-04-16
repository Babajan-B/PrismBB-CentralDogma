import { MoleculeGrid } from "@/components/molecules/MoleculeGrid";

export const metadata = {
  title: "Molecule Engine — GeneCode",
  description:
    "Explore DNA, RNA, and protein components with interactive 4-level detail cards. Structural, functional, and regulatory molecules of the central dogma.",
};

export default function MoleculesPage() {
  return (
    <main className="flex-1 px-6 pb-24 pt-6 md:px-8 md:pb-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Molecule Engine
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          Interactive explorer for the molecular components of DNA, RNA, and
          protein — with identity, structure, function, and context for each.
        </p>
      </header>
      <MoleculeGrid />
    </main>
  );
}
