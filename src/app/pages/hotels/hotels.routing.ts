import {Routes} from "@angular/router";

export default  [
  {
    path: '',
    loadComponent: () => import('./grid-hotels/grid-hotels.component')
  },
  {
    path: 'create',
    loadComponent: () => import('./form-hotels/form-hotels.component')
  }
] as Routes
