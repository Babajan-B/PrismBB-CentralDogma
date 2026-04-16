"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const MoleculeSceneLazy = dynamic(
  () =>
    import("@/components/3d/MoleculeScene").then((mod) => mod.MoleculeScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    ),
  },
);

type MoleculeSceneProps = ComponentProps<typeof MoleculeSceneLazy>;

export function Molecule3D(props: MoleculeSceneProps) {
  return <MoleculeSceneLazy {...props} />;
}
