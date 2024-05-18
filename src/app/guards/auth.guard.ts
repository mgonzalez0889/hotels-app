import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

const routerInjection = () => inject(Router);
const authService = () => inject(AuthService);
export const privateGuard: CanActivateFn = async () => {

  const router = routerInjection();

  const {data} = await authService().session();

  if (!data.session) {
    router.navigateByUrl('/auht/login');
  }
  return !!data.session;
};
export const publicGuard: CanActivateFn = async () => {
  const router = routerInjection();

  const {data} = await authService().session();

  if (data.session) {
    router.navigateByUrl('/');
  }
  return !data.session;

};
