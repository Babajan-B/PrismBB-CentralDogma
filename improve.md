# GeneCode Improvement Plan

## What This Project Already Does Well

GeneCode is already more than a simple codon table. It has a clear educational angle, strong visual identity, a broad feature set, and a good separation between `data`, `lib`, `components`, and `app` routes. The strongest parts of the current project are:

- Clear product scope around the central dogma of molecular biology.
- Good use of static data modules such as `src/data/geneticCode.ts`, `src/data/aminoAcids.ts`, and `src/data/nucleotides.ts`.
- Useful biology tools in `src/lib/transcription.ts`, `src/lib/translation.ts`, `src/lib/mutation.ts`, and `src/lib/splicing.ts`.
- A modern App Router structure with route-level metadata on some pages.
- Strong visual ambition across hero sections, modals, onboarding, and molecule views.

The project feels like a strong educational prototype. The main gap is that it is not yet hardened like a production educational product.

## Current State Summary

### Build health

- `npm run lint`: passes
- `npm run type-check`: fails
- `npm run build`: fails for the same TypeScript issue

### Immediate blocker

The app currently does not type-check or build successfully because `ChemistryTab` is called with a `codon` prop that its declared props do not accept.

- Call site: [src/components/codon-grid/CodonModal.tsx](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/src/components/codon-grid/CodonModal.tsx:273)
- This should be the first fix before any larger refactor.

## Highest-Priority Improvements

### 1. Make the project releasable again

Priority: `P0`

Actions:

- Fix the `ChemistryTab` prop mismatch in `src/components/codon-grid/CodonModal.tsx`.
- Add a GitHub Actions workflow that runs `npm run check` on every push and pull request.
- Treat build-green as a hard requirement before adding features.
- Remove stale or unnecessary dependencies, especially `@next/font` in [package.json](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/package.json:15), since the app already uses `next/font/google`.

Why this matters:

- Right now the repo is easy to break silently.
- A project with no green build cannot be improved safely.

### 2. Finish internationalization properly

Priority: `P0`

What I found:

- Translation infrastructure exists in [src/i18n/translations.ts](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/src/i18n/translations.ts:1).
- The translation hook exists in [src/hooks/useTranslation.ts](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/src/hooks/useTranslation.ts:1).
- In practice, only a small part of the UI uses it consistently, especially settings.
- Large parts of the product still contain hardcoded English strings in pages and components such as:
  - [src/app/tools/page.tsx](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/src/app/tools/page.tsx:1)
  - [src/app/tools/translation/page.tsx](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/src/app/tools/translation/page.tsx:1)
  - [src/components/onboarding/WelcomeModal.tsx](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/src/components/onboarding/WelcomeModal.tsx:17)
  - [src/app/genetic-concepts/page.tsx](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/src/app/genetic-concepts/page.tsx:1)

Actions:

- Move all user-facing copy into typed translation dictionaries.
- Expand `Translations` so feature pages and modal content are covered.
- Add an automated check that fails if translation keys are missing.
- Decide whether language is a client preference only or part of the route structure such as `/en/...` and `/ar/...`.

Why this matters:

- The app advertises bilingual support, but the current experience is mixed.
- Arabic support needs more than `lang` and `dir`; it needs full copy coverage and layout validation.

### 3. Fix theme and language hydration behavior

Priority: `P1`

What I found:

- Language is applied after mount in [src/components/settings/LanguageProvider.tsx](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/src/components/settings/LanguageProvider.tsx:10).
- Theme is also applied after mount in [src/components/ui/ThemeToggle.tsx](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/src/components/ui/ThemeToggle.tsx:19).

Risks:

- Flash of incorrect theme on first paint.
- Wrong `dir` and `lang` during the initial server render.
- Inconsistent server/client output when preferences differ from defaults.

Actions:

- Move initial theme selection to a server-readable source such as cookies.
- Apply theme class before hydration in `layout.tsx`.
- Do the same for language direction if localization remains a first-class feature.
- Use the existing `useHydrated` pattern only where unavoidable, not as the primary preference strategy.

## Structural Improvements

### 4. Reduce client-side footprint

Priority: `P1`

What I found:

- There are `44` files marked with `"use client"` across `src/app` and `src/components`.
- Some entire pages are client components even when large parts are static, for example:
  - [src/app/table/page.tsx](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/src/app/table/page.tsx:1)
  - [src/app/history/page.tsx](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/src/app/history/page.tsx:1)
  - [src/app/genetic-concepts/page.tsx](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/src/app/genetic-concepts/page.tsx:1)

Actions:

- Keep route shells, headers, and static educational copy in server components by default.
- Isolate only the interactive widgets as client components.
- Lazy-load heavy 3D viewers and modal-only visualizations.
- Audit bundle size for `framer-motion`, `three`, and `@react-three/*` usage.

Why this matters:

- This project is content-heavy and should be fast to first paint.
- Next 16 App Router is strongest when static UI remains server-rendered.

### 5. Break up oversized pages and modals

Priority: `P1`

What I found:

- [src/app/genetic-concepts/page.tsx](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/src/app/genetic-concepts/page.tsx:1) is `997` lines long.
- `CodonModal.tsx` is also doing too much: state, tab routing, rendering, data interpretation, and molecule rendering all in one file.

Actions:

- Split `genetic-concepts/page.tsx` into section components plus structured content data.
- Split `CodonModal.tsx` into:
  - `CodonModalShell`
  - `CodonOverviewTab`
  - `CodonChemistryTab`
  - `CodonGenomicsTab`
  - `CodonContextTab`
- Move repeated display cards and tab chrome into reusable components.

Why this matters:

- Large files are hard to test, hard to review, and easy to break.
- This repo already has enough complexity that maintainability now matters more than raw velocity.

### 6. Separate educational content from UI code

Priority: `P1`

What I found:

- A large amount of biology teaching content is embedded directly inside TSX files.
- That makes copy review, translation, scientific review, and future CMS-like reuse difficult.

Actions:

- Move long-form teaching copy to structured content files such as `src/content/*.ts` or markdown/json content modules.
- Keep component files focused on presentation and interaction.
- Version educational content separately from rendering logic when possible.

Why this matters:

- Educational products need scientific review and editorial iteration.
- That process is much easier when content is not buried inside JSX.

## Quality Improvements

### 7. Add tests where they pay off most

Priority: `P1`

What I found:

- There are effectively no app tests in the repo right now.
- The strongest candidates for testing are deterministic utilities:
  - `src/lib/transcription.ts`
  - `src/lib/translation.ts`
  - `src/lib/mutation.ts`
  - `src/lib/splicing.ts`

Recommended test layers:

- Unit tests for all sequence transformation logic.
- Snapshot or contract tests for codon and amino acid lookup data.
- A minimal end-to-end smoke suite for:
  - Home page
  - Codon table
  - Tools page
  - One interactive tool flow

Why this matters:

- Your domain logic is testable and valuable.
- This is the fastest way to stop regressions while still moving quickly.

### 8. Improve accessibility and keyboard behavior

Priority: `P2`

Areas to inspect next:

- Focus trapping and escape handling across custom modals.
- Keyboard navigation in codon grid and molecule explorer.
- Screen-reader labels on icon-only controls.
- RTL layout issues in animated overlays and onboarding flows.
- Color contrast for category badges and decorative gradients.

Why this matters:

- The product targets education, so accessibility is not optional.
- Custom modals and animated interfaces usually accumulate a11y debt quickly.

### 9. Tighten product integrity

Priority: `P2`

What I found:

- The settings suggestion form appears to be UI-only with no persistence in [src/components/settings/SettingsPanel.tsx](/Users/jaan/Desktop/Desktop 16-4-26/NEw-DNA/genecode/src/components/settings/SettingsPanel.tsx:53).
- Route taxonomy is a little uneven: for example `/inheritance` redirects to `/genetic-concepts`, while `/history` is separate and large.

Actions:

- Remove fake actions or wire them to a real endpoint.
- Decide on a clean information architecture:
  - Reference
  - Molecules
  - Tools
  - Concepts
  - History
- Add route-level metadata consistently for all pages.

## Recommended Order of Work

### Phase 1

1. Fix the TypeScript/build failure.
2. Remove stale dependencies and get CI running.
3. Add tests for `src/lib/*`.

### Phase 2

1. Move theme/language initialization out of mount-time effects.
2. Finish i18n coverage for all visible copy.
3. Break `CodonModal.tsx` and `genetic-concepts/page.tsx` into smaller units.

### Phase 3

1. Reduce client component scope.
2. Lazy-load heavy 3D experiences.
3. Improve accessibility and route consistency.

## If I Were Improving This Repo First

I would start with this exact sequence:

1. Fix `CodonModal.tsx` until `npm run check` passes.
2. Add unit tests for translation, transcription, mutation, and splicing logic.
3. Move theme/language bootstrapping to first render instead of `useEffect`.
4. Extract all hardcoded UI copy into the translation layer.
5. Split the giant educational pages into data plus smaller components.

That sequence gives you the best return: safer releases, faster iteration, and a codebase that can keep growing without collapsing into maintenance debt.
