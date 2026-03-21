import { NgPdfViewer } from './../../../ng-pdf-viewer/src/lib/ng-pdf-viewer';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [NgPdfViewer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('test-app');
  value = signal(false);
  src = signal('https://snippet.embedpdf.com/ebook.pdf');

  onPdfReady(event: any) {
    console.log('PDF is ready:', event);
  }

  toggleSrc() {
    this.value.update((current) => {
      const newValue = !current;
      this.src.set(
        newValue
          ? 'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf'
          : 'https://snippet.embedpdf.com/ebook.pdf',
      );
      return newValue;
    });
  }
}
