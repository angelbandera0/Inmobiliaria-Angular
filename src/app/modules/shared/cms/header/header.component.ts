import { Roles } from './../../../../enums/roles.enum';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header-cms',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  isLogin = false;
  name!: string | null;
  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenStorage.getAuthorities() === Roles.ADMIN_ROLE;
    this.isLogin = this.tokenStorage.getUsername() != null;
    this.name = this.tokenStorage.getUsername();
  }
}
