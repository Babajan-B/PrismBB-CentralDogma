"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { MolecularComponent, ComponentCategory } from "@/data/types";
import { Modal } from "@/components/ui/Modal";
import { CardSlider, type SliderCard } from "@/components/ui/CardSlider";
import { pickViewer } from "@/components/3d/pickViewer";
import { Molecule2D, get3DType } from "./Molecule2D";

const Molecule3D = dynamic(
  () => import("@/components/3d/Molecule3D").then((m) => m.Molecule3D),
  { ssr: false },
);

interface MoleculeModalProps {
  component: MolecularComponent | null;
  onClose: () => void;
}

const TAB_LABEL: Record<MolecularComponent["tab"], string> = {
  dna: "DNA",
  rna: "RNA",
  protein: "Protein",
};

const CATEGORY_ACCENT: Record<ComponentCategory, string> = {
  structural: "#3b82f6",
  functional: "#10b981",
  regulatory: "#d946ef",
};

function renderViewer3D({
  viewer,
  scene3D,
  accent,
}: {
  viewer: React.ReactNode;
  scene3D: ReturnType<typeof get3DType> | null;
  accent: string;
}) {
  if (viewer) return viewer;

  if (scene3D) {
    return (
      <Suspense
        fallback={
          <div className="flex h-56 items-center justify-center text-xs text-muted-foreground">
            Loading 3D…
          </div>
        }
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-black/5 dark:bg-white/5">
          <Molecule3D
            type={scene3D.type}
            base={scene3D.base}
            color={scene3D.color}
            size={1.2}
            className="h-56 w-full"
          />
        </div>
      </Suspense>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-56 items-center justify-center text-xs text-muted-foreground">
          Loading 3D…
        </div>
      }
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-black/5 dark:bg-white/5">
        <Molecule3D
          type="aminoAcid"
          color={accent}
          size={1.2}
          className="h-56 w-full"
        />
      </div>
    </Suspense>
  );
}

export function MoleculeModal({ component, onClose }: MoleculeModalProps) {
  const accent = component ? CATEGORY_ACCENT[component.category] : "#3b82f6";
  const viewer = component ? pickViewer(component) : null;
  const scene3D = component ? get3DType(component.id) : null;
  const viewer3D = renderViewer3D({ viewer, scene3D, accent });

  const cards: SliderCard[] = component
    ? [
        {
          key: "identity",
          label: "Identity",
          content: (
            <div className="space-y-5">
              <Header component={component} accent={accent} />
              {viewer3D}
              <Section title="What it is">
                <p>{component.details.identity}</p>
              </Section>
              {component.formula && (
                <Section title="Formula">
                  <span className="font-sequence inline-block rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm tracking-wider">
                    {component.formula}
                  </span>
                </Section>
              )}
            </div>
          ),
        },
        {
          key: "structure",
          label: "Structure",
          content: (
            <div className="space-y-5">
              <Header component={component} accent={accent} />
              {viewer3D}
              <Section title="Structure">
                <p>{component.details.structure}</p>
              </Section>
            </div>
          ),
        },
        {
          key: "function",
          label: "Function",
          content: (
            <div className="space-y-5">
              <Header component={component} accent={accent} />
              <Section title="2D Diagram">
                <div className="flex justify-center py-2">
                  <Molecule2D
                    moleculeId={component.id}
                    accentColor={accent}
                    className="h-32 w-32"
                  />
                </div>
              </Section>
              <Section title="Function">
                <p>{component.details.function}</p>
              </Section>
            </div>
          ),
        },
        {
          key: "context",
          label: "Context",
          content: (
            <div className="space-y-5">
              <Header component={component} accent={accent} />
              <Section title="Biological context">
                <p>{component.details.context}</p>
              </Section>
            </div>
          ),
        },
      ]
    : [];

  return (
    <Modal
      open={!!component}
      onClose={onClose}
      widthClass="max-w-xl"
      title={
        component ? (
          <span className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: accent }}
            />
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
              {TAB_LABEL[component.tab]} · {component.category}
            </span>
            <span className="truncate">{component.name}</span>
          </span>
        ) : null
      }
    >
      {component && <CardSlider cards={cards} />}
    </Modal>
  );
}

function Header({
  component,
  accent,
}: {
  component: MolecularComponent;
  accent: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border p-5"
      style={{
        background: `linear-gradient(135deg, ${accent}22 0%, transparent 60%)`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            {TAB_LABEL[component.tab]} · {component.category}
          </div>
          <h2 className="mt-1 text-2xl font-bold leading-tight">
            {component.name}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {component.shortDesc}
          </p>
        </div>
        {component.formula && (
          <div
            className="font-sequence shrink-0 rounded-xl border border-border bg-background/40 px-3 py-2 text-sm backdrop-blur-sm"
            style={{ color: accent }}
          >
            {component.formula}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      <div className="text-sm leading-relaxed text-foreground/90">
        {children}
      </div>
    </section>
  );
}
