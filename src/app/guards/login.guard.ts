import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private location: Location
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //console.log('543', this.router.url);
    if (
      !this.tokenStorageService.isLoggedIn() &&
      this.router.url !== '/'
    ) {
      //console.log('*', this.router.url);
      return true;
    } else if (
      !this.tokenStorageService.isLoggedIn() &&
      this.router.url === '/'
    ) {
      //console.log('**', this.router.url);
      return true;
    } else if (
      this.tokenStorageService.isLoggedIn() &&
      this.router.url === '/'
    ) {
      //this.router.navigate(['/app']);
      this.location.back();
      return false;
    }
    return false;
  }
}
