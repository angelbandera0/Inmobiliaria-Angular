import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/enums/roles.enum';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header-dash',
  templateUrl: './header-dash.component.html',
  styleUrls: ['./header-dash.component.css']
})
export class HeaderDashComponent implements OnInit {

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
    this.router.navigate(['/auth/login']);
  }
}

