import { InjectionToken } from '@angular/core';

export type NgPdfThemePreference = 'light' | 'dark' | 'system';

export interface NgPdfThemeColors {
  accent?: Partial<{
    primary: string; // Main brand color
    primaryHover: string; // Hover state
    primaryActive: string; // Active/Pressed state
    primaryLight: string; // Very light tint (used for selections)
    primaryForeground: string; // Text color on top of primary button
  }>;
  background: Partial<{
    app: string; // The main background behind the document
    surface: string; // Toolbars, sidebars, panels
    surfaceAlt: string; // Secondary toolbars
    elevated: string; // Dropdowns, popups
    overlay: string; // Modal backdrops (usually transparent rgba)
    input: string; // Text inputs and checkboxes
  }>;

  foreground: Partial<{
    primary: string; // Headings, main body text
    secondary: string; // Labels, less important text
    muted: string; // Placeholders, disabled-looking text
    disabled: string; // Actually disabled elements
    onAccent: string; // Text on top of accent colors
  }>;

  interactive: Partial<{
    hover: string; // Hover background for standard buttons
    active: string; // Click background
    selected: string; // Selected item background (e.g. active tool)
    focus: string; // Focus ring outline color
  }>;

  border: Partial<{
    default: string; // Standard inputs, dividers
    subtle: string; // Very light dividers
    strong: string; // Active inputs, emphasis
  }>;

  state: Partial<{
    error: string;
    errorLight: string; // Background for error messages
    warning: string;
    warningLight: string;
    success: string;
    successLight: string;
    info: string;
    infoLight: string;
  }>;
}

export type NgPdfThemeConfig = {
  preference?: NgPdfThemePreference;
  light?: NgPdfThemeColors;
  dark?: NgPdfThemeColors;
};

export interface NgPdfViewerConfig {
  src?: string;
  theme?: NgPdfThemeConfig;
  disabledCategories?: string[];
  [key: string]: unknown; // Allow additional config options to be passed through
}

export interface NgPdfViewerGlobalConfig extends NgPdfViewerConfig {
  height?: string;
  syncTheme?: boolean;
  themeStorageKey?: string; // Key for localStorage to persist theme preference
}

export const NG_PDF_VIEWER_CONFIG = new InjectionToken<NgPdfViewerGlobalConfig>(
  'NG_PDF_VIEWER_CONFIG',
);

export const provideNgPdfViewerConfig = (config?: NgPdfViewerGlobalConfig) => ({
  provide: NG_PDF_VIEWER_CONFIG,
  useValue: config ?? {},
});
