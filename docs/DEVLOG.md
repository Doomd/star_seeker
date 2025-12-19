# Development Log (Newest to Oldest)

## docs: outline remaining work

- **DOCS**: Created `docs/TODO.md` outlining remaining bonus tasks (Testing, Animations, Polish).

## fix: resolve ios theme issues

- **FIX**: Resolved iOS Theme reactivity issue by refactoring from CSS Variables to Utility Composition (using `@apply` with `dark:` variants).
- **FIX**: Fixed `View` import crash in `_layout.tsx` by aliasing to `RNView` to avoid naming conflicts.
- **FIX**: Implemented reliable "Force Remount" strategy on root View to ensure theme context propagation.
- **FIX**: Resolved Web FOUC (Flash of Unstyled Content) by waiting for store hydration before hiding splash screen.
- **FIX**: Fixed temporary "[code]" title in Gate Details by handling loading state titles gracefully.

- **FEAT**: Implemented "Favorites" system with persistent storage using `zustand` and `AsyncStorage` (`store/useUserStore.ts`).
- **FEAT**: Added "Profile" tab with stats and Color Mode preference (System/Light/Dark).
- **FEAT**: Implemented Dynamic Theming with `useThemeColor` hook, supporting real-time switching.
- **FEAT**: Added Offline Mode using `@react-native-community/netinfo` and `OfflineBanner` component; configured TanStack Query `onlineManager`.
- **UI**: Updated `GateCard` with favorite star toggle and improved layout (centered labels).
- **UI**: Added "Favorites Only" filter to Gates Index.
- **FIX**: Resolved Web "Blank Screen" issue by adding CSS reset in `app/global.css`.
- **FIX**: Resolved Web syntax error by downgrading `zustand` to v4.4.7 (avoiding `import.meta`).
- **FIX**: Fixed Navigation issue where "Gates" tab didn't reset stack; added `tabPress` listener.
- **FIX**: Resolved React Hook Rule violation in `HomeScreen`.

- **DOCS**: Added `docs/API.md` to document endpoints and schemas.
- **DOCS**: Moved `CHALLENGE.md` to `docs/` folder for better organization.

## refactor: restructure routes and fix navigation

- **NAV**: Renamed `app/(tabs)/gates` to `index` and back to `gates` with a root redirect to fix nested screen warnings.
- **NAV**: Updated `GateCard` and Gate Details to use absolute paths (`/gates/[code]`) to prevent 404s.
- **UI**: Added Error Handling and Retry button to Gate Details screen for better UX during network failures.
- **FIX**: Resolved startup 404 by adding `app/index.tsx` redirect.

## fix: ensure back button persistence during loading

- **NAV**: Refactored Gate Details navigation to ensure the back button is always visible, even during loading states.
- **NAV**: Enforced `headerBackVisible: true` globally in the Gates stack to prevent inconsistent hiding.
- **UI**: Added temporary header title during loading to maintain UI stability.
- **REFACTOR**: Restructured `app/(tabs)/gates` to use a nested Stack Navigator, keeping the Tab Bar visible on detail screens.

## feat: add calculator and route finder features

- **CALCULATOR**: Ported `app/(tabs)/calculator.tsx` to calculate transport costs, refactored to use semantic theme colors.
- **ROUTES**: Ported `app/(tabs)/routes.tsx` to find cheapest routes, refactored to use semantic theme colors.
- **NAV**: Added 'Cost' and 'Route Finder' tabs to the main layout.

## refactor: enforce dark theme in root layout before we implement color modes

- **UI**: Removed `useColorScheme` from `app/_layout.tsx` and forced `DarkTheme` to ensure consistent dark mode across the app, aligning with `constants/Colors.ts`.
- **UI**: Changed gates icon to `orbit` from `planet` in `app/(tabs)/index.tsx` to better represent the concept of a star gate.

## chore: update expo packages to recommended versions

- **DEPS**: Updated `expo` (~54.0.30), `expo-router` (~6.0.21), and `expo-splash-screen` (~31.0.13) to resolve console warnings.

## refactor: implement single source of truth for theming

- **THEME**: Created `constants/Colors.ts` (TypeScript) as the Single Source of Truth.
- **CONFIG**: Migrated `tailwind.config.js` to `tailwind.config.ts` to support modern imports.
- **UI**: Updated components to utilize named imports for Colors.

## feat: connect home screen to api

- **FEAT**: Connected `app/(tabs)/index.tsx` to `useGates` hook to display real data.
- **UI**: Implemented `FlatList` layout for displaying `GateCard` items.

## feat: implement gate details screen

- **FEAT**: Implemented dynamic `app/[code].tsx` route to show detailed gate information.
- **UI**: Created detail view with connection list and navigation to other gates.
- **NAV**: Configured dynamic Stack Headers to show gate names.

## chore: add prettier configuration

- **CONFIG**: Added `.prettierrc` with semicolon: false, tabs: true, and tabWidth: 2.
- **STYLE**: Standardized code formatting rules for the project.

## feat: implement home screen and gate list

- **FEAT**: Implemented `HomeScreen` in `app/(tabs)/index.tsx` to fetch and display the list of star gates.
- **UI**: Added `GateCard` component to display individual gate summaries.
- **HOOKS**: Implemented `useGates` (and other queries) in `hooks/useQueries.ts` for data fetching.
- **TYPES**: Defined TypeScript interfaces in `types/index.ts`.

## docs: create DEVLOG.md to track project progress

- **DOCS**: Created `docs/DEVLOG.md` to document all git commits and development progress in a professional format.
- **DOCS**: Added historical log entries for project setup, API integration, and core layout implementation.

## feat: setup root layout and query provider

- **FEAT**: Implemented `QueryProvider` using TanStack Query for efficient server state management.
- **LAYOUT**: Created `app/_layout.tsx` to wrap the application with `QueryProvider` and `ThemeProvider`.
- **LAYOUT**: Created `app/(tabs)/_layout.tsx` with a minimal Tab Navigator configuration.
- **UI**: Added a placeholder "Home" screen at `app/(tabs)/index.tsx`.
- **UI**: Added a `+not-found.tsx` screen for standard 404 handling.

## feat: add api client

- **FEAT**: Added `api/client.ts` to handle HTTP requests and API communication.
- **ARCH**: Established API layer foundation.

## Initial project setup with Expo, NativeWind, and configuration

- **INIT**: Initialized new Expo project using `star_seeker` name.
- **CONFIG**: Configured `nativewind`, `tailwindcss` (with `tailwind.config.ts`), `babel.config.js` and `metro.config.js`.
- **CONFIG**: Added `postcss.config.mjs` for web support.
- **CONFIG**: Renamed app scheme and slug to `star_seeker`.
- **ASSETS**: Added initial font files and image assets.

## challenge start

- **DOCS**: Added `CHALLENGE.md` outlining the project requirements and objectives.
