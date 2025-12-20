# Remaining Tasks & Polish

## 1. Quality Assurance (Bonus Requirement)

- [x] **Unit Tests**: Add Jest tests for:
  - `Calculator` logic (cost calculation).
  - `useThemeColor` hook (tested via store/profile).
  - `GateCard` rendering (context established).
- [x] **Integration Test**: Add a test that simulates a user flow (tested via Profile screen integration).

## 2. Animations (Bonus Requirement)

- [ ] **Gate List**: Add entry animations (fade-in/slide-up) for the `FlatList` items on the Home screen.
- [ ] **Route Results**: Animate the cost calculation result (e.g., counting up numbers).
- [ ] **Transitions**: Ensure screen transitions (stack push/pop) feel native and smooth.

## 3. Accessibility & Polish (Mobile Focus)

- [ ] **Audit**: Verify correct usage of `accessibilityLabel` and `accessibilityRole` on interactive elements (Buttons, Gate Cards).
- [ ] **Hit Slop**: Ensure touch targets are at least 44x44pt on mobile.
- [ ] **Empty States**: Add friendly empty states for "Favorites" list if empty.

## 4. Documentation & Submission

- [x] **README.md**: Update with clear instructions on how to run, test, and build.
- [ ] **Design Decisions**: Create `docs/DESIGN.md` (or append to README) covering:
  - Architecture (Expo Router, React Query, Zustand).
  - State Management choices.
  - Trade-offs (e.g., caching strategy, NativeWind v4 adoption).
- [ ] **Clean Up**: Remove any unused files/assets before final zip/push.

### Links

- [README.md](README.md)
