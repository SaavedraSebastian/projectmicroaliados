import { environment } from './environments/environment'; 

if (environment.production) {
  document.addEventListener('contextmenu', event => event.preventDefault());

  document.addEventListener('keydown', event => {
    if (
      event.key === 'F12' ||
      (event.ctrlKey && event.shiftKey && event.key.toUpperCase() === 'I') || 
      (event.ctrlKey && event.shiftKey && event.key.toUpperCase() === 'J') || 
      (event.ctrlKey && event.key.toUpperCase() === 'U')                     
    ) {
      event.preventDefault();
    }
  });
}

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
