import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { Reducers } from './State/reducers/index';
import { Effects } from './State/effects/effects.registry';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(),
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideStore(Reducers), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([...Effects]),    
    provideRouter(routes), 
  ],
};
