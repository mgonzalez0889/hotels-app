import { Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {privateGuard, publicGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [publicGuard],
    loadChildren: () => import('./auth/auth.routing')
  },
  {
    path: 'hotels',
    component: LayoutComponent,
    canActivate: [privateGuard],
    loadChildren: () => import('./pages/hotels/hotels.routing')
  }
];
