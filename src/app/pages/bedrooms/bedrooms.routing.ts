import {Routes} from "@angular/router";

export default [
  {
   path: '',
   loadComponent: () => import('./bedrooms/bedrooms.component')
  },
  {
    path: 'create',
    loadComponent: () => import('./form-rooms/form-rooms.component')
  },
  {
    path: 'update/:id',
    loadComponent: () => import('./form-rooms/form-rooms.component')
  },
] as Routes;
