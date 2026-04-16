# CentralDogma — Interactive Genetic Code Reference

A free, open-source interactive atlas of the central dogma — from DNA structure through RNA transcription to protein translation. Explore 64 codons, simulate mutations, and generate printable worksheets.

## Features

- **64-Codon Grid**: Color-coded by amino acid category with 4-level detail for every codon
- **Molecular Models**: Interactive 3D structures for DNA, RNA, amino acids, and nucleotides
- **Virtual Lab**: Simulate transcription, translation, mutations, and RNA splicing
- **Worksheet Generator**: Export print-ready biology exercises as PDF
- **8+ Languages**: English, Arabic, Chinese, French, Russian, Farsi, Urdu, Tagalog, Spanish
- **Fast & Free**: No installs, no accounts — works instantly in any modern browser

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with Turbopack
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) with custom design tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- **UI Components**: [Lucide React](https://lucide.dev) icons
- **State**: [Zustand](https://github.com/pmndrs/zustand)

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Production Build

```bash
npm run build
npm start
```

Static export to `out/` for Vercel deployment:

```bash
npm run build  # outputs to out/ (configured in next.config.ts)
```

### Type Check & Lint

```bash
npm run type-check   # TypeScript validation
npm run lint         # ESLint
npm run check        # all checks + build
```

## Deployment

Deployed on [Vercel](https://vercel.com) with static export (`output: "export"`).

**Deploy button:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourrepo%2Fgenecode)

## Project Structure

```
src/
├── app/              # Pages: home, table, molecules, tools, settings
├── components/       # UI components, modals, codon grid, 3D scenes
├── data/             # Genetic code, amino acids, nucleotides
├── hooks/            # Custom React hooks
├── i18n/             # Internationalization
├── lib/              # Utilities
├── store/            # Zustand state (settings, UI)
└── 3d/               # Three.js 3D components (optional: lazy-loaded)
```

## Key Pages

- **/** — Interactive hero with DNA helix visualization
- **/table** — Full codon table with search, filter, and detail modals
- **/molecules** — Molecular components (DNA, RNA, amino acids, nucleotides)
- **/tools** — Interactive labs (transcription, translation, mutation, splicing, etc.)
- **/settings** — Language & theme preferences

## Translations

App supports 8+ languages. Language files in `src/i18n/`. To add a language:

1. Add language config to `src/i18n/index.ts`
2. Create translation file `src/i18n/[lang].json`
3. Deploy

## Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m "add my feature"`)
4. Push to branch (`git push origin feature/my-feature`)
5. Open a pull request

## License

MIT — Free for personal and educational use.

## Credits

- Design inspired by [zperiod.app](https://zperiod.app)
- Built with [Next.js](https://nextjs.org) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- Genetics content sourced from NCBI, UniProt, and educational references

---

**Questions?** Open an issue or email the team.
