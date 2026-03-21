# @letsprogram/ng-pdf-viewer

A lightweight, SSR-safe Angular component for embedding PDF documents, powered by [`@embedpdf/snippet`](https://www.npmjs.com/package/@embedpdf/snippet). Supports reactive inputs, automatic theme synchronisation (light/dark/system), fully customisable colours, and fine-grained toolbar category control — all with zero boilerplate.

[![npm version](https://img.shields.io/npm/v/@letsprogram/ng-pdf-viewer)](https://www.npmjs.com/package/@letsprogram/ng-pdf-viewer)
[![Angular](https://img.shields.io/badge/Angular-21+-red)](https://angular.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/yshashi/ng-pdf-viewer-workspace/blob/main/LICENSE)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Global Configuration](#global-configuration)
- [Component Inputs](#component-inputs)
- [Component Outputs](#component-outputs)
- [Theme System](#theme-system)
  - [Theme Preference](#theme-preference)
  - [Custom Colours](#custom-colours)
  - [Persisting Theme via localStorage](#persisting-theme-via-localstorage)
- [Disabling Toolbar Categories](#disabling-toolbar-categories)
- [Reactive PDF Source](#reactive-pdf-source)
- [API Reference](#api-reference)
  - [NgPdfViewerGlobalConfig](#ngpdfviewerglobalconfig)
  - [NgPdfViewerConfig](#ngpdfviewerconfig)
  - [NgPdfThemeConfig](#ngpdfthemeconfig)
  - [NgPdfThemeColors](#ngpdfthemecolors)
- [SSR Support](#ssr-support)
- [Peer Dependencies](#peer-dependencies)

---

## Features

- **Simple integration** — one component, one selector: `<ng-pdf-viewer>`
- **Reactive signals** — all inputs are Angular signals; swapping the `src` updates the viewer instantly without a full re-render
- **Automatic theme sync** — watches `prefers-color-scheme` media queries and the document `color-scheme` style to update the viewer in real time
- **Fully customisable colours** — override every design token for both light and dark themes
- **Toolbar control** — disable specific feature categories (annotations, zoom, print, …)
- **SSR-safe** — defers all browser-specific code behind `isPlatformBrowser`; lazy-loads `@embedpdf/snippet` only in the browser
- **Standalone component** — no `NgModule` needed
- **Global config** — set defaults once via `provideNgPdfViewerConfig()` and override per-instance via inputs

---

## Installation

```bash
# npm
npm install @letsprogram/ng-pdf-viewer

# pnpm
pnpm add @letsprogram/ng-pdf-viewer

# yarn
yarn add @letsprogram/ng-pdf-viewer
```

---

## Quick Start

**1. Import the component**

```ts
// app.ts (standalone component)
import { NgPdfViewer } from '@letsprogram/ng-pdf-viewer';

@Component({
  selector: 'app-root',
  imports: [NgPdfViewer],
  template: `<ng-pdf-viewer src="https://example.com/sample.pdf" height="100vh" />`,
})
export class App {}
```

**2. Add the viewer to your template**

```html
<ng-pdf-viewer src="https://example.com/sample.pdf" height="80vh" (onReady)="onPdfReady($event)" />
```

---

## Global Configuration

Register defaults once in `app.config.ts` so every `<ng-pdf-viewer>` instance shares the same baseline settings:

```ts
// app.config.ts
import { provideNgPdfViewerConfig } from '@letsprogram/ng-pdf-viewer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgPdfViewerConfig({
      height: '650px',
      theme: { preference: 'dark' },
      syncTheme: true,
      disabledCategories: ['annotation', 'document-print', 'zoom'],
    }),
  ],
};
```

Individual component inputs always take precedence over global config.

---

## Component Inputs

| Input             | Type                | Default     | Description                                                                  |
| ----------------- | ------------------- | ----------- | ---------------------------------------------------------------------------- |
| `src`             | `string`            | `''`        | URL of the PDF document to display                                           |
| `height`          | `string`            | `'650px'`   | CSS height of the viewer container                                           |
| `theme`           | `NgPdfThemeConfig`  | `undefined` | Theme preference and custom colour overrides                                 |
| `syncTheme`       | `boolean`           | `true`      | Automatically sync viewer theme with OS/browser colour scheme                |
| `themeStorageKey` | `string`            | `undefined` | `localStorage` key whose value (`'dark'` / `'light'`) sets the initial theme |
| `config`          | `NgPdfViewerConfig` | `undefined` | Full viewer config object; merged with global config                         |

---

## Component Outputs

| Output    | Type                | Description                                          |
| --------- | ------------------- | ---------------------------------------------------- |
| `onReady` | `EmbedPdfContainer` | Emitted once the PDF viewer is initialised and ready |

```ts
onPdfReady(container: EmbedPdfContainer) {
  console.log('PDF viewer ready:', container);
}
```

```html
<ng-pdf-viewer src="..." (onReady)="onPdfReady($event)" />
```

---

## Theme System

### Theme Preference

Control whether the viewer renders in light, dark, or system (auto) mode:

```html
<!-- Follow the OS preference (default) -->
<ng-pdf-viewer src="..." [theme]="{ preference: 'system' }" />

<!-- Always dark -->
<ng-pdf-viewer src="..." [theme]="{ preference: 'dark' }" />

<!-- Always light -->
<ng-pdf-viewer src="..." [theme]="{ preference: 'light' }" />
```

### Custom Colours

Supply per-theme colour tokens using the `NgPdfThemeColors` shape:

```ts
import { NgPdfThemeConfig } from '@letsprogram/ng-pdf-viewer';

readonly theme: NgPdfThemeConfig = {
  preference: 'system',
  light: {
    accent: { primary: '#0066cc', primaryHover: '#0052a3' },
    background: { app: '#f5f5f5', surface: '#ffffff' },
  },
  dark: {
    accent: { primary: '#4da6ff', primaryHover: '#3399ff' },
    background: { app: '#1a1a1a', surface: '#2d2d2d' },
  },
};
```

```html
<ng-pdf-viewer src="..." [theme]="theme" />
```

### Persisting Theme via localStorage

If your app persists the user's theme choice in `localStorage`, pass the storage key and the viewer will pick it up automatically on startup:

```html
<ng-pdf-viewer src="..." themeStorageKey="app-theme" [syncTheme]="true" />
```

The value stored under `app-theme` must contain the word `'dark'` (case-insensitive) to activate dark mode; any other value activates light mode.

---

## Disabling Toolbar Categories

Use `disabledCategories` to hide specific feature groups from the viewer toolbar:

```ts
provideNgPdfViewerConfig({
  disabledCategories: ['annotation', 'document-print', 'zoom'],
});
```

Or per-instance via `[config]`:

```html
<ng-pdf-viewer src="..." [config]="{ disabledCategories: ['annotation'] }" />
```

---

## Reactive PDF Source

The `src` input is a signal — updating it swaps the displayed document without destroying and re-creating the component:

```ts
import { signal } from '@angular/core';

src = signal('https://example.com/document-a.pdf');

switchDocument() {
  this.src.set('https://example.com/document-b.pdf');
}
```

```html
<button (click)="switchDocument()">Switch PDF</button>
<ng-pdf-viewer [src]="src()" height="100vh" />
```

---

## API Reference

### `NgPdfViewerGlobalConfig`

Extends `NgPdfViewerConfig` with viewer-level options.

```ts
interface NgPdfViewerGlobalConfig {
  src?: string;
  height?: string; // Default viewer height, e.g. '650px'
  theme?: NgPdfThemeConfig;
  syncTheme?: boolean; // Auto-sync with OS colour scheme (default: true)
  themeStorageKey?: string; // localStorage key for initial theme resolution
  disabledCategories?: string[]; // Feature categories to hide from the toolbar
  [key: string]: unknown; // Pass-through for additional EmbedPDF options
}
```

### `NgPdfViewerConfig`

Per-instance configuration passed via the `[config]` input.

```ts
interface NgPdfViewerConfig {
  src?: string;
  theme?: NgPdfThemeConfig;
  disabledCategories?: string[];
  [key: string]: unknown;
}
```

### `NgPdfThemeConfig`

```ts
type NgPdfThemeConfig = {
  preference?: 'light' | 'dark' | 'system';
  light?: NgPdfThemeColors;
  dark?: NgPdfThemeColors;
};
```

### `NgPdfThemeColors`

```ts
interface NgPdfThemeColors {
  accent?: {
    primary?: string; // Main brand colour
    primaryHover?: string; // Hover state colour
    primaryActive?: string; // Active / pressed state colour
    primaryLight?: string; // Light tint (used for selections)
    primaryForeground?: string; // Text colour on top of primary button
  };
  background?: {
    app?: string; // Main background behind the document
    surface?: string; // Toolbars, sidebars, panels
    surfaceAlt?: string; // Secondary toolbars
    elevated?: string; // Dropdowns, popups
    overlay?: string; // Modal backdrops
    input?: string; // Text inputs and checkboxes
  };
  foreground?: {
    primary?: string; // Headings, main body text
    secondary?: string; // Labels, less important text
    muted?: string; // Placeholders, disabled-looking text
    disabled?: string; // Disabled elements
    onAccent?: string; // Text on top of accent colours
  };
  interactive?: {
    hover?: string; // Hover background for standard buttons
    active?: string; // Click background
    selected?: string; // Selected item background (e.g. active tool)
    focus?: string; // Focus ring outline colour
  };
  border?: {
    default?: string; // Standard inputs, dividers
    subtle?: string; // Very light dividers
    strong?: string; // Active inputs, emphasis
  };
  state?: {
    error?: string;
    errorLight?: string;
    warning?: string;
    warningLight?: string;
    success?: string;
    successLight?: string;
    info?: string;
    infoLight?: string;
  };
}
```

---

## SSR Support

`@letsprogram/ng-pdf-viewer` is fully SSR-safe out of the box:

- All browser-specific APIs (`localStorage`, `MutationObserver`, `matchMedia`) are guarded by `isPlatformBrowser`
- The `@embedpdf/snippet` dependency is lazy-loaded via dynamic `import()` so it is never bundled into the server build
- The component renders a plain `<div>` placeholder on the server which is hydrated in the browser

No additional configuration is required for Angular Universal or the Angular SSR builder.

---

## Peer Dependencies

| Package             | Version   |
| ------------------- | --------- |
| `@angular/common`   | `^21.2.0` |
| `@angular/core`     | `^21.2.0` |
| `@embedpdf/snippet` | `^2.9.1`  |

---

## License

MIT © [letsprogram](https://github.com/yshashi)
