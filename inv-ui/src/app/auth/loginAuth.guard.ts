import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { CustomAuthService } from './auth.service';
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
  constructor(
    private authService: CustomAuthService,
    private coreService: CoreService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn()) {
      return true;
    } else {
      this.coreService.navigateTo('/dashboard/product');
      return false;
    }
  }
}
