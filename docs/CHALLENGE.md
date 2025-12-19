# Star Seeker App - Technical Challenge

Welcome to **Star Seeker**, your passport to the cosmos! We're redefining interstellar travel through innovation, product thinking, and user experience. Your mission is to take our prototype and make it production-ready for mobile.

---

## Product Description

**Star Seeker** is a revolutionary app that calculates the cost of interstellar journeys, finds efficient routes through a network of hyperspace gates, and provides detailed gate information. Travellers can also use the "Journey Memory" feature to save their favourite routes for future adventures.

Your goal is to deliver a **React Native mobile app** that interacts with our API, demonstrates strong engineering practices, and provides a polished, user-friendly experience.

---

## Assessment Task

### Project Description

Hyperspace Tunnelling Corp manages a system-to-system web of hyperspace gates spanning the United Terran Systems. They charge users for travel and have recently expanded into transporting passengers with light space-ships (up to 5 people) to connect them with the hyperspace network.

You are tasked with creating the **Star Seeker React Native app** that integrates with our API and offers travellers a delightful, mobile-first way to plan their journeys.

---

### Task Details

#### 1. Setup & Architecture

- Create a new React Native project with expo, nativewind, and tanstack query.
- Set up a navigation structure (e.g. with folders/tabs/drawers/stack flows).
- Organise your folder structure for scalability (components, hooks, services, etc.).
- Implement error handling and loading states gracefully.

#### 2. API Interaction

- Interact with the provided API endpoints using a clean data-fetching layer (consider separation of concerns, caching, and retries).
- Display a list of gates with their details on the home screen.

#### 3. Journey Cost Calculator

- Allow users to input:
  - Distance (in AUs)
  - Number of passengers
  - Parking days
- Use the `/transport/{distance}?passengers={number}&parking={days}` API endpoint.
- Display the cheapest vehicle option and cost to the user in a clear, mobile-friendly UI.

#### 4. Gate Details

- Allow users to tap a gate from the list to view its details.
- Fetch and display gate info using `/gates/{gateCode}`.

#### 5. Cheapest Route Finder

- Enable users to select a start and target gate.
- Use `/gates/{gateCode}/to/{targetGateCode}` to calculate and display the cheapest route.

#### 6. UX & Mobile Enhancements

- Apply intuitive, accessible styling for mobile devices.
- Ensure smooth transitions/navigation between screens.
- Handle different screen sizes and orientations.
- Consider performance optimisations for large datasets.

#### 7. Bonus (Optional, but valued)

- **State Persistence:** Store recent routes or favourite gates using AsyncStorage or a similar solution.
- **Offline Mode:** Handle poor connectivity gracefully (cached data / fallback UI).
- **Testing:** Write unit tests (Jest, Testing Library) and at least one integration test.
- **Animations:** Add small, thoughtful animations (e.g. route transition or gate list interactions).

---

### API Details

- **API URL:** `https://hstc-api.testing.keyholding.com/`
- **Swagger:** [Star Seeker API Docs](https://app.swaggerhub.com/apis-docs/TheKeyholdingCompany/HSTC/)
- **API Key:**
  ```json
  { "x-api-key": "94962B9A-966C-43FC-8E1A-145DEAA5970C" }
  ```

### Submission

- Share your source code via a Git repository (GitHub, GitLab, Bitbucket, etc.).
- Include documentation: how to run, test, and use the app.

- Provide a short write-up on:
  - Design decisions (architecture, state management, libraries chosen).
  - Trade-offs made.
  - Bonus tasks attempted.

---

### What We're Looking For

- **Engineering Maturity**: Clean architecture, separation of concerns, error handling.
- **Mobile Focus**: UX polish, performance considerations, offline awareness.
- **Leadership Signals**: Clear documentation, maintainability, ability to design for a team.
- **Product Mindset**: Not just working code, but thoughtful user experience.

### Links

- [README.md](README.md)
