import { ApplicationConfig, provideZoneChangeDetection, isDevMode, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { Reducers } from './State/reducers/index';
import { Effects } from './State/effects/effects.registry';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from 'environments/environment';
import { provideAuth0 } from '@auth0/auth0-angular';
import { AuthenticationInterceptor } from '@services/Authentication.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideHttpClient(),
  provideClientHydration(),
  provideAnimationsAsync(),
  provideStore(Reducers),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  provideEffects([...Effects]),
  provideRouter(routes), provideAnimationsAsync(), provideClientHydration(withEventReplay()),
  provideAuth0({
    domain: environment.auth0.domain,
    clientId: environment.auth0.clientId,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: environment.auth0.audience,
      scope: environment.auth0.scope,
    },

    // // Specify configuration for the interceptor              
    // httpInterceptor: {
    //   allowedList: [
    //     {
    //       // Match any request that starts 'https://dev-g6ghivncjbkdrr86.us.auth0.com/api/v2/' (note the asterisk)
    //       uri: 'https://dev-g6ghivncjbkdrr86.us.auth0.com/api/v2/*',
    //       tokenOptions: {
    //         authorizationParams: {
    //           // The attached token should target this audience
    //           audience: 'https://dev-g6ghivncjbkdrr86.us.auth0.com/api/v2/',

    //           // The attached token should have these scopes
    //           scope: 'openid profile email'
    //         }
    //       }
    //     },
    //         {
    //   uri: 'https://tu-api.com/*',
    //   tokenOptions: {
    //     authorizationParams: {
    //       audience: 'https://tu-api.com/',
    //       scope: 'openid profile email'
    //     }
    //   }
    // }
    //   ]
    // }
  }),
    provideHttpClient(
      withInterceptors([
        AuthenticationInterceptor
      ])
    )
  ],
};

