import {Routes} from "@angular/router";

export default [
  {
    path: '',
    loadComponent: () => import('./traveler/traveler.component')
  }

] as Routes
