import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/enums/roles.enum';
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
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenStorage.getAuthorities() === Roles.ADMIN_ROLE;
    this.isLogin = this.tokenStorage.getUsername() != null;
    this.name = this.tokenStorage.getUsername();
    this.id = this.tokenStorage.getId();
  }
  logout(): void {
    this.tokenStorage.singout();
    this.isAdmin = false;
    this.isLogin = false;
    this.name= null;
    this.id= null;
    this.router.navigate(['/auth/login']);
  }
}

