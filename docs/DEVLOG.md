# Development Log (Newest to Oldest)

# [v0.4.3] Documentation & Cleanup

## docs: comprehensive design documentation

- **DOCS**: Created `docs/DESIGN.md` with architecture overview, design decisions, and code walkthrough.
- **DOCS**: Added links between all documentation files.
- **FIX**: Simplified `isDark` check in `_layout.tsx`.
- **FIX**: Removed local file:// paths from DESIGN.md, replaced with backtick code format.

# [v0.4.1] Web & Polish Improvements

## feat: browser tab titles for web

- **FEAT**: Added `document.title` updates for all tab screens on web platform.
- **UX**: Tab titles now show "[Page Name] | Star Seeker" format.
- **UX**: Gate details page shows "[Gate Name] | Star Seeker" dynamically.

## fix: version number display on web

- **FIX**: Created `constants/version.ts` with `APP_VERSION` constant for web display.
- **FIX**: Used `Platform.OS === 'web'` to force `APP_VERSION` since expo-constants returns stale value.
- **DX**: Updated `AGENTS.md` to document version bumping now requires 4 locations.

## fix: Journey Visualizer web compatibility

- **FIX**: Replaced `lucide-react-native` Rocket with embedded SVG path for cross-platform support.
- **FIX**: Added explicit SVG `width`, `height`, and `viewBox` to fix web rendering.
- **FIX**: Improved node positioning with proper bounds calculation.
- **CLEANUP**: Removed unused LucideIcon imports.

## feat: display favorite gates as navigable list

- **FEAT**: Profile page now shows actual favorite gates with name, code, and navigation to gate details.
- **UX**: Empty state with helpful message when no favorites are saved.
- **UI**: Each favorite row includes star icon, gate info, unfavorite button, and chevron for navigation.

## ux: set default distance value for calculator

- **UX**: Calculator now shows results immediately on first load with default distance of 150 AU.

## test: fix ProfileScreen tests for new cache hooks

- **FIX**: Added `QueryClientProvider` and `DataPrefetcher` wrappers to ProfileScreen tests.
- **TEST**: New test case for cache statistics display ("No data cached", "Force Data Refresh").
- All 15 tests now passing.

# [v0.4.0] Offline Data Pre-caching

## feat: background API data pre-caching for offline support

- **FEAT**: Created `usePrefetchData` hook to cache all API data in background after app loads.
- **OFFLINE**: Pre-fetches all gates, gate details (13), and route combinations (156 routes) for full offline capability.
- **PERF**: Throttled requests (30-50ms delays) to avoid overwhelming the API.
- **PERF**: Smart cache check skips prefetching entirely if cache already has complete data (within 7-day staleTime).
- **DX**: Added `DataPrefetcher` component with context to expose `forceRefresh` function to child components.
- **UI**: Renamed Profile "Maintenance" section to "Offline Data" with live cache statistics display.
- **UX**: Created `useCacheStats` hook to reactively show cached gates and route counts.
- **UX**: "Force Data Refresh" button clears cache and re-prefetches all data on demand.

# [v0.3.9] OfflineBanner & Visualizer Polish

## fix: reposition OfflineBanner and refine visualizer styling

- **FIX**: Moved `OfflineBanner` from bottom to top of screen to prevent it from covering the tab bar navigation.
- **UX**: Added a dismiss (X) button allowing users to close the offline notification.
- **A11Y**: Added proper accessibility labels and roles to the dismiss button.
- **UI**: Refined `JourneyVisualizer` styling to match app design system (`rounded-xl`, Tailwind opacity class).

# [v0.3.8] Global Cache Control & 7-Day Memory

## chore: release v0.3.8 - global 7-day cache, maintenance tools, default route finder, and UI polish

- **PERF**: Implemented a global **1-week cache time** (`604,800,000ms`) for all API responses (gates, details, routes).
- **UX**: Added a "Clear Data Cache" button to the Profile screen for manual cache invalidation and fresh fetches.
- **UX**: Set **Route Finder** as the default landing page upon app startup.
- **UI**: Improved **Dark Mode accessibility** by refining contrast for destructive action buttons.
- **DOCS**: Mandated strict Git-Truth verification in `AGENTS.md` and `WORKFLOW.md` to prevent version drift.

# [v0.3.7] Cinematic Restoration & Layout Standardization

## feat: restore cinematic "heavy inertia" navigation

- **ANIMATION**: Reverted `JourneyVisualizer` logic to the v0.3.3 specs: 1200ms duration for the first leg with a high-inertia `bezier(0.8, 0, 0.2, 1)` easing.
- **UX**: Reordered bottom tabs to make "Route Finder" the first tab and the default landing page of the application.

## refactor: standardize tab page architecture

- **LAYOUT**: Refactored `TabPage.tsx` to handle internal `ScrollView` logic and standardized `gap-4` spacing.
- **REFACTOR**: Migrated all tab pages (`Routes`, `Gates`, `Cost`, `Profile`) and `GateDetails` to the unified `TabPage` component.
- **UI**: Created `DualActionButton.tsx` to provide consistent side-by-side action buttons.
- **CLEANUP**: Moved `FavoriteButton` to `components/ui/` and resolved all module resolution errors.
- **FIX**: Resolved redundant navigation bars in the `Gates` tab by disabling native headers in the nested stack.

# [v0.3.6] Post-Refactor Layout Fixes

## fix: resolve JSX nesting in Route Finder

- **BUG**: Removed an orphaned `</View>` tag in `routes.tsx` that broke the build after the `TabPage` migration.
- **CHORE**: Confirmed version synchronization via "Git-Truth" verification.

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

---

### Links

- [README.md](README.md)
