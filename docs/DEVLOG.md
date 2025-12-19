# Development Log (Newest to Oldest)

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
