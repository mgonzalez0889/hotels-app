import {Routes} from "@angular/router";

export default [
  {
    path: '',
    loadComponent: () => import('./grid-reservation/grid-reservation.component')
  }

] as Routes
