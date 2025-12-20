# Development Log (Newest to Oldest)

## chore: align test dependencies and update documentation

- **CONFIG**: Downgraded `jest` and `@types/jest` to Expo-recommended versions (~29.7.0) to resolve terminal compatibility warnings.
- **DOCS**: Added "Known Issues" to `README.md` explaining the `expo-server` stream error quirk during web refreshes.
- **DOCS**: Updated `TODO.md` to reflect completed testing and documentation milestones.

## test: implement unit and integration testing suite

- **TEST**: Set up Jest and React Native Testing Library. Resolved environment bottlenecks by switching to the `react-native` preset to bypass `expo/winter` runtime issues.
- **TEST**: Implemented 15 tests covering state management (`useUserStore`), utility logic (`journey.ts`), and component rendering (`OfflineBanner`, `ProfileScreen`).
- **REFACTOR**: Extracted journey calculation and currency formatting into shared utilities to ensure testable, consistent business logic.
- **DX**: Installed `@types/jest` and configured `tsconfig.json` to resolve IDE "red squiggles," ensuring a clean developer experience for future contributors.
- **CONFIG**: Aligned `jest` and `@types/jest` versions with Expo's recommended versions to resolve terminal warnings and ensure environment compatibility.

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
