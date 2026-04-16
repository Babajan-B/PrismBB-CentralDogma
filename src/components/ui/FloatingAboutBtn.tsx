"use client";

import { Info } from "lucide-react";

export function FloatingAboutBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 rounded-full bg-muted/80 backdrop-blur-sm p-3 shadow-lg hover:bg-muted transition-colors"
      aria-label="About GeneCode"
    >
      <Info size={20} />
    </button>
  );
}
