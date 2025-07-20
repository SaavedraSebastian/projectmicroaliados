import { environment } from './environments/environment';

if (environment.production) {
  // Bloquear clic derecho
  document.addEventListener('contextmenu', event => event.preventDefault());

  // Bloquear teclas comunes para inspección
  document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    if (
      key === 'f12' ||
      (event.ctrlKey && event.shiftKey && (key === 'i' || key === 'j' || key === 'c')) ||
      (event.ctrlKey && key === 'u') ||
      (event.ctrlKey && key === 's') // Ctrl+S
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  // Detección por intervalo
  setInterval(() => {
    const before = new Date().getTime();
    debugger;
    const after = new Date().getTime();
    if (after - before > 100) {
      window.location.href = 'about:blank';
    }
  }, 1000);
}

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
