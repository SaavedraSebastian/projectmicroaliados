import { environment } from './environments/environment'; // 👈 importa esto primero

// Protección básica contra DevTools
if (environment.production) {
  setInterval(() => {
    const before = new Date().getTime();
    debugger;
    const after = new Date().getTime();
    if (after - before > 100) {
      window.location.reload();
    }
  }, 1000);
}

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
