import {Routes} from "@angular/router";

export default [
  {
    path: '',
    loadComponent: () => import('./traveler/traveler.component')
  },
  {
    path: 'reservation',
    loadComponent: () => import('./form-reservation/form-reservation.component')
  }

] as Routes
