import { provideNgPdfViewerConfig } from './../../../ng-pdf-viewer/src/lib/ng-pdf-viewer.config';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNgPdfViewerConfig({
      theme: { preference: 'dark' },
      disabledCategories: ['annotation', 'document-print', 'zoom'],
      documentManager: {
        maxDocuments: 1,
      },
    }),
  ],
};
