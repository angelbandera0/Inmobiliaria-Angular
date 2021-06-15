import { Router } from '@angular/router';
import { Roles } from './../../../../enums/roles.enum';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header-cms',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  isLogin = false;
  name!: string | null;
  id!: string | null;
  user!:User;
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private authenticationService: LoginService) {
      this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.isAdmin = this.user?.user?.rol.rol === Roles.ADMIN_ROLE;
    this.isLogin = this.user != null;
    this.name = this.user?.user?.name;
    this.id = this.user?.user?.uid;
  }
  logout(): void {
    this.authenticationService.logout();
    this.tokenStorage.singout();
    this.isAdmin = false;
    this.isLogin = false;
    this.name= null;
    this.id= null;
    this.router.navigate(['/auth/login'])
  }
}
