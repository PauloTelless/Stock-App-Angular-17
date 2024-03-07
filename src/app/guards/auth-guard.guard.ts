import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  let token;
  const routerService = new Router();

  if (typeof localStorage !== undefined) {
    token = localStorage!.getItem('token');
  }

  if (token) {
    return true;
  } else {
    routerService.navigate(['login'])
    return false;
  }

};
