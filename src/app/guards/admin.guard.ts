import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';
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
import { Roles } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private tokenStorageService: TokenStorageService,
    private notificationsToastrService:NotificationsToastrService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.tokenStorageService.isLoggedIn() &&
      this.tokenStorageService.getAuthorities() === Roles.ADMIN_ROLE
    ) {
      return true;
    } else if (
      this.tokenStorageService.isLoggedIn() &&
      this.tokenStorageService.getAuthorities() !== Roles.ADMIN_ROLE
    ) {
      this.notificationsToastrService.showError('No posee los permisos necesarios para acceder aquí.');
      this.router.navigate(['/error/403']);
      return false;
    } else {
      this.notificationsToastrService.showError('Para poder acceder debe autenticarse primero.');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
