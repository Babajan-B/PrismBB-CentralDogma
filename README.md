# GeneCode

GeneCode is an interactive genetics learning app focused on the central dogma of molecular biology. It combines a codon reference, molecule explorer, guided tools, and visual teaching pages so students can move from memorization to understanding.

## What It Includes

- Interactive codon table with filtering, search, and deep codon detail modals
- Molecule explorer for DNA, RNA, amino acids, and related components
- Learning tools for transcription, translation, mutation, splicing, worksheet generation, a virtual lab, a genetics quiz, and flashcards
- Visual concept pages for genetics topics and DNA history
- Searchable glossary for fast revision and classroom study support
- English and Arabic language support with RTL handling
- Animated UI and 3D molecular views for student engagement

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- React Three Fiber / Drei
- Zustand

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev         # start local development
npm run lint        # run ESLint
npm run type-check  # run TypeScript checks
npm run build       # production build
npm run check       # lint + type-check + build
npm run audit:i18n  # i18n audit script
```

## Main Routes

- `/` home / landing page
- `/table` codon table
- `/molecules` molecule explorer
- `/tools` all interactive tools
- `/tools/transcription`
- `/tools/translation`
- `/tools/mutation`
- `/tools/splicing`
- `/tools/worksheet`
- `/tools/virtual-lab`
- `/tools/quiz`
- `/tools/flashcards`
- `/glossary`
- `/genetic-concepts` genetics concept lessons
- `/history` DNA discovery history
- `/settings` language, theme, and display settings

## Project Structure

```text
src/
  app/          app routes and page entry points
  components/   UI, onboarding, tools, codon grid, 3D views
  data/         static biology datasets
  hooks/        reusable React hooks
  i18n/         translation dictionaries and language metadata
  lib/          sequence logic and genetics utilities
  store/        persisted app settings
scripts/
  audit-i18n.mjs
```

## Current Focus Areas

The project is already strong as an interactive prototype. The biggest engineering priorities are:

- keep `npm run check` green at all times
- complete translation coverage across all UI copy
- reduce oversized client components and pages
- add tests around `src/lib/*` sequence logic
- improve accessibility and keyboard support for modals and tools

See [improve.md](./improve.md) for the full improvement plan.

## Ideas To Make It A More Complete Genetics Education Tool

If you want this to feel like a full student platform, these are the best additions:

### Core biology modules

- DNA replication simulator with leading strand, lagging strand, helicase, primase, and Okazaki fragments
- meiosis and mitosis visualizer with chromosome movement, crossing over, and ploidy changes
- Punnett square and pedigree solver with autosomal, sex-linked, codominance, and incomplete-dominance modes
- population genetics tools for Hardy-Weinberg equilibrium, selection, drift, migration, and mutation
- protein synthesis error lab showing nonsense, missense, silent, and frameshift outcomes side by side
- gene regulation lessons covering promoters, enhancers, operons, transcription factors, and epigenetics

### Student practice features

- quiz mode with instant feedback and difficulty levels
- exam mode with timed worksheets and auto-generated answer keys
- adaptive practice based on wrong answers
- flashcards for codons, amino acids, bases, enzymes, and genetics vocabulary
- progress tracking by topic
- teacher dashboard for assigning tasks and reviewing performance

### Visualization upgrades

- chromosome explorer with karyotypes and structural abnormalities
- CRISPR editor demo for guide RNA, Cas9 cut site, and repair outcomes
- gel electrophoresis simulator
- PCR simulator with denaturation, annealing, extension, and cycle counts
- mutation heatmaps showing which positions in a sequence are most disruptive
- pathway maps linking DNA -> RNA -> protein -> trait -> disease

### Real classroom value

- lesson plans aligned to school biology topics
- printable worksheets by grade level
- bilingual glossary with pronunciation support
- misconception mode that explains common student mistakes
- challenge mode with real disease examples such as sickle cell, cystic fibrosis, and thalassemia
- offline-first classroom mode for schools with unstable internet

## Recommended Product Roadmap

If you want the highest-impact next steps, I would build in this order:

1. Add quizzes, progress tracking, and worksheet improvements.
2. Add DNA replication, meiosis/mitosis, and Punnett/pedigree modules.
3. Add teacher tools and student profiles.
4. Add advanced labs like PCR, gel electrophoresis, CRISPR, and population genetics.

## Notes

- This repo currently has local user changes in progress, so treat the worktree carefully before large refactors.
- This app uses Next.js 16. Read the local Next docs in `node_modules/next/dist/docs/` before making framework-level changes.

## License

MIT
