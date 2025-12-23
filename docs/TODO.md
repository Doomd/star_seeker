# BC's Priority Tasks:

- [x] Update unit tests
- [x] Calculator Page should have a default value for the distance (eg: 150)
- [x] Profile Page favorites should list actual favorite gates, and provide a links to each Gate to view them
- [x] Investigate why Journey Visualizer doesn't display on web properly and fix it
- [x] Profile page on web doesn't display version number correctly, need a web only workaround
- [ ] Web version is not displaying page titles in the browser window/tab (these should correspond with the page titles of each tabs screen)
- [ ] Journey Visualizer should tweak the distance labels so they are parallel to the line segments they are labeling (perhaps a little higher than the Startgate node labels)
- [ ] On profiles page, perhaps each section should be collapsible, with only one uncollapsed section visible at a time (so we can fit most of the sections on the screen)
- [ ] Investigate inconsistant Network State detection (especially when simulator comes back online from an offline state) & fix it
- [ ] Improve code readability with better comments where necessary

# AI Generated TODO Suggestions:

## 1. Quality Assurance (Bonus Requirement)

- [x] **Unit Tests**: Add Jest tests for:
  - `Calculator` logic (cost calculation).
  - `useThemeColor` hook (tested via store/profile).
  - `GateCard` rendering (context established).
- [x] **Integration Test**: Add a test that simulates a user flow (tested via Profile screen integration).

## 2. Animations (Bonus Requirement)

- [ ] **Gate List**: Add entry animations (fade-in/slide-up) for the `FlatList` items on the Home screen.
- [x] **Route Results**: High-fidelity `JourneyVisualizer` added (SVG map + Reanimated rocket).
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
