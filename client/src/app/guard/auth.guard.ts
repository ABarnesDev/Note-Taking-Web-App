import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const authGuard: CanActivateFn = (route, state) => {
  const token = inject(UserService).getToken()

  if (token) {
    return true;
  } else {
    // If the user isn't logged in redirect to the login page
    inject(Router).navigate(['/login']);
    inject(UserService).setToken(null);
    return false;
  }
};
