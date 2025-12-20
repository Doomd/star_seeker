# Development Log (Newest to Oldest)

## style: consolidate color management and cleanup

- **ARCH**: Implemented `Colors.ts` as the single source of truth for both JS and CSS by linking it to `tailwind.config.ts`.
- **REFACTOR**: Updated `global.css` to use palette-based classes via `@apply` instead of hardcoded hex values or generic Tailwind colors.
- **CLEANUP**: Removed debug console logs for theme state changes in `app/_layout.tsx`.

## style: polish ui spacing and theme consistency

- **UI**: Applied consistent spacing (`m-1`) to cards in `Profile` and `Routes` screens; adjusted padding for better visual balance.
- **THEME**: Replaced hardcoded favorite star color with `Colors.favorite` in `ProfileScreen`.
- **CONFIG**: Updated `.vscode/settings.json` with "Solarized Dark" theme and synchronized indentation settings.

## fix: resolve web accessibility focus error

- **FIX**: Refactored `GateCard` to separate the main `Link` from the "Favorite" toggle. This resolves a Chrome error ("Blocked aria-hidden on an element because its descendant retained focus") caused by nested interactive elements in the focus tree during navigation.
- **UI**: Added visual feedback (active state) to the star button on the Gate list.

## refactor: centralize favorite color constant
