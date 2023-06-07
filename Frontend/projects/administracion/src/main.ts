import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as cors from 'cors';

if (environment.production) {
  enableProdMode();
}

const corsOptions = {
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200, 
};

cors(corsOptions);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
