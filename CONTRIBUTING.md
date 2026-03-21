# Contributing to @letsprogram/ng-pdf-viewer

Thank you for taking the time to contribute! This document outlines how to set up the project locally, the branching strategy, coding conventions, and the steps to submit a pull request.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Fork & Clone](#fork--clone)
  - [Install Dependencies](#install-dependencies)
  - [Run the Test App](#run-the-test-app)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Guidelines](#coding-guidelines)
- [Commit Message Convention](#commit-message-convention)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

---

## Code of Conduct

By participating in this project you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

---

## Ways to Contribute

- **Bug reports** — open a GitHub issue with the bug template
- **Feature requests** — open a GitHub issue with the feature template
- **Documentation improvements** — fix typos, improve examples, add missing details
- **Bug fixes** — reference the related issue in your PR
- **New features** — discuss in an issue first before writing code

---

## Getting Started

### Prerequisites

| Tool        | Minimum version |
| ----------- | --------------- |
| Node.js     | 20.x            |
| pnpm        | 10.x            |
| Angular CLI | 21.x            |

Install pnpm globally if you don't have it:

```bash
npm install -g pnpm
```

### Fork & Clone

1. Click **Fork** at the top right of the repository page.
2. Clone your fork locally:

```bash
git clone https://github.com/<your-username>/ng-pdf-viewer-workspace.git
cd ng-pdf-viewer-workspace
```

3. Add the upstream remote so you can pull in future changes:

```bash
git remote add upstream https://github.com/yshashi/ng-pdf-viewer-workspace.git
```

### Install Dependencies

```bash
pnpm install
```

### Run the Test App

The workspace contains a `test-app` project that exercises the library locally.

```bash
# Serve the test app (hot reload)
pnpm start

# Build the library
pnpm run build:lib
```

Navigate to `http://localhost:4200/` to see the viewer in action.

---

## Project Structure

```
ng-pdf-viewer-workspace/
├── projects/
│   ├── ng-pdf-viewer/        # The publishable library
│   │   └── src/lib/
│   │       ├── ng-pdf-viewer.ts         # Main component
│   │       ├── ng-pdf-viewer.config.ts  # Types, interfaces & DI token
│   │       └── ng-pdf-viewer.spec.ts    # Unit tests
│   └── test-app/             # Local integration/demo app
├── .github/
│   ├── ISSUE_TEMPLATE/       # Bug & feature request templates
│   └── PULL_REQUEST_TEMPLATE.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── CHANGELOG.md
├── LICENSE
└── package.json
```

---

## Development Workflow

1. **Sync with upstream** before starting work:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. **Create a feature branch** off `main`:

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/issue-123-short-description
```

3. **Make your changes** in `projects/ng-pdf-viewer/src/`.

4. **Run tests** to make sure nothing is broken:

```bash
pnpm test
```

5. **Build the library** to verify the output is valid:

```bash
pnpm run build:lib
```

6. **Commit** your changes following the [commit convention](#commit-message-convention).

7. **Push** your branch and open a pull request:

```bash
git push origin feat/your-feature-name
```

---

## Coding Guidelines

- Follow the coding style enforced by **Prettier** (`.prettierrc` at the root). Run `pnpm exec prettier --write .` before committing.
- Use Angular **signals** (`input()`, `output()`, `signal()`) rather than `@Input()`/`@Output()` decorators.
- All new public APIs must be exported via `src/public-api.ts`.
- New interfaces and types belong in `ng-pdf-viewer.config.ts`.
- Keep the component template minimal — logic goes in the class.
- Do not introduce new runtime dependencies without discussion in an issue first.
- All changes must be SSR-safe: guard browser APIs with `isPlatformBrowser`.

---

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(<scope>): <short description>
```

| Type       | When to use                                     |
| ---------- | ----------------------------------------------- |
| `feat`     | A new feature                                   |
| `fix`      | A bug fix                                       |
| `docs`     | Documentation changes only                      |
| `style`    | Formatting changes (no logic change)            |
| `refactor` | Code change that is neither a fix nor a feature |
| `test`     | Adding or fixing tests                          |
| `chore`    | Build process, dependency updates, tooling      |

**Examples:**

```
feat(theme): add support for custom border tokens
fix(ssr): guard localStorage access with isPlatformBrowser
docs(readme): add reactive source example
chore(deps): bump @embedpdf/snippet to 2.9.2
```

---

## Submitting a Pull Request

1. Ensure all tests pass: `pnpm test`
2. Ensure the library builds cleanly: `pnpm run build:lib`
3. Fill in the pull request template completely.
4. Link to the relevant issue (e.g. `Closes #42`).
5. Keep PRs focused — one feature or fix per PR.
6. Be responsive to review feedback; PRs that go stale will be closed.

A maintainer will review your PR as soon as possible. We may request changes or ask clarifying questions before merging.

---

## Reporting Bugs

Open an issue using the **Bug Report** template. Please include:

- A minimal reproduction (StackBlitz link preferred)
- Angular version, library version, and browser
- Steps to reproduce
- Expected vs actual behaviour

---

## Requesting Features

Open an issue using the **Feature Request** template. Please include:

- A clear description of the use case
- Why the feature cannot be achieved with the current API
- Any API design ideas you have

---

Thank you for contributing! Every improvement, no matter how small, makes this library better for everyone.
