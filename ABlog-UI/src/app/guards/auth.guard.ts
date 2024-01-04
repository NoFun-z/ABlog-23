import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.accountService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(route, state);
}
