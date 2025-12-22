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

## Why this model?

As a solo developer, this provides a professional structure without the complexity of maintenance branches, while still keeping a "stable" pointer (`main`) and a "work-in-progress" zone (`dev`).
