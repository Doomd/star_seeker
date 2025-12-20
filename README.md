# Star Seeker 🚀

**Star Seeker** is a React Native mobile application designed to revolutionize interstellar travel planning. It allows travelers to browse hyperspace gates, calculate journey costs, find efficient routes, and manage their favorite destinations—all wrapped in a sleek, mobile-first experience.

This project was built as a solution to the **Star Seeker Technical Challenge**.

---

## 📱 Features

- **Hyperspace Gate Directory**: Browse a comprehensive list of all available gates in the United Terran Systems.
- **Gate Details**: View detailed information about specific gates, including connections and status.
- **Journey Cost Calculator**: Estimate travel costs based on distance, passengers, and parking duration.
- **Route Finder**: Calculate the cheapest route between two gates using the hyperspace network.
- **Favorites System (Bonus)**: Save frequently visited gates for quick access (persisted locally).
- **Offline Mode (Bonus)**: Gracefully handles network loss with a visual banner and cached data access.
- **Dark/Light Mode (Bonus)**: Fully dynamic theming system respecting user preference.

---

## 🛠 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) (via [Expo](https://expo.dev/))
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing, Typed Routes)
- **Styling**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS for Native)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) (User preferences, Favorites)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) (Caching, Retries, Offline support)
- **Persistence**: `AsyncStorage` (Local storage for persistent state)
- **HTTP Client**: Axios

---

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- pnpm (Package Manager)
- iOS Simulator (Mac) or Android Emulator

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/star_seeker.git
    cd star_seeker
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Run the application:**

    ```bash
    pnpm start
    ```

    - Press `i` to open in iOS Simulator.
    - Press `a` to open in Android Emulator.

4.  **Run tests:**

    ```bash
    pnpm test
    ```

---

## 📐 Design Decisions & Architecture

### 1. Modern Expo Ecosystem

I chose **Expo** with **Expo Router** to leverage the latest advancements in the React Native ecosystem. File-based routing provides an intuitive project structure, and the usage of "Typed Routes" ensures compile-time safety for navigation, preventing broken links.

### 2. NativeWind v4 (Tailwind CSS)

NativeWind allows for rapid UI development using familiar Tailwind classes.

- **Trade-off**: NativeWind v4 is powerful but can have edge cases with dynamic variables on native platforms.
- **Solution**: I adopted a "Utility Composition" strategy in `global.css` (mapping semantic classes like `.bg-background` to `dark:bg-slate-950`) to ensure 100% reliable Dark Mode switching on iOS/Android.

### 3. TanStack Query (React Query)

Managing server state is critical for a travel app. TanStack Query handles caching, background updates, and loading states out of the box.

- **Offline Awareness**: Configured with `NetInfo` to pause queries when offline and automatically resume retry logic when the connection returns.

### 4. Zustand for Client State

For global client-state (like Theme preference and Favorites), **Zustand** offers a minimal API without the boilerplate of Redux.

- **Persistence**: Integrated with `persist` middleware to save favorites to `AsyncStorage` seamlessly.

---

## ✅ Challenge Requirements Checklist

| Requirement                 | Status | Implementation Details                                                                         |
| :-------------------------- | :----: | :--------------------------------------------------------------------------------------------- |
| **Setup & Architecture**    |   ✅   | scalable folder structure (`/app`, `/components`, `/hooks`), Error boundaries, Loading states. |
| **API Interaction**         |   ✅   | Centralized API client (`api/client.ts`), Custom Hooks (`useGates`, `useGateDetails`).         |
| **Journey Cost Calculator** |   ✅   | dedicated tab, real-time calculation validation.                                               |
| **Gate Details**            |   ✅   | Dynamic routing (`apple/[code].tsx`), connection listing.                                      |
| **Cheapest Route Finder**   |   ✅   | dedicated tab, step-by-step route visualization.                                               |
| **UX & Mobile Polish**      |   ✅   | `SafeAreaView`, intuitive navigation stack, loading skeletons.                                 |
| **Testing**                 |   ✅   | Jest + RNTL. Coverage for stores, utilities, components, and integration flows.                |
| **Bonus: Persistence**      |   ✅   | Favorites saved locally.                                                                       |
| **Bonus: Offline Mode**     |   ✅   | Global Offline Banner, cached data display.                                                    |
| **Bonus: Theming**          |   ✅   | Light/Dark toggle on Profile.                                                                  |

---

## 📝 WORKFLOW

- Work so far: [DEVLOG.md](docs/DEVLOG.md)
- Remaining work: [TODO.md](docs/TODO.md)

## Reference Docs

- [CHALLENGE.md](docs/CHALLENGE.md)
- [API.md](docs/API.md)

---

## ⚠️ Known Issues

- **Terminal Error (`Cannot pipe to a closed stream`)**: When refreshing the web version ("r"), you may see a Node.js stream error. This is a known upstream quirk in the **Expo SDK 54 / React 19** development server and does not affect the application's runtime or production builds.
