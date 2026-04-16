import type { Metadata } from "next";
import { SettingsPanel } from "@/components/settings/SettingsPanel";

export const metadata: Metadata = {
  title: "Settings — GeneCode",
  description: "Customize GeneCode: theme, language, animation speed, amino acid display, and reset onboarding.",
};

export default function SettingsPage() {
  return <SettingsPanel />;
}
