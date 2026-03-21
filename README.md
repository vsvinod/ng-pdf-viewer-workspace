# @letsprogram/ng-pdf-viewer Workspace

Open-source Angular workspace for building and publishing [`@letsprogram/ng-pdf-viewer`](https://www.npmjs.com/package/@letsprogram/ng-pdf-viewer), a standalone PDF viewer component powered by `@embedpdf/snippet`.

## Packages and Projects

- `projects/ng-pdf-viewer`: publishable Angular library
- `projects/test-app`: local app to test the library during development

## Quick Start

```bash
pnpm install
pnpm start
```

Then open `http://localhost:4200/`.

## Useful Commands

```bash
# Run local dev server
pnpm start

# Build all projects
pnpm run build

# Build only the library
pnpm run build:lib

# Run tests
pnpm test

# Publish built library (maintainers)
pnpm run publish:lib
```

## Open Source and Community

- License: [MIT](LICENSE)
- Contributing guide: [CONTRIBUTING.md](CONTRIBUTING.md)
- Code of conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- Security policy: [SECURITY.md](SECURITY.md)
- Changelog: [CHANGELOG.md](CHANGELOG.md)
- Bug reports and feature requests: use [GitHub Issues](https://github.com/yshashi/ng-pdf-viewer-workspace/issues)

## CI

GitHub Actions CI runs on every push and pull request to `main` and validates:

- dependency installation (`pnpm install --frozen-lockfile`)
- library build (`pnpm run build:lib`)
- tests (`pnpm test --watch=false`)

## Library Docs

Library-focused API and usage documentation is available in:

- [projects/ng-pdf-viewer/README.md](projects/ng-pdf-viewer/README.md)
