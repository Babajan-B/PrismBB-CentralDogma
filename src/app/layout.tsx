import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PillNav } from "@/components/ui/PillNav";
import { OnboardingProvider } from "@/components/onboarding/OnboardingProvider";
import { LanguageProvider } from "@/components/settings/LanguageProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const APP_URL = "https://genecode.app";
const OG_IMAGE = `${APP_URL}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "GeneCode — Interactive Genetic Code Reference",
    template: "%s — GeneCode",
  },
  description:
    "Free interactive genetic code reference with 3D molecular models, codon grid, DNA/RNA/protein explorers, and exam-ready tools for biology students.",
  keywords: [
    "genetic code", "codon table", "DNA", "RNA", "amino acids",
    "molecular biology", "biology education", "bioinformatics",
  ],
  authors: [{ name: "GeneCode Team" }],
  creator: "GeneCode",
  openGraph: {
    type: "website",
    url: APP_URL,
    siteName: "GeneCode",
    title: "GeneCode — Interactive Genetic Code Reference",
    description:
      "Free interactive genetic code reference with 3D molecular models, codon grid, and exam-ready tools.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "GeneCode" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeneCode — Interactive Genetic Code Reference",
    description:
      "Free interactive genetic code reference with 3D molecular models, codon grid, and exam-ready tools.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: APP_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "GeneCode",
  url: APP_URL,
  applicationCategory: "EducationApplication",
  operatingSystem: "Web",
  browserRequirements: "HTML5, JavaScript",
  description:
    "Interactive genetic code reference with 3D molecular models, codon grid, DNA/RNA/protein explorers and biology learning tools.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "GeneCode" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LanguageProvider />
        <OnboardingProvider>
          <PillNav />
          {children}
        </OnboardingProvider>
      </body>
    </html>
  );
}
