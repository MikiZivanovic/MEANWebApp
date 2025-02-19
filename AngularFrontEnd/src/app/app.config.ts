import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { cartReducer } from './store/cart.reducer';
import { provideEffects } from '@ngrx/effects';
import { CartEffects } from './store/cart.effects';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes) , provideStore({cart:cartReducer}),provideEffects(CartEffects), provideClientHydration(withEventReplay()),provideHttpClient()]
};
