# Remaining Tasks & Polish

## 1. Quality Assurance (Bonus Requirement)

- [ ] **Unit Tests**: Add Jest tests for:
  - `Calculator` logic (cost calculation).
  - `useThemeColor` hook.
  - `GateCard` rendering.
- [ ] **Integration Test**: Add a test that simulates a user flow (e.g., viewing home -> clicking gate -> seeing details).
- [ ] **CI/CD**: (Optional) Add a simple GitHub Action to run lint/test on push.

## 2. Animations (Bonus Requirement)

- [ ] **Gate List**: Add entry animations (fade-in/slide-up) for the `FlatList` items on the Home screen.
- [ ] **Route Results**: Animate the cost calculation result (e.g., counting up numbers).
- [ ] **Transitions**: Ensure screen transitions (stack push/pop) feel native and smooth.

## 3. Accessibility & Polish (Mobile Focus)

- [ ] **Audit**: Verify correct usage of `accessibilityLabel` and `accessibilityRole` on interactive elements (Buttons, Gate Cards).
- [ ] **Hit Slop**: Ensure touch targets are at least 44x44pt on mobile.
- [ ] **Empty States**: Add friendly empty states for "Favorites" list if empty.

## 4. Documentation & Submission

- [ ] **README.md**: Update with clear instructions on how to run, test, and build.
- [ ] **Design Decisions**: Create `docs/DESIGN.md` (or append to README) covering:
  - Architecture (Expo Router, React Query, Zustand).
  - State Management choices.
  - Trade-offs (e.g., caching strategy, NativeWind v4 adoption).
- [ ] **Clean Up**: Remove any unused files/assets before final zip/push.
