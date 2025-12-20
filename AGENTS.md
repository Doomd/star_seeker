# Star Seeker Project Context for AI Agents

**FILE PURPOSE:**  
This file contains critical context, rules, and architectural decisions for any AI agent working on this codebase. **Read this first** before attempting any changes.

## 🚀 Project Overview

**Star Seeker** is a React Native mobile application for interstellar travel planning, built with **Expo**. It solves a technical challenge involving hyperspace gate directories, route finding, and cost calculation.

## 🛠 Tech Stack (Strict)

- **Runtime**: Node.js (LTS)
- **Package Manager**: **`pnpm`** (DO NOT use npm or yarn)
- **Framework**: [React Native](https://reactnative.dev/) via [Expo SDK 54](https://expo.dev/)
- **Routing**: [Expo Router v6+](https://docs.expo.dev/router/introduction/) (File-based, Typed Routes)
- **Styling**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS for Native)
- **State Management**:
  - **Client**: [Zustand](https://docs.pmnd.rs/zustand/) (User preferences, Favorites)
  - **Server**: [TanStack Query v5](https://tanstack.com/query/latest) (Caching, Offline support)
- **Persistence**: `@react-native-async-storage/async-storage`
- **Testing**: **Jest** + **React Native Testing Library (RNTL)**
- **Navigation**: Native Stack (via Expo Router)
- **Icons**: `@expo/vector-icons` (Lucide or IonIcons preferred)

## 📂 Project Structure

- **`/app`**: Expo Router pages.
  - `(tabs)`: Main tab navigation layout.
  - `_layout.tsx`: Root layout (Providers + Theme).
  - `global.css`: Global styles and theme definitions.
- **`/components`**: Reusable UI components.
- **`/hooks`**: Custom hooks (e.g., `useQueries.ts` for data fetching).
- **`/store`**: Zustand stores (e.g., `useUserStore.ts`).
- **`/api`**: Axios client and API functions.
- **`/constants`**: Theme colors (`Colors.ts` is the single source of truth).
- **`/utils`**: Shared business logic (e.g., `journey.ts` for calculations).
- **`/docs`**: Documentation (DEVLOG, TODO, CHALLENGE, API).
- **`/__tests__`**: Unit and integration tests.

## ⚠️ CRITICAL CONVENTIONS & RULES

### 1. Package Management

- **ALWAYS** use `pnpm install`, `pnpm add`, `pnpm start`.
- **NEVER** create `package-lock.json` or `yarn.lock`.

### 2. Styling & Theming (Single Source of Truth)

- **`constants/Colors.ts`** is the authoritative source for all colors.
- **`tailwind.config.ts`** imports and extends the `palette` from `Colors.ts`.
- **`app/global.css`** maps semantic classes (e.g., `.bg-background`) to these palette colors via `@apply`.
- **Convention**: Use semantic classes in JSX (e.g., `className="text-foreground"`) to ensure theme reactivity.

### 3. Testing

- We use **Jest** and **React Native Testing Library**.
- **Run tests**: `pnpm test`.
- Environment is configured via `jest.config.js` and `jest.setup.js` (using `react-native` preset).
- Always include unit tests for new logic in `/utils` or `/store`.

### 4. Workflow (Agent Guidelines)

- **Context Preservation**: Always keep `docs/DEVLOG.md` in your context to understand the project's evolution.
- **Task Tracking**: Update `docs/TODO.md` when starting or completing tasks.
- **Atomic Commits**: Ensure git commits are as atomic as possible (one logical change per commit).
- **DevLog Updates**: Record all significant changes in `docs/DEVLOG.md` (newest at the top).

## � Common Commands

- **Start Dev Server**: `pnpm start --clear`
- **Run Tests**: `pnpm test`
- **Align Dependencies**: `npx expo install --check`

---

_Project Maintainer: [Doomd](https://github.com/Doomd)_  
_Project Guidelines: Established by Antigravity_
