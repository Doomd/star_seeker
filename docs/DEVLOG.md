# Development Log (Newest to Oldest)

# [v0.3.5] Stability & Dependency Alignment

## fix: align react-native-svg and resolve TabPage reference

- **CHORE**: Aligned `react-native-svg` to `15.12.1` for Expo compatibility.
- **BUG**: Fixed `ReferenceError` in `GateDetailsScreen` by resolving component import issues.
- **DOCS**: Established "Git-Truth" versioning rules in `AGENTS.md` and `WORKFLOW.md` to prevent version drift.

# [v0.3.4] Navigation & Layout Consolidation

## feat: make Route Finder the default landing page

- **UX**: Updated the entry redirect to point to `/(tabs)/routes`, making the Route Finder the primary screen.
- **UI**: Reordered the tab bar to place "Route Finder" at the first position.
- **REFACTOR**: Migrated `GateDetailsScreen` to use `TabPage`, resolving the "gap" inconsistency.

# [v0.3.3] Cinematic Rocket Animation & Transition Stability

## feat: high-inertia rocket acceleration

- **FEAT**: Implemented a cinematic high-inertia S-curve `bezier(0.8, 0, 0.2, 1)` for the first leg of journeys (1200ms).
- **BUG**: Fixed animation race conditions by adding a cancellation tracker.

# [v0.3.2] Navigation System Edge Cases

## fix: same-gate destination handling

- **BUG**: Resolved edge case where selecting the same source and target gate left a stale path.

# [v0.3.1] Layout Stability Fixes

## fix: TabPage export and ScrollView styles

- **BUG**: Fixed `TabPage` reference errors and invalid `justifyContent` on ScrollViews.

# [v0.3.0] Layout Standardization

- **LAYOUT**: Created a reusable `TabPage` component to ensure fixed headers.
- **REFACTOR**: Migrated `Gates`, `Routes`, and `Calculator` screens to the new layout.

## refactor: standardize layout spacing with gap strategy

- **LAYOUT**: Replaced ad-hoc `mb-` classes with centralized `gap-6`/`gap-8` spacing inside `ScrollView` wrapper Views for `RoutesScreen` and `CalculatorScreen`.

## fix: refine rocket vertical offset in JourneyVisualizer

- **ANIMATION**: Increased rocket vertical offset from 15px to 19px for better visual clearance from star gate nodes.

## fix: implement asymmetrical padding for JourneyVisualizer

- **LAYOUT**: Refined map spacing with 24px horizontal (`px-6`) and 32px vertical (`py-8`) padding for better label and node distribution.

## fix: refine JourneyVisualizer layout padding for better node spacing

- **LAYOUT**: Reduced internal map padding from 60px to 16px to allow nodes more horizontal space, especially for routes with 3+ gates.

## fix: standardize distance units to AU across the application

- **UI**: Changed segment distance display from "HU" to "AU" in Route Finder breakdown for consistency.
- **DOCS**: Updated `API.md` to reflect that Hyper Units (HU) should be presented as Astronomical Units (AU) in the user interface.

## feat: add customization and distance labels to JourneyVisualizer

- **PROPS**: Added support for custom icons (`NodeIcon`, `RocketIcon`) and colors (`nodeColor`, `rocketColor`, `lineColor`).
- **UI**: Set default line color to brighter green (`#4ade80`) as per prototype.
- **FEATURE**: Implemented real-time distance labels (e.g., "120 AU") on the navigational map.
- **REFACTOR**: Updated `RoutesScreen` to pass `gates` data for distance calculations.

## feat: make JourneyVisualizer height dynamic

- **PROPS**: Added `height` prop to `JourneyVisualizer` to allow vertical resizing.
- **UI**: Reduced visualizer height in `Route Finder` by 25% (to 150px) for a more compact layout.

## feat: add decelerating entry animation for rocket

- **ANIMATION**: Implemented "sliding arrival" effect with exponential deceleration for the rocket's first appearance at the source gate.

## fix: resolve JourneyVisualizer bugs and logic errors

- **BUG**: Fixed `setInterval` type mismatch and `View` style type errors.
- **LAYOUT**: Locked starting gate to center-left for better navigational balance.
- **LOGIC**: Improved path progression logic to flow from the fixed starting point.

## feat: refine JourneyVisualizer with Tailwind and reactive logic

- **UI**: Refactored `JourneyVisualizer.tsx` to use NativeWind (Tailwind) classes.
- **LOGIC**: Implemented reactive positioning for `sourceGate` selection.
- **UI**: Added cycling status messages ("Transmitting Journey Request", etc.) during loading.
- **ASSETS**: Saved rocket SVG to `assets/images/rocket.svg` and unified icon usage.

## feat: add Reset button and reusable HeaderButton component

- **UI**: Created `components/ui/HeaderButton.tsx` for standardized header actions.
- **REFACTOR**: Updated `Gates` screen to use the new `HeaderButton`.
- **FEATURE**: Added a dynamic "Reset" button to the `Route Finder` screen to clear selections.

## feat: implement high-fidelity JourneyVisualizer component

- **UI**: Created `components/JourneyVisualizer.tsx` using `react-native-svg` and `react-native-reanimated`.
- **ANIMATION**: Implemented dynamic starfield (static + warp) and SVG-based route mapping.
- **ANIMATION**: Added Reanimated-driven rocket flight that follows the calculated path.
- **FEATURE**: Integrated visualizer into the Route Finder, replacing the standard loader with an interactive map.

## chore: implement formal versioning and UI display

- **UI**: Added app version footer to the `Profile` tab using `expo-constants`.
- **CONFIG**: Bumped app version to `0.1.0` in `package.json` and `app.json`.
- **DOCS**: Updated `WORKFLOW.md` with SemVer guidelines and release steps.
- **GIT**: Established git tagging protocol for stable releases.

## refactor: extract reusable FavoriteButton component

- **REFACTOR**: Created `components/FavoriteButton.tsx` to centralize favorite toggle logic and styling.
- **UI**: Integrated `FavoriteButton` into `GateCard` and `GateDetails` screen.
- **FEATURE**: Added the ability to toggle favorites directly from the `GateSelector` in the Route Finder.
- **DX**: Reduced code duplication and ensured consistent favorite button behavior across the app.

## chore: implement OneFlow branching model

- **GIT**: Created `dev` branch as the new primary development branch.
- **DOCS**: Created `docs/WORKFLOW.md` detailing the "Variation - develop + master" model.
- **DOCS**: Updated `AGENTS.md` and `DEVLOG.md` to reflect the new workflow requirements.
- **POLICY**: `main` is now reserved for stable releases, updated via `--ff-only` merges from `dev`.

## docs: refine agent guidelines and project context

- **DOCS**: Updated `AGENTS.md` with the latest technical context (SDK 54, Jest testing suite, centralized color management).
- **DOCS**: Added specific AI workflow guidelines: prioritize `DEVLOG.md` context, maintain `TODO.md`, and favor atomic commits.
- **CONFIG**: Moved `AGENTS.md` to be tracked by version control (removed from `.gitignore`) to ensure consistent AI collaboration across environments.

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
