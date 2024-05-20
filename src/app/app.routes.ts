import { Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {privateGuard, publicGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'travels'
  },
  {
    path: 'auth',
    //canActivate: [publicGuard],
    loadChildren: () => import('./auth/auth.routing')
  },
  {
    path: 'hotels',
    component: LayoutComponent,
    loadChildren: () => import('./pages/hotels/hotels.routing')
  },
  {
    path: 'bedrooms',
    component: LayoutComponent,
    loadChildren: () => import('./pages/bedrooms/bedrooms.routing')
  },
  {
    path: 'reservation',
    component: LayoutComponent,
    loadChildren: () => import('./pages/reservation/reservation.routing')
  },
  {
    path: 'travels',
    loadChildren: () => import('./pages/travels/traveler.routing')
  }
];
