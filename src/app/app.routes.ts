import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routing')
  },
  {
    path: 'hotels',
    loadChildren: () => import('./pages/hotels/hotels.routing')
  }
];
