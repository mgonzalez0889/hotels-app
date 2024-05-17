import { Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routing')
  },
  {
    path: 'hotels',
    component: LayoutComponent,
    loadChildren: () => import('./pages/hotels/hotels.routing')
  }
];
