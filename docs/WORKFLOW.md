# Git Workflow: OneFlow (Variation - develop + master)

This project follows the [OneFlow](https://www.endoflineblog.com/oneflow-a-git-branching-model-and-workflow) branching model, specifically the **Variation - develop + master** approach.

## Branches

### 1. `main` (The Stable Branch)

- **Purpose**: Tracks the latest production-ready/stable code.
- **Rules**: No direct commits are allowed on `main`. It is only updated via fast-forward merges from `dev`.
- **Default Branch**: This is the default branch on GitHub/GitLab.

### 2. `dev` (The Integration Branch)

- **Purpose**: The primary branch for all ongoing development.
- **Starting Point**: Forked from `main`.
- **Rules**: Features and refactors are merged here.

### 3. Feature/Refactor Branches

- **Prefix**: `feature/` or `refactor/` (e.g., `feature/hyperspace-radar`).
- **Base**: Always branch from `dev`.
- **Merging**: Merge back into `dev` when complete. Use `--no-ff` or rebase + `--ff-only` depending on preference.

## Workflow Operations

### Starting a New Feature

```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-feature-name
```

### Finishing a Feature

```bash
git checkout dev
git merge --no-ff feature/your-feature-name
git branch -d feature/your-feature-name
```

### Releasing to `main` (Fast-Forward)

When `dev` is stable and ready for a "release":

```bash
git checkout main
git merge --ff-only dev
git push origin main
```

## Release Versioning

This project follows [Semantic Versioning (SemVer)](https://semver.org/) formatted as **MAJOR.MINOR.PATCH** (e.g., `0.1.0`).

### When to increment which number?

1.  **MAJOR**: (the first number)
    - Increment when you make **breaking changes** or a total project overhaul.
    - _Note: While in the 0.y.z phase (initial development), major changes typically stay as minor bumps until the first public release (v1.0.0)._
2.  **MINOR**: (the middle number)
    - Increment when you add **new features** in a backward-compatible manner (e.g., adding a new "Calculator" tab or a "Favorite" button).
    - Increments for significant refactors that improve the project structure.
3.  **PATCH**: (the last number)
    - Increment when you make **bug fixes** or minor tweaks (e.g., fixing a typo, adjusting a color, or updating a dependency).

### When to bump?

Versions should be bumped on the `dev` branch just before a fast-forward merge into `main`.

### Bumping Steps

1.  **Update Files**: Change the `version` field in both `package.json` and `app.json`.
2.  **Commit**: `git add . && git commit -m "chore: bump version to 0.x.x"`
3.  **Fast-Forward**:
    ```bash
    git checkout main
    git merge --ff-only dev
    ```
4.  **Tag**:
    ```bash
    git tag v0.x.x
    git push origin main --tags
    ```

## Why this model?

As a solo developer, this provides a professional structure without the complexity of maintenance branches, while still keeping a "stable" pointer (`main`) and a "work-in-progress" zone (`dev`).
